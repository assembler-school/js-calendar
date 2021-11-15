let currentMonth = 0;
let clickedDay = null;
let events = localStorage.getItem('events') ? JSON.parse(localStorage.getItem('events')) : []; // fetching events from LocalStorage, if it doest't exist return an empty array

const calendar = document.querySelector('#calendar');
const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// Main function for creating the calendar month dinamically
function displayCalendar() {
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
        dayElement.classList.add('day');
        // check if that day is a padding day or not
        if (i <= paddingDaysBefore) {
            dayElement.classList.add('padding');
            dayElement.addEventListener('click', () => console.log('PADDING DAY BEFORE'));
            dayElement.innerText = (daysInPrevMonth - paddingDaysBefore) + i;
        } else if (i < paddingDaysBefore + daysInMonth + 1) {
            dayElement.innerText = i - paddingDaysBefore;
            dayElement.addEventListener('click', () => console.log('click'));
        } else {
            dayElement.classList.add('padding');
            dayElement.addEventListener('click', () => console.log('PADDING DAY AFTER'));
            dayElement.innerText = i - daysInMonth - paddingDaysBefore;
        }
        calendar.appendChild(dayElement); // adding the day square to the calendar
    }
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


displayCalendar();