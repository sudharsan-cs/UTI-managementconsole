const PATH = require("path");

const { printPdf } = require(PATH.join(
  __dirname,
  "..",
  "utils",
  "pdf-generator"
));
const { getEventIdsInBatch, prepareDomainReportBasedOnCategory } = require(PATH.join(
  __dirname,
  "..",
  "data",
  "event-db-service"
));
const { getEventsBasedonAttributesIds, getAttributesCntBasedOnEventId } = require(PATH.join(
  __dirname,
  "..",
  "data",
  "attribute-db-service"
));


var getEventIdBasedOnCategory = async(req, res) =>{
  const response = await getEventsBasedonAttributesIds(req.body.categories);
  res.json(response);
}

var getEventsBasedOnEventIds = async(req, res) => {
    let response = await getEventIdsInBatch(req.body.eventIds);
    response = JSON.parse(JSON.stringify(response));
    await Promise.all(response.map(async(event, idx)=>{
      var cnt = await getAttributesCntBasedOnEventId(event.id, req.body.category);
      response[idx].attributeCnt = cnt;
    }));
    res.json(response);
}

module.exports = { getEventsBasedOnEventIds, getEventIdBasedOnCategory };
