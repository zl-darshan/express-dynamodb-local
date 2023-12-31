import { nanoid } from "nanoid"

import { createNewNote, getAllNotes, updateNote, deleteNote } from "./operations.js";

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

    if (result.statusCode === 200) {
        console.log(`New note added: ${noteTitle}, id: ${newNote.id}`);
        res.status(200).send(`New note added: ${noteTitle}, note: ${JSON.stringify(newNote)}`);
    } else {
        res.status(result.statusCode).send(`error on note adding: ${result} `);
    }
}

export async function updateNoteReq(req, res) {
    console.log(req.body, req.query);
    const updateNoteData = [
        req.query.id,
        req.body.title
    ];

    const result = await updateNote(...updateNoteData);

    if (result === true) {
        console.log(`title is updated of note-id: ${req.query.id}`);
        res.status(200).send(`title is updated of note-id: ${req.query.id}`);
    } else if (result.errorType === "ConditionalCheckFailedException") {
        res.status(result.statusCode).send(`note with the id ${req.query.id} is not found.`);
    } else {
        res.status(result.statusCode).send(`error on title update: ${result} `);
    }
}

export async function deleteNoteReq(req, res) {
    console.log(req.query);

    const result = await deleteNote(req.query.id);

    if (result === true) {
        console.log(`note is deleted of note-id: ${req.query.id}`);
        res.status(200).send(`note is deleted of note-id: ${req.query.id}`);
    } else if (result.errorType === "IdNoteFound") {
        res.status(result.statusCode).send(`note with the id ${req.query.id} is not found.`);
    } else {
        res.status(result.statusCode).send(`error on note delete: ${result} `);
    }
}