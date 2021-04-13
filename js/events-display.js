function displayEventsInMonth(currentMonthDisplay, eventsCalendar){
    for (date in eventsCalendar){
        if(currentMonthDisplay == date.split("/")[1]){
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

