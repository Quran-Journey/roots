const router = require("express").Router();
const lesson = require("../model/roots");
const utils = require("./utils");

router.get("/chapters", async (request, response) => {
    await lesson.getChapters().then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

router.get("/chapter/:sura_number", async (request, response) => {
    await lesson.getChapterVerses(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

router.get("/verse/:verse_id", async (request, response) => {
    await lesson.getVerseRootWords(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

module.exports = router;