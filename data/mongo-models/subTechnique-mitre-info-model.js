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
    Name:{
      type: String
    }
  },
  {
    collection: "subTechniqueMalwareCollection",
  }
);

module.exports = mongoDB.model("subTechniqueMalwareCollection", iocModelObj);
