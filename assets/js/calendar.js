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
let firstDay = function() {
    // We get the value (as number) of the weekday the first day in our month starts with
    return new Date(currentYear, currentMonth, 1).getDay();
};

let lastDay = function() {
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
        let newBlank = document.createElement("div");
        let day = i + 1;
        let tomorrow = day + 1;
        let dayUnix = new Date(currentYear, currentMonth, day).getTime();
        let tomorrowUnix = new Date(currentYear, currentMonth, day + 1).getTime();
        newBlank.innerHTML += `<div>${day}`;
        if (monthEvents != null) {
            monthEvents.forEach((event) => {
                let eventInitialDate = new Date(event.initialDate).getTime();
                if (eventInitialDate >= dayUnix && eventInitialDate < tomorrowUnix) {
                    newBlank.innerHTML += `<div>${event.titleEvent}</div>`;
                }
            });
        }
        newBlank.innerHTML += `</div>`;
        daysMonth.appendChild(newBlank);
    }
}

function monthTitle() {
    let calendarTitle = document.getElementById("calendar-title");
    calendarTitle.innerHTML = new Date(currentYear, currentMonth).toLocaleString(
        "en", { month: "long", year: "numeric" }
    );
}

/* EXPORT */

export { renderCalendar };