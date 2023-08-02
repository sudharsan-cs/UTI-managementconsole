const { log } = require("console");
const PATH = require("path");
var iocModelObj = require(PATH.join(
  __dirname,
  "mongo-models",
  "ioc-info-model"
));

var getIoCInfo = async function (start, limit, iocQuery, mandatoryId) {
  try {
    var query = {};
    if (iocQuery) {
      query = {
        $or: [
          { ioc_value: { $regex: iocQuery } },
          { ioc_type: { $regex: iocQuery } },
          { threat_type: { $regex: iocQuery } },
          { malware: { $regex: iocQuery } },
          { malware_alias: { $regex: iocQuery } },
          { malware_printable: { $regex: iocQuery } },
          { first_seen_utc: { $regex: iocQuery } },
          { last_seen_utc: { $regex: iocQuery } },
          { reference: { $regex: iocQuery } },
          { tags: { $regex: iocQuery } },
          { anonymous: { $regex: iocQuery } },
          { reporter: { $regex: iocQuery } },
        ],
      };
    }
    if (mandatoryId) {
      query = {
        $and: [
          {
            $or: [
              { ioc_value: { $regex: mandatoryId } },
              { ioc_type: { $regex: mandatoryId } },
              { threat_type: { $regex: mandatoryId } },
              { malware: { $regex: mandatoryId } },
              { malware_alias: { $regex: mandatoryId } },
              { malware_printable: { $regex: mandatoryId } },
              { first_seen_utc: { $regex: mandatoryId } },
              { last_seen_utc: { $regex: mandatoryId } },
              { reference: { $regex: mandatoryId } },
              { tags: { $regex: mandatoryId } },
              { anonymous: { $regex: mandatoryId } },
              { reporter: { $regex: mandatoryId } },
            ],
          },
          {
            $or: [
              { ioc_value: { $regex: iocQuery } },
              { ioc_type: { $regex: iocQuery } },
              { threat_type: { $regex: iocQuery } },
              { malware: { $regex: iocQuery } },
              { malware_alias: { $regex: iocQuery } },
              { malware_printable: { $regex: iocQuery } },
              { first_seen_utc: { $regex: iocQuery } },
              { last_seen_utc: { $regex: iocQuery } },
              { reference: { $regex: iocQuery } },
              { tags: { $regex: iocQuery } },
              { anonymous: { $regex: iocQuery } },
              { reporter: { $regex: iocQuery } },
            ],
          },
        ],
      };
    }
    return await iocModelObj
      .find(query)
      .sort({ first_seen: -1 })
      .skip(start)
      .limit(limit)
      .then((data) => {
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

module.exports = {
  getIoCInfo,
};
