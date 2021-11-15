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

/*const actual_month = actual_date.getMonth();
console.log(actual_month);
*/

const monthDays = document.getElementById("calendar_minicalendar");

function prevDaysOfMonth() {
    const firstDayIndex = actual_date.getDay() - 1;
    const prevLastDay = new Date(actual_date.getFullYear(),actual_date.getMonth(),0).getDate();
    return {
        firstDayIndex: firstDayIndex,
        prevLastDay: prevLastDay
    }
}

function daysOfMonth() {
    const lastDay = new Date(actual_date.getFullYear(),actual_date.getMonth() + 1,0).getDate();
    return lastDay;
}

function nextDaysOfMonth() {
    const lastDayIndex = new Date(actual_date.getFullYear(),actual_date.getMonth() + 1,0).getDay();
    const nextDays = 7 - lastDayIndex;
    return nextDays;
}

addMiniCal();
function addMiniCal() {
    monthDays.innerHTML = null;
    headerCal();
    //3.prevMonthMiniCal to days of last month
    prevMonthMiniCal()
    //4.monthMiniCal to days of month
    monthlMiniCal()
    //5.nextMiniCal to days of next month
    nextMiniCal()
}

function headerCal(){
    var dateCalendar = document.getElementsByClassName("date-calendar");
    const month = months[actual_date.getMonth()];
    for (const element of dateCalendar) {
        element.textContent = `${month} de ${actual_date.getFullYear()}`;
    }
    const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    for (let index = 0; index < weekDays.length; index++) {
        var weekDay = document.createElement("div")
        weekDay.textContent = weekDays[index]
        monthDays.appendChild(weekDay)
    }
}

function prevMonthMiniCal() {
    let prevDays = prevDaysOfMonth();
    for (let index = prevDays.firstDayIndex; index > 0; index--) {
        var dayMonth = document.createElement("div")
        dayMonth.textContent = prevLastDay - index
        monthDays.appendChild(weekDay)
    }
}

function monthlMiniCal() {
    let lastDay = daysOfMonth();
    for (let index = 1; index <= lastDay; index++) {
        var dayMonth = document.createElement("div")
        dayMonth.textContent = index
        monthDays.appendChild(dayMonth)
    }
}

function nextMiniCal() {
    let nextDays = nextDaysOfMonth();
    for (let index = 1; index <= nextDays; index++) {
        var dayMonth = document.createElement("div")
        dayMonth.textContent = index
        monthDays.appendChild(dayMonth)
    }
}