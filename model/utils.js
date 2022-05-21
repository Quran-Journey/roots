const db = require("./db");

// Error codes
const errorEnum = {
    NONE: 0,
    UNIQUE: 1,
    SERVER: 2,
    DNE: 3,
    INVALID: 4,
    FOREIGN: 5,
};

// This is a constant response return format so that all of our responses have the same format.
function setResult(d, pass, msg, code) {
    console.log(msg);
    return { data: d, success: pass, error: msg, ecode: code };
}

/** Simply prepare an response for invalid inputs */
function returnInvalid(msg) {
    return utils.setResult({}, false, msg, utils.errorEnum.INVALID);
}

/**
 * This class represents messages that will be returned as errors or to the user.
 * Either the values are passed into the options object, or they are set to the default values
 */
class Message {
    constructor(options) {
        this.success = options.success || "Successfully fetched rows.";
        this.none = options.none || "No rows found.";
        this.server = options.server || "An error occured in the PSQL server.";
        this.duplicate = options.duplicate || "Duplicate.";
        this.foreign = options.foreign || "Violating foreign key constraint.";
    }
}

const defaultMsg = new Message({});

/**
 * Check to see if the values of a request body are empty.
 * This is a helper function for checkBody
 */
function checkEmptyBody(data) {
    var keys = Object.keys(data);
    if (keys.length == 0) {
        return setResult(
            {},
            false,
            "Request data is empty.",
            errorEnum.INVALID
        );
    }
    for (var i = 0; i < keys.length; i++) {
        if (!keys[i]) {
            return setResult(
                data,
                false,
                "data is missing atleast one key, value pair.",
                errorEnum.INVALID
            );
        }
    }
    return;
}

// Regex for the different data types that can be stored
const dataTypeRegex = {
    time: /^(?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/,
    date: /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/,
    datetime:
        /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01]) (?:(?:([01]?\d|2[0-3]):)?([0-5]?\d):)?([0-5]?\d)$/,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]+$/,
    phone: /(\+\d{1,3}\s?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?||.?))(\d{3}(\s|-?|.?))(\d{4})(\s?(([E|e]xt[:|.|]?)|x|X)(\s?\d+))?/,
    string: /.*/,
    bool: /([Tt][Rr][Uu][Ee]|[Ff][Aa][Ll][Ss][Ee])/, //I made this one myself, tested it as well.
    integer: /\d+/, //I made this one myself, not tested.
    list: "ignore",
};

/**
 * This function uses regular expressions to check if the body's values are of the correct type.
 *
 * @param {Object[key, type]} required
 */
function checkBodyTypes(data, required) {
    var keys = Object.keys(required);
    for (var i = 0; i < Object.keys(required).length; i++) {
        var key = keys[i];
        var type = required[key];
        var value = data[key];
        if (value == undefined) {
            return setResult(
                data,
                false,
                "Undefined value set for: " + key,
                errorEnum.INVALID
            );
        }
        if (
            dataTypeRegex[type] &&
            dataTypeRegex[type] != "ignore" &&
            !dataTypeRegex[type].test(value)
        ) {
            // If the regex test fails, this implies that the formatting is incorrect.
            return setResult(
                data,
                false,
                "Invalid value set for: " + key,
                errorEnum.INVALID
            );
        }
    }
    return;
}

/**
 * This function uses checks to see if the body's keys are named correctly.
 *
 * @param {Object[key, type]} required
 * @param {bool} print
 */

function checkBodyKeys(data, required, p = true) {
    var keys = Object.keys(data);
    var requiredKeys = Object.keys(required);
    for (var i = 0; i < Object.keys(requiredKeys).length; i++) {
        if (!keys[i] || !keys.includes(requiredKeys[i])) {
            if (p) {
                console.log(
                    "Invalid: data is missing the key: " + requiredKeys[i]
                );
            }
            return setResult(
                data,
                false,
                "data is missing the key: " + requiredKeys[i],
                errorEnum.INVALID
            );
        }
    }
    return;
}

/**
 * This function does some simple validation of the formats.
 * It uses helper functions to ensure that the data is not missing any parameters,
 * that the data includes the required keys.
 *
 * @param {Object} data
 * The request body
 * @param {List[String]} params
 * The keys that should be in the body
 * @param {List[String]} types
 * The types of the values that should be in the parameters
 */
function checkBody(data, required, p = true) {
    var empty = checkEmptyBody(data);
    if (empty) {
        return empty;
    }
    var empty = checkBodyKeys(data, required, p);
    if (empty) {
        return empty;
    }
    var empty = checkBodyTypes(data, required);
    if (empty) {
        return empty;
    }
    return;
}

/** A function that gets us a string representation of an operator based on a string
 *
 * @param {string} operator
 * The string representation of the operator
 */
function getOperator(operator) {
    switch (operator) {
        case "eq":
            return "=";
        case "gt":
            return ">";
        case "lt":
            return "<";
        case "gte":
            return ">=";
        case "lte":
            return "<=";
        default:
            return false;
    }
}

