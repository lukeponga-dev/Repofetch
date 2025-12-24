import { Router } from "express";
import { Octokit } from "@octokit/rest";
import { createAppAuth } from "@octokit/auth-app";
import metadata from "../../data/metadata.json";

const router = Router();

async function getAuthenticatedOctokit(installationId: number) {
  const appOctokit = new Octokit({
    authStrategy: createAppAuth,
    auth: {
      appId: Number(process.env.GITHUB_APP_ID || 0),
      privateKey: process.env.GITHUB_PRIVATE_KEY || "",
      installationId,
    },
  });

  const auth = await appOctokit.auth({ type: "installation", installationId });
  return new Octokit({ auth: auth.token });
}

function applyFilters(items: any[], q?: string, tag?: string, language?: string) {
  let results = items.slice();

  if (q) {
    const lc = q.toLowerCase();
    results = results.filter((r) => (r.name || "").toLowerCase().includes(lc) || (r.description || "").toLowerCase().includes(lc));
  }

  if (tag) {
    results = results.filter((r) => (r.metadata?.tags || []).includes(tag));
  }

  if (language) {
    results = results.filter((r) => (r.language || "").toLowerCase() === language.toLowerCase());
  }

  return results;
}

function applySort(items: any[], sort?: string, order: string = "desc") {
  const copy = items.slice();
  const dir = order === "asc" ? 1 : -1;

  if (!sort) return copy;

  copy.sort((a, b) => {
    const va = a[sort] ?? 0;
    const vb = b[sort] ?? 0;

    if (va < vb) return -1 * dir;
    if (va > vb) return 1 * dir;
    return 0;
  });

  return copy;
}

router.get("/repos", async (req, res) => {
  try {
    const installationId = Number(process.env.GITHUB_INSTALLATION_ID || 0);
    if (!installationId) return res.status(400).json({ error: "GITHUB_INSTALLATION_ID is required" });

    const octokit = await getAuthenticatedOctokit(installationId);

    const reposData = await octokit.apps.listReposAccessibleToInstallation({ per_page: 100 });
    const repos = reposData.data.repositories || [];

    const merged = repos.map((repo: any) => {
      const meta = metadata[repo.full_name] || { tags: [], priority: 0, highlighted: false, notes: null };

      return {
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        private: repo.private,
        html_url: repo.html_url,
        clone_url: repo.clone_url,
        ssh_url: repo.ssh_url,
        language: repo.language,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        open_issues_count: repo.open_issues_count,
        size: repo.size,
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        pushed_at: repo.pushed_at,
        default_branch: repo.default_branch,
        is_ai_project: (meta.tags || []).includes("ai"),
        metadata: {
          tags: meta.tags,
          priority: meta.priority,
          highlighted: meta.highlighted,
          notes: meta.notes,
        },
      };
    });

    // Filtering
    const q = req.query.q as string | undefined;
    const tag = req.query.tag as string | undefined;
    const language = req.query.language as string | undefined;

    let results = applyFilters(merged, q, tag, language);

    // Sorting
    const sort = (req.query.sort as string) || "stargazers_count";
    const order = (req.query.order as string) || "desc";
    results = applySort(results, sort, order);

    // Pagination
    const page = Math.max(1, Number(req.query.page || 1));
    const per_page = Math.min(100, Math.max(1, Number(req.query.per_page || 50)));
    const start = (page - 1) * per_page;
    const paged = results.slice(start, start + per_page);

    res.json({ total: merged.length, filtered: results.length, page, per_page, repos: paged });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Error fetching repos:", error);
    res.status(500).json({ error: "Failed to fetch repositories" });
  }
});

export default router;
