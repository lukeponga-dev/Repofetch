const { App } = require("octokit");
const fs = require("fs");

// Configuration
const APP_ID = 2501453;
const INSTALLATION_ID = 100314666;
const PRIVATE_KEY_PATH = "C:\\Users\\lukeg\\repos\\Repofetch\\config\\fetchreposapp.2025-12-23.private-key.pem";

class RepositoryAnalytics {
  constructor(repositories) {
    this.repositories = repositories;
  }

  // Generate comprehensive analytics
  generateAnalytics() {
    const analytics = {
      summary: this.getSummary(),
      languages: this.getLanguageDistribution(),
      popularity: this.getPopularityStats(),
      age: this.getAgeAnalysis(),
      activity: this.getActivityStats(),
      size: this.getSizeAnalysis(),
      privacy: this.getPrivacyStats(),
      generated_at: new Date().toISOString()
    };

    return analytics;
  }

  // Summary statistics
  getSummary() {
    const total = this.repositories.length;
    const aiProjects = this.repositories.filter(repo => 
      repo.name.toLowerCase().includes('ai') || 
      (repo.description && repo.description.toLowerCase().includes('ai'))
    ).length;
    
    const totalStars = this.repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0);
    const totalForks = this.repositories.reduce((sum, repo) => sum + repo.forks_count, 0);
    const totalIssues = this.repositories.reduce((sum, repo) => sum + repo.open_issues_count, 0);
    
