calendarMock = {
    "2021/4/17" : {
        0 :{
          'eventTitle' : 'nombreEvento1',
          'endDate': '18/09/2021 12:31:22',
          'reminderDate': '01/09/2021 11:31:22',
          'description': 'asdasdasd',
          'eventType': 'meeting'
        },
        1:{
            'eventTitle' : 'nombreEvento2222',
            'endDate': '18/09/2021 12:31:22',
            'reminderDate': '10/08/2021 11:31:22',
            'description': 'asdasdasd',
            'eventType': 'meeting'
          },
    },
    "2021/4/21" : {
        0 :{
            'eventTitle' : 'nombreEvento2222',
            'endDate': '18/09/2021 12:31:22',
            'reminderDate': '05/09/2021 11:31:22',
            'description': 'asdasdasd',
            'eventType': 'meeting'
          },

    },
    "2021/5/29" : {
        0 :{
            'eventTitle' : 'nombreEvento2222',
            'endDate': '18/09/2021 12:31:22',
            'reminderDate': '04/07/2021 11:31:22',
            'description': 'asdasdasd',
            'eventType': 'meeting'
          },

    }

}


reminders = {​​​​​​​​
    "1618396500000":{​​​​​​​​
        "eventTitle":"asdasd",
        "reminderDate":"2021-04-14T12:35",
        "initialDate":"2021-04-15T12:34"
        }​​​​​​​​,
    "1618317300000":{
        ​​​​​​​​"eventTitle":"asdasd",
        "reminderDate":"2021-04-13T14:35",
        "initialDate":"2021-04-15T12:34"
        }​​​​​​​​,
    "1618403700000":{​​​​​​​​
        "eventTitle":"asdasd",
        "reminderDate":"2021-04-14T14:35",
        "initialDate":"2021-04-15T12:34"
        }​​​​​​​​
}​​​​​​​​



localStorage.setItem("calendarMock", JSON.stringify(calendarMock) );

var eventsCalendar = JSON.parse(localStorage.getItem('calendarMock'));
var currentMonthDisplay = "4";
var eventsList = [];

function loadEventReminderList(eventsCalendar){
    for (dateID in eventsCalendar){
        for (eventName in eventsCalendar[dateID]){
            let reminderDate = eventsCalendar[dateID][eventName]['reminderDate'];
            let reminder = { 'reminderDate': reminderDate , 'eventTitle' : eventName , "initialDate": dateID };
            eventsList.push(reminder);
        }
    }
    console.log(eventsList);

}

loadEventReminderList(eventsCalendar);


function displayEventsInMonth(currentMonthDisplay, eventsCalendar){
    for (dateID in eventsCalendar){
        if(currentMonthDisplay === dateID.split("/")[1]){
            for (eventName in eventsCalendar[dateID]){
                displayEventInDate(dateID,eventName);
            }
        }
    }
}

function displayEventInDate(dateID,eventTitle){
    let displayedEvent = document.createElement("P");
    let eventTitleTextNode = document.createTextNode(eventTitle);
    displayedEvent.appendChild(eventTitleTextNode);
    displayedEvent.className = "event-text";
    document.getElementById(dateID).appendChild(displayedEvent);
}

eventsList.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });


/** INITIAL FUNCTION CALLS */

displayEventsInMonth(currentMonthDisplay, eventsCalendar);


/*

function setReminder(eventTitle, eventDate, reminderDate){
    eventsCalendar[eventDate][eventTitle]['reminderDate'] = reminderDate;
    localStorage.setItem("calendarMock", JSON.stringify(eventsCalendar) );

}

eventDate = "2021/4/17";
eventTitle = 'nombreEvento1';
reminderDate = "ALERTAAAAAAAA"
console.log(eventsCalendar[eventDate][eventTitle]['reminder']);

setReminder(eventTitle, eventDate, reminderDate);

*/

