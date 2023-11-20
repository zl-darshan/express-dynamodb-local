import { nanoid } from "nanoid"

import { createNewNote, getAllNotes } from "./operations.js";

export async function getAllNotesReq(_req, res) {

    const result = await getAllNotes();

    if (result.Count > 0) {
        console.log(`fatched notes`);
        res.status(200).json(result.Items);
    } else {
        res.status(result.statusCode).send(`error on fatching notes: ${result} `);
    }
}

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