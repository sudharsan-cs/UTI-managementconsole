"use strict";
const PATH = require("path");
require(PATH.join(__dirname, "..", "..", "utils", "mongo-connection"));
const SCHEMA = require("mongoose").Schema;

var iocModelObj = SCHEMA(
  {
    _id: {
      type: String
    },
    ID:{
      type: String
    },
    "Data Component":{
      type: String
    },
    Detects:{
      type: String
    }
  },
  {
    collection: "detectionMalwareCollection",
  }
);

module.exports = mongoDB.model("detectionMalwareCollection", iocModelObj);
