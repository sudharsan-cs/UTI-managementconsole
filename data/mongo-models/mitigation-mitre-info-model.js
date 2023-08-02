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
    Mitigation:{
      type: String
    },
    Description:{
      type: String
    }
  },
  {
    collection: "mitigationMalwareCollection",
  }
);

module.exports = mongoDB.model("mitigationMalwareCollection", iocModelObj);
