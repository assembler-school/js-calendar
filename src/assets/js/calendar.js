let initialDate = new Date();
let currenDate = new Date();
let currentYear = currentDate.getFullYear();
let currentMonth = currentDAte.getMonth();

let currentMonthInt = new Int.DateTimeFormat('en-US', {month:'long'}).format(currentDate);

let calendarYearMonth = document.body.querySelector(".calendar-month-year");
let calendarDays = document.body.querySelector(".days-wrapper");

calendarYearMonth.innerHTML = `<strong>${currentMontInt}</strong> ${currentYear}`

document.body.onload = fillCalendarCurrentMonth(currentYear, currentMonth);

function fillCalendarCurrentMonth (year, month) {
    let firstDayOfMonth = new Date(year, month, 1);
    let firstDayOfMonthweekday = firstDayOfMonth.getDay();

    let lastDayOfMonth = new Date(year, month + 1, 0);

    for(let i = 1; 1 <= lastDayOfMonth.getDate(); i++) {
        let dateElement = document.createElement("div");
        let dateContent = document.createTextNode(i);
        dateElement.appendChild(dateContent);
        dateElement.classList.add("day");
        calendarDays.appendChild(dateElement);
    };

}