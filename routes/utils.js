const c = require("../model/utils");

function simpleResponse(result, response) {
    // A result takes the following format: { data: d, error: msg, success: pass, ecode: code }
    var success = result.success;
    var ecode = result.ecode;

    if (success) {
        response.status(200);
    } else if (ecode == c.errorEnum.SERVER) {
        response.status(500);
    } else if (ecode == c.errorEnum.UNIQUE || ecode == c.errorEnum.FOREIGN) {
        response.status(409);
    } else if (ecode == c.errorEnum.DNE) {
        response.status(404);
    } else if (ecode == c.errorEnum.INVALID) {
        response.status(400);
    } else {
        console.log("Could not set a valid response status.")
    }
    response.json(result)
    return true;
}

module.exports = {
    simpleResponse: simpleResponse
}