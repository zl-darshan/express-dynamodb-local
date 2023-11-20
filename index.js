import express from "express";
import bodyParser from "body-parser";

import { getAllNotesReq, createNewNoteReq, updateNoteReq, deleteNoteReq } from "./note-controller.js";

const app = express();
const port = 3010;

app.use(bodyParser.json());

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});

app.get("/", (_req, res) => {
    res.send("<h1>Hello from express server!!</h1>");
});

app.get("/all-notes", getAllNotesReq);

app.post("/add-note", createNewNoteReq);

app.put("/update-note", updateNoteReq);

app.delete("/delete-note", deleteNoteReq);