const express = require("express");
const { google } = require("googleapis");
const { MongoClient } = require("mongodb");

/**
 * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
 * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
 */
const mongoConnectionString =
  "mongodb+srv://FalafelTest:3hGvTbgRmuTi9SSS@cluster0.yu591.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const app = express();

app.get("/sheet", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/documents"],
  });

  // Note, when connecting, ensure that your IP address is whitelisted by mongodb Atlas
  const mongoClient = new MongoClient(mongoConnectionString);

  await mongoClient.connect().catch((e) => console.log(e));

  await listDatabases(mongoClient);

  // Create client instance for auth

  const client = await auth.getClient();

  // Create instance of google sheets api

  const googleSheets = google.sheets({ version: "v4", auth: client });
  const googleDocs = google.docs({ version: "v1", auth: client });

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
  console.log(sheets);
  console.log(first_ayah);
  // Read rows from a spreadsheet

  const rows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: first_ayah,
  });

  res.send(rows.data);
});


app.get("/doc", async (req, res) => {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets", "https://www.googleapis.com/auth/documents"],
  });

  // Note, when connecting, ensure that your IP address is whitelisted by mongodb Atlas
  const mongoClient = new MongoClient(mongoConnectionString);

  await mongoClient.connect().catch((e) => console.log(e));

  await listDatabases(mongoClient);

  // Create client instance for auth

  const client = await auth.getClient();

  // Create instance of google sheets api

  const googleDocs = google.docs({ version: "v1", auth: client });

  // Get metadata out of DOCUMENT
  const documentId = "1O9Iqxu95szS4gowJZdGyMJTlP8LghsuJQhDqWUMojSY";
  
  const docmetadata = await googleDocs.documents.get({
    auth, // the same as writing auth: auth
    documentId,
  });

  console.log(docmetadata);

  res.send(docmetadata.data);
});

async function listDatabases(client) {
  const databasesList = await client.db().admin().listDatabases();

  console.log(databasesList.databases);
}

async function insertSurahIntoDB(client) {
  const databasesList = await client.db("surahs");

  console.log(databasesList.databases);
}

app.listen(1377, (req, res) => console.log("running on port 1377"));

// Note to self: mongo stores things in BSON format which is a binary representation of JSON
// So when you hear the word "document", you can just think of a JSON object
// Every document has an _id which is unique. This will be created automatically but can be defined manually.
