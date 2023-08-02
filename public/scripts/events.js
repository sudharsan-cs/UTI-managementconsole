$(document).on({
    ajaxStart: function(){
        $("body").addClass("loading"); 
    },
    ajaxStop: function(){ 
        $("body").removeClass("loading"); 
    }    
});
      const limit = 10;
      var totatEventIds = [];
      var page = 1;
      var domainListBasedCategory = {
        Insurance: [
          { categoryType: "Antivirus detection" },
          { categoryType: "Artifacts dropped" },
          { categoryType: "Attribution" },
          { categoryType: "External analysis" },
          { categoryType: "Financial fraud" },
          { categoryType: "Internal reference" },
          { categoryType: "Network activity" },
          { categoryType: "Other" },
        ],
        Finance: [
          { categoryType: "Payload delivery" },
          { categoryType: "Payload installation" },
          { categoryType: "Payload type" },
          { categoryType: "Persistence mechanism" },
          { categoryType: "Person" },
          { categoryType: "Social network" },
          { categoryType: "Support Tool" },
          { categoryType: "Targeting data" },
        ],
      };

      var updateCategory = function (domain) {
        var listItems = "";
        for (var i = 0; i < domainListBasedCategory[domain].length; i++) {
          listItems +=
            "<option value='" +
            domainListBasedCategory[domain][i].categoryType +
            "'>" +
            domainListBasedCategory[domain][i].categoryType +
            "</option>";
        }
        $("select#categorySelection").html(listItems);
        getEventIdsUsingCat();
      };

      var getEventIdsUsingCat = function () {
        var selectedCat = $("#categorySelection option:selected").text();
        $.ajax({
          url: "https://localhost:3000/ms/events/geteventidbasedoncategory/v1",
          type: "POST",
          data: {
            categories: [selectedCat],
          },
          success: function (response) {
            totatEventIds = response;
            totatEventIds = totatEventIds.sort(function (a, b) {
              return b - a;
            });
            updateEventTable();
          },
        });
      };

      var nextPage = function () {
        page = page + 1;
        updateEventTable();
      };

      var previousPage = function () {
        if (page !== 1) {
          page = page - 1;
          updateEventTable();
        }
      };

      var updateEventTable = function () {
        var eventIds = [];
        eventIds = totatEventIds.slice(
          page * limit - limit,
          page * limit - limit + limit
        );
        $.ajax({
          url: "https://localhost:3000/ms/events/geteventsbasedoneventids/v1",
          type: "POST",
          data: {
            eventIds: eventIds,
            category: $("#categorySelection option:selected").text(),
          },
          success: function (response) {
            var trHTML = "";
            $.each(response, function (i, item) {
              trHTML +=
                '<tr class="removeable event-row" event_id =' +
                item.id +
                "><td>" +
                item.id +
                "</td><td>" +
                item.orgc_id +
                "</td><td>" +
                item.date +
                "</td><td>" +
                item.threat_level_id +
                "</td><td>" +
                item.info +
                "</td><td>" +
                item.attributeCnt +
                "</td><td>" +
                '<a href="#" style="background-color: #008CBA;color: #fff;" class="btn event-selector" event_id =' +
                item.id +
                ">View</a> " +
                " </td><td>" +
                '<a href="#" style="background-color: #26a69a;color: #fff;" class="btn fa-solid fa-file-chart-column event-selector-download" event_id =' +
                item.id +
                ">Download</a>";
              (" </td>");
            });

            if (response.length > 0) {
              //page += 1;
              $(".removeable").remove();
              $("#records_table").append(trHTML);
            }

            $(".event-selector").on("click", function () {
              window.open(
                window.location.origin +
                  "/attribute?event_id=" +
                  this.getAttribute("event_id") +
                  "&category=" +
                  $("#categorySelection option:selected").text() +
                  "&domain=" +
                  $("#domainSelectorId option:selected").text(),
                "_blank"
              );
            });

            $(".domain-selector-download").on("click", function () {
              const domain = $("#domainSelectorId option:selected").text();

              $.ajax({
                url: "https://localhost:3000/ms/events/domaindownload/v1",
                type: "POST",
                data: {
                  domain: domain,
                },
                xhrFields: {
                  responseType: "blob",
                },
                success: function (response) {
                  var a = document.createElement("a");
                  var url = window.URL.createObjectURL(response);
                  a.href = url;
                  a.download = "Exeutive-Report-Domain.pdf";
                  document.body.append(a);
                  a.click();
                  a.remove();
                  window.URL.revokeObjectURL(url);
                },
              });
            });

            $(".summary-selector-download").on("click", function () {
              const category = $("#categorySelection option:selected").text();
              const domain = $("#domainSelectorId option:selected").text();
              const event_id = this.getAttribute("event_id");
              $.ajax({
                url: "https://localhost:3000/ms/event-download/eventdata/v1",
                type: "POST",
                data: {
                  eventId: event_id,
                  category: category,
                  domain: domain,
                },
                xhrFields: {
                  responseType: "blob",
                },
                success: function (response) {
                  var a = document.createElement("a");
                  var url = window.URL.createObjectURL(response);
                  a.href = url;
                  a.download = "summaryTb.pdf";
                  document.body.append(a);
                  a.click();
                  a.remove();
                  window.URL.revokeObjectURL(url);
                },
              });
            });

            $(".event-selector-download").on("click", function () {
              const category = $("#categorySelection option:selected").text();
              const domain = $("#domainSelectorId option:selected").text();
              const event_id = this.getAttribute("event_id");
              $.ajax({
                url: "https://localhost:3000/ms/attributes-download/getattributesbasedoneventids/v1",
                type: "POST",
                data: {
                  eventId: event_id,
                  category: category,
                  domain: domain,
                },
                xhrFields: {
                  responseType: "blob",
                },
                success: function (response) {
                  var a = document.createElement("a");
                  var url = window.URL.createObjectURL(response);
                  a.href = url;
                  a.download = "attributesTb.pdf";
                  document.body.append(a);
                  a.click();
                  a.remove();
                  window.URL.revokeObjectURL(url);
                },
              });
            });
          },
        });
      };

      $(document).ready(function () {
        $("select#domainSelectorId").on("change", function () {
          var selectedMake = $("#domainSelectorId option:selected").text();
          updateCategory(selectedMake);
        });
        var selectedMake = $("#domainSelectorId option:selected").text();
        updateCategory(selectedMake);

        $("select#categorySelection").on("change", function () {
          page = 1;
          getEventIdsUsingCat();
        });
        $("#nextTable").on("click", function () {
          nextPage();
        });
        $("#previousTable").on("click", function () {
          previousPage();
        });
      });