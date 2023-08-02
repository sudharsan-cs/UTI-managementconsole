'use strict'
const PATH = require('path');
require(PATH.join(__dirname, '..', '..', 'utils', 'mongo-connection'));
const SCHEMA = require('mongoose').Schema;

var attributeModelObj = SCHEMA({
  _id: {
    type: String
  },
  id: {
    type: Number
  },
  Event: {
    type: Object
  },
  value: {
    type: String
  },
  last_seen: {
    type: String
  },
  first_seen: {
    type: String
  },
  disable_correlation: {
    type: String
  },
  deleted: {
    type: Boolean
  },
  comment: {
    type: String
  },
  sharing_group_id: {
    type: String
  },
  distribution: {
    type: String
  },
  timestamp: {
    type: String
  },
  uuid: {
    type: String
  },
  to_ids: {
    type: Boolean
  },
  type: {
    type: String
  },
  category: {
    type: String
  },
  object_relation: {
    type: String
  },
  object_id: {
    type: String
  },
  event_id: {
    type: String,
    index: true
  }
}, {
  collection: 'attributesCollection'
});

module.exports = mongoDB.model('attributesCollection', attributeModelObj)
