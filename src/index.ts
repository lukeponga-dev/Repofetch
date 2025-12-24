import express from "express";
import routes from "./routes/repos";

const app = express();
app.use(express.json());

app.use("/api", routes);

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);
});

export default app;
