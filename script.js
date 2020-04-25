var allTimeBlocks = ["9", "10", "11", "12", "1", "2", "3", "4", "5"];

//Event listener to save event text on click of Save button
$(".save-event").on("click", function() {

    var timeAttribute = $(this).attr("time");
    console.log("time block - "+timeAttribute);

    var newEventText = $("#event[time='"+ timeAttribute +"']").val();
    
    //console.log(newEventText);

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

    var savedDayPlans = localStorage.getItem("dayPlans");

    //console.log("saved events - "+savedDayPlans);

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

    var now = moment();

    var thisHour = now.hour();
    //thisHour = 9;
    //console.log("this hour - "+thisHour);

    //update div to show Todays Date
    var dateString = moment().format("dddd, MMMM Do YYYY");
    $(".day-display").text(dateString);


    for(var i = 0; i < allTimeBlocks.length; i++) {

            var currentTimeBlock = parseInt(allTimeBlocks[i]);

            //convert current time block to military time
            if(currentTimeBlock < 9) {
                currentTimeBlock = currentTimeBlock + 12;
            }

            //grey for time blocks past
            if(currentTimeBlock < thisHour) {
                $("#event[time='"+ allTimeBlocks[i] +"']").css("background-color", "gray");
            }

            //light blue for present time block
            if(currentTimeBlock == thisHour) {
                $("#event[time='"+ allTimeBlocks[i] +"']").css("background-color", "#7CEEFF");
            }
            
            //dark blue for future time blocks. Excluding 9 - 12
            if(currentTimeBlock > thisHour) {
                $("#event[time='"+ allTimeBlocks[i] +"']").css("background-color", "#66B5E8");
            }   

    }
    

}


updateTimeBlockColors();
loadSavedEvents();