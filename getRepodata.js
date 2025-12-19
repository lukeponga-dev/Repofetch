const { App } = require("octokit");
const fs = require("fs");

const app = new App({
    appId: 2501453,
    privateKey: fs.readFileSync("/workspaces/Repofetch/fetchreposapp.2025-12-19.private-key.pem", "utf8"),
});

async function getRepoData() {
    // Use the Installation ID from your JSON payload
    const octokit = await app.getInstallationOctokit(100314666);

    try {
        const { data } = await octokit.request("GET /repos/{owner}/{repo}/contents/{path}", {
            owner: "lukeponga-dev",
            repo: "RepoFetch",
            path: "", // Root directory
        });

        console.log("Repository Files:");
        data.forEach(file => console.log(`- ${file.name}`));
    } catch (error) {
        console.error("Error fetching data:", error.status);
    }
}

getRepoData();
