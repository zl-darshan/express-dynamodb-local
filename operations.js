import {nanoid} from "nanoid"

import { dynamoDBdocClient } from "./aws-local-setup.js";

const noteRef = {
    TableName: "notes"
};

export async function createNewNote(req, res)  {
    console.log(req.body);
    const noteTitle = req.body.title || "empty title from post req.";
    const newNote = {
        "id": nanoid(),
        "title": noteTitle
    };
    const newNoteRef = {
        ...noteRef,
        Item: newNote
    };

    const result = await dynamoDBdocClient.put(newNoteRef, function (err, data) {
        if (err) console.log(err);
        else console.log("note added: ", data);
    });
    res.send(`<h1>new note added: ${noteTitle} </h1>`);
}