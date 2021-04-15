function displayEventsInMonth(currentMonthDisplay, eventsCalendar){
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




function initRemindersList(){
  nextRemindersList=[];
  pastRemindersList=[];
    for (reminderID in reminders){
        let reminder = reminders[reminderID];
        reminder['id'] = reminderID;
        if(Date.parse(reminder.reminderDate)>Date.now()){
            nextRemindersList.push(reminder);
        }else{
            pastRemindersList.push(reminder);
        }
        
      }
    sortRemindersList(nextRemindersList,1);
    sortRemindersList(pastRemindersList,-1);
    if (currentTimeout) {
        clearTimeout(currentTimeout);
    }
    startNextAlarmTimeout();
}
function sortRemindersList(remindersList, sign){
  remindersList.sort(function (a, b) {
        if (a['reminderDate'] > b['reminderDate']) {
          return 1*sign;
        }
        if (a['reminderDate'] < b['reminderDate']) {
          return -1*sign;
        }
        // a must be equal to b
        return 0;
      });
}

function startNextAlarmTimeout(){
    if(nextRemindersList.length){
        let timeLeft = Date.parse(nextRemindersList[0].reminderDate) - Date.now();
        currentTimeout = setTimeout(function(){
            alert("Hello, reminder for " + nextRemindersList[0].eventTitle);
            pastRemindersList.unshift(nextRemindersList.shift());
            startNextAlarmTimeout();
        }, timeLeft);
    }
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
    }
}

function displayEventsInYearCalendar(year,eventsCalendar){
    let divDisplayEventsInYearCalendar = document.createElement("div");
    divDisplayEventsInYearCalendar.classList.add('event-year-view');
    document.querySelector('[id="2021/03/12"]').appendChild(divDisplayEventsInYearCalendar);
}
