const { error } = require("console");
const PATH = require("path");
var eventModelObj = require(PATH.join(
  __dirname,
  "mongo-models",
  "event-model"
));
const {
  getAttributesCntBasedOnEventId
} = require(PATH.join(__dirname, "..", "data", "attribute-db-service"));

var getEventIdsInBatch = async function (eventIds) {
  try {
    return await eventModelObj
      .find({ id: { $in: eventIds } })
      .sort({ id: -1 })
      .then(async(data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  } catch (err) {
    console.log(error);
  }
};

var getEventCnt = async function () {
  try {
    return await eventModelObj
      .count()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  } catch (err) {
    console.log(error);
  }
};

var getLastEvent = async function () {
  try {
    return await eventModelObj
      .findOne()
      .sort({ id: -1 })
      .limit(1)
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  } catch (err) {
    console.log(error);
  }
};

var bulkInsertEvents = async function (eventList) {
  try {
    await eventModelObj
      .insertMany(eventList)
      .then(() => {
        console.log("bulk Data inserted");
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  } catch (err) {
    console.log(error);
  }
};

module.exports = {
  getEventIdsInBatch,
  bulkInsertEvents,
  getEventCnt,
  getLastEvent
};
