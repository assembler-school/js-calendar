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


function inicializeRemindersList(){
    for (reminderID in reminders){
        let reminder = reminders[reminderID];
        //console.log(Date.parse(reminder.reminderDate))
        if(Date.parse(reminder.reminderDate)>Date.now()){
            nextRemindersList.push(reminder);
        }else{
            pastRemindersList.push(reminder);
        }

        }
}
function sortRemindersList(remindersList){
  remindersList.sort(function (a, b) {
        if (a['reminderDate'] > b['reminderDate']) {
          return 1;
        }
        if (a['reminderDate'] < b['reminderDate']) {
          return -1;
        }
        // a must be equal to b
        return 0;
      });
}

function setNextAlarmTimeout(){
  let timeLeft = Date.parse(nextRemindersList[0].reminderDate) - Date.now();
  setTimeout(function(){ 
      alert("Hello"); 
    
    }, timeLeft);
}


/*
remindersList.sort(function (a, b) {
    if (a.name > b.name) {
      return 1;
    }
    if (a.name < b.name) {
      return -1;
    }
    // a must be equal to b
    return 0;
  });
  */