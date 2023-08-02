"use strict";
const PATH = require("path");
require(PATH.join(__dirname, "..", "..", "utils", "mongo-connection"));
const SCHEMA = require("mongoose").Schema;
var iocModelObj = SCHEMA({
  "Phishing URL": {
    type: String,
  }
},  {
  collection: "phishingSearchInfoCollection",
});

module.exports = mongoDB.model("phishingSearchInfoCollection", iocModelObj);
