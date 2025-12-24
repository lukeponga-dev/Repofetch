const { App } = require("octokit");
const fs = require("fs");

// Configuration
const APP_ID = 2501453;
const INSTALLATION_ID = 100314666;
const PRIVATE_KEY_PATH = "C:\\Users\\lukeg\\repos\\Repofetch\\config\\fetchreposapp.2025-12-23.private-key.pem";

// Output formats
const OUTPUT_FORMATS = {
  ALL: 'all',
  AI_ONLY: 'ai-only',
  BOTH: 'both'
};

async function fetchRepositories(format = OUTPUT_FORMATS.ALL) {
  try {
    const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, "utf8");
    const app = new App({ appId: APP_ID, privateKey });
    const octokit = await app.getInstallationOctokit(INSTALLATION_ID);

    console.log("🔄 Fetching repositories...");

    // Fetch all repositories
    const allRepos = await octokit.paginate("GET /installation/repositories", {
      per_page: 100,
    });

    // Filter AI repositories
    const aiRepos = allRepos.filter(repo => 
      repo.name.toLowerCase().includes('ai')
    );

    let outputData = {};

    switch (format) {
      case OUTPUT_FORMATS.ALL:
        outputData = {
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
            default_branch: repo.default_branch
          }))
        };
        break;

      case OUTPUT_FORMATS.AI_ONLY:
        outputData = {
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
        break;

      case OUTPUT_FORMATS.BOTH:
        outputData = {
          summary: {
            total_repositories: allRepos.length,
            ai_repositories: aiRepos.length,
            non_ai_repositories: allRepos.length - aiRepos.length
          },
          all_repositories: allRepos.map(repo => ({
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
          })),
          ai_repositories_only: aiRepos.map(repo => ({
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
        break;
    }

    // Output as JSON
    console.log(JSON.stringify(outputData, null, 2));

    // Also save to file
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `output/repositories_${format}_${timestamp}.json`;
    fs.writeFileSync(filename, JSON.stringify(outputData, null, 2));
    console.log(`\n💾 Saved to: ${filename}`);

    return outputData;

  } catch (error) {
    console.error("❌ Error:", error.message);
    throw error;
  }
}

// CLI usage
const args = process.argv.slice(2);
const format = args[0] || OUTPUT_FORMATS.ALL;

if (!Object.values(OUTPUT_FORMATS).includes(format)) {
  console.log(`❌ Invalid format: ${format}`);
  console.log(`Valid formats: ${Object.values(OUTPUT_FORMATS).join(', ')}`);
  console.log(`Usage: node repos_to_json.js [${Object.values(OUTPUT_FORMATS).join('|')}]`);
  process.exit(1);
}

fetchRepositories(format).catch(console.error);
