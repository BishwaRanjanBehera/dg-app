// Server-side only. Never import this file into client components —
// it uses the raw JIRA_API_TOKEN which must never reach the browser.

const JIRA_DOMAIN = process.env.JIRA_DOMAIN;
const JIRA_EMAIL = process.env.JIRA_EMAIL;
const JIRA_API_TOKEN = process.env.JIRA_API_TOKEN;

// Jira Cloud sandbox project key (issues look like SCRUM-1, SCRUM-2, ...)
const PROJECT_KEY = "SCRUM";

// Production reliability guard: if Jira Cloud ever hangs (rather than
// erroring outright), we don't want DG to hang along with it — the PRD's
// "always demoable" requirement means a slow/stuck upstream call must
// still resolve to the sample-data fallback within a bounded time.
const REQUEST_TIMEOUT_MS = 8000;

/**
 * Fetches raw issue data from the Jira Cloud REST API v3 search endpoint
 * for the configured project. Throws if env vars are missing, the request
 * fails, or the request times out — the caller (getDGData) is responsible
 * for catching this and falling back to sample data.
 */
export async function fetchJiraIssues(): Promise<any[]> {
  if (!JIRA_DOMAIN || !JIRA_EMAIL || !JIRA_API_TOKEN) {
    throw new Error(
      "Missing Jira environment variables. Check JIRA_DOMAIN, JIRA_EMAIL, JIRA_API_TOKEN in .env.local"
    );
  }

  const authString = Buffer.from(`${JIRA_EMAIL}:${JIRA_API_TOKEN}`).toString(
    "base64"
  );

  const jql = encodeURIComponent(`project=${PROJECT_KEY}`);
  const fields = encodeURIComponent(
    "summary,status,assignee,issuelinks,labels,created"
  );

  // Atlassian retired /rest/api/3/search (returns 410 Gone) in favor of
  // /rest/api/3/search/jql — same idea, new path.
  const url = `https://${JIRA_DOMAIN}.atlassian.net/rest/api/3/search/jql?jql=${jql}&fields=${fields}&maxResults=100`;

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Basic ${authString}`,
        Accept: "application/json",
      },
      // Always get fresh data — no caching for this MVP
      cache: "no-store",
      signal: controller.signal,
    });
  } catch (err) {
    if (err instanceof Error && err.name === "AbortError") {
      throw new Error(
        `Jira API request timed out after ${REQUEST_TIMEOUT_MS}ms`
      );
    }
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Jira API request failed: ${response.status} ${response.statusText} - ${body}`
    );
  }

  const data = await response.json();

  // Jira's /search response wraps the issue list in `issues`
  return data.issues ?? [];
}
