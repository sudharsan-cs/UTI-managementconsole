const PATH = require("path");
const {
  getPhishingSearchInfoModel, getPhishingInfoModel
  } = require(PATH.join(__dirname, "..", "data", "phishing-db-service"));

  var getDataPhishingSearch = async(req, res) =>{
    const response = await getPhishingSearchInfoModel(parseInt(req.body.start), parseInt(req.body.limit), req.body.phishingSearch);
    res.json(response);
  }

  var getDataPhishingInfoSearch = async(req, res) =>{
    const response = await getPhishingInfoModel(parseInt(req.body.start), parseInt(req.body.limit), req.body.phishingInfo);
    res.json(response);
  }

  module.exports = { getDataPhishingSearch, getDataPhishingInfoSearch };
