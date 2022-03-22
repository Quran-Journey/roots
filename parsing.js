const { google } = require("googleapis");

// Our main funciton that executes parsing of an entire document
async function parseDocument(documentId) {
    const auth = new google.auth.GoogleAuth({
        keyFile: "credentials.json",
        scopes: "https://www.googleapis.com/auth/documents",
    });
    const client = await auth.getClient();
    const googleDocs = google.docs({ version: "v1", auth: client });

    const docmetadata = await googleDocs.documents.get({
        auth,
        documentId,
    });

    // Add new_section index extracted_data
    let extracted = { ...docmetadata.data, new_section: 0 };

    parseVerse(extracted);

    // For each ayah
    parseLinguistics(extracted);
    parseTafasir(extracted);
    parseOthers(extracted);
    return extracted;
}

function parseVerse(original_data) {
    let new_format;
    let content = original_data.body.content;
    // console.log(body)
    verses = content.filter((line) => {
        line?.paragraph?.elements.forEach((element, index) => {
            if (element?.horizontalRule) {
                console.log(element.horizontalRule, index);
            }
        });
    });
    return { original_data, new_format };
}

/**
 * A function that focuses on parsing linguistics.
 * We parse from the beginning of a linguistics section up until a tafsir section.
 * Note that we will return the newly formatted data which will also contain an index "new_section" for the beginning of the next section.
 */
function parseLinguistics(original_data) {
    let new_format;
    return { original_data, new_format };
}

/**
 * A function that focuses on parsing tafasir.
 * We parse from the beginning of a tafsir section up until a comment section.
 * Note that we will return the newly formatted data which will also contain an index "new_section" for the beginning of the next section.
 */
function parseTafasir(original_data) {
    let new_format;
    return { original_data, new_format };
}

/**
 * A function that focuses on parsing comments.
 * We parse from the beginning of a comment section up until a new ayah section.
 * Note that we will return the newly formatted data which will also contain an index "new_section" for the beginning of the next section.
 */
function parseOthers(original_data) {
    let new_format;
    return { original_data, new_format };
}

// Feel free to add any helper functions below this comment but above the module exports.

module.exports = { parseDocument: parseDocument };