    return {
      total_repositories: total,
      ai_projects: aiProjects,
      regular_projects: total - aiProjects,
      total_stars: totalStars,
      total_forks: totalForks,
      total_open_issues: totalIssues,
      average_stars_per_repo: Math.round(totalStars / total),
      average_forks_per_repo: Math.round(totalForks / total),
      most_starred_repo: this.getMostStarredRepo(),
      most_forked_repo: this.getMostForkedRepo(),
      newest_repo: this.getNewestRepo(),
      oldest_repo: this.getOldestRepo()
    };
  }

  // Language distribution analysis
  getLanguageDistribution() {
    const languageCounts = {};
    const languageStars = {};
    const languageSizes = {};
    
    this.repositories.forEach(repo => {
      const lang = repo.language || 'Unknown';
      
      // Count repositories by language
      languageCounts[lang] = (languageCounts[lang] || 0) + 1;
      
      // Accumulate stars by language
      languageStars[lang] = (languageStars[lang] || 0) + repo.stargazers_count;
      
      // Accumulate sizes by language
      languageSizes[lang] = (languageSizes[lang] || 0) + repo.size;
    });

    // Convert to sorted array
    const languages = Object.keys(languageCounts).sort((a, b) => 
      languageCounts[b] - languageCounts[a]
    );

    return {
      distribution: languages.map(lang => ({
        language: lang,
        repository_count: languageCounts[lang],
        total_stars: languageStars[lang],
        average_stars: Math.round(languageStars[lang] / languageCounts[lang]),
        total_size_kb: languageSizes[lang],
        percentage: Math.round((languageCounts[lang] / this.repositories.length) * 100)
      })),
      most_popular_language: languages[0],
      most_starred_language: Object.keys(languageStars).sort((a, b) => 
        languageStars[b] - languageStars[a]
      )[0]
    };
  }

  // Popularity statistics
  getPopularityStats() {
    const repos = [...this.repositories].sort((a, b) => b.stargazers_count - a.stargazers_count);
    const forks = [...this.repositories].sort((a, b) => b.forks_count - a.forks_count);
    
    return {
      top_starred: repos.slice(0, 10).map(repo => ({
        name: repo.name,
        full_name: repo.full_name,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language
      })),
      top_forked: forks.slice(0, 10).map(repo => ({
        name: repo.name,
        full_name: repo.full_name,
        forks: repo.forks_count,
        stars: repo.stargazers_count,
        language: repo.language
      })),
      popularity_distribution: this.getPopularityBuckets()
    };
  }

  // Age analysis
  getAgeAnalysis() {
    const now = new Date();
    
    const ages = this.repositories.map(repo => {
      const created = new Date(repo.created_at);
      const updated = new Date(repo.updated_at);
      const pushed = new Date(repo.pushed_at);
      
      return {
        name: repo.name,
        full_name: repo.full_name,
        age_days: Math.floor((now - created) / (1000 * 60 * 60 * 24)),
        days_since_update: Math.floor((now - updated) / (1000 * 60 * 60 * 24)),
        days_since_push: Math.floor((now - pushed) / (1000 * 60 * 60 * 24)),
        created_at: repo.created_at,
        updated_at: repo.updated_at,
        pushed_at: repo.pushed_at
      };
    });

    const averageAge = Math.floor(ages.reduce((sum, repo) => sum + repo.age_days, 0) / ages.length);
    const recentlyUpdated = ages.filter(repo => repo.days_since_update <= 30).length;
    const recentlyPushed = ages.filter(repo => repo.days_since_push <= 7).length;
    
    return {
      average_age_days: averageAge,
      average_age_months: Math.round(averageAge / 30),
      recently_updated_30_days: recentlyUpdated,
      recently_pushed_7_days: recentlyPushed,
      oldest_repos: ages.sort((a, b) => b.age_days - a.age_days).slice(0, 5),
      newest_repos: ages.sort((a, b) => a.age_days - b.age_days).slice(0, 5),
      most_recently_updated: ages.sort((a, b) => a.days_since_update - b.days_since_update).slice(0, 5),
      age_distribution: this.getAgeDistribution(ages)
    };
  }

  // Activity statistics
  getActivityStats() {
    const activeRepos = this.repositories.filter(repo => {
      const daysSinceUpdate = (Date.now() - new Date(repo.updated_at)) / (1000 * 60 * 60 * 24);
      return daysSinceUpdate <= 30;
    });

    return {
      active_repositories_last_30_days: activeRepos.length,
      inactive_repositories: this.repositories.length - activeRepos.length,
      activity_percentage: Math.round((activeRepos.length / this.repositories.length) * 100),
      most_recently_active: activeRepos
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 10)
        .map(repo => ({
          name: repo.name,
          updated_at: repo.updated_at,
          days_since_update: Math.floor((Date.now() - new Date(repo.updated_at)) / (1000 * 60 * 60 * 24))
        }))
    };
  }

  // Size analysis
  getSizeAnalysis() {
    const sizes = this.repositories.map(repo => repo.size);
    const totalSize = sizes.reduce((sum, size) => sum + size, 0);
    
    return {
      total_size_kb: totalSize,
      total_size_mb: Math.round(totalSize / 1024),
      average_size_kb: Math.round(totalSize / this.repositories.length),
      largest_repos: [...this.repositories]
        .sort((a, b) => b.size - a.size)
        .slice(0, 10)
        .map(repo => ({
          name: repo.name,
          size_kb: repo.size,
          size_mb: Math.round(repo.size / 1024),
          language: repo.language
        })),
      size_distribution: this.getSizeDistribution(sizes)
    };
  }

  // Privacy statistics
  getPrivacyStats() {
    const publicRepos = this.repositories.filter(repo => !repo.private);
    const privateRepos = this.repositories.filter(repo => repo.private);
    
    return {
      public_repositories: publicRepos.length,
      private_repositories: privateRepos.length,
      public_percentage: Math.round((publicRepos.length / this.repositories.length) * 100),
      private_percentage: Math.round((privateRepos.length / this.repositories.length) * 100),
      public_repos: publicRepos.slice(0, 20),
      private_repos: privateRepos.slice(0, 20)
    };
  }

  // Helper methods
  getMostStarredRepo() {
    const repo = [...this.repositories].sort((a, b) => b.stargazers_count - a.stargazers_count)[0];
    return {
      name: repo.name,
      stars: repo.stargazers_count
    };
  }

  getMostForkedRepo() {
    const repo = [...this.repositories].sort((a, b) => b.forks_count - a.forks_count)[0];
    return {
      name: repo.name,
      forks: repo.forks_count
    };
  }

  getNewestRepo() {
    const repo = [...this.repositories].sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
    return {
      name: repo.name,
      created_at: repo.created_at
    };
  }

  getOldestRepo() {
    const repo = [...this.repositories].sort((a, b) => new Date(a.created_at) - new Date(b.created_at))[0];
    return {
      name: repo.name,
      created_at: repo.created_at
    };
  }

  getPopularityBuckets() {
    const buckets = {
      '0 stars': 0,
      '1-10 stars': 0,
      '11-50 stars': 0,
      '51-100 stars': 0,
      '101-500 stars': 0,
      '500+ stars': 0
    };

    this.repositories.forEach(repo => {
      const stars = repo.stargazers_count;
      if (stars === 0) buckets['0 stars']++;
      else if (stars <= 10) buckets['1-10 stars']++;
      else if (stars <= 50) buckets['11-50 stars']++;
      else if (stars <= 100) buckets['51-100 stars']++;
      else if (stars <= 500) buckets['101-500 stars']++;
      else buckets['500+ stars']++;
    });

    return buckets;
  }

  getAgeDistribution(ages) {
    const buckets = {
      '0-30 days': 0,
      '1-6 months': 0,
      '6-12 months': 0,
      '1-2 years': 0,
      '2-5 years': 0,
      '5+ years': 0
    };

    ages.forEach(repo => {
      const days = repo.age_days;
      if (days <= 30) buckets['0-30 days']++;
      else if (days <= 180) buckets['1-6 months']++;
      else if (days <= 365) buckets['6-12 months']++;
      else if (days <= 730) buckets['1-2 years']++;
      else if (days <= 1825) buckets['2-5 years']++;
      else buckets['5+ years']++;
    });

    return buckets;
  }

  getSizeDistribution(sizes) {
    const buckets = {
      '0-100 KB': 0,
      '100-500 KB': 0,
      '500 KB-1 MB': 0,
      '1-5 MB': 0,
      '5-10 MB': 0,
      '10+ MB': 0
    };

    sizes.forEach(size => {
      if (size <= 100) buckets['0-100 KB']++;
      else if (size <= 500) buckets['100-500 KB']++;
      else if (size <= 1024) buckets['500 KB-1 MB']++;
      else if (size <= 5120) buckets['1-5 MB']++;
      else if (size <= 10240) buckets['5-10 MB']++;
      else buckets['10+ MB']++;
    });

    return buckets;
  }
}

