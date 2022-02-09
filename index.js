const express = require("express");
const { google } = require("googleapis");

const creds = require("./credentials.json");

const app = express();

app.get("/", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });

  // Create client instance for auth

  const client = await auth.getClient();

  // Create instance of google sheets api

  const googleSheets = google.sheets({ version: "v4", auth: client });

  // Get metadata out of spreadsheet
  const spreadsheetId = "13mENKJN1bRv2vt2-cwLhZZ02cVxdml2Zxm0REaRsJ4c";
  const metadata = await googleSheets.spreadsheets.get({
    auth, // the same as writing auth: auth
    spreadsheetId,
  });

  // Get a list of all of the metadata for the sheets in a spreadsheet (i.e. sheet name for each sheet)
  let sheets = metadata.data.sheets;

  // For example, we can get the title of the first sheet in a
  // spreadsheet by accessing the first index in the list
  let first_ayah = sheets[1].properties.title;
  console.log(sheets)
  console.log(first_ayah)
  // Read rows from a spreadsheet

  const rows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: first_ayah,
  });

  res.send(rows.data);
});

app.listen(1377, (req, res) => console.log("running on port 1377"));
