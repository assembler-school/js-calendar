//
import * as render from "./_month_render.js";
import { swapTemplate } from "./_templates.js";

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

swapTemplate("month","calendar");
render.renderMonth(currentYear, currentMonth);

// Listeners
document.getElementById("create-event").addEventListener("click", )

/* Function and events to change the month showed */
let updatedMonth = currentMonth;
let updatedYear = currentYear;
function addMonth(year, month, boolean) {
    boolean ? month++ : month--;
    month+=12;
    month%=12;
    updatedMonth = month;
    if (!month && boolean) {
        year++;
        updatedYear = year;
    } else if (!month && !boolean){
        year--;
        updatedYear = year; //!!! year sactualitza de febrer->gener enlloc de gener->desembre 
    }
    
    swapTemplate("month","calendar");
    render.renderMonth(updatedYear,updatedMonth);
    console.log(updatedYear);
    console.log(updatedMonth);
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