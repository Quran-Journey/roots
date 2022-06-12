const utils = require("./utils");

async function getChapters(data) {
    let sql = "SELECT * FROM suras";
    return await utils.retrieve(
        sql,
        [],
        new utils.Message({
            success: `Successfully fetched all suras.`,
        })
    );
}

async function getChapterVerses(data) {
    var invalid = utils.simpleValidation(data, {
        sura_number: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM quran_text WHERE sura=$1";
    var params = [data.sura_number];
    let verses = await utils.retrieve(
        sql,
        params,
        new utils.Message({
            success: `Successfully fetched verses for sura number ${data.sura_number}.`,
        })
    );
    if (verses.data.length > 0) {
        verses.data.sort((a, b) => (a.aya > b.aya ? 1 : -1));
    }
    return verses;
}

async function getVerseRootWords(data) {
    var invalid = utils.simpleValidation(data, {
        verse_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql =
        "SELECT * FROM (SELECT * FROM (SELECT indexID, aw.wordID, word, rootid FROM TextToWord as ttw JOIN ArabicWord as aw on aw.WordID=ttw.WordID WHERE indexID=$1) as taw JOIN RootWord as rt ON rt.RootID=taw.rootID) rtw JOIN rootmeaning rm ON rm.rootword=rtw.rootword;";
    var params = [data.verse_id];
    return await utils.retrieve(
        sql,
        params,
        new utils.Message({
            success: `Successfully fetched roots for verse with id ${data.verse_id}.`,
        })
    );
}

module.exports = {
    getChapterVerses,
    getChapters,
    getVerseRootWords,
};
