/* IMPORT */

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
  console.log(currentYear);
  console.log(currentMonth);
}

// In order to position the first day of the month in our grid, we display as many empty divs as previous days of the week to the first day of the month we have:
function insertBlankDays() {
  if (firstDay() == 0) {
    // In case the first day of our week is sunday (0), we display six empty divs (to position our first day as the seventh in the first week, instead of the first)
    for (let i = 0; i < 6; i++) {
      let newBlank = document.createElement("div");
      newBlank.innerHTML = "";
      daysMonth.appendChild(newBlank);
      newBlank.setAttribute("class", "blank__day");
    }
  } else {
    for (let i = 1; i < firstDay(); i++) {
      let newBlank = document.createElement("div");
      newBlank.innerHTML = "";
      daysMonth.appendChild(newBlank);
      newBlank.setAttribute("class", "blank__day");
    }
  }
}

function insertDays(monthEvents) {
  for (let i = 0; i < lastDay(); i++) {
    let day = i + 1;
    let dayUnix = new Date(currentYear, currentMonth, day).getTime();
    let tomorrowUnix = new Date(currentYear, currentMonth, day + 1).getTime();
    let currentDay = new Date().getTime();

    let dayClasses = ""; //Detect if the day we print is today

    if (currentDay >= dayUnix && currentDay < tomorrowUnix) {
      dayClasses += "day__month today ";
    } else {
      dayClasses += " day__month ";
    }

    let dayEvent = ""; //Get the events in its day
    if (monthEvents != null) {
      monthEvents.forEach((event) => {
        let eventInitialDate = new Date(event.initialDate).getTime();
        let eventTime = new Date(event.initialDate).toLocaleTimeString("en", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        let eventClasses = "";
        if (event.eventType) {
          eventClasses += event.eventType;
        }
        if (eventInitialDate >= dayUnix && eventInitialDate < tomorrowUnix) {
          dayEvent += `<div class="${eventClasses}">${eventTime}, ${event.titleEvent}</div>`;
        }
      });
    }
    daysMonth.innerHTML += `
    <div class="${dayClasses}">${day}
      ${dayEvent}
    </div>
    `;
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
