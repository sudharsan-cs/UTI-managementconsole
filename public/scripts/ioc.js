$(document).on({
  ajaxStart: function () {
    $("body").addClass("loading");
  },
  ajaxStop: function () {
    $("body").removeClass("loading");
  },
});
const limit = 10;
var totatEventIds = [];
var page = 0;
var malwareQuery = null;
var nextPage = function () {
  page = page + 1;
  updateEventTable();
};

var previousPage = function () {
  if (page !== 0) {
    page = page - 1;
    updateEventTable();
  }
};
var searchData = function () {
  page=0;
  malwareQuery = $("#searchbox").val();
  updateEventTable();
};
var updateEventTable = function () {
  $.ajax({
    url: "https://localhost:3000/ms/ioc/info/v1",
    type: "POST",
    data: {
      start: page * limit,
      limit: limit,
      iocQuery: malwareQuery ? malwareQuery : null,
    },
    success: function (response) {
      var trHTML = "";
      $.each(response, function (i, item) {
        trHTML +=
          '<tr class="removeable event-row" event_id =' +
          item.ioc_value +
          "><td>" +
          item.ioc_type +
          "</td><td>" +
          item.threat_type +
          "</td><td>" +
          item.malware +
          "</td><td>" +
          item.malware_alias +
          "</td><td>" +
          item.malware_printable +
          "</td><td>" +
          ((item.malware_printable)?item.malware_printable: '-') +
          "</td><td>" +
          item.first_seen_utc +
          "</td><td>" +
          ((item.last_seen_utc)?item.last_seen_utc: '-') +
          " </td><td>" +
          item.confidence_level +
          " </td><td>" +
            '<a target="_blank" href="'+item.reference +'" class="fa-solid fa-file-chart-column event-selector-download">Link</a>'
            +
          " </td><td>" +
          ((item.tags)?item.tags: '-') +
          " </td><td>" +
          item.anonymous +
          " </td><td>" +
          item.reporter +
          " </td> " +
          "</tr>";
      });
      $(".removeable").remove();
      if (response.length > 0) {
        //page += 1;
        
        $("#records_table").append(trHTML);
      }
    },
  });
};

$(document).ready(function () {
  updateEventTable();
  $("#nextTable").on("click", function () {
    nextPage();
  });
  $("#previousTable").on("click", function () {
    previousPage();
  });
  $("#search").on("click", function () {
    searchData();
  });
});