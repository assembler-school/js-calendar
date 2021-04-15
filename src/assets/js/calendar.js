const date = new Date();
const modalDivs = document.getElementById("modal-event-div");
/* * Set the current date in header */
function setCurrentDate () {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    document.querySelector("#current-date").innerHTML = new Date().toLocaleDateString('en-GB', options);
}
setCurrentDate();
const changeHeaderBackground = () =>{
    const head = document.getElementById('header');
    const actualMonth = date.getMonth()+1;

    if(actualMonth > 11 || actualMonth < 3){
        head.className = 'winterHeader';
    }else if( actualMonth > 2 && actualMonth < 6 ){
        head.className = 'springHeader';
    }else if(actualMonth > 5 && actualMonth < 9 ){
        head.className = 'summerHeader';
    }else if(actualMonth > 8 && actualMonth < 12  ){
        head.className = 'fallHeader';
    }
}
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
        days += `<div class="prev-date day ${direction}"><div class = "day-number">${prevLastDay - x + 1}</div></div>`;
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
        days += `<div class="next-date day ${direction}"><div class = "day-number">${j}</div></div>`;
    }
    /* Injecting all elements to DOM */
    removeEachListener();
    monthDays.innerHTML = days;
    renderEvent () ;
    addEachListener();
    changeHeaderBackground();
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

function enableArrowKeys() {
    window.addEventListener('keyup',keyChanger);
}

function disabledArrowKeys() {
    window.removeEventListener('keyup', keyChanger);
}

function keyChanger(event) {
    let leftNow = event.keyCode || event.which;
    let rightNow = event.keyCode || event.which;
    if (leftNow == 37) {
        date.setMonth(date.getMonth() - 1);
        renderCalendar("left");
    }
    if (rightNow == 39) {
        date.setMonth(date.getMonth() + 1);
        renderCalendar("right");
    };
}

enableArrowKeys();
//? Function to render events inside of calendar

function renderEvent () {
    const daysContainer = document.querySelectorAll(".current-month-day");
    const previousDaysContainer = document.querySelectorAll(".prev-date");
    const nextDaysContainer = document.querySelectorAll(".next-date");
    eventDivsInjector (previousDaysContainer, -1);
    eventDivsInjector (daysContainer, 0);
    eventDivsInjector (nextDaysContainer, 1);
}

function eventDivsInjector (divsNodeList, monthGap) {
    let currentMonth;
    switch (monthGap) {
        case 0:
            currentMonth = date.getMonth() + 1;
            break;
        case -1:
            if (date.getMonth() === 0) {
                currentMonth = 12
            } else {
                currentMonth = date.getMonth();
            }
            break;
        case 1:
            if (date.getMonth() === 11) {
                currentMonth = 1
            } else {
                currentMonth = date.getMonth() + 2;
            }
            break;
        default:
            break;
    }
    const currentYear = date.getFullYear();
    //* Calendar days divs pass by
    for (let div of divsNodeList) {
        const dayNumber = div.firstChild.innerHTML;
        //* checking that day has events
        if (!!eventsByDate[`${currentYear}-${currentMonth}-${dayNumber}`]) {
            let eventArray = eventsByDate[`${currentYear}-${currentMonth}-${dayNumber}`];
            //* sorting events in array
            let eventIdsWithStartDate = [];
            for (let eventObjectId of eventArray) {
                const newEventObject = { id: eventObjectId, startDate: eventsById[eventObjectId].startDate};
                eventIdsWithStartDate.push(newEventObject);
            }
            eventIdsWithStartDate.sort( compare );
            //* Looping thru events in sorted array
            for (let eventObject of eventIdsWithStartDate){
                //* Access to event data
                const eventTitle = eventsById[eventObject.id].title;
                const eventType = eventsById[eventObject.id].eventType;
                //* Create of the event element
                let newEvent = document.createElement("div");
                newEvent.classList.add("event-in-calendar");
                newEvent.innerHTML = eventTitle;
                newEvent.setAttribute("divEventId", eventObject.id);
                //* choosing event color depending of event type
                switch (eventType) {
                    case 'Study':
                        newEvent.classList.add("yellow-event");
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
//? Function to compare start dates for future sorting
function compare( a, b ) {
    if ( a.startDate < b.startDate ){
      return 1;
    }
    if ( a.startDate > b.startDate ){
      return -1;
    }
    return 0;
}