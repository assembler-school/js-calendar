//
let actualDate = new Date();
console.log(actualDate);

/* Render of month in parameter type Date()*/
function renderMonth(selectedDate) {
    let month = selectedDate.getMonth();
    let year = selectedDate.getFullYear();
    /* Get the first day of month and number of days in month*/
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    /* Variable declarations for loop */
    let weekDay = firstDay;
    let weekCount = 1;
    /* Loop to fill calendar*/
    for (let x = 1; x < daysInMonth + 1; x++) {
        if (weekDay == 0) {
            document.querySelector('.week:nth-child(' + weekCount + ') div[data-col="' + weekDay + '"]').innerHTML = x;
            weekCount++;
            weekDay++;
        } else if (weekDay == 6) {
            document.querySelector('.week:nth-child(' + weekCount + ') div[data-col="' + weekDay + '"]').innerHTML = x;
            weekDay = 0;
        } else {
            document.querySelector('.week:nth-child(' + weekCount + ') div[data-col="' + weekDay + '"]').innerHTML = x;
            weekDay++;
        }
    }
}

/* Render of year in parameter type Date()*/
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