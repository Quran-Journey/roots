require("dotenv");
const https = require("https");
const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const roots = require("./routes/roots");

var port = 3001;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(async (req, res, next) => {
  console.log(`\nEndpoint Hit: ${req.method} ${req.originalUrl}\n`);
  next();
});

app.use("/api", roots);

if (process.env.NODE_ENV == "production") {
  // This sets the options for https so that it finds the ssl certificates
  var privateKey = fs.readFileSync(
    "/etc/letsencrypt/live/offlinequran.org-0001/privkey.pem"
  );
  var certificate = fs.readFileSync(
    "/etc/letsencrypt/live/offlinequran.org-0001/cert.pem"
  );
  var chain = fs.readFileSync(
    "/etc/letsencrypt/live/offlinequran.org-0001/fullchain.pem"
  );
  const httpsOptions = {
    cert: certificate,
    key: privateKey,
    ca: chain,
  };

  var httpsServer = https.createServer(httpsOptions, app).listen(port, () => {
    console.log("Serving on https");
  });
} else if (process.env.NODE_ENV == "development") {
  app.listen(port, () => {
    console.log("Listening on port " + port);
  });
}
