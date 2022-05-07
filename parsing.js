const { google } = require("googleapis");

async function getDocument(documentId) {
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
    return docmetadata.data;
}

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
    let document = docmetadata.data;

    let intro = parseIntro(document);

    let indices = getVerseIndices(document);

    let v_gen = verseGenerator(document, indices);
    let parsed = {
        chapter: Object.keys(indices)[0].split(":")[0],
        verses: {},
        intro: intro,
    };
    let verse;
    let done;
    while (!done) {
        // The verse generator will take care of the iteration for us.
        ({ value: verse, done } = v_gen.next());
        !done ? (parsed.verses[verse.number] = verse) : null;
    }
    return parsed;
}

/**
 *  A generator function that helps us parse a single verse when called.
 *
 *  @param {Object} document
 *  @param {Object} verses
 */
function* verseGenerator(document, verses) {
    let verse_ids = Object.keys(verses);
    let verse;
    for (let v = 0; v < verse_ids.length; v++) {
        verse = {};
        verse_location = verses[verse_ids[v]]; // get the index of the verse in the request body
        verse.number = v + 1;
        verse.body_index = verses[verse_ids[v]];
        verse.text = fetchVerse(verse_ids[v]);
        verse.linguistics = parseLinguistics(document, verse_location);
        verse.interpretations = parseInterpretations(document, verse_location);
        verse.comments = parseComments(document, verse_location);
        console.log(verse);
        yield verse;
    }
}

/**
 * Fetch a verse by it's id from quran.com.
 *
 * @param {string} verse_id
 * @return a verse object that contains the arabic uthmani repr, transliteration... and?
 */
function fetchVerse(verse_id) {
    let verse = {};
    return verse;
}

/**
 *  Fetch the indices of each verse within the body of a document.
 *
 *  @param {*} document
 *  @returns an array of key value pairs (chapter:verse): index
 */
function getVerseIndices(document) {
    let new_format;
    let content = document.body.content;
    let verses = {};
    let verse;
    content.forEach((line, line_index) => {
        line?.paragraph?.elements.forEach((element) => {
            if (element?.horizontalRule) {
                verse =
                    content[
                        line_index + 1
                    ].paragraph.elements[0].textRun.content.trim();
                verses[verse] = line_index;
            }
        });
    });
    console.log(verses);
    return verses;
}

/**
 * A function that focuses on parsing the linguistics of a verse
 *
 * @param {Object} document
 * @returns intro_sections, which is an object that contains all of the introduction sections.
 */
function parseIntro(document) {
    let content = document.body.content;
    let introStart = findIntroStart(content);
    let intro = { start: introStart };
    return intro;
}

function findIntroStart(content) {
    let foundIntro = false;
    for (
        var line_index = 0;
        line_index < content.length && !foundIntro;
        line_index++
    ) {
        // Find the start of the intro
        line = content[line_index];
        let elements = line?.paragraph?.elements;
        if (elements) {
            // This is where we look for the title "INTRODUCTION"
            elements.forEach((e) => {
                if (e?.textRun.content.includes("INTRODUCTION")) {
                    console.log("We found the intro", line_index);
                    introStart = line_index;
                    foundIntro = true;
                }
            });
        }
    }
    return introStart;
}

/**
 * A function that focuses on parsing the linguistics of a verse
 *
 * @param {Object} document
 * @param {int} verse_loc
 * @returns
 */
function parseLinguistics(document, verse_loc) {
    let lings = {};
    return lings;
}

/**
 *  A function that focuses on parsing interpretations.
 *
 *  @param {Object} document
 *  @param {int} verse_loc
 *  @returns an object containing the interpretations of a verse
 */
function parseInterpretations(document, verse_loc) {
    let interps = {};
    return interps;
}

/**
 *  A function that focuses on parsing comments.
 *
 *  @param {Object} document
 *  @param {int} verse_loc
 *  @returns an object containing the comments for a verse
 */
function parseComments(document, verse_loc) {
    let comments = {};
    return comments;
}

// Feel free to add any helper functions below this comment but above the module exports.

module.exports = { parseDocument, getDocument };
