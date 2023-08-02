"use strict";
const PATH = require("path");
require(PATH.join(__dirname, "..", "..", "utils", "mongo-connection"));
const SCHEMA = require("mongoose").Schema;

var iocModelObj = SCHEMA(
  {
    "TechniqueID": {
      type: String
    },
    "Tactics":{
      type: String
    },
    "Description": {
      type: String
    }
  },
  {
    collection: "attackCoverageMapping",
  }
);

module.exports = mongoDB.model("attackCoverageMappingCollection", iocModelObj);
