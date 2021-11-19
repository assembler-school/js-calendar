document.addEventListener('DOMContentLoaded', () => {
    console.log(actual_date);
    createCal();
    getPresentDay(Array.from(document.querySelectorAll(".number-days")));
    getAllEventsOfDay('PassedEvents');
    createListEvents();
    createListExpired();
    changeTypeEvent();
    startSetTimeOut();
});