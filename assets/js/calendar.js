//
import * as render from "./_month_render.js";
import { swapTemplate } from "./_templates.js";

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

swapTemplate("month","calendar");
render.renderMonth(currentYear, currentMonth);

/* Function and events to change the month showed */
let updatedMonth = currentMonth;
let updatedYear = currentYear;
function addMonth(year, month, boolean) {
    boolean ? month++ : month--;
    updatedYear = render.updateDate(year,month).year;
    updatedMonth = render.updateDate(year,month).month;
    swapTemplate("month","calendar");
    render.renderMonth(updatedYear,updatedMonth);
}

let rightButton = document.querySelector('.fa-chevron-right');
let leftButton = document.querySelector('.fa-chevron-left');
rightButton.addEventListener('click', function(){
    addMonth(updatedYear,updatedMonth,true);
});
leftButton.addEventListener('click', function(){
    addMonth(updatedYear,updatedMonth,false)
});

/*
* Update html h2 to show updated month and year
* new function?
*/
