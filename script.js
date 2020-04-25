
var allTimeBlocks = ["9", "10", "11", "12", "1", "2", "3", "4", "5"];


//Event listener to save event text on click of Save button
$(".save-event").on("click", function() {

    var timeAttribute = $(this).attr("time");
    var newEventText = $("#event[time="+timeAttribute+"]").val();
    
    console.log(newEventText);

    var planObj = {};

    planObj[timeAttribute] = newEventText;

    localStorage.setItem("dayPlans", JSON.stringify(planObj));

});

//Gets saved events from local storages and adds it to event text in their respective time blocks
function loadSavedEvents() {

    var savedDayPlans = localStorage.getItem("dayPlans");

    console.log("saved events - "+savedDayPlans);

    if(savedDayPlans) {

        savedDayPlans = JSON.parse(savedDayPlans);

            for(var i = 0; i < allTimeBlocks.length; i++) {

                var timeBlock = allTimeBlocks[i];

                //If saved event exists, populate the saved event in its respective time block
                if(savedDayPlans[timeBlock]) {
                    $("#event[time="+ timeBlock +"]").val(savedDayPlans[timeBlock]);
                }

            }

    }

}

//Change color of time blocks based on what time it is right now

function updateTimeBlockColors() {

    //update div to show Todays Date
    var dateString = moment().format("dddd, MMMM Do YYYY");
    $(".day-display").text(dateString);
    


}


updateTimeBlockColors();
loadSavedEvents();