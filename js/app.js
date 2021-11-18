import CreateModal from "./modals/CreateModal.js";
import ShowInfoModal from "./modals/ShowInfoModal.js";
import { body, calendar, weekdays, events } from "./variables.js";
import createModalToEdit from "./modals/modalEdit.js"

let currentMonth = 0;
let isModalOpen = false;

// Main function for creating the calendar month dinamically
export function displayCalendar() {
    const mainDate = new Date();
    if (currentMonth !== 0) {
        mainDate.setMonth(new Date(). getMonth() + currentMonth);
    }

    const day = mainDate.getDate();
    const month = mainDate.getMonth();
    const year = mainDate.getFullYear();

    const firstDayOfMonth = new Date(year, month, 1); //first day of the current month
    const lastDayOfMonth = new Date(year, month + 1, 0); //last day of the current month
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // month + 1 gets you the next month and the 0 gives you the last day of the previous month which is the length of the current month
    const daysInPrevMonth = new Date(year, month, 0).getDate();
    const dateString = firstDayOfMonth.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });
    const dateString2 = lastDayOfMonth.toLocaleDateString('en-GB', {
        weekday: 'long',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
    });


    //calculate padding days based on what day is the first day of the month
    const paddingDaysBefore = weekdays.indexOf(dateString.split(', ')[0]);
    const paddingDaysAfter = 6 - (weekdays.indexOf(dateString2.split(', ')[0]));

    document.querySelector('#current-month').innerHTML = `<b>${mainDate.toLocaleDateString('en-GB', {month: 'long'})}</b> ${year}`;
    let dataMonth = mainDate.toLocaleDateString('en-GB', {month: 'numeric'});

    calendar.innerHTML = ''; //resets the calendar before creating all the days of each month

    for (let i = 1; i <= paddingDaysBefore + daysInMonth + paddingDaysAfter; i++) { // we would render days of the month plus all padding days
        const dayElement = document.createElement('div');
        const dayNumber = document.createElement('span');
        const eventsDiv = document.createElement('div');
        dayElement.classList.add('day');
        dayNumber.classList.add('day-number');
        dayElement.appendChild(dayNumber);
        dayElement.appendChild(eventsDiv);
        // check if that day is a padding day or not
        if (i <= paddingDaysBefore) {
            dayElement.classList.add('padding');
            //dayElement.addEventListener('click', () => console.log('PADDING DAY BEFORE'));
            dayNumber.innerText = (daysInPrevMonth - paddingDaysBefore) + i;
            dayNumber.setAttribute('data-date', `${dayNumber.innerText}/${dataMonth-1}/${year}`);
        } else if (i < paddingDaysBefore + daysInMonth + 1) {
            dayNumber.innerText = i - paddingDaysBefore;
            dayNumber.setAttribute('data-date', `${dayNumber.innerText}/${dataMonth}/${year}`);
            //dayElement.addEventListener('click', () => console.log(''));
        } else {
            dayElement.classList.add('padding');
            //dayElement.addEventListener('click', () => console.log('PADDING DAY AFTER'));
            dayNumber.innerText = i - daysInMonth - paddingDaysBefore;
            dayNumber.setAttribute('data-date', `${dayNumber.innerText}/${dataMonth+1}/${year}`);
        }

        dayElement.addEventListener('click', (e) => {
                const currentMonth = document.getElementById("current-month");
                const calendar = document.getElementById("calendar");
                for(let i = 0; i < calendar.childNodes.length; i++){
                    if(calendar.childNodes[i] == dayElement){
                        //edge case event border
                        if(e.clientX < 410 && e.target.firstChild.attributes!=undefined){
                            createBackground();
                            new CreateModal(e.clientX, e.clientY / 2, weekdays[i%7], dayElement.firstChild.innerText, currentMonth.textContent, e.target.firstChild.attributes[1].nodeValue);
                            console.log(dayElement.childNodes[0], currentMonth.textContent)
                            console.log(dayElement.firstChild.attributes[1].nodeValue);
                        }else if (e.target.firstChild.attributes!=undefined){
                            createBackground();
                            new CreateModal(e.clientX - 400, e.clientY / 2, weekdays[i%7], dayElement.firstChild.innerText, currentMonth.textContent, e.target.firstChild.attributes[1].nodeValue)
                        }
                    }
                }
                isModalOpen = true;
        });
        calendar.appendChild(dayElement); // adding the day square to the calendar
    }

    // Format today with a red square
    const dayList = document.querySelectorAll('.day');
    function highlightToday() {
        dayList.forEach(element => {
            if (element.innerText === day.toString() && currentMonth === 0){
                element.firstChild.classList.add('day-today');
            }
        })
    }
    highlightToday();
    fetchEvents();
    openModalEdit();
}


document.getElementById('nextBtn').addEventListener('click', () =>{
    currentMonth++;
    displayCalendar();
});
document.getElementById('prevBtn').addEventListener('click', () =>{
    currentMonth--;
    displayCalendar();
});
document.getElementById('today').addEventListener('click', () =>{
    currentMonth = 0;
    displayCalendar();
});
//create event button
document.getElementById('create-event').addEventListener('click', (e) =>{
    createBackground();
    new CreateModal(e.target.offsetLeft - 430, e.target.y);
});

displayCalendar();

export function createBackground(){
    const background = document.createElement("div");
    background.classList.add("modalBackground");
    body.appendChild(background);
}

//Select event and open modal
export function openModalEdit(){
    const eventList = document.querySelectorAll('.event'); 
    eventList.forEach(element => {
        element.removeEventListener("click",createModalToEdit);
        element.addEventListener('click', createModalToEdit);
        });
}



export function fetchEvents() {
    // Check local storage and fetch events
    const dayList = document.querySelectorAll('.day');
    //let event = JSON.parse(localStorage.getItem('events'));
    if (events === null) return;
    //solo coge el valor 1
    dayList.forEach(element => {
        let dailyEvents = events.filter(events => events.startDate === element.firstChild.attributes[1].nodeValue);
        if(dailyEvents.length > 0){
            element.lastChild.innerHTML = '';
            for (let i = 0; i < dailyEvents.length; i++) {
                const newEvent = document.createElement('p');
                //console.log(events[i].eventID);
                newEvent.setAttribute("data-eventid", events[i].eventID);
                //console.log(newEvent.attributes[0]);
                newEvent.innerHTML = `${dailyEvents[i].title} <span class="event-data">${events[i].day} ${events[i].month} ${events[i].year} </span>`;
                newEvent.classList.add('event');
                element.lastChild.appendChild(newEvent);
            }
        }
    })
}


const allEvents = document.querySelectorAll('.event');

allEvents.forEach(event => {
    event.addEventListener('click', (e) =>{
        console.log(e.target);
        //new ShowInfoModal();
    });
});
