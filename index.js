const express = require("express");
const { google } = require("googleapis");

const app = express();

app.get("/sheet", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });
  
  const spreadsheetId = "13mENKJN1bRv2vt2-cwLhZZ02cVxdml2Zxm0REaRsJ4c";
  const metadata = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });
  let sheets = metadata.data.sheets;
  let first_ayah = sheets[1].properties.title;
  let rows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: first_ayah,
  });

  res.send(rows.data);
});

app.get("/doc", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/documents",
  });
  const client = await auth.getClient();
  const googleDocs = google.docs({ version: "v1", auth: client });

  const documentId = "1O9Iqxu95szS4gowJZdGyMJTlP8LghsuJQhDqWUMojSY";
  const docmetadata = await googleDocs.documents.get({
    auth,
    documentId,
  });

  res.send(docmetadata.data);
});

app.listen(1377, (req, res) => console.log("running on port 1377"));
