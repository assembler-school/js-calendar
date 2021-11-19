document.addEventListener('DOMContentLoaded', () => {
    console.log(actual_date);
    createCal();
    getPresentDay(Array.from(document.querySelectorAll(".number-days")));
    getAllEventsOfDay('Meeting');
    getAllEventsOfDay('Personal');
    getAllEventsOfDay('Study');
    getAllEventsOfDay('PassedEvents');
    createListEvents();
    createListExpired();
    changeTypeEvent();
    startSetTimeOut();
});