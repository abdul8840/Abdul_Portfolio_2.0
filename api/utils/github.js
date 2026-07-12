const GITHUB_GRAPHQL_URL = 'https://api.github.com/graphql';

export async function githubGraphQL(query, variables = {}) {
  const res = await fetch(GITHUB_GRAPHQL_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json();

  if (!res.ok || json.errors) {
    const message =
      json.errors?.[0]?.message || `GitHub API request failed (${res.status})`;
    throw new Error(message);
  }

  return json.data;
}
