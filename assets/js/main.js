/* IMPORT */

import { displayModal } from "./modal.js";
import {
  insertBlankDays,
  insertDays,
  nextButton,
  monthTitle,
  prevButton,
} from "./calendar.js";

/* INVOKING BASE FUNCTIONS ON LOAD PAGE */

insertBlankDays();
insertDays();
nextButton();
monthTitle();
prevButton();
