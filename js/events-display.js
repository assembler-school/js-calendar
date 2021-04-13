calendarMock = {
    "2021/4/17" : {
        'nombreEvento1':{
          'endDate': '18/09/2021 12:31:22',
          'reminder': '1/09/2021 11:31:22',
          'description': 'asdasdasd',
          'eventType': 'meeting'
        },
        'nombreEvento2222':{
            'endDate': '18/09/2021 12:31:22',
            'reminder': '10/08/2021 11:31:22',
            'description': 'asdasdasd',
            'eventType': 'meeting'
          },
    },
    "2021/4/21" : {
        'nombreEvento33333':{
            'endDate': '18/09/2021 12:31:22',
            'reminder': '05/09/2021 11:31:22',
            'description': 'asdasdasd',
            'eventType': 'meeting'
          },

    },
    "2021/5/29" : {
        'nombreEvento444':{
            'endDate': '18/09/2021 12:31:22',
            'reminder': '04/07/2021 11:31:22',
            'description': 'asdasdasd',
            'eventType': 'meeting'
          },

    }

}
localStorage.setItem("calendarMock", JSON.stringify(calendarMock) );

var eventsCalendar = JSON.parse(localStorage.getItem('calendarMock'));
var currentMonthDisplay = "4"

displayEventsInMonth(currentMonthDisplay, eventsCalendar);
function displayEventsInMonth(currentMonthDisplay, eventsCalendar){
    for (date in eventsCalendar){
        if(currentMonthDisplay === date.split("/")[1]){
            for (eventName in eventsCalendar[date]){
                displayEventInDate(date,eventName);
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

function setReminder(eventTitle, eventDate, reminderDate){
    eventsCalendar[eventDate][eventTitle]['reminder'] = reminderDate;
    localStorage.setItem("calendarMock", JSON.stringify(eventsCalendar) );

}

eventDate = "2021/4/17";
eventTitle = 'nombreEvento1';
reminderDate = "ALERTAAAAAAAA"
console.log(eventsCalendar[eventDate][eventTitle]['reminder']);

setReminder(eventTitle, eventDate, reminderDate);
