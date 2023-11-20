import { nanoid } from "nanoid"

import { createNewNote } from "./operations.js";

export async function createNewNoteReq(req, res) {
    console.log("body--", req.body);
    const noteTitle = req.body.title || "empty title from post req.";
    const newNote = {
        "id": nanoid(),
        "title": noteTitle
    };
    
    const result = await createNewNote(newNote);

    if (result === true) {
        console.log(`New note added: ${noteTitle}`);
        res.status(200).send(`New note added: ${noteTitle}`);
    } else {
        res.status(result.statusCode).send(`error on note adding: ${result} `);
    }
}