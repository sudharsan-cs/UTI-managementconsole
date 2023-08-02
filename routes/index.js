const EXPRESS = require("express");
const { getMalwarePageInfo } = require("./malware-service");
const {
  getMitreMalwarePageInfo,
  getTechnicalDataPageInfo,
  getReportMitreMalwarePageInfo,
  getReportTechniqueMalwarePageInfo,
  getReportMitreMalwarePageInfov2,
  getAttackCoverageMap,
} = require("./mitre-malware-service");
const { getIoCPageInfo } = require("./ioc-service");
const {  getDataPhishingSearch, getDataPhishingInfoSearch } = require("./phishing-service");
const {
  getEventsBasedOnEventIds,
  getEventIdBasedOnCategory,
} = require("./event-service");
const {
  getAttributesBasedOnEventIds,
  downloadAttributesBasedOnEventIds,
  downloadDomainReportBasedOnCategory,
  downloadEventsBasedOnDomainAndCategory,
} = require("./attribute-service");
var router = EXPRESS.Router();

router.post("/events/geteventsbasedoneventids/v1", getEventsBasedOnEventIds);
router.post("/events/geteventidbasedoncategory/v1", getEventIdBasedOnCategory);
router.post(
  "/attributes/getattributesbasedoneventids/v1",
  getAttributesBasedOnEventIds
);
router.post(
  "/attributes-download/getattributesbasedoneventids/v1",
  downloadAttributesBasedOnEventIds
);
router.post("/events/domaindownload/v1", downloadDomainReportBasedOnCategory);
router.post(
  "/event-download/eventdata/v1",
  downloadEventsBasedOnDomainAndCategory
);
router.post("/technique/download/v1", getReportTechniqueMalwarePageInfo);
router.post("/technique/info/v1", getTechnicalDataPageInfo);
router.post("/mitremalware/download/v1", getReportMitreMalwarePageInfov2);
router.post("/mitremalware/info/v1", getMitreMalwarePageInfo);
router.post("/malware/info/v1", getMalwarePageInfo);
router.post("/ioc/info/v1", getIoCPageInfo);
router.post("/attackmap/v1", getAttackCoverageMap);
router.post("/phishing/info/v1", getDataPhishingInfoSearch);
router.post("/phishing/search/v1", getDataPhishingSearch);
module.exports = router;
