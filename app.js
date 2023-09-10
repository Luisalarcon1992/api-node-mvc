import express, { json } from "express";
import { moviesRouter } from "./routes/movies.js";
import { corsMiddleware } from "./middlware/cors.js";

const app = express();

app.disable("x-powered-by");

const PORT = process.env.PORT || 3000;

app.use(corsMiddleware());
app.use(json());
app.use("/movies", moviesRouter);

app.use((req, res) => {
  res.send("<h1>404</h1>");
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
