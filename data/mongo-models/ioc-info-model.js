'use strict'
const PATH = require('path');
require(PATH.join(__dirname, '..', '..', 'utils', 'mongo-connection'));
const SCHEMA = require('mongoose').Schema;

var malwareModelObj = SCHEMA({
  "ioc_value": {
    type: String
  },
  "ioc_type":{
    type: String
  },
  "threat_type": {
    type: String
  },
  "malware":{
    type: String
  },
  "malware_alias": {
    type: String
  },
  "malware_printable": {
    type: String
  },
  "first_seen_utc": {
    type: String
  },
  "last_seen_utc": {
    type: String
  },
  "confidence_level": {
    type: Number
  },
  "reference": {
    type: String
  },
  "tags": {
    type: String
  },
  "anonymous": {
    type: String
  },
  "reporter": {
    type: String
  },
  "_id": {
    type: String
  }
}, {
  collection: 'iocCollection'
});

module.exports = mongoDB.model('iocCollection', malwareModelObj)