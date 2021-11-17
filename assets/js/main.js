document.addEventListener('DOMContentLoaded', () => {
    createCal();
    var numberDay = getPresentDay(Array.from(document.querySelectorAll(".number-days")));
    getAllEventsOfDay(numberDay[0]);
    createListEvents();
});