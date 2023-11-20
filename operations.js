import { dynamoDBdocClient } from "./aws-local-setup.js";

const noteRef = {
    TableName: "notes"
};

export async function getAllNotes() {
    let getAllNotesResult;

    try {
        await dynamoDBdocClient.scan(noteRef, function (err, data) {
            if (err) {
                console.log("database-error", err.statusCode);
                getAllNotesResult = err;
            }
            else {
                getAllNotesResult = data;
            }
        }).promise();
    }
    catch (err) {
        console.log("getAllNotes()-catch-error", err);
    }
    return getAllNotesResult;
}

export async function createNewNote(newNoteData)  {
    const newNoteRef = {
        ...noteRef,
        Item: newNoteData
    };
    let putResult;

    try {
        await dynamoDBdocClient.put(newNoteRef, function (err, data) {
            if (err) {
                console.log("database-error", err.statusCode);
                putResult = err;
            }
            else {
                putResult = true;
            }
        }).promise();
    }
    catch (err) {
        console.log("catch-error", err);
    }
    return putResult;
}

export async function updateNote(id, updatingTitle) {

    const updateNoteRef = {
        ...noteRef,
        Key: {
            id: id
        },
        ConditionExpression: "id = :updatingID",
        UpdateExpression: "set title = :updatingTitle",
        ExpressionAttributeValues: {
            ":updatingTitle": updatingTitle,
            ":updatingID": id
        }
    };
    let updateResult;

    try {
        await dynamoDBdocClient.update(updateNoteRef, function (err, _data) {
            if (err) {
                console.log("database-error", err.statusCode);
                updateResult = err;
            }
            else {
                updateResult = true;
            }
        }).promise();
    }
    catch (err) {
        console.log("catch-error", err);
    }
    return updateResult;
}

export async function deleteNote(deleteId) {

    const deleteNoteRef = {
        ...noteRef,
        Key: {
            id: deleteId
        }
    };
    let deleteResult;

    try {
        await dynamoDBdocClient.delete(deleteNoteRef, function (err, data) {
            if (err) {
                console.log("deleteNote(): database-error", err.statusCode);
                deleteResult = err;
            }
            else {
                if (data.ConsumedCapacity === undefined) {
                    deleteResult = true; 
                    console.log("note deleted.");
                } else {
                    console.log("deleteNote(): IdNoteFound");
                    deleteResult = {
                        code: "IdNoteFound",
                        statusCode: 404
                    };
                }
            }
        }).promise();
    }
    catch (err) {
        console.log("deleteNote(): catch-error", err);
    }
    return deleteResult;
}