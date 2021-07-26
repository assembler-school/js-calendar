import displayDayInfoListener from "./events/displayDayInfoListener.js";
import closeEventInfoListener from "./events/closeEventInfoListener.js";
import displayEventInfoListener from "./events/displayEventInfoListener.js";
import closeEventFormListener from "./events/closeEventFormListener.js";
import displayEventFormListener from "./events/displayEventFormListener.js";
import inputEventFormListener from "./events/inputEventFormListener.js";
import saveCalendarEventListener from "./events/saveCalendarEventListener.js";
import removeCalendarEventListener from "./events/removeCalendarEventListener.js";
import updateCalendarListener from "./events/updateCalendarListener.js";
import changeFormStylesListener from "./events/changeFormStylesListener.js";
import filterEventsByTypeListener from "./events/filterEventsByTypeListener.js";
import init from "./events/init.js";

displayDayInfoListener();
displayEventFormListener();
closeEventFormListener();
inputEventFormListener();
saveCalendarEventListener();
closeEventInfoListener();
displayEventInfoListener();
removeCalendarEventListener();
updateCalendarListener();
changeFormStylesListener();
filterEventsByTypeListener();
init();
