//
import * as render from "./_month_render.js";
import { swapTemplate } from "./_templates.js";

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

swapTemplate("month","calendar");
render.renderMonth(currentYear, currentMonth);

let rightButton = document.querySelector('.fa-chevron-right');
let leftButton = document.querySelector('.fa-chevron-left');

/* Fucntion to add a month*/
let updateMonth = currentMonth;
let updateYear = currentYear;
function addMonth(year, month, boolean) {
    boolean ? month++ : month--;
    month%=12;
    updateMonth = month;
    if (!month && boolean) {
        year++;
        updateYear = year;
    } else if (!month && !boolean){
        year--;
        updateYear = year;
    }
    
    swapTemplate("month","calendar");
    render.renderMonth(updateYear,updateMonth);
    console.log(updateMonth);
}

rightButton.addEventListener('click', function(){
    addMonth(updateYear,updateMonth,true);
});
leftButton.addEventListener('click', function(){
    addMonth(updateYear,updateMonth,false)
});