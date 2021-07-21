/* IMPORT */

/* GLOBAL VARIABLES */
let currentMonth = new Date().getMonth() + 1; // We add one to more legible data retrieved (else we will have january as month number 0)
let currentYear = new Date().getFullYear();
let daysMonth = document.getElementById("daysMonth");

/* CALENDAR FUNCTIONALITIES */
let firstDay = function () { // We get the value (as number) of the weekday the first day in our month starts with
  return new Date(currentYear, currentMonth - 1, 1).getDay();
};

let lastDay = function () { // We get the value (as number) of how many days our current month has
  return new Date(currentYear, currentMonth, 0).getDate(); // * WE CAN'T SUBSTRACT 1 TO THE CURRENT MONTH WITH A GETDAY METHOD, OR WE WILL HAVE A WRONG DATA
};

function renderCalendar() {
  
  daysMonth.innerHTML = '';

  //let eventIdsArray = JSON.parse(window.localStorage.getItem(currentMonth))

  insertBlankDays();
  insertDays();
  nextButton();
  monthTitle();
  prevButton();


}


// In order to position the first day of the month in our grid, we display as many empty divs as previous days of the week to the first day of the month we have:
function insertBlankDays() {
  if (firstDay() == 0) { // In case the first day of our week is sunday (0), we display six empty divs (to position our first day as the seventh in the first week, instead of the first)
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

function insertDays() {
  for (let i = 0; i < lastDay(); i++) {
    let newBlank = document.createElement("div");
    let day = i + 1;
    // TO DO! Iterate trough every event from current Month in local storage
    newBlank.innerHTML = `<div data-date="${ new Date(currentYear, currentMonth, day).getTime() }">${day}</div>`;
    daysMonth.appendChild(newBlank);
  }
}

function nextButton() {
  let nextBtn = document.getElementById("next-btn");
  nextBtn.addEventListener("click", () => moveMonth(1));
}
function prevButton() {
  let prevBtn = document.getElementById("prev-btn");
  prevBtn.addEventListener("click", () => moveMonth(-1));
}

function moveMonth(month) {
  currentMonth += month
  daysMonth.innerHTML = "";
  insertBlankDays();
  insertDays();
  monthTitle();
}

function monthTitle() {
  let calendarTitle = document.getElementById("calendar-title");
  calendarTitle.innerHTML = new Date(
    currentYear,
    currentMonth - 1
  ).toLocaleString("en", { month: "long", year: "numeric" });
}

/* EXPORT */

export {
  renderCalendar
};
