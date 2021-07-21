/* IMPORT */

import { displayModal } from "./modal.js";
import { renderCalendar } from "./calendar.js";
import { getRandomQuote } from "./quotes-database.js";

/* INVOKING BASE FUNCTIONS ON LOAD PAGE */
renderCalendar(0);
getRandomQuote();