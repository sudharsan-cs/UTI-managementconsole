const PATH = require("path");
const FS = require("fs");
const EXEC = require("child-process-promise").exec;
const APPCONFIG = require(PATH.join(__dirname, "..", "config", "config.json"));
const SHELL = require("shelljs");
const { printPdf } = require(PATH.join(
  __dirname,
  "..",
  "utils",
  "pdf-generator"
));

const { getEventIdsInBatch } = require(PATH.join(
  __dirname,
  "..",
  "data",
  "event-db-service"
));

const {
  getAttributesBasedOnEventId,
  prepareAttributeReport,
  prepareDomainReportBasedOnCategory,
  getAttributesCntBasedOnEventId,
  getEventsBasedonAttributesIds
} = require(PATH.join(__dirname, "..", "data", "attribute-db-service"));

var getAttributesBasedOnEventIds = async (req, res) => {
  const response = await getAttributesBasedOnEventId(
    parseInt(req.body.eventId),
    parseInt(req.body.start),
    parseInt(req.body.limit),
    req.body.category
  );
  res.json(response);
};

var downloadDomainReportBasedOnCategory = async (req, res) => {
  var datarecords = await prepareDomainReportBasedOnCategory(
    APPCONFIG["domain"][req.body.domain]
  );

  var chartData = {
    categories: [],
    data: [],
  };
  datarecords.map((data) => {
    chartData["categories"].push(data["category"]);
    chartData["data"].push(data["count"]);
  });
  const DIR = __dirname + "/../template/tmp/" + new Date().getTime();
  await EXEC("mkdir " + DIR);
  await EXEC("chmod -R 777 " + DIR);
  var buildPathHtml = DIR + "/domain-hl-report.html";
  const buildPathPdf = DIR + "/domain-hl-report.pdf";

  await SHELL.cp(
    "-R",
    __dirname + "/../template/domain-hl-report.html",
    buildPathHtml
  );
  await EXEC("chmod -R 777 " + buildPathHtml);

  SHELL.sed("-i", "dataValue", JSON.stringify(chartData), buildPathHtml);
  SHELL.sed("-i", "DomainValue", "Domain - " + req.body.domain, buildPathHtml);
  const pdf = await printPdf(buildPathHtml);
  FS.writeFileSync(buildPathPdf, pdf);
  FS.readFile(buildPathPdf, (err, data) => {
    res.contentType("application/pdf");
    res.send(data);
  });
};

var downloadEventsBasedOnDomainAndCategory = async (req, res) => {
  const event_ids = await getEventsBasedonAttributesIds([req.body.category]);
  let response = await getEventIdsInBatch(event_ids);
  response = JSON.parse(JSON.stringify(response));
  await Promise.all(response.map(async(event, idx)=>{
    var cnt = await getAttributesCntBasedOnEventId(event.id, req.body.category);
    response[idx].attributeCnt = cnt;
  }));
  const datarecords = response;
  const DIR = __dirname + "/../template/tmp/" + new Date().getTime();
  await EXEC("mkdir " + DIR);
  await EXEC("chmod -R 777 " + DIR);
  var buildPathHtml = DIR + "/summary.html";
  const buildPathPdf = DIR + "/summary.pdf";

  await SHELL.cp(
    "-R",
    __dirname + "/../template/summary.html",
    buildPathHtml
  );
  await EXEC("chmod -R 777 " + buildPathHtml);

  SHELL.sed("-i", "dataValue", JSON.stringify(datarecords), buildPathHtml);
  SHELL.sed("-i", "DomainValue", "Domain - " + req.body.domain, buildPathHtml);
  SHELL.sed(
    "-i",
    "CategoryValue",
    "Category - " + req.body.category,
    buildPathHtml
  );
  const pdf = await printPdf(buildPathHtml);
  FS.writeFileSync(buildPathPdf, pdf);
  FS.readFile(buildPathPdf, (err, data) => {
    res.contentType("application/pdf");
    res.send(data);
  });
};

var downloadAttributesBasedOnEventIds = async (req, res) => {
  const datarecords = await prepareAttributeReport(
    req.body.eventId,
    req.body.category
  );

  const DIR = __dirname + "/../template/tmp/" + new Date().getTime();
  await EXEC("mkdir " + DIR);
  await EXEC("chmod -R 777 " + DIR);
  var buildPathHtml = DIR + "/attribute.html";
  const buildPathPdf = DIR + "/attribute.pdf";

  await SHELL.cp(
    "-R",
    __dirname + "/../template/attribute.html",
    buildPathHtml
  );
  await EXEC("chmod -R 777 " + buildPathHtml);

  SHELL.sed("-i", "dataValue", JSON.stringify(datarecords), buildPathHtml);
  SHELL.sed("-i", "DomainValue", "Domain - " + req.body.domain, buildPathHtml);
  SHELL.sed("-i", "CategoryValue", "Category - " + req.body.category, buildPathHtml);

  const pdf = await printPdf(buildPathHtml);
  FS.writeFileSync(buildPathPdf, pdf);
  FS.readFile(buildPathPdf, (err, data) => {
    res.contentType("application/pdf");
    res.send(data);
  });
};

module.exports = {
  getAttributesBasedOnEventIds,
  downloadAttributesBasedOnEventIds,
  downloadDomainReportBasedOnCategory,
  downloadEventsBasedOnDomainAndCategory
};
