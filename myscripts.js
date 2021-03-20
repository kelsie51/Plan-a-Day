// variable loop
var currentDay = [
    {
        id: "0",
        hour: "12",
        time: "12",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "1",
        hour: "1",
        time: "1",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "2",
        hour: "2",
        time: "2",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "3",
        hour: "3",
        time: "3",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "4",
        hour: "4",
        time: "4",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "5",
        hour: "5",
        time: "5",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "6",
        hour: "6",
        time: "6",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "7",
        hour: "7",
        time: "7",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "8",
        hour: "8",
        time: "8",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "9",
        hour: "9",
        time: "9",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "10",
        hour: "10",
        time: "10",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "11",
        hour: "11",
        time: "11",
        meridiem: "am",
        reminder: ""
    },
    {
        id: "12",
        hour: "12",
        time: "12",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "13",
        hour: "1",
        time: "13",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "14",
        hour: "2",
        time: "14",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "15",
        hour: "3",
        time: "15",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "16",
        hour: "4",
        time: "16",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "17",
        hour: "5",
        time: "17",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "18",
        hour: "6",
        time: "18",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "19",
        hour: "7",
        time: "19",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "20",
        hour: "8",
        time: "20",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "21",
        hour: "9",
        time: "21",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "22",
        hour: "10",
        time: "22",
        meridiem: "pm",
        reminder: ""
    },
    {
        id: "23",
        hour: "11",
        time: "23",
        meridiem: "pm",
        reminder: ""
    },
    
]

//  header date
function getHeaderDate() {
    var currentHeaderDate = moment().format('dddd, MMMM Do');
    $("#currentDay").text(currentHeaderDate);
}

// save to localStorage
function saveReminders() {
    localStorage.setItem("currentDay", JSON.stringify(currentDay));
}

// Display localStorage data
function displayReminders() {
    currentDay.forEach(function (_thisHour) {
        $(`#${_thisHour.id}`).val(_thisHour.reminder);
    })
}

// Current view local storage data
function init() {
    var storedDay = JSON.parse(localStorage.getItem("currentDay"));

    if (storedDay) {
        currentDay = storedDay;
    }

    saveReminders();
    displayReminders();
}

// header date
getHeaderDate();

//  Scheduler body
currentDay.forEach(function(thisHour) {
    // creates timeblocks row
    var hourRow = $("<form>").attr({
        "class": "row"
    });
    $(".container").append(hourRow);

    // creates time field
    var hourField = $("<div>")
        .text(`${thisHour.hour}${thisHour.meridiem}`)
        .attr({
            "class": "col-md-2 hour"
    });

    //  schdeduler input
    var hourPlan = $("<div>")
        .attr({
            "class": "col-md-9 description p-0"
        });
    var planData = $("<textarea>");
    hourPlan.append(planData);
    planData.attr("id", thisHour.id);
    if (thisHour.time < moment().format("HH")) {
        planData.attr ({
            "class": "past", 
        })
    } else if (thisHour.time === moment().format("HH")) {
        planData.attr({
            "class": "present"
        })
    } else if (thisHour.time > moment().format("HH")) {
        planData.attr({
            "class": "future"
        })
    }

    //  save button
    var saveButton = $("<i class='far fa-save fa-lg'></i>")
    var savePlan = $("<button>")
        .attr({
            "class": "col-md-1 saveBtn"
    });
    savePlan.append(saveButton);
    hourRow.append(hourField, hourPlan, savePlan);
})

// existing localstorage data 
init();


//  localStorage save data
$(".saveBtn").on("click", function(event) {
    event.preventDefault();
    var saveIndex = $(this).siblings(".description").children(".future").attr("id");
    currentDay[saveIndex].reminder = $(this).siblings(".description").children(".future").val();
    console.log(saveIndex);
    saveReminders();
    displayReminders();
})