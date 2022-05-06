const express = require("express");
const { parseDocument, getDocument } = require("./parsing");

const app = express();

/**
 * An endpoint returning document data
 *
 * example document_id: 11wJIGkCKk9GMyOdNlcQMnlJ-7K-VXmb1mA0QsFzG79k
 */
app.get("/", async (req, res) => {
    let routes = { "available routes": [] };
    app._router.stack.forEach((r) => {
        if (r.route && r.route.path) {
            routes["available routes"].push(r.route.path);
        }
    });
    res.send(routes);
});

/**
 * Actually parsing and reformating the data for our needs
 *
 * example document_id: 11wJIGkCKk9GMyOdNlcQMnlJ-7K-VXmb1mA0QsFzG79k
 */
app.get("/docs/parse/:document_id", async (req, res) => {
    res.send(await parseDocument(req.params.document_id));
});

/**
 * An endpoint returning document data
 *
 * example document_id: 11wJIGkCKk9GMyOdNlcQMnlJ-7K-VXmb1mA0QsFzG79k
 */
app.get("/docs/:document_id", async (req, res) => {
    res.send(await getDocument(req.params.document_id));
});

app.listen(1377, (req, res) => console.log("running on port 1377"));
