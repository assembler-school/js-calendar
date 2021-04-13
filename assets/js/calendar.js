//
import * as render from "./_month_render.js";
import { swapTemplate } from "./_templates.js";
import { handleDocumentEvents } from "./_handlers.js";

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
const d= document;

render.addTag(currentYear, currentMonth);

swapTemplate("month","calendar");
render.renderMonth(currentYear, currentMonth);

// Listeners
handleDocumentEvents();
