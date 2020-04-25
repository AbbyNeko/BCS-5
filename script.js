

//Event listener to save event text on click of Save button
$(".save-event").on("click", function() {

    var timeAttribute = $(this).attr("time");
    console.log("time block - "+timeAttribute);

    var newEventText = $("#event[time='"+ timeAttribute +"']").val();
    
    console.log(newEventText);

    
    var existingSavedEvents = localStorage.getItem("dayPlans");

    if(existingSavedEvents) {

        existingSavedEvents = JSON.parse(existingSavedEvents);
        existingSavedEvents[timeAttribute] = newEventText;

        localStorage.setItem("dayPlans", JSON.stringify(existingSavedEvents));

    }else {
        var planObj = {};
        planObj[timeAttribute] = newEventText;

        localStorage.setItem("dayPlans", JSON.stringify(planObj));
    }

});

//Gets saved events from local storages and adds it to event text in their respective time blocks
function loadSavedEvents() {

    var allTimeBlocks = ["9", "10", "11", "12", "1", "2", "3", "4", "5"];
    var savedDayPlans = localStorage.getItem("dayPlans");

    console.log("saved events - "+savedDayPlans);

    if(savedDayPlans) {

        savedDayPlans = JSON.parse(savedDayPlans);

            for(var i = 0; i < allTimeBlocks.length; i++) {

                var timeBlock = allTimeBlocks[i];

                //If saved event exists, populate the saved event in its respective time block
                if(savedDayPlans[timeBlock]) {
                    $("#event[time='"+ timeBlock +"']").val(savedDayPlans[timeBlock]);
                }

            }

    }

}

//Change color of time blocks based on what time it is right now

function updateTimeBlockColors() {

    //update div to show Todays Date
    var dateString = moment().format("dddd, MMMM Do YYYY");
    $(".day-display").text(dateString);
    
    //grey for time blocks past


    //light blue for present time block


    //dark blue for future time blocks

}


updateTimeBlockColors();
loadSavedEvents();