const date = new Date();
const modalDivs = document.getElementById("modal-event-div");
/* * Set the current date in header */
function setCurrentDate () {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.querySelector("#current-date").innerHTML = new Date().toLocaleDateString('en-GB', options);
}
setCurrentDate();
/*
 * This function create calendar
 * set calendar
 * @ Author: Armando
 */
const renderCalendar = (direction) => {
    date.setDate(1);
    const monthDays = document.querySelector(".days-wrapper");
/* Gets total days of current month */
    const lastDay = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDate();
/* Gets total days of last month */
    const prevLastDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        0
    ).getDate();

    const firstDayIndex = date.getDay();
/* Gets total days of last month  */
    const lastDayIndex = new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        0
    ).getDay();
/* Days no te completed of the current month */
    const nextDays = 7 - lastDayIndex - 1;

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    document.querySelector(".page-title").innerHTML = months[date.getMonth()] +" "+ date.getFullYear();

    let days = "";
    // creating div with prev days of calendar
    for (let x = firstDayIndex; x > 0; x--) {
        days += `<div class="prev-date ${direction}"><div class = "next-date day day-number">${prevLastDay - x + 1}</div></div>`;
    }
    // creating div with days of calendar
    for (let i = 1; i <= lastDay; i++) {
        if (
            i === new Date().getDate() &&
            date.getMonth() === new Date().getMonth() &&
            date.getFullYear() === new Date().getFullYear()
        ) {
            days += `<div class="day today current-month-day ${direction}"><div class = "day-number">${i}</div></div>`;
        } else {
            days += `<div class = "day current-month-day ${direction}"><div class = "day-number">${i}</div></div>`;
        }
    }
// creating div with next days of calendar
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="${direction}"><div class = "next-date day day-number">${j}</div></div>`;
    }
    /* Injecting all elements to DOM */
    monthDays.innerHTML = days;
    renderEvent () ;
    addEachListener();
};
document.querySelector("#prevMonth").addEventListener("click", () => {
    date.setMonth(date.getMonth() - 1);
    renderCalendar("left");
});

document.querySelector("#nextMonth").addEventListener("click", () => {
    date.setMonth(date.getMonth() + 1);
    renderCalendar("right");
});

renderCalendar("");
// adding wheel  to change month
window.addEventListener('wheel', function (event) {
    if (event.deltaY < 0) {
        date.setMonth(date.getMonth() - 1);
        renderCalendar("left");
    } else if (event.deltaY > 0) {
        date.setMonth(date.getMonth() + 1);
        renderCalendar("right");
    }
});

//? Function to render events inside of calendar

function renderEvent () {
    const daysContainer = document.querySelectorAll(".current-month-day");
    const currentMonth = date.getMonth() + 1;
    const currentYear = date.getFullYear();
    //* Calendar days divs pass by
    for (let div of daysContainer) {
        const dayNumber = div.firstChild.innerHTML;
        //* checking that day has events
        if (!!eventsByDate[`${currentYear}-${currentMonth}-${dayNumber}`]) {
            //* Looping thru events in array
            for (let eventObjectId of eventsByDate[`${currentYear}-${currentMonth}-${dayNumber}`]){
                //* Access to event data
                const eventTitle = eventsById[eventObjectId].title;
                const eventType = eventsById[eventObjectId].eventType;
                //* Create of the event element
                let newEvent = document.createElement("div");
                newEvent.classList.add("event-in-calendar");
                newEvent.innerHTML = eventTitle;
                newEvent.setAttribute("divEventId", eventObjectId);
                //* choosing event color depending of event type
                switch (eventType) {
                    case 'Study':
                        newEvent.classList.add("blue-event");
                        break;
                    case 'Meeting':
                        newEvent.classList.add("green-event");
                        break;
                    case 'Personal':
                        newEvent.classList.add("orange-event");
                        break;
                    default:
                        break;
                }
                newEvent.addEventListener('click', eventModal);
                //* Insert element in DOM
                div.firstChild.insertAdjacentElement('afterend',newEvent);
            }
        }
    }
}