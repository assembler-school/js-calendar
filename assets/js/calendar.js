//
import { renderMonth } from "./month_render.js";
import { swapTemplate } from "./templates.js";

let actualDate = new Date();

swapTemplate("month","calendar");
renderMonth(actualDate);