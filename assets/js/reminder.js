function initRemainder() {
  let eventObjects = {};
  eventObjects = { ...localStorage };
  console.log(eventObjects);
  if (Object.keys(eventObjects).length > 0) {
    findRemainderOnEvents(eventObjects);
  }
  setTimeout(initRemainder, 10000);
}

function findRemainderOnEvents(eObj) {
  for (let keyEvent in eObj) {
    let event = JSON.parse(eObj[keyEvent])[0];
    console.log(event);
    if (event.reminderEvent != 0 && event.notify != "true") {
      let currentTime = new Date();
      let initialDate = event.initialDate; //TODO: Look at that (maybe we'll move this under l19)
      let initialDateUnix = new Date(initialDate).getTime();
      let reminderEvent = event.reminderEvent;
      let reminderEventUnix = reminderEvent * 60000; //Multiply minutes per miliseconds
      let timeLeft = initialDateUnix - reminderEventUnix; //When should de alert appears
      let missingTime = timeLeft - currentTime.getTime();
      console.log(missingTime);
      if (missingTime <= 0) {
        alert(
          `Your event ${event.titleEvent} will start in ${event.reminderEvent} mins`
        );
        event.notify = "true";
        localStorage.setItem(keyEvent, JSON.stringify([event]));
      }
    }
  }
}
//whala daba dub dub
export { initRemainder };
