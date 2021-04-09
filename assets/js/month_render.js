//
let actualDate = new Date();
console.log(actualDate);

/* Render of month in parameter type Date() */
function renderMonth(selectedDate) {
    let month = selectedDate.getMonth();
    let year = selectedDate.getFullYear();
    /* Get the first day of month and number of days in month */
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    /* Variable declarations for loop */
    let weekDay = firstDay;
    let weekCount = 1;
    /* Loop to fill calendar */
    for (let x = 1; x < daysInMonth + 1; x++) {
        document.querySelector('.week:nth-child(' + weekCount + ') div[data-col="' + weekDay + '"]').innerHTML = x;
        if (!weekDay) {weekCount++};
        weekDay++;
        weekDay%=7;
    }
}

/* Render of year in parameter type Date() */
function renderYear(selectedDate) {
    /* Loop of renderMonth */
    /*
    *renderMonth actually shows month in calendar
    *but renderYear shouldn't
    */
}

/*testing*/
let date = actualDate;
renderMonth(date);