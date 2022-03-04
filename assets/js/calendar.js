/* IMPORT */
import { displayModal } from "./modal.js";
import { displayDayEvents } from "./day-events.js";

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

document.getElementById("daysMonth").addEventListener("click", (e) => {
  let target = e.target;
  // Click on day, then display pop-up to add event
  if (target.dataset.time) {
    let unixDataTime = new Date(parseInt(target.dataset.time) + 7200000); // We add two hours (7200000 miliseconds) to compensate the GMT +2 change in local time for Spain
    displayModal("addEvent", unixDataTime.toJSON().substr(0, 16));
  } else if (target.dataset.initialdate) {
    //displayModal('editEvent', target.dataset.event)
    displayModal("viewEvent", target.dataset.event);
  } else if (target.dataset.daynumber) {
    displayDayEvents({
      unix: target.dataset.dayunix,
      number: target.dataset.daynumber,
    });
  }
});

function renderCalendar(month) {
  daysMonth.innerHTML = "";
  currentMonth += month;

  let storageObj = { ...localStorage };

  insertBlankDays();
  insertDays(storageObj);
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

function insertDays(eventsObj) {
  for (let i = 0; i < lastDay(); i++) {
    let day = i + 1;
    let dayUnix = new Date(currentYear, currentMonth, day).getTime();
    let tomorrowUnix = new Date(currentYear, currentMonth, day + 1).getTime();

    // Get the events for each day
    let eventsHTML = "";
    let dayEvents = [];
    if (eventsObj != null) {
      for (const key in eventsObj) {
        let event = JSON.parse(eventsObj[key])[0];
        event.currentIdEvent = key;

        // Verify the event is for the current day
        let eventInitialDate = new Date(event.initialDate).getTime();
        if (eventInitialDate >= dayUnix && eventInitialDate < tomorrowUnix) {
          dayEvents.push(event);
        } else {
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
        }
      }
    }

    let currentTime = new Date().getTime();

    // Detect when the DIV is the current day to add the styles
    let currentDayClasses = "";
    if (currentTime >= dayUnix && currentTime < tomorrowUnix) {
      currentDayClasses = "day__month today";
    } else if (currentTime > dayUnix) {
      currentDayClasses = "day__month past";
    } else {
      currentDayClasses = "day__month";
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

    let seeMoreEvents = "";
    dayEvents.forEach((event, index) => {
      // If there are more than 3 dont show more
      if (index >= 3)
        return (seeMoreEvents = `<div class="day__event-container"><div data-event class="more-events">···</div></div>`);
      //To get event time
      let eventTime = new Date(event.initialDate).toLocaleTimeString("en", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      // Verify type event to add class
      let typeEventClasses = "";
      if (event.eventType) typeEventClasses = event.eventType;

      eventsHTML += `
          <div data-event="${event.currentIdEvent}" data-initialdate="${event.initialDate}" class="day__event-container"><span class="day__event-title ${typeEventClasses}">${eventTime}, ${event.titleEvent}</span></div>
        `;
    });

    // Print day calendar
    daysMonth.innerHTML += `
            <div class="${currentDayClasses}">
                <button data-time="${dayUnix}" class="day__btn--add">+</button>
                <div class="day__tittle" data-daynumber="${day}" data-dayunix="${dayUnix}">${day}</div>
                <div class="day__events">
                    ${eventsHTML}
                    ${seeMoreEvents}
                </div>
            </div>`;
  }
}

function monthTitle() {
  let calendarTitle = document.getElementById("calendar-title");
  calendarTitle.innerHTML = new Date(currentYear, currentMonth).toLocaleString(
    "en",
    { month: "long", year: "numeric" }
  );
}

/* EXPORT */

export { renderCalendar };
