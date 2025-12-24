import express from "express";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import routes from "./routes/repos";

const app = express();
app.use(express.json());

// Add raw body parsing for webhook (needed for signature verification)
app.use('/webhook', express.raw({ type: 'application/json' }));

// Webhook handler
app.post('/webhook', (req, res) => {
  const signature = req.headers['x-hub-signature-256'] as string;
  const event = req.headers['x-github-event'] as string;
  const secret = process.env.GITHUB_WEBHOOK_SECRET;

  if (!secret) {
    console.error('GITHUB_WEBHOOK_SECRET not set');
    return res.status(500).send('Server error');
  }

  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(req.body);
  const computed = 'sha256=' + hmac.digest('hex');

  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(computed))) {
    return res.status(401).send('Unauthorized');
  }

  let payload;
  try {
    payload = JSON.parse(req.body.toString());
  } catch (e) {
    return res.status(400).send('Invalid JSON');
  }

  if (event === 'installation_repositories' && payload.action === 'added') {
    const metadataPath = path.join(__dirname, '../data/metadata.json');
    let metadata;
    try {
      metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf8'));
    } catch (e) {
      metadata = {};
    }

    for (const repo of payload.repositories_added) {
      const key = repo.full_name;
      if (!metadata[key]) {
        metadata[key] = { tags: [], priority: 0, highlighted: false, notes: null };
      }
    }

    fs.writeFileSync(metadataPath, JSON.stringify(metadata, null, 2));
  } else if (event === 'installation' && payload.action === 'new_permissions_accepted') {
    console.log(`New permissions accepted for installation ${payload.installation.id}`);
  }

  res.status(200).send('OK');
});

app.use("/api", routes);

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);
});

export default app;
