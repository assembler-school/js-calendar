import CreateModal from "./modals/CreateModal.js";
import ShowInfoModal from "./modals/ShowInfoModal.js";
import { calendar, weekdays, events, setIsModalOpen, getIsModalOpen, body } from "./variables.js";

let currentMonth = 0;

displayCalendar();
changeMonthButton();
fetchEvents();

// Main function for creating the calendar month dinamically
function displayCalendar() {

    const mainDate = new Date();
    if (currentMonth !== 0) mainDate.setMonth(new Date(). getMonth() + currentMonth);

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
            dayNumber.innerText = (daysInPrevMonth - paddingDaysBefore) + i;
            if(parseInt(dataMonth) - 1 === 0) dayNumber.setAttribute('data-date', `${dayNumber.innerText}/${12}/${year}`);
            else dayNumber.setAttribute('data-date', `${dayNumber.innerText}/${parseInt(dataMonth)-1}/${year}`);
        } else if (i < paddingDaysBefore + daysInMonth + 1) {
            dayNumber.innerText = i - paddingDaysBefore;
            dayNumber.setAttribute('data-date', `${dayNumber.innerText}/${dataMonth}/${year}`);
        } else {
            dayElement.classList.add('padding');
            dayNumber.innerText = i - daysInMonth - paddingDaysBefore;
            if(parseInt(dataMonth) + 1 === 13) dayNumber.setAttribute('data-date', `${dayNumber.innerText}/${1}/${year}`);
            else dayNumber.setAttribute('data-date', `${dayNumber.innerText}/${parseInt(dataMonth)+1}/${year}`);
        }

        //Create modal
        dayElement.addEventListener('click', (e) => {
            if(!getIsModalOpen()){
                const currentMonth = document.getElementById("current-month");
                const calendar = document.getElementById("calendar");
                for(let i = 0; i < calendar.childNodes.length; i++){
                    if(calendar.childNodes[i] == dayElement){
                        if(e.target.className === "event"){
                            const event = events.filter(events => events.eventID === parseInt(e.target.dataset.eventid));                            
                            if(e.clientX < 410) new ShowInfoModal(e.x, e.y - 80, event[0]);
                            else new ShowInfoModal(e.x - 400, e.y - 80, event[0]);
                        } else {
                            //edge case event border
                            if(e.clientX < 410 && e.target.firstChild.attributes != undefined){
                                new CreateModal(e.x, e.y / 2, weekdays[i%7], dayElement.firstChild.innerText, currentMonth.textContent, e.target.firstChild.attributes[1].nodeValue);
                            } else if (e.target.firstChild.attributes != undefined){
                                new CreateModal(e.x - 400, e.y / 2, weekdays[i%7], dayElement.firstChild.innerText, currentMonth.textContent, e.target.firstChild.attributes[1].nodeValue)
                            }
                        }
                        setIsModalOpen(true);
                    }
                }
            } else setIsModalOpen(false);
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
}

function changeMonthButton(){
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
    })
};

//create event button
document.getElementById('create-event').addEventListener('click', (e) =>{
    //today date
    new CreateModal(e.target.offsetLeft - 430, e.target.y);
});

// Check local storage and fetch events
export function fetchEvents() {
    const dayList = document.querySelectorAll('.day');
    if (events === null) return;
    dayList.forEach(element => {
        element.childNodes[1].innerHTML = "";
        const dailyEvents = events.filter(events => events.startDate === element.firstChild.dataset.date);
        if(dailyEvents.length > 0){
            dailyEvents.forEach(event => {
                const newEvent = document.createElement('p');
                newEvent.setAttribute("data-eventID", event.eventID);
                newEvent.innerHTML = `${event.title}`;
                newEvent.classList.add('event');
                element.lastChild.appendChild(newEvent);
            });
        }
    })
}