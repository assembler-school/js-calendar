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
  nextRemindersList=[];
  pastRemindersList=[];
    for (reminderID in reminders){
        let reminder = reminders[reminderID];
        reminder['reminderID'] = reminderID;
        if(Date.parse(reminder.reminderDate)>Date.now()){
            nextRemindersList.push(reminder);
        }else{
            pastRemindersList.push(reminder);
        }
        
      }
    sortRemindersList(nextRemindersList,1);
    sortRemindersList(pastRemindersList,-1);
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
  if(!!nextRemindersList.length){
    let timeLeft = Date.parse(nextRemindersList[0].reminderDate) - Date.now();
    setTimeout(function(){
        alert("Hello, reminder for " + nextRemindersList[0].eventTitle);
        pastRemindersList.unshift(nextRemindersList.shift());
        startNextAlarmTimeout();
      }, timeLeft);
      console.log(timeLeft);
  }
}