function displayEventsInMonth(currentMonthDisplay, eventsCalendar) {
  for (let date in eventsCalendar) {
    if (
      currentMonthDisplay == date.split("/")[1] &&
      year == date.split("/")[0]
    ) {
      eventsCalendar[date].forEach((element) => {
        displayEventInDate(
          date,
          element.eventTitle,
          element.id,
          element.eventType
        );
      });
    }
  }
}

function displayEventInDate(dateID, eventTitle, eventId, eventType) {
  let displayedEvent = document.createElement("p");
  setColorTypeOfEvent(displayedEvent, eventType);
  displayedEvent.classList.add(eventId);
  let eventTitleTextNode = document.createTextNode(eventTitle);
  displayedEvent.appendChild(eventTitleTextNode);
  displayedEvent.classList.add("event-text");
  document
    .getElementById(dateID)
    .parentNode.lastChild.appendChild(displayedEvent);
}

function initRemindersList() {
  nextRemindersList = [];
  pastRemindersList = [];
  for (reminderID in reminders) {
    let reminder = reminders[reminderID];
    reminder["id"] = reminderID;
    if (Date.parse(reminder.reminderDate) > Date.now()) {
      nextRemindersList.push(reminder);
    } else {
      pastRemindersList.push(reminder);
    }
  }
  sortRemindersList(nextRemindersList, 1);
  sortRemindersList(pastRemindersList, -1);
  if (currentTimeout) {
    clearTimeout(currentTimeout);
  }
  startNextAlarmTimeout();
}

function sortRemindersList(remindersList, sign) {
  remindersList.sort(function (a, b) {
    if (a["reminderDate"] > b["reminderDate"]) {
      return 1 * sign;
    }
    if (a["reminderDate"] < b["reminderDate"]) {
      return -1 * sign;
    }
    // a must be equal to b
    return 0;
  });
}

function alarmSound() {
  let audio = new Audio("../sound/alarm.mp4");
  audio.play();
}

function startNextAlarmTimeout() {
  if (nextRemindersList.length) {
    let timeLeft = Date.parse(nextRemindersList[0].reminderDate) - Date.now();
    currentTimeout = setTimeout(function () {
      let id = nextRemindersList[0].id;
      let title = nextRemindersList[0].eventTitle;
      let initialDate = nextRemindersList[0].initialDate;
      initialDate = new Date(initialDate).toLocaleString("en-UK", optDate);
      modalForReminders(title, initialDate, id);
      alarmSound();
      pastRemindersList.unshift(nextRemindersList.shift());
      loadPastRemindersWarningCounter();
      startNextAlarmTimeout();
    }, timeLeft);
  }
}

//Color for event types
function setColorTypeOfEvent(displayedEvent, eventType) {
  displayedEvent.classList.add(eventType);
}

function loadPastRemindersWarningCounter() {
  let warningBoxbtn = document.querySelector(".warningBox-btn");
  if (pastRemindersList.length) {
    warningBoxbtn.innerHTML = "!" + pastRemindersList.length;
    warningBoxbtn.addEventListener("click", modalWarningBoxEnters);
    warningBoxbtn.classList.add("warningBox-btn-alert");
  } else {
    warningBoxbtn.innerHTML = "0";
    warningBoxbtn.classList.remove("warningBox-btn-alert");
    warningBoxbtn.removeEventListener("click", modalWarningBoxEnters);
  }
}

function displayEventsInYearCalendar(year, eventsCalendar) {
  for (element in eventsCalendar) {
    if (year == element.split("/")[0]) {
      let divDisplayEventsInYearCalendar = document.createElement("div");
      divDisplayEventsInYearCalendar.classList.add("event-year-view");
      document
        .querySelector('[id="' + element + '"]')
        .appendChild(divDisplayEventsInYearCalendar);
    }
  }
}
