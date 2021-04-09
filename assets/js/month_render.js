//
/* Fucntion to add a month*/
export function addMonth(monthFunction, boolean) {
    boolean ? monthFunction++ : monthFunction--;
    console.log(month);
}


/* Render of month in parameter type Date() */
export function renderMonth(year, month) {
    /* Get the first day of month and number of days in month */
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    /* Variable declarations for loop */
    let weekDay = firstDay;
    let weekCount = 1;
    /* Loop to fill calendar */
    for (let x = 1; x < daysInMonth + 1; x++) {
        document.querySelector('.calendar__week:nth-child(' + weekCount + ') div[data-col="' + weekDay + '"]').innerHTML = x;
        if (!weekDay) {weekCount++};
        weekDay++;
        weekDay%=7;
    }
}