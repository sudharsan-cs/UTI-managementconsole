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
    url: "https://localhost:3000/ms/phishing/search/v1",
    type: "POST",
    data: {
      start: page * limit,
      limit: limit,
      phishingSearch: malwareQuery ? malwareQuery : null,
    },
    success: function (response) {
      var trHTML = "";
      $.each(response, function (i, item) {
        trHTML +=
        '<tr class="removeable event-row"><td>' 
        +item['Phishing URL']+
          "</td>"+
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