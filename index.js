import express from "express";
import bodyParser from "body-parser";

import { createNewNote } from "./operations.js";

const app = express();
const port = 3010;

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

app.get("/", (_req, res) => {
    res.send("<h1>Hello from express server!!</h1>");
});

app.post("/add-note", createNewNote);