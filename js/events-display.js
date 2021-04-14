// calendarMock = {
//     "2021/04/17" : {
//         0:{
//           'endDate': '18/09/2021 12:31:22',
//           'reminder': '18/09/2021 11:31:22',
//           'description': 'asdasdasd',
//           'eventType': 'meeting'
//         },
//         'nombreEvento2222':{
//             'endDate': '18/09/2021 12:31:22',
//             'reminder': '18/09/2021 11:31:22',
//             'description': 'asdasdasd',
//             'eventType': 'meeting'
//           },
//     },
//     "2021/04/21" : {
//         'nombreEvento33333':{
//             'endDate': '18/09/2021 12:31:22',
//             'reminder': '18/09/2021 11:31:22',
//             'description': 'asdasdasd',
//             'eventType': 'meeting'
//           },

//     },
//     "2021/05/29" : {
//         'nombreEvento444':{
//             'endDate': '18/09/2021 12:31:22',
//             'reminder': '18/09/2021 11:31:22',
//             'description': 'asdasdasd',
//             'eventType': 'meeting'
//           },

//     }

// }
// localStorage.setItem("calendarMock", JSON.stringify(calendarMock) );

// var eventsCalendar = JSON.parse(localStorage.getItem('calendarEvents'));


// }



// localStorage.setItem("calendarMock", JSON.stringify(calendarMock) );
// var eventsCalendar = JSON.parse(localStorage.getItem('calendarMock'));
// var currentMonthDisplay = 4
// */
//displayEventsInMonth(currentMonthDisplay, eventsCalendar);
function displayEventsInMonth(currentMonthDisplay, eventsCalendar){
    for (date in eventsCalendar){
        if(currentMonthDisplay == date.split("/")[1]){
            eventsCalendar[date].forEach((element) => {
                displayEventInDate(date, element.eventTitle, element.id);
            });
        }
    }
}

function displayEventInDate(dateID,eventTitle, eventId) {
    let displayedEvent = document.createElement("p");
    displayedEvent.className += eventId;
    let eventTitleTextNode = document.createTextNode(eventTitle);
    displayedEvent.appendChild(eventTitleTextNode);
    displayedEvent.className += " event-text";
    document.getElementById(dateID).parentNode.lastChild.appendChild(displayedEvent);
}