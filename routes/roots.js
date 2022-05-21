const router = require("express").Router();
const lesson = require("../model/lesson");
const utils = require("./utils");

/*
 * @api [get] /lessons
 *  summary: "Filter lessons"
 *  description: "This fetch acts as a filter based on the given query params. If none are given, then all params are fetched. Operator must be one of: eq, gt, lt, gte, or lte."
 *  tags:
 *    - Lesson Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: query
 *        name: property
 *        type: string
 *        required: false
 *        example: 'lesson_date'
 *      - in: query
 *        name: operator
 *        type: string
 *        required: false
 *        example: 'eq'
 *      - in: query
 *        name: value
 *        type: string
 *        required: false
 *        example: '2021-5-28'
 *  responses:
 *    200:
 *      description: A list of lessons.
 *      schema:
 *        type: array
 *        items:
 *          $ref: '#/definitions/Lesson'
 *    404:
 *      description: No lessons found.
 *
 */
router.get("/lessons", async (request, response) => {
    await lesson.filterLessons(request.query).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [get] /lesson/{lesson_id}
 *  summary: "Fetch a lesson by ID"
 *  description: "This is a general fetch and has no parameters. It will fetch all of the lessons in the database."
 *  tags:
 *    - Lesson Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *      - in: path
 *        name: lesson_id
 *        type: integer
 *        required: true
 *        example: 1
 *  responses:
 *    200:
 *      description: The corresponding lesson.
 *      schema:
 *          $ref: '#/definitions/Lesson'
 *    404:
 *      description: No lessons found with that ID.
 *
 */
router.get("/lesson/:lesson_id", async (request, response) => {
    await lesson.getLessonById(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [post] /lesson
 *  summary: "Create a lesson"
 *  tags:
 *    - Lesson Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the lesson to update and it's new attributes
 *          schema:
 *              $ref: '#/definitions/Lesson'
 *  responses:
 *    200:
 *      description: Lesson has been created.
 *
 */
router.post("/lesson", async (request, response) => {
    await lesson.createLesson(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [patch] /lesson
 *  summary: "Update a lesson"
 *  tags:
 *    - Lesson Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the lesson to update and it's new attributes
 *          schema:
 *              $ref: '#/definitions/Lesson'
 *  responses:
 *    200:
 *      description: Lesson has been updated.
 *    404:
 *      description: Could not find a lesson with that id.
 *
 */
router.patch("/lesson", async (request, response) => {
    await lesson.updateLesson(request.body).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

/*
 * @api [delete] /lesson
 *  summary: "Delete a lesson"
 *  tags:
 *    - Lesson Endpoints
 *  produces:
 *    - application/json
 *  parameters:
 *        - in: body
 *          name: id
 *          description: the lesson to be deleted
 *          schema:
 *              $ref: '#/definitions/Lesson'
 *  responses:
 *    200:
 *      description: The Lesson has been deleted.
 *      schema:
 *          $ref: '#/definitions/Lesson'
 *    404:
 *      description: Could not find a lesson with that id.
 *
 */
router.delete("/lesson/:lesson_id", async (request, response) => {
    await lesson.deleteLesson(request.params).then(async function (result) {
        return utils.simpleResponse(result, response);
    });
});

module.exports = router;