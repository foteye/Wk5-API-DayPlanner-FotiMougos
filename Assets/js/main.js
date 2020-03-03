$( document ).ready(function() {
    generateRows();
});

function generateRows(){
    //Assuming 9-5 day
    let planner = $("#planner");
    planner.empty();

    for (var i = 9; i <= 17; i++){ //For a 9-5 day
        console.log(i);
        let row = $("<div></div>");
        let time = (i > 12) ? (i - 12).toString() + "pm" : i.toString() + "am";
        row.addClass("time " + time);
        row.attr('value-time-24', i);
        
        let timeCol = $("<div></div>");
        let eventCol = $("<div></div>");
        let saveCol = $("<div></div>"); //Jquery no likey the one liner here, adding classes fails
        timeCol.addClass('col-2 time');
        saveCol.addClass('col-2 save');
        eventCol.addClass('col-8 event');

        row.append(timeCol,eventCol,saveCol); //Add rows
        planner.append(row);
    }
}