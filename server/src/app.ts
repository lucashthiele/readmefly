import express from "express";
import "dotenv/config";
import routes from "./routes.ts";

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(routes);

app.listen(PORT, () => console.log("Shit's going crazy..."));
