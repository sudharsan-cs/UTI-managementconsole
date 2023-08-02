"use strict";
const PATH = require("path");
require(PATH.join(__dirname, "..", "..", "utils", "mongo-connection"));
const SCHEMA = require("mongoose").Schema;
var iocModelObj = SCHEMA({
  "Phishing URL": {
    type: String,
  },
  "Targeted Brand": {
    type: String
  },
  "Time": {
    type: String
  }
},  {
  collection: "phishingInfoCollection",
});

module.exports = mongoDB.model("phishingInfoCollection", iocModelObj);
