const { App } = require("octokit");
const fs = require("fs");

// Configuration
const APP_ID = 2501453;
const INSTALLATION_ID = 100314666;
const PRIVATE_KEY_PATH =
  "C:\\Users\\lukeg\\repos\\Repofetch\\config\\fetchreposapp.2025-12-23.private-key.pem";

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
    const outputJson = args.includes("--json") || args.includes("-j");
    const showAnalytics = args.includes("--analytics") || args.includes("-a");

    if (showAnalytics) {
      // Generate quick analytics for all repositories
      const analytics = generateQuickAnalytics(allRepos);

      if (outputJson) {
        console.log(JSON.stringify(analytics, null, 2));

        // Save to file
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const filename = `output/all_repositories_quick_analytics_${timestamp}.json`;
        fs.writeFileSync(filename, JSON.stringify(analytics, null, 2));
        console.log(`\n💾 Analytics saved to: ${filename}`);
      } else {
        // Display formatted analytics
        displayQuickAnalytics(analytics);
      }
    } else if (outputJson) {
      // Output as JSON
      const jsonOutput = {
        total_repositories: allRepos.length,
        repositories: allRepos.map((repo) => ({
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
          is_ai_project: repo.name.toLowerCase().includes("ai"),
        })),
      };

      console.log(JSON.stringify(jsonOutput, null, 2));

      // Save to file
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const filename = `output/all_repositories_${timestamp}.json`;
      fs.writeFileSync(filename, JSON.stringify(jsonOutput, null, 2));
      console.log(`\n💾 Saved to: ${filename}`);
    } else {
      // Output formatted list
      allRepos.forEach((repo, index) => {
        const lock = repo.private ? "🔒" : "🌍";
        console.log(
          `${(index + 1).toString().padStart(3)}. ${lock} ${repo.full_name}`
        );
      });
    }
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

// Quick Analytics Functions
function generateQuickAnalytics(repositories) {
  const total = repositories.length;
  const aiRepos = repositories.filter((repo) =>
    repo.name.toLowerCase().includes("ai")
  );

  const totalStars = repositories.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );
  const totalForks = repositories.reduce(
    (sum, repo) => sum + repo.forks_count,
    0
  );
  const totalIssues = repositories.reduce(
    (sum, repo) => sum + repo.open_issues_count,
    0
  );

  // Language distribution
  const languageCounts = {};
  repositories.forEach((repo) => {
    const lang = repo.language || "Unknown";
    languageCounts[lang] = (languageCounts[lang] || 0) + 1;
  });

  // Privacy distribution
  const publicRepos = repositories.filter((repo) => !repo.private).length;
  const privateRepos = repositories.filter((repo) => repo.private).length;

  // Activity analysis
  const now = new Date();
  const recentlyUpdated = repositories.filter((repo) => {
    const daysSinceUpdate = Math.floor(
      (now - new Date(repo.updated_at)) / (1000 * 60 * 60 * 24)
    );
    return daysSinceUpdate <= 30;
  }).length;

  return {
    summary: {
      total_repositories: total,
      ai_projects: aiRepos.length,
      regular_projects: total - aiRepos.length,
      total_stars: totalStars,
      total_forks: totalForks,
      total_open_issues: totalIssues,
      average_stars_per_repo: Math.round(totalStars / total),
      average_forks_per_repo: Math.round(totalForks / total),
      recently_updated_30_days: recentlyUpdated,
      activity_percentage: Math.round((recentlyUpdated / total) * 100),
    },
    distribution: {
      languages: Object.entries(languageCounts)
        .map(([lang, count]) => ({
          language: lang,
          count,
          percentage: Math.round((count / total) * 100),
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10),
      privacy: {
        public: publicRepos,
        private: privateRepos,
        public_percentage: Math.round((publicRepos / total) * 100),
        private_percentage: Math.round((privateRepos / total) * 100),
      },
    },
    top_repositories: {
      by_stars: [...repositories]
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 5)
        .map((repo) => ({
          name: repo.name,
          stars: repo.stargazers_count,
          language: repo.language,
          is_ai: repo.name.toLowerCase().includes("ai"),
        })),
      by_forks: [...repositories]
        .sort((a, b) => b.forks_count - a.forks_count)
        .slice(0, 5)
        .map((repo) => ({
          name: repo.name,
          forks: repo.forks_count,
          language: repo.language,
          is_ai: repo.name.toLowerCase().includes("ai"),
        })),
    },
    generated_at: new Date().toISOString(),
  };
}

function displayQuickAnalytics(analytics) {
  console.log("\n" + "=".repeat(80));
  console.log("📊 ALL REPOSITORIES - QUICK ANALYTICS");
  console.log("=".repeat(80));

  const summary = analytics.summary;
  console.log("\n📊 SUMMARY");
  console.log(`Total Repositories: ${summary.total_repositories}`);
  console.log(`AI Projects: ${summary.ai_projects}`);
  console.log(`Regular Projects: ${summary.regular_projects}`);
  console.log(`Total Stars: ${summary.total_stars}`);
  console.log(`Total Forks: ${summary.total_forks}`);
  console.log(`Average Stars per Repo: ${summary.average_stars_per_repo}`);
  console.log(
    `Recently Updated (30 days): ${summary.recently_updated_30_days} (${summary.activity_percentage}%)`
  );

  const privacy = analytics.distribution.privacy;
  console.log("\n🔐 PRIVACY DISTRIBUTION");
  console.log(`Public: ${privacy.public} (${privacy.public_percentage}%)`);
  console.log(`Private: ${privacy.private} (${privacy.private_percentage}%)`);

  console.log("\n💻 TOP LANGUAGES");
  analytics.distribution.languages.slice(0, 5).forEach((lang) => {
    console.log(`${lang.language}: ${lang.count} repos (${lang.percentage}%)`);
  });

  console.log("\n⭐ TOP STARRED REPOSITORIES");
  analytics.top_repositories.by_stars.forEach((repo) => {
    const aiIndicator = repo.is_ai ? "🤖" : "📁";
    console.log(
      `${aiIndicator} ${repo.name}: ${repo.stars} ⭐ (${repo.language})`
    );
  });

  console.log("\n" + "=".repeat(80));
}

fetchAll();