async function main() {
  try {
    const privateKey = fs.readFileSync(PRIVATE_KEY_PATH, "utf8");
    const app = new App({ appId: APP_ID, privateKey });
    const octokit = await app.getInstallationOctokit(INSTALLATION_ID);

    console.log("🔍 Fetching repositories for analytics...");

    // Fetch all repositories
    const allRepos = await octokit.paginate("GET /installation/repositories", {
      per_page: 100,
    });

    console.log(`📊 Analyzing ${allRepos.length} repositories...`);

    // Generate analytics
    const analytics = new RepositoryAnalytics(allRepos);
    const report = analytics.generateAnalytics();

    // Check if JSON output is requested
    const args = process.argv.slice(2);
    const outputJson = args.includes('--json') || args.includes('-j');

    if (outputJson) {
      console.log(JSON.stringify(report, null, 2));
      
      // Save to file
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const filename = `output/repository_analytics_${timestamp}.json`;
      fs.writeFileSync(filename, JSON.stringify(report, null, 2));
      console.log(`\n💾 Analytics saved to: ${filename}`);
    } else {
      // Display formatted analytics
      console.log("\n" + "=".repeat(80));
      console.log("🚀 REPOSITORY ANALYTICS REPORT");
      console.log("=".repeat(80));

      // Summary
      console.log("\n📊 SUMMARY");
      console.log(`Total Repositories: ${report.summary.total_repositories}`);
      console.log(`AI Projects: ${report.summary.ai_projects}`);
      console.log(`Regular Projects: ${report.summary.regular_projects}`);
      console.log(`Total Stars: ${report.summary.total_stars.toLocaleString()}`);
      console.log(`Total Forks: ${report.summary.total_forks.toLocaleString()}`);
      console.log(`Average Stars per Repo: ${report.summary.average_stars_per_repo}`);

      // Languages
      console.log("\n💻 TOP LANGUAGES");
      report.languages.distribution.slice(0, 5).forEach(lang => {
        console.log(`${lang.language}: ${lang.repository_count} repos (${lang.percentage}%) - ${lang.total_stars} ⭐`);
      });

      // Popularity
      console.log("\n⭐ TOP STARRED REPOSITORIES");
      report.popularity.top_starred.slice(0, 5).forEach(repo => {
        console.log(`${repo.name}: ${repo.stars} ⭐ (${repo.language})`);
      });

      // Age
      console.log("\n📅 AGE ANALYSIS");
      console.log(`Average Age: ${report.age.average_age_months} months`);
      console.log(`Recently Updated (30 days): ${report.age.recently_updated_30_days}`);
      console.log(`Recently Active (7 days): ${report.age.recently_pushed_7_days}`);

      // Privacy
      console.log("\n🔐 PRIVACY DISTRIBUTION");
      console.log(`Public: ${report.privacy.public_repositories} (${report.privacy.public_percentage}%)`);
      console.log(`Private: ${report.privacy.private_repositories} (${report.privacy.private_percentage}%)`);

      console.log("\n" + "=".repeat(80));
    }

  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

main();
