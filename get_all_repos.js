
const { App } = require("octokit");
const fs = require("fs");

// Configuration
const APP_ID = 2501453;
const INSTALLATION_ID = 100314666;
const PRIVATE_KEY_PATH = "/workspaces/Repofetch/fetchreposapp.2025-12-19.private-key.pem";

async function fetchAll() {
  try {
    const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, "utf8");
    const app = new App({ appId: APP_ID, privateKey });
    const octokit = await app.getInstallationOctokit(INSTALLATION_ID);

    console.log("🔄 Fetching all repositories (this may take a moment)...");

    // .paginate automatically handles multiple pages of results
    const allRepos = await octokit.paginate("GET /installation/repositories", {
      per_page: 100, // Maximize results per request
    });

    console.log(`\n✅ Success! Found ${allRepos.length} repositories.\n`);

    // Check if JSON output is requested
    const args = process.argv.slice(2);
    const outputJson = args.includes('--json') || args.includes('-j');

    if (outputJson) {
      // Output as JSON
      const jsonOutput = {
        total_repositories: allRepos.length,
        repositories: allRepos.map(repo => ({
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
          is_ai_project: repo.name.toLowerCase().includes('ai')
        }))
      };
      
      console.log(JSON.stringify(jsonOutput, null, 2));
      
      // Save to file
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `all_repositories_${timestamp}.json`;
      fs.writeFileSync(filename, JSON.stringify(jsonOutput, null, 2));
      console.log(`\n💾 Saved to: ${filename}`);
    } else {
      // Output formatted list
      allRepos.forEach((repo, index) => {
        const lock = repo.private ? "🔒" : "🌍";
        console.log(`${(index + 1).toString().padStart(3)}. ${lock} ${repo.full_name}`);
      });
    }

  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

fetchAll();
