**GET /api/repos**

Overview

- Returns repositories accessible to your GitHub App installation merged with local metadata.

Query parameters

- `q` — text query matching repo name or description
- `tag` — filter by metadata tag
- `language` — filter by primary language
- `sort` — field to sort by (e.g. `stargazers_count`, `forks_count`, `updated_at`)
- `order` — `asc` or `desc` (default `desc`)
- `page` — page number (default 1)
- `per_page` — page size (default 50, max 100)

Response

```
{
  "total": 123,
  "filtered": 42,
  "page": 1,
  "per_page": 50,
  "repos": [ /* enriched repo objects */ ]
}
```

Environment

- `GITHUB_APP_ID` — GitHub App ID
- `GITHUB_PRIVATE_KEY` — App private key (PEM)
- `GITHUB_INSTALLATION_ID` — Installation ID to use for fetching installation repos

Notes

- The server code lives at `src/routes/repos.ts` and uses `@octokit/rest` + `@octokit/auth-app` to generate installation tokens.
