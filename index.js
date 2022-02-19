const express = require("express");
const { parseDocument } = require("./parsing");

const app = express();

/**
 * Long story short:
 * Google will give us a JSON object containing every single details about the document
 * We will extract all of the information we want and store it in a new JSON object.
 * This JSON object will be formatted for our needs.
 * 
 * example document_id: 11wJIGkCKk9GMyOdNlcQMnlJ-7K-VXmb1mA0QsFzG79k
 */
app.get("/docs/:document_id", async (req, res) => {
  res.send(await parseDocument(req.params.document_id));
});

app.listen(1377, (req, res) => console.log("running on port 1377"));
