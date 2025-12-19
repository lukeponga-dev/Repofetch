
const { App } = require("octokit");
const fs = require("fs");

const appId = 2501453;
const installationId = 100314666;
const privateKeyPath = "/workspaces/Repofetch/fetchreposapp.2025-12-19.private-key.pem";

async function main() {
  const privateKey = fs.readFileSync(privateKeyPath, "utf8");
  const app = new App({ appId, privateKey });

  // Get an octokit instance for the specific installation
  const octokit = await app.getInstallationOctokit(installationId);

  // List repositories for this installation
  const { data } = await octokit.request("GET /installation/repositories");

  const aiRepos = data.repositories.filter(repo => repo.name.toLowerCase().includes('ai'));

  // Check if JSON output is requested
  const args = process.argv.slice(2);
  const outputJson = args.includes('--json') || args.includes('-j');

  if (outputJson) {
    // Output as JSON
    const jsonOutput = {
      total_ai_repositories: aiRepos.length,
      repositories: aiRepos.map(repo => ({
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
        default_branch: repo.default_branch
      }))
    };
    
    console.log(JSON.stringify(jsonOutput, null, 2));
    
    // Save to file
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `ai_repositories_${timestamp}.json`;
    fs.writeFileSync(filename, JSON.stringify(jsonOutput, null, 2));
    console.log(`\n💾 Saved to: ${filename}`);
  } else {
    // Standard output format
    console.log("--- Your AI Projects ---");
    aiRepos.forEach(repo => console.log(`🤖 ${repo.name}`));
  }
}

main().catch(console.error);
