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
    console.log(currentMonthDisplay);
    for (date in eventsCalendar){
        if(currentMonthDisplay == date.split("/")[1] && year == date.split("/")[0]){
            eventsCalendar[date].forEach((element) => {
                displayEventInDate(date, element.eventTitle, element.id, element.eventType);
                // displayEventsInYearCalendar(date,element)
            });
        }
    }
}

function displayEventInDate(dateID,eventTitle, eventId,eventType) {
    let displayedEvent = document.createElement("p");
    setColorTypeOfEvent(displayedEvent,eventType)
    displayedEvent.className += eventId;
    let eventTitleTextNode = document.createTextNode(eventTitle);
    displayedEvent.appendChild(eventTitleTextNode);
    displayedEvent.className += " event-text";
    document.getElementById(dateID).parentNode.lastChild.appendChild(displayedEvent);
}

//Color for event types
function setColorTypeOfEvent(displayedEvent,eventType){
    switch(eventType){
        case 'EventType1':
            displayedEvent.className = 'event-type-1 ';
            break;
        case 'EventType2':
            displayedEvent.className = 'event-type-2 ';
            break;
    }}

// function displayEventsInYearCalendar(){

// }