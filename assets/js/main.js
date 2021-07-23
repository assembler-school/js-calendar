/* IMPORT */

import { displayModal } from "./modal.js";
import { renderCalendar } from "./calendar.js";
import { getRandomQuote } from "./quotes-database.js";
import { initRemainder } from "./reminder.js";

/* INVOKING BASE FUNCTIONS ON LOAD PAGE */
getRandomQuote();
renderCalendar(0);
initRemainder();
