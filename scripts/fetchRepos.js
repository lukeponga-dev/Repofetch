
const { App } = require("octokit");
const fs = require("fs");

const appId = 2501453;
const installationId = 100314666;
const privateKeyPath = "C:\\Users\\lukeg\\repos\\Repofetch\\config\\fetchreposapp.2025-12-23.private-key.pem";

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
  const showAnalytics = args.includes('--analytics') || args.includes('-a');

  if (showAnalytics) {
    // Generate AI repository analytics
    const analytics = generateAIAnalytics(aiRepos);
    
    if (outputJson) {
      console.log(JSON.stringify(analytics, null, 2));
      
      // Save to file
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `output/ai_repositories_analytics_${timestamp}.json`;
      fs.writeFileSync(filename, JSON.stringify(analytics, null, 2));
      console.log(`\n💾 Analytics saved to: ${filename}`);
    } else {
      // Display formatted analytics
      displayAIAnalytics(analytics);
    }
  } else if (outputJson) {
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
        default_branch: repo.default_branch,
        is_ai_project: true
      }))
    };
    
    console.log(JSON.stringify(jsonOutput, null, 2));
    
    // Save to file
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `output/ai_repositories_${timestamp}.json`;
    fs.writeFileSync(filename, JSON.stringify(jsonOutput, null, 2));
    console.log(`\n💾 Saved to: ${filename}`);
  } else {
    // Standard output format
    console.log("--- Your AI Projects ---");
    aiRepos.forEach(repo => console.log(`🤖 ${repo.name}`));
  }
}

// AI Repository Analytics Functions
function generateAIAnalytics(repositories) {
  const total = repositories.length;
  const totalStars = repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repositories.reduce((sum, repo) => sum + repo.forks_count, 0);
  const totalIssues = repositories.reduce((sum, repo) => sum + repo.open_issues_count, 0);
  
  // Language distribution
  const languageCounts = {};
  repositories.forEach(repo => {
    const lang = repo.language || 'Unknown';
    languageCounts[lang] = (languageCounts[lang] || 0) + 1;
  });

  // Popularity analysis
  const starred = repositories.filter(repo => repo.stargazers_count > 0).length;
  const forked = repositories.filter(repo => repo.forks_count > 0).length;
  
  // Age analysis
  const now = new Date();
  const ages = repositories.map(repo => {
    const created = new Date(repo.created_at);
    const daysSinceCreation = Math.floor((now - created) / (1000 * 60 * 60 * 24));
    return {
      name: repo.name,
      age_days: daysSinceCreation
    };
  });
  
  const averageAge = Math.floor(ages.reduce((sum, repo) => sum + repo.age_days, 0) / ages.length);
  const recentlyActive = repositories.filter(repo => {
    const daysSinceUpdate = Math.floor((now - new Date(repo.updated_at)) / (1000 * 60 * 60 * 24));
    return daysSinceUpdate <= 30;
  }).length;

  return {
    summary: {
      total_ai_repositories: total,
      total_stars: totalStars,
      total_forks: totalForks,
      total_open_issues: totalIssues,
      average_stars_per_repo: Math.round(totalStars / total),
      average_forks_per_repo: Math.round(totalForks / total),
      repositories_with_stars: starred,
      repositories_with_forks: forked,
      average_age_days: averageAge,
      recently_active_30_days: recentlyActive,
      activity_percentage: Math.round((recentlyActive / total) * 100)
    },
    languages: {
      distribution: Object.entries(languageCounts)
        .map(([lang, count]) => ({
          language: lang,
          count,
          percentage: Math.round((count / total) * 100)
        }))
        .sort((a, b) => b.count - a.count),
      most_popular: Object.keys(languageCounts).sort((a, b) => 
        languageCounts[b] - languageCounts[a]
      )[0]
    },
    popularity: {
      top_starred: [...repositories]
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5)
        .map(repo => ({
          name: repo.name,
          stars: repo.stargazers_count,
          language: repo.language
        })),
      top_forked: [...repositories]
        .sort((a, b) => b.forks_count - a.forks_count)
        .slice(0, 5)
        .map(repo => ({
          name: repo.name,
          forks: repo.forks_count,
          language: repo.language
        }))
    },
    generated_at: new Date().toISOString()
  };
}

function displayAIAnalytics(analytics) {
  console.log("\n" + "=".repeat(80));
  console.log("🤖 AI REPOSITORIES ANALYTICS");
  console.log("=".repeat(80));

  const summary = analytics.summary;
  console.log("\n📊 SUMMARY");
  console.log(`Total AI Repositories: ${summary.total_ai_repositories}`);
  console.log(`Total Stars: ${summary.total_stars}`);
  console.log(`Total Forks: ${summary.total_forks}`);
  console.log(`Average Stars per Repo: ${summary.average_stars_per_repo}`);
  console.log(`Repositories with Stars: ${summary.repositories_with_stars}`);
  console.log(`Recently Active (30 days): ${summary.recently_active_30_days} (${summary.activity_percentage}%)`);

  console.log("\n💻 LANGUAGE DISTRIBUTION");
  analytics.languages.distribution.slice(0, 5).forEach(lang => {
    console.log(`${lang.language}: ${lang.count} repos (${lang.percentage}%)`);
  });

  console.log("\n⭐ TOP STARRED AI REPOS");
  analytics.popularity.top_starred.forEach(repo => {
    console.log(`${repo.name}: ${repo.stars} ⭐ (${repo.language})`);
  });

  console.log("\n" + "=".repeat(80));
}

main().catch(console.error);
