/* IMPORT */
import { displayModal } from "./modal.js";

/* GLOBAL VARIABLES */
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let daysMonth = document.getElementById("daysMonth");

let nextBtn = document.getElementById("next-btn");
nextBtn.addEventListener("click", () => renderCalendar(1));
let prevBtn = document.getElementById("prev-btn");
prevBtn.addEventListener("click", () => renderCalendar(-1));

/* CALENDAR FUNCTIONALITIES */
let firstDay = function () {
  // We get the value (as number) of the weekday the first day in our month starts with
  return new Date(currentYear, currentMonth, 1).getDay();
};

let lastDay = function () {
  // We get the value (as number) of how many days our current month has
  return new Date(currentYear, currentMonth + 1, 0).getDate(); // * THE 0 INDICATES THE LAST DAY OF THE PREVIOUS MONTH, THEREFORE WE ADD 1 TO THE CURRENT MONTH
};

document
  .getElementById("next-btn")
  .addEventListener("click", () => renderCalendar(1));

document
  .getElementById("prev-btn")
  .addEventListener("click", () => renderCalendar(-1));

document.getElementById("daysMonth").addEventListener("click", (e) => {
  let target = e.target;
  // Click on day, then display pop-up to add event
  if (target.dataset.time) {
    //displayModal('addEvent', target.dataset.time)
    console.log("Add event");
  } else if (target.dataset.event) {
    //displayModal('editEvent', target.dataset.event)
    console.log("Edit event");
  }
});

function renderCalendar(month) {
  daysMonth.innerHTML = "";
  currentMonth += month;

  let monthEventsArray = window.localStorage.getItem(
    new Date(currentYear, currentMonth).getTime()
  );
  let monthEventsArrayParse = JSON.parse(monthEventsArray);

  insertBlankDays();
  insertDays(monthEventsArrayParse);
  monthTitle();
}

// In order to position the first day of the month in our grid, we display as many empty divs as previous days of the week to the first day of the month we have:
function insertBlankDays() {
  if (firstDay() == 0) {
    // In case the first day of our week is sunday (0), we display six empty divs (to position our first day as the seventh in the first week, instead of the first)
    for (let i = 0; i < 6; i++) {
      let newBlank = document.createElement("div");
      newBlank.innerHTML = "";
      daysMonth.appendChild(newBlank);
    }
  } else {
    for (let i = 1; i < firstDay(); i++) {
      let newBlank = document.createElement("div");
      newBlank.innerHTML = "";
      daysMonth.appendChild(newBlank);
    }
  }
}

function insertDays(monthEvents) {
  for (let i = 0; i < lastDay(); i++) {
    let day = i + 1;
    let dayUnix = new Date(currentYear, currentMonth, day).getTime();
    let tomorrowUnix = new Date(currentYear, currentMonth, day + 1).getTime();
    // -------------------------------

    // Get the events for each day
    let eventsHTML = "";
    let dayEvents = [];
    if (monthEvents != null) {
      monthEvents.forEach((event) => {
        // Verify the event is for the current day
        let eventInitialDate = new Date(event.initialDate).getTime();
        if (eventInitialDate >= dayUnix && eventInitialDate < tomorrowUnix)
          dayEvents.push(event);

        // If event is during the current day
        if (event.finalDate && event.finalDate != "") {
          let eventFinalDate = new Date(event.finalDate).getTime();

          // If event date is on range
          if (
            eventInitialDate <= dayUnix &&
            eventInitialDate < tomorrowUnix &&
            eventFinalDate >= dayUnix
          ) {
            dayEvents.push(event);
          }
        }
      });
    }
    let currentTime = new Date().getTime();

    // Detect when the DIV is the current day to add the styles
    let currentDayClasses = "";
    if (currentTime >= dayUnix && currentTime < tomorrowUnix) {
      currentDayClasses = "day__month today";
    } else {
      currentDayClasses = "day__month ";
    }

    // Sort the day Events
    dayEvents.sort((a, b) => {
      let timeA = new Date(a.initialDate).getTime();
      let timeB = new Date(b.initialDate).getTime();

      if (timeA < timeB) {
        return -1;
      } else if (timeA > timeB) {
        return 1;
      } else if (timeA === timeB) {
        return 0;
      }
    });

    dayEvents.forEach((event, index) => {
      // If there are more than 3 dont show more
      if (index >= 3)
        return (eventsHTML += `<div class="day__event-container"><div data-event class="more-events">See more events...</div></div>`);
      //To get event time
      let eventTime = new Date(event.initialDate).toLocaleTimeString("en", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      });

      // Verify type event to add class
      let typeEventClasses = "";
      if (event.eventType) typeEventClasses = event.eventType;

      eventsHTML += `
          <div data-event="${event.currentIdEvent}" class="day__event-container"><span class="day__event-title ${typeEventClasses}">${eventTime}, ${event.titleEvent}</span></div>
        `;
    });

    // Print day calendar
    daysMonth.innerHTML += `
            <div class="${currentDayClasses}">
                <div class="day__tittle" data-day="${day}" data-time="${dayUnix}">${day}</div>
                <div class="day__events">
                    ${eventsHTML}
                </div>
            </div>`;
  }
}

// --------------------------------------
function monthTitle() {
  let calendarTitle = document.getElementById("calendar-title");
  calendarTitle.innerHTML = new Date(currentYear, currentMonth).toLocaleString(
    "en",
    { month: "long", year: "numeric" }
  );
}

/* EXPORT */

export { renderCalendar };
