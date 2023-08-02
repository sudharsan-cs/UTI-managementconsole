const { log } = require("console");
const PATH = require("path");
var phishingInfoModel = require(PATH.join(
  __dirname,
  "mongo-models",
  "phishing-info-model"
));
var phishingSearchInfoModel = require(PATH.join(
  __dirname,
  "mongo-models",
  "phishing-search-model"
));

var getPhishingInfoModel = async function (start, limit, searchQuery) {
  try {
    var query = {};
    if (searchQuery) {
      query = {
        $or: [
          { "Phishing URL": { $regex: searchQuery } },
          { "Targeted Brand": { $regex: searchQuery } },
        ],
      };
    }
    return await phishingInfoModel
      .find(query)
      .sort({})
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

var getPhishingSearchInfoModel = async function (start, limit, searchQuery) {
  try {
    var query = {};
    if (searchQuery) {
      query = {
        $or: [{ "Phishing URL": { $regex: searchQuery } }],
      };
    }
    return await phishingSearchInfoModel
      .find(query)
      .sort({})
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
  getPhishingInfoModel,
  getPhishingSearchInfoModel
};
