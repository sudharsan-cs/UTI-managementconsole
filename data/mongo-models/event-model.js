'use strict'
const PATH = require('path');
require(PATH.join(__dirname, '..', '..', 'utils', 'mongo-connection'));
const SCHEMA = require('mongoose').Schema;

var eventModelObj = SCHEMA({
  _id: {
    type: String
  },
  id: {
    type: String
  },
  orgc_id: {
    type: String
  },
  date: {
    type: String
  },
  threat_level_id: {
    type: String
  },
  info: {
    type: String
  },
  published: {
    type: String
  },
  uuid: {
    type: String
  },
  attribute_count: {
    type: String
  },
  analysis: {
    type: String
  },
  distribution: {
    type: String
  },
  timestamp: {
    type: String
  },
  proposal_email_lock: {
    type: Boolean
  },
  locked: {
    type: Boolean
  },
  publish_timestamp: {
    type: String
  },
  sharing_group_id: {
    type: String
  },
  disable_correlation: {
    type: Boolean
  },
  extends_uuid: {
    type: String
  },
  protected: {
    type: String
  },
  event_creator_email: {
    type: String
  },
  Org: {
    type: Object
  }
}, {
  collection: 'eventsCollection'
});

module.exports = mongoDB.model('eventsCollection', eventModelObj)
