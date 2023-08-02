const PATH = require("path");
const {
  getIoCInfo
  } = require(PATH.join(__dirname, "..", "data", "ioc-db-service"));

  var getIoCPageInfo = async(req, res) =>{
    const response = await getIoCInfo(parseInt(req.body.start), parseInt(req.body.limit), req.body.iocQuery, req.body.mandatoryId);
    res.json(response);
  }

  module.exports = { getIoCPageInfo };
