//Function that sets an alert when the event begins

function setAlarm(eventObject, time) {
     setTimeout(function() {
          alert(`Que empiece la fiesta de ${eventObject.title}`);
          console.log('Ha entrado');
     }, time);
}

// Function to change the style of the expired events

function expired(eventObject) {
     let expiredObject = document.querySelector(`div [data-eventid = "${eventObject.id}"]`);
     console.log('hola ' + eventObject.title);
     console.log(expiredObject);
}

// Function that sets the alarm for the reminders
// that have to execute on the next hour

export function setReminder() {
     let actualDate = new Date();
     if (localStorage.length != 0) {
          const eventData = localStorage.getItem("events");
          console.log(eventData);
          let objArray = JSON.parse(eventData).filter(calendarEvents => calendarEvents.reminder == 'on');

          objArray.forEach(obj => {
               let remindingTime = new Date(obj["init-date"]) - actualDate;
               console.log(new Date(obj["init-date"]) + '-' + actualDate + '=' + remindingTime);
               console.log(remindingTime);
               if (remindingTime <= 7200000) {
                    setAlarm(obj, 10000);
               }
          });
     }
}

function expiredArr() {
     let actualDate = new Date();
     if (localStorage.length != 0) {
          const eventData = localStorage.getItem("events");
          let expiredEvents = JSON.parse(eventData).filter(calendarEvents => calendarEvents["end-check"] == 'on');

          expiredEvents.forEach(obj => {
               if (new Date(obj["end-date"] - actualDate < 0)) {
                    expired(obj);
               }
          });
     }
}

setReminder();
expiredArr();