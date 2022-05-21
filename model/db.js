require('dotenv').config();
const Client = require("pg").Client;

const config = {
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    database: process.env.POSTGRES_DB,
};
let db = new Client(config);

async function connect_to_db() {
    let retries = 5;
    while (retries) {
        db = new Client(config);
        await db
            .connect()
            .then(() => {
                console.log("Connected to db successfully");
                retries = 0;
                return;
            })
            .catch(async (err) => {
                console.log("Could not connect to db, retrying", err);
                retries--;
                console.log(`retries left: ${retries}`);
                // wait 5 seconds
                await new Promise((res) => setTimeout(() => res(), 3000));
            });
    }
}

connect_to_db();

module.exports = db;