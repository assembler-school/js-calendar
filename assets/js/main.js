document.addEventListener('DOMContentLoaded', () => {
    console.log(actual_date);
    createCal();
    var numberDay = getPresentDay(Array.from(document.querySelectorAll(".number-days")));
    // getAllEventsOfDay(numberDay[0]);
    changeTypeEvent();
    startSetTimeOut();
});