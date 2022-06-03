const utils = require("./utils");
const fs = require("fs");
const { FORMERR } = require("dns");

async function insertMeanings(data) {
    var sql =
        "INSERT INTO RootMeaning (RootWord, Meanings) VALUES ($1, $2) RETURNING *;";
    var params = [data.word, data.meanings];
    return await utils.create(
        sql,
        params,
        new utils.Message({ success: "Successfully inserted a word meaning." })
    );
}

let rawdata = fs.readFileSync("../root_meanings.json");
let meanings = JSON.parse(rawdata);
let words = Object.keys(meanings);
let data;
for (var m = 0; m < words.length; m++) {
    data = { word: words[m], meanings: meanings[words[m]] };
    // console.log("inserting stuff")
    console.log(insertMeanings(data));
}
