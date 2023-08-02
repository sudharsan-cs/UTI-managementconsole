const { log } = require("console");
const PATH = require("path");
var attributeModelObj = require(PATH.join(
  __dirname,
  "mongo-models",
  "attribute-model"
));

var prepareDomainReportBasedOnCategory = async function (categories) {
  return await attributeModelObj
    .aggregate([
      {
        $match: {
          $and: [
            {
              category: {
                $in: categories,
              },
            },
          ],
        },
      },
      {
        $group: {
          _id: {
            category: "$category",
          },
          count: {
            $sum: 1,
          },
        },
      },
      {
        $project: {
          category: "$_id.category",
          count: "$count",
          _id: 0,
        },
      },
    ])
    .then((data) => {
      return data;
    })
    .catch((error) => {
      return [];
    });
};

var prepareAttributeReport = async function (eventId, category) {
  var count = await getAttributesCntBasedOnEventId(eventId, category);
  var array = [];
  for (var idx = 0; idx < count; idx += 100) {
    var data = await getAttributesBasedOnEventId(eventId, idx, 100, category);
    data = JSON.parse(JSON.stringify(data));
    array = array.concat(data);
  }
  return array;
};

var getAttributesCntBasedOnEventId = async function (eventId, category) {
  try {
    return await attributeModelObj
      .countDocuments({ event_id: eventId, category: category })
      .then((cnt) => {
        return cnt;
      })
      .catch((error) => {
        console.log(error);
        return 0;
      });
  } catch (err) {
    console.log(error);
    return 0;
  }
};

var getAttributesBasedOnEventId = async function (
  eventId,
  start,
  limit,
  category
) {
  try {
    return await attributeModelObj
      .find({ event_id: eventId, category: category })
      .sort({ timestamp: -1 })
      .skip(start)
      .limit(limit)
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

var getEventsBasedonAttributesIds = async function (category) {
  try {
    return await attributeModelObj
      .aggregate([
        {
          $match: {
            $and: [
              {
                category: {
                  $in: category,
                },
              },
            ],
          },
        },
        {
          $sort: { timestamp: -1 },
        },
        {
          $group: {
            _id: "null",
            event_id: {
              $addToSet: "$event_id",
            },
          },
        },
      ])
      .allowDiskUse(true)
      .then((data) => {
        var ids = [];
        data[0].event_id.map((data) => {
          ids.push(parseInt(data));
        });
        ids.sort();
        return ids;
      })
      .catch((error) => {
        console.log(error);
        return {};
      });
  } catch (err) {
    console.log(err);
  }
};

var getAttributesCnt = async function () {
  try {
    return await attributeModelObj
      .count()
      .then((data) => {
        return data;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  } catch (err) {
    console.log(err);
  }
};

var getLastAttribute = async function () {
  try {
    return await attributeModelObj
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
    console.log(err);
  }
};

var bulkInsertAttributes = async function (eventList) {
  try {
    await attributeModelObj
      .insertMany(eventList)
      .then(() => {
        console.log("Bulk Attribute Data Inserted");
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAttributesCntBasedOnEventId,
  prepareAttributeReport,
  getAttributesBasedOnEventId,
  getEventsBasedonAttributesIds,
  bulkInsertAttributes,
  getAttributesCnt,
  getLastAttribute,
  prepareDomainReportBasedOnCategory,
};
