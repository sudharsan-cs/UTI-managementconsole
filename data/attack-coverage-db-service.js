const PATH = require("path");
var eventModelObj = require(PATH.join(
  __dirname,
  "mongo-models",
  "attack-coverage-mapping"
));

var getAttackCoverageMapData = async function (techID) {
  try {
    var query = {'TechniqueID': techID};
    return await eventModelObj
      .find(query)
      .then( (data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  } catch (error) {
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

var upadateAttackTechMapping = async function (malwareInfo) {
  const chunkSize = 500;
  for (let i = 0; i < malwareInfo.length; i += chunkSize) {
    const chunk = malwareInfo.slice(i, i + chunkSize);
    await bulkInsertEvents(chunk);
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

module.exports = { getAttackCoverageMapData, bulkInsertEvents, getEventCnt, getLastEvent, upadateAttackTechMapping };
