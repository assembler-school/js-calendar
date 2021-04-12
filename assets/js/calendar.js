//
import * as render from "./_month_render.js";
import { swapTemplate } from "./_templates.js";
import { handleDocumentEvents } from "./_handlers.js";

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
const d= document;

addTag(currentYear, currentMonth);

swapTemplate("month","calendar");
render.renderMonth(currentYear, currentMonth);

// Listeners
// d.getElementById("create-event").addEventListener("click", handleCreateEvent);
handleDocumentEvents();

/* Function that shows the selected month and year of the calendar */
function addTag(year, month) {
    let monthTag = document.getElementById('nav__tag');
    let yearTag = document.getElementById('nav__year');
    let monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    monthTag.innerHTML = monthList[month];
    console.log(month);
    yearTag.innerHTML = year;
}

/* Function and events to change the month showed */
let updatedMonth = currentMonth;
let updatedYear = currentYear;
function addMonth(year, month, boolean) {
    boolean ? month++ : month--;
    updatedYear = render.updateDate(year,month).year;
    updatedMonth = render.updateDate(year,month).month;
    swapTemplate("month","calendar");
    render.renderMonth(updatedYear,updatedMonth);
    addTag(updatedYear, updatedMonth);
}

let rightButton = document.querySelector(".fa-chevron-right");
let leftButton = document.querySelector(".fa-chevron-left");
rightButton.addEventListener("click", function () {
  addMonth(updatedYear, updatedMonth, true);
});
leftButton.addEventListener('click', function(){
    addMonth(updatedYear,updatedMonth,false)
});
