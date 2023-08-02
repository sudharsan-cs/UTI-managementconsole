"use strict";
const PATH = require("path");
require(PATH.join(__dirname, "..", "..", "utils", "mongo-connection"));
const SCHEMA = require("mongoose").Schema;

var iocModelObj = SCHEMA(
  {
    _id: {
      type: String
    },
    ID: {
      type: String
    },
    "Sub-techniqueof":{
      type: String
    },
    Tactic: {
      type: String
    },
    Platforms: {
      type: String
    },
    Contributors: {
      type: String
    },
    Version: {
      type: String
    },
    Created: {
      type: String
    },
    LastModified: {
      type: String
    },
    Description: {
      type:String
    },
    mappingData: {
      type: Object
    },
  },
  {
    collection: "techniqueMalwareCollection",
  }
);

module.exports = mongoDB.model("techniqueMalwareCollection", iocModelObj);
