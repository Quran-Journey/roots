const utils = require("./utils");

// Note: this list contains key value pairs of the attribute and types within the schema.
const attributes = {
    lesson_id: "integer",
    lesson_date: "date",
    source: "string",
};

/**
 *  @schema Lesson
 *  type: object
 *  required:
 *      - lesson_id
 *      - lesson_date
 *      - source
 *  properties:
 *      lesson_id:
 *          type: integer
 *          description: to identify the lesson from others
 *          example: 1
 *      lesson_date:
 *          type: date
 *          description: to identify the day that the lesson was taught
 *          example: 2021-10-30
 *      source:
 *          type: string
 *          description: a URL to the lesson recording
 *          example: "https://www.facebook.com/watch/live/?ref=watch_permalink&v=244235014324418"
 */
async function createLesson(data) {
    // Frontend note: also add a feature where we guess that the
    //  lesson's date is the next saturday after the last lesson's date
    var invalid = utils.simpleValidation(data, {
        lesson_date: "date",
        source: "string",
    });
    if (invalid) {
        return invalid;
    }
    var sql =
        "INSERT INTO Lesson (source, lesson_date) VALUES ($1, $2) RETURNING *;";
    var params = [data.source, data.lesson_date];
    return await utils.create(
        sql,
        params,
        new utils.Message({ success: "Successfully created a lesson." })
    );
}

/**
 *  This is where we actually filter our values.
 *  Properties must be a string representing one of the table columns.
 *  Operator must be one of: eq, gt, lt, gte, or lte.
 *  Value is the value we are filtering by.
 */
async function filterLessons(data) {
    var invalid = utils.simpleValidation(data, {
        property: "string",
        operator: "string",
    });
    if (invalid) {
        return await utils.retrieve(
            "SELECT * FROM Lesson;",
            [],
            new utils.Message({
                success: `Fetched all lessons since no query was properly defined.`,
            })
        );
    } else {
        if (!Object.keys(attributes).includes(data.property)) {
            // This check is done to avoid SQL injection.
            return utils.returnInvalid(
                `${property} is not an attribute of the Lesson type.`
            );
        }
        invalid = utils.simpleValidation(data, {
            value: attributes[data.property],
        });
        if (invalid) {
            return invalid;
        }
        let sql = `SELECT * FROM Lesson WHERE ${data.property}`;
        let op = utils.getOperator(data.operator);
        if (op) {
            sql = sql + `${op}$1;`;
        } else {
            // If the operator is invalid, then we must notify the client.
            utils.returnInvalid(
                `Operator was not set correctly. Operator must be one of: eq, gt, lt, gte, or lte.`
            );
        }
        var params = [data.value];
        return await utils.retrieve(
            sql,
            params,
            new utils.Message({
                success: `Successfully fetched lessons based on filter ${data.property} ${op} ${data.value}.`,
            })
        );
    }
}

/** Fetches lessons based on a specific filter (i.e. id, date) */
async function getLessonById(data) {
    var invalid = utils.simpleValidation(data, {
        lesson_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "SELECT * FROM Lesson WHERE lesson_id=$1";
    var params = [data.lesson_id];
    return await utils.retrieve(
        sql,
        params,
        new utils.Message({
            success: `Successfully fetched lesson with id ${data.lesson_id}.`,
        })
    );
}

/** Update a lesson, requires all attributes of the lesson. */
async function updateLesson(data) {
    var invalid = utils.simpleValidation(data, {
        lesson_id: "integer",
        lesson_date: "date",
        source: "string",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "UPDATE Lesson SET source=$2, lesson_date=$3 WHERE lesson_id=$1";
    var params = [data.lesson_id, data.source, data.lesson_date];
    return await utils.update(
        sql,
        params,
        new utils.Message({
            success: `Successfully update lesson with id ${data.lesson_id}.`,
            none: `Could not find a lesson with id ${data.lesson_id}.`,
        })
    );
}

/** Update a lesson, requires all attributes of the lesson. */
async function deleteLesson(data) {
    var invalid = utils.simpleValidation(data, {
        lesson_id: "integer",
    });
    if (invalid) {
        return invalid;
    }
    let sql = "DELETE FROM Lesson WHERE lesson_id=$1 RETURNING *;";
    var params = [data.lesson_id];
    return await utils.remove(
        sql,
        params,
        new utils.Message({
            success: `Successfully deleted lesson with id ${data.lesson_id}.`,
            none: `Could not find a lesson with id ${data.lesson_id}.`,
        })
    );
}

module.exports = {
    filterLessons: filterLessons,
    getLessonById: getLessonById,
    createLesson: createLesson,
    updateLesson: updateLesson,
    deleteLesson: deleteLesson,
};