/**
----------------------------------------------------------------------------------
THE FOLLOWING FUNCTIONS IMPLEMENT THE DIFFERENT VARIATIONS OF THE CRUD OPERATIONS.
----------------------------------------------------------------------------------
*/

/**
 * This function prepares a generic row fetch based on the inputs.
 * This function can fetch none, one, or more rows based on an sql command and passed in parameters.
 * It also takes ina message object which contains three
 *
 * @param {String} sql
 * @param {List[String]} params
 * @param {Message} message
 */
async function retrieve(sql, params = [], message = defaultMsg) {
    console.log(
        "-- The following query is being executed --\n sql: " +
            sql +
            "\n params: " +
            params
    );
    return await db
        .query(sql, params)
        .then((result) => {
            if (result.rows[0] == null) {
                return setResult([], false, message.none, errorEnum.DNE);
            }
            return setResult(
                result.rows,
                true,
                message.success,
                errorEnum.NONE
            );
        })
        .catch((e) => {
            console.log("\nERROR!\n", e);
            return setResult([], false, message.server, errorEnum.SERVER);
        });
}

/**
 * This function prepares a generic row update based on the inputs.
 * This function can update none, one, or more rows based on an sql command and passed in parameters.
 *
 * @param {String} sql
 * @param {List[String]} params
 * @param {Message} message
 */
async function update(sql, params = [], message = defaultMsg) {
    // Note: Should all update calls must return all columns (i.e. RETURNING *)?
    console.log(
        "-- The following query is being executed --\n sql: " +
            sql +
            "\n params: " +
            params
    );
    return await db
        .query(sql, params)
        .then((result) => {
            if (result.rows[0] == null) {
                return setResult({}, false, message.none, errorEnum.DNE);
            }
            return setResult(
                result.rows,
                true,
                message.success,
                errorEnum.NONE
            );
        })
        .catch((e) => {
            console.log("\nUpdate error!\n", e);
            return setResult({}, false, message.server, errorEnum.SERVER);
        });
}

/**
 * This function acts as a generic insert into the database.
 *
 * @param {String} sql
 * @param {List[String]} params
 * @param {Message} message
 */
async function create(sql, params = [], message = defaultMsg) {
    // Note: Should all update calls must return all columns (i.e. RETURNING *)?
    console.log(
        "-- The following query is being executed --\n sql: " +
            sql +
            "\n params: " +
            params
    );
    return await db
        .query(sql, params)
        .then((result) => {
            if (result.rows[0] == null) {
                // Items were not inserted, but an error was not raised. Be confused.
                console.log("\n!Nothing was inserted!\n");
                return setResult({}, false, message.none, errorEnum.DNE);
            }
            // Succesfully inserted items.
            console.log("\nSuccess!\n");
            return setResult(
                result.rows,
                true,
                message.success,
                errorEnum.NONE
            );
        })
        .catch((e) => {
            if (e.code == "23505") {
                // This implies we are inserting something that violates a unique key constraint
                console.log("\n!Creation Failure: Duplicate!\n");
                return setResult(
                    {},
                    false,
                    message.duplicate,
                    errorEnum.UNIQUE
                );
            }
            if (e.code == "42601") {
                // This implies we are inserting something that violates a unique key constraint
                console.log(
                    "\n!Creation Failure: Improper number of parameters passed in!\n"
                );
                return setResult(
                    {},
                    false,
                    "Improper number of parameters passed in.",
                    errorEnum.INVALID
                );
            }
            if (e.code == "23503") {
                // This implies we are inserting something that violates a unique key constraint
                console.log("\n!Creation Failure: Foreign Key Constraints!\n");
                return setResult({}, false, message.foreign, errorEnum.FOREIGN);
            }
            // There was an uncaught error due to our query.
            console.log("\n!Creation error!\n", message.server, e);
            return setResult({}, false, message.server, errorEnum.SERVER);
        });
}

/**
 * NOTE: this implements the based delete operation, but we cannot call it delete in js
 * This function prepares a generic row deletion based on the inputs.
 * This function can delete none, one, or more rows based on an sql command and passed in parameters.
 *
 * @param {String} sql
 * @param {List[String]} params
 * @param {Message} message
 */
async function remove(sql, params = [], message = defaultMsg) {
    // Note: Should all update calls must return all columns (i.e. RETURNING *)?
    console.log(
        "-- The following query is being executed --\n sql: " +
            sql +
            "\n params: " +
            params
    );
    return await db
        .query(sql, params)
        .then((result) => {
            if (result.rows[0] == null) {
                return setResult({}, false, message.none, errorEnum.DNE);
            }
            return setResult(
                result.rows,
                true,
                message.success,
                errorEnum.NONE
            );
        })
        .catch((e) => {
            console.log("\n!Deletion error!\n", message.server, e);
            return setResult({}, false, message.server, errorEnum.SERVER);
        });
}

module.exports = {
    retrieve: retrieve,
    update: update,
    create: create,
    remove: remove,
    setResult: setResult,
    getOperator: getOperator,
    simpleValidation: checkBody,
    errorEnum: errorEnum,
    Message: Message,
};