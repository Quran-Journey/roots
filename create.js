const { google } = require("googleapis");

/**
 * Based on a specific chapter, we should be able to generate a generic template with
 * information stored in our databases (i.e. the linguistics section can contain the
 * root words for every word in every verse)
 */
async function createDocument(chapter) {
  const auth = new google.auth.GoogleAuth({
    keyFile: "credentials.json",
    scopes: "https://www.googleapis.com/auth/documents",
  });
  const client = await auth.getClient();
  const googleDocs = google.drive({ version: "v3", auth: client });

  var folderId = "1nG3NsfUNXnXVqmy2hrCttCzQKB0i5LwZ";
  var fileMetadata = {
    name: `chapter ${chapter}`,
    parents: [folderId],
  };
  var media = {
    mimeType: "image/jpeg",
    body: fs.createReadStream("files/photo.jpg"),
  };
  drive.files.create(
    {
      resource: fileMetadata,
      media: media,
      fields: "id",
    },
    function (err, file) {
      if (err) {
        // Handle error
        console.error(err);
      } else {
        console.log("File Id: ", file.id);
      }
    }
  );

  const docmetadata = await googleDocs.documents.create({
    auth,
  });

  return extracted;
}

// Feel free to add any helper functions below this comment but above the module exports.

module.exports = { parseDocument: parseDocument };
