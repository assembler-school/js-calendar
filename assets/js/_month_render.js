//
/* Render of month in parameter type Date() */
export function renderMonth(year, month) {
    /* Get the first day of month and number of days in month */
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    /* Variable declarations for loop */
    let weekDay = firstDay;
    let weekCount = 1;
    let rowCont = 1;
    /* Loop to fill calendar */
    let whiteClone = document.querySelector('.calendar__month div:first-child').cloneNode(true);
    for (let x = 1; x < daysInMonth + 1; x++) {
        try { document.querySelector('.calendar__week:nth-child(' + weekCount + ') div[data-col="' + weekDay + '"]').innerHTML = x }
        catch(err) {
            /*  */
            let workClone = whiteClone.cloneNode(true);
            rowCont++;
            workClone.setAttribute("data-row",rowCont);
            document.querySelector('.calendar__month').appendChild(workClone)
            /*  */
            document.querySelector('.calendar__week:nth-child(' + weekCount + ') div[data-col="' + weekDay + '"]').innerHTML = x
        };
        /*
        *
        *executar funcio per colocar events al month
        *handleEvent()
        *
        */
        if (!weekDay) {weekCount++};
        weekDay++;
        weekDay%=7;
        console.log(daysInMonth);
    }
}

/* blablabla */
export function handleEvent(){

}