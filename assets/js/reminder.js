function initRemainder() {
  let currentTime = new Date();
  let currentMonth = currentTime.getMonth();
  let currentYear = currentTime.getFullYear();
  let unixMonth = new Date(currentYear, currentMonth).getTime();
  let searchInStorage = JSON.parse(localStorage.getItem(unixMonth));
  console.log(searchInStorage);
  if (searchInStorage != null) {
    findRemainderOnEvents(searchInStorage);
  }
  setTimeout(initRemainder, 86400000);
}

function findRemainderOnEvents(events) {
  events.forEach((event) => {
    if (event.reminderEvent != 0) {
      let currentTime = new Date();
      let initialDate = event.initialDate;
      let reminderEvent = event.reminderEvent;
      let reminderEventMin = reminderEvent * 60000;
      //let missingTime = initialDate - currentTime
    }
  });
}

export { initRemainder };
