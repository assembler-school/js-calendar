import CreateModal from "./modals/CreateModal.js";
import { body, calendar, weekdays } from "./variables.js";

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

    calendar.innerHTML = ''; //resets the calendar before creating all the days of each month

    for (let i = 1; i <= paddingDaysBefore + daysInMonth + paddingDaysAfter; i++) { // we would render days of the month plus all padding days
        const dayElement = document.createElement('div');
        const dayNumber = document.createElement('span');
        dayElement.classList.add('day');
        dayNumber.classList.add('day-number');
        dayElement.appendChild(dayNumber);
        // check if that day is a padding day or not
        if (i <= paddingDaysBefore) {
            dayElement.classList.add('padding');
            //dayElement.addEventListener('click', () => console.log('PADDING DAY BEFORE'));
            dayNumber.innerText = (daysInPrevMonth - paddingDaysBefore) + i;
        } else if (i < paddingDaysBefore + daysInMonth + 1) {
            dayNumber.innerText = i - paddingDaysBefore;
            //dayElement.addEventListener('click', () => console.log(''));
        } else {
            dayElement.classList.add('padding');
            //dayElement.addEventListener('click', () => console.log('PADDING DAY AFTER'));
            dayNumber.innerText = i - daysInMonth - paddingDaysBefore;
        }

        // dayElement.addEventListener('click', (e) => {
        //         const currentMonth = document.getElementById("current-month");
        //         const calendar = document.getElementById("calendar");
        //         for(let i = 0; i < calendar.childNodes.length; i++){
        //             if(calendar.childNodes[i] == dayElement){
        //                 if(e.clientX < 410) {
        //                     createBackground();
        //                     new CreateModal(e.clientX, e.clientY / 2, weekdays[i%7], dayElement.textContent, currentMonth.textContent);
        //                 }else{
        //                     createBackground();
        //                     new CreateModal(e.clientX - 400, e.clientY / 2, weekdays[i%7], dayElement.textContent, currentMonth.textContent)
        //                 }
        //             }
        //         }
        //         isModalOpen = true;
        // });
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
    highlightToday()

    // Check local storage and fetch events
    const displayMonth = document.querySelector('#current-month').innerText.split(' ')[0];
    const displayYear = document.querySelector('#current-month').innerText.split(' ')[1];
    let event = JSON.parse(localStorage.getItem('2'));
    dayList.forEach(element => {
        if(event !== null && element.innerText === event.day && displayMonth === event.month && displayYear === event.year) {
            const newEvent = document.createElement('p');
            newEvent.innerText = event.title;
            newEvent.classList.add('event');
            element.appendChild(newEvent); //Does not reload the element
        }
    })
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
    new CreateModal(e.target.offsetLeft - 430, e.target.y);
});

displayCalendar();

function createBackground(){
    const background = document.createElement("div");
    background.classList.add("modalBackground");
    body.appendChild(background);
}
export default createBackground;

const dayList = document.querySelectorAll('.day');
dayList.forEach(element => {
    element.addEventListener('click', (e) =>{
        new CreateModal;
    });
})