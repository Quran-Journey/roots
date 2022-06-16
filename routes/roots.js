const router = require("express").Router();
const lesson = require("../model/roots");
const utils = require("./utils");

/*
 * @api [get] /chapters
 *  summary: "Get Chapters"
 *  description: "Fetch an ordered list of all of the english names of the chapters in the Quran."
 *  tags:
 *    - Root Endpoints
 *  produces:
 *    - application/json
 *  responses:
 *    200:
 *      description: An ordered list of chapters with their names and sura_numbers.
 *      schema:
 *        type: array
 *        items:
 *          $ref: '#/definitions/Chapter'
 *
 */
router.get("/chapters", async (request, response) => {
    await lesson.getChapters().then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [get] /chapter/{sura_number}
 *  summary: "Get Chapter Verses"
 *  description: "Fetches the verses of a chapter"
 *  tags:
 *    - Root Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: query
 *        name: sura_number
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: A list of the verses in a chapter.
 *      schema:
 *        type: array
 *        items:
 *          $ref: '#/definitions/Verse'
 *    404:
 *      description: No chapter with that ID found.
 *
 */
router.get("/chapter/:sura_number", async (request, response) => {
    await lesson.getChapterVerses(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [get] /verse/{verse_id}
 *  summary: "Get a Verse's root words"
 *  description: "Fetches the root words and their meanings for each of the words in a verse."
 *  tags:
 *    - Root Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: query
 *        name: verse_id
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: A list of the root words and their meanings pertaining to each word in a verse.
 *      schema:
 *        type: array
 *        items:
 *          $ref: '#/definitions/RootWord'
 *    404:
 *      description: No verse with that ID found.
 *
 */
router.get("/verse/:verse_id", async (request, response) => {
    await lesson
        .getVerseRootWords(request.params)
        .then(async function (result) {
            return utils.simpleResponse(result, response);
        });
});

module.exports = router;
