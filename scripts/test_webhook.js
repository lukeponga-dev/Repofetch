const crypto = require("crypto");
const fetch = require("node-fetch");

// Configuration
const WEBHOOK_URL = process.env.WEBHOOK_URL || "http://localhost:3000/webhook";
const SECRET = process.env.GITHUB_WEBHOOK_SECRET || "your-secret-here";

// Create a test webhook payload
const payload = {
  action: "added",
  installation: {
    id: 123456,
    account: {
      login: "test-org",
      type: "Organization",
    },
  },
  repositories_added: [
    {
      id: 123456789,
      name: "test-repo",
      full_name: "test-org/test-repo",
      description: "A test repository",
      language: "TypeScript",
      stargazers_count: 42,
      forks_count: 7,
      private: false,
    },
  ],
  sender: {
    login: "test-user",
    type: "User",
  },
};

async function testWebhook() {
  try {
    console.log("🧪 Testing GitHub webhook endpoint...");
    console.log(`📍 URL: ${WEBHOOK_URL}`);

    // Create signature
    const body = JSON.stringify(payload);
    const signature =
      "sha256=" +
      crypto.createHmac("sha256", SECRET).update(body).digest("hex");

    console.log("📝 Payload:", JSON.stringify(payload, null, 2));
    console.log("🔐 Signature:", signature);

    // Send request
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Hub-Signature-256": signature,
        "X-GitHub-Event": "installation_repositories",
        "User-Agent": "Repofetch-Test-Script",
      },
      body: body,
    });

    console.log("📊 Response status:", response.status);
    console.log("📊 Response text:", await response.text());

    if (response.ok) {
      console.log("✅ Webhook test successful!");
    } else {
      console.log("❌ Webhook test failed!");
    }
  } catch (error) {
    console.error("❌ Error testing webhook:", error.message);
  }
}

// Test without signature (should fail)
async function testInvalidSignature() {
  try {
    console.log("\n🚫 Testing invalid signature...");

    const payload = { test: "invalid" };
    const body = JSON.stringify(payload);

    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Hub-Signature-256": "sha256=invalid",
        "X-GitHub-Event": "test",
        "User-Agent": "Repofetch-Test-Script",
      },
      body: body,
    });

    console.log("📊 Response status:", response.status);
    console.log("📊 Response text:", await response.text());

    if (response.status === 401) {
      console.log("✅ Invalid signature correctly rejected!");
    } else {
      console.log("❌ Invalid signature should return 401!");
    }
  } catch (error) {
    console.error("❌ Error testing invalid signature:", error.message);
  }
}

// Run tests
async function runTests() {
  console.log("🚀 Starting webhook tests...\n");

  await testWebhook();
  await testInvalidSignature();

  console.log("\n✨ Tests completed!");
}

if (require.main === module) {
  runTests();
}

module.exports = { testWebhook, testInvalidSignature };
