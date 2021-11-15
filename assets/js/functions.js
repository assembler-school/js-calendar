const months = {
    0: 'January',
    1: 'Feburary',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
};

const smallCalendar = document.getElementById("calendar_minicalendar");
const bigCalendar = document.getElementById("calendar");

//Obtain calculate to previous days of actual month
function prevDaysOfMonth() {
    const firstDayIndex = actual_date.getDay() - 1;
    const prevLastDay = new Date(actual_date.getFullYear(),actual_date.getMonth(),0).getDate();
    return {
        firstDayIndex: firstDayIndex,
        prevLastDay: prevLastDay
    }
}

//Obtain calculate to days of actual month
function daysOfMonth() {
    const lastDay = new Date(actual_date.getFullYear(),actual_date.getMonth() + 1,0).getDate();
    return lastDay;
}

//Obtain calculate to next days of actual month
function nextDaysOfMonth() {
    const lastDayIndex = new Date(actual_date.getFullYear(),actual_date.getMonth() + 1,0).getDay();
    const nextDays = 7 - lastDayIndex;
    return nextDays;
}

//Save the previous date day of the actual month
function saveDatePrevDayOfMonth(dayMonth, index) {
    dayMonth.dataset.day = index
    dayMonth.dataset.month = (actual_date.getMonth() === 0) ? 11 : actual_date.getMonth() - 1;
    dayMonth.dataset.year = (actual_date.getMonth() === 0) ? actual_date.getFullYear() - 1 : actual_date.getFullYear();
}

//Save the date day of the actual month
function saveDateDayOfMoth(dayMonth,index) {
    dayMonth.dataset.day = index
    dayMonth.dataset.month = actual_date.getMonth()
    dayMonth.dataset.year = actual_date.getFullYear()
}

//Save the next date day of the actual month
function saveDateNextDayOfMonth(dayMonth, index) {
    dayMonth.dataset.day = index
    dayMonth.dataset.month = (actual_date.getMonth() === 11) ? 0 : actual_date.getMonth() + 1;
    dayMonth.dataset.year = (actual_date.getMonth() === 11) ? actual_date.getFullYear() + 1 : actual_date.getFullYear();
}

//Draw the days of one weekend and month and year actual
function headerCal(){
    var dateCalendar = document.getElementsByClassName("date-calendar");
    const month = months[actual_date.getMonth()];
    for (const element of dateCalendar) {
        element.textContent = `${month} de ${actual_date.getFullYear()}`;
    }
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    for (let index = 0; index < weekDays.length; index++) {
        var smallWeekDay = newElement({tag: 'div', id: '', clas: [], content: weekDays[index]});
        var bigWeekDay = newElement({tag: 'div', id: '', clas: [], content: weekDays[index]});
        smallCalendar.appendChild(smallWeekDay)
        bigCalendar.appendChild(bigWeekDay)
    }
}

//Show the previous days of the actual month
function prevMonthCal() {
    let prevDays = prevDaysOfMonth();
    for (let index = prevDays.firstDayIndex; index > 0; index--) {
        var smallDayMonth = newElement({tag: 'div', id: '', clas: ['number-days'], content: prevLastDay - index});
        var bigDayMonth = newElement({tag: 'div', id: '', clas: ['number-days'], content: prevLastDay - index});
        saveDatePrevDayOfMonth(smallDayMonth, index);
        saveDatePrevDayOfMonth(bigDayMonth, index);
        smallCalendar.appendChild(smallDayMonth);
        bigCalendar.appendChild(bigDayMonth);
    }
}

//Show the days of the actual month
function monthActualCal() {
    let lastDay = daysOfMonth();
    for (let index = 1; index <= lastDay; index++) {
        var smallDayMonth = newElement({tag: 'div', id: '', clas: ['number-days'], content: index});
        var bigDayMonth = newElement({tag: 'div', id: '', clas: ['number-days'], content: index});
        saveDateDayOfMoth(smallDayMonth, index);
        saveDateDayOfMoth(bigDayMonth, index);
        smallCalendar.appendChild(smallDayMonth);
        bigCalendar.appendChild(bigDayMonth);
    }
}

//Show the next days of the actual month
function nextMonthCal() {
    let nextDays = nextDaysOfMonth();
    for (let index = 1; index <= nextDays; index++) {
        var smallDayMonth = newElement({tag: 'div', id: '', clas: ['number-days'], content: index});
        var bigDayMonth = newElement({tag: 'div', id: '', clas: ['number-days'], content: index});
        saveDateNextDayOfMonth(smallDayMonth, index);
        saveDateNextDayOfMonth(bigDayMonth, index);
        smallCalendar.appendChild(smallDayMonth);
        bigCalendar.appendChild(bigDayMonth);
    }
}


//Create the  complete minicalendar.
function addMiniCal() {
    smallCalendar.innerHTML = null;
    headerCal();
    prevMonthCal()
    monthActualCal()
    nextMonthCal()
}

//Create the complete calendar.
function addCal() {
    bigCalendar.innerHTML = null;
    headerCal();
    prevMonthCal()
    monthActualCal()
    nextMonthCal()
}

//Events all days of calendar
document.querySelectorAll(".number-days").forEach (element => {
    element.addEventListener("click", event => {
        var year = event.target.dataset.year
        var month = event.target.dataset.month
        var day = event.target.dataset.day
        console.log(new Date(year, month, day))
    })
})