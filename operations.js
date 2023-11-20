import { dynamoDBdocClient } from "./aws-local-setup.js";

const noteRef = {
    TableName: "notes"
};

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