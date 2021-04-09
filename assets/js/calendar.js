//
import * as render from "./month_render.js";
import { swapTemplate } from "./templates.js";

let actualDate = new Date();
let month = actualDate.getMonth();
let year = actualDate.getFullYear();

let month2 = month;

let rightButton = document.querySelector('.fa-chevron-right');
let leftButton = document.querySelector('.fa-chevron-left');

rightButton.addEventListener('click', function(){
    /* render.addMonth(month2, true); */
    month2++;
    swapTemplate("month","calendar");
    render.renderMonth(year, month2);
    console.log(month2);
});
leftButton.addEventListener('click', render.addMonth, month, false);

swapTemplate("month","calendar");
render.renderMonth(year, month);