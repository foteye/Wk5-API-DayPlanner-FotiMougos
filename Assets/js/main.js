$(document).ready(function() {
    generateRows();
    getDay();
    loadEvents();

});

// Loads stored events
function loadEvents(){
    let todaysDate = moment().format("DD-MM-YYYY");
    let localEvents = {};

    if (localStorage.getItem(todaysDate)){
        try {
            localEvents = JSON.parse(localStorage.getItem(todaysDate));
        } catch {
            console.log("Invalid JSON, unable to load events.");
            return;
        }
    }

    if (!objHasProp(localEvents)){ //No events, return early
        return;
    }

    for (key in localEvents){
        $('.time-block[value-time-24='+ key +']').children('.event').children('textarea').val(localEvents[key]);
    }
}


function saveEvent(event){
    let todaysDate = moment().format("DD-MM-YYYY");
    let localEvents = {};
    let slot = $(event.target).parent().parent().attr('value-time-24');
    let eventText = $(event.target).parent().parent().children('.event').children('textarea').val();

    if (localStorage.getItem(todaysDate)){
        try {
            localEvents = JSON.parse(localStorage.getItem(todaysDate));
        } catch {
            console.log("Invalid JSON, unable to load events. Starting fresh.");
        }
    }

    localEvents[slot] = eventText;
    localStorage.setItem(todaysDate, JSON.stringify(localEvents));
}

function getDay(){
    let now = moment();

    //Test Date/Time
    // var date = "2017-03-13";
    // var time = "12:00";
    // now = moment(date + ' ' + time);

    $("#currentDay").text(now.format('dddd') + ", " + now.format('Do') + " " + now.format("MMMM") + " " + now.year());
}

function generateRows(){
    //Assuming 9-5 day
    let planner = $("#planner");
    let now = moment();

    //Test Date/Time
    // var date = "2017-03-13";
    // var time = "12:00";
    // now = moment(date + ' ' + time);

    let currentHour = now.hour(); //Number
    
    planner.empty();

    for (var i = 9; i <= 17; i++){ //For a 9-5 day
        //Define Rows & Populate Attributes
        let row = $("<div></div>");
        let timeCol = $("<div></div>");
        let eventCol = $("<div></div>");
        let saveCol = $("<div></div>"); //Jquery no likey the one liner here, adding classes fails
        let time = (i > 12) ? (i - 12).toString() + "pm" : i.toString() + "am";
        row.addClass("time-block row time " + time);
        row.attr('value-time-24', i);
        timeCol.addClass('col-2 time');
        timeCol.text(time);
        saveCol.addClass('col-2 save');
        eventCol.addClass('col-8 event');
        eventCol.append("<textarea></textarea>");

        //Populate Save Button
        saveCol.append("<button class='saveBtn'>\uD83D\uDCBE");

        //Set timeslot colour based on time
        if (row.attr('value-time-24') < currentHour){ //Past
            eventCol.addClass('past');
        } else if (row.attr('value-time-24') == currentHour){ //Present
            eventCol.addClass('present');
        } else if (row.attr('value-time-24') > currentHour) { //Future
            eventCol.addClass('future')
        }

        //Append to planner
        row.append(timeCol,eventCol,saveCol); //Add rows
        planner.append(row);
    }

    $(".saveBtn").click(function() {
        saveEvent(event);
    });
}

function objHasProp(obj){
    for(var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            return true;
        }
    }
    return false;
}