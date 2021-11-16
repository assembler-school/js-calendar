document.addEventListener('DOMContentLoaded', () => {
    createCal();
    console.log(getPresentDay(Array.from(document.querySelectorAll(".number-days"))));
});