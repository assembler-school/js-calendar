let timeoutArr = [];

//Function to get a filtered list of elements from the localStorage

function reminderArr() {
     let eventData = JSON.parse(localStorage.getItem("events"));
     eventData = eventData.filter(calendarEvents => calendarEvents.reminder == 'on');
     eventData = eventData.filter(calendarEvents => new Date(calendarEvents["init-date"]) - new Date() - (calendarEvents["select-time"] * 60000) > 0);
     return eventData.filter(calendarEvents => new Date(calendarEvents["init-date"]) - new Date() < 3600000);
}

function alertReminder(object) {
     let popAlert = document.createElement('div');
     popAlert.setAttribute('class', 'reminder__popup');
     popAlert.innerHTML = `${object["title"]} will start in ${object["select-time"]} minutes.`;
     document.querySelector('body').appendChild(popAlert);
     clearTimeout(timeoutArr[0]);
     timeoutArr.slice(0, 1);
     setInterval(function() {
          popAlert.remove();
     }, 10000);
}

export function setReminder(alertsArr) {
     const actualDate = new Date();
     timeoutArr.forEach(clearTimeout);
     timeoutArr = [];

     if (localStorage.length) {
          const objArray = reminderArr();
          objArray.forEach(obj => {
               let remindTime = new Date(obj["init-date"]) - actualDate - (obj["select-time"] * 60000);
               timeoutArr.push(setTimeout(alertReminder, remindTime, obj));
          });
          return timeoutArr;
     }
}


setReminder(timeoutArr);
setInterval(setReminder, 3600000, timeoutArr);
