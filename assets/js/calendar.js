//
import * as render from "./_month_render.js";
import { swapTemplate } from "./_templates.js";
import { handleDocumentEvents } from "./_handlers.js";
// import * as reminder from "./_reminder.js";
import { calendarEvent } from "./_events.js";

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
const d = document;

/* Initialize calendar */
showCalendar(currentYear, currentMonth);

handleDocumentEvents();

function showCalendar(year, month) {
  swapTemplate("month", "calendar");
  render.addTag(year, month);
  render.renderMonth(year, month);
  render.renderMonthList();
  render.highlightToday(year, month);
  render.renderEvents(year, month);
  render.checkEventsVisibility();
  // Listeners
}

const arrRem = [];
const reminder = function () {
  const _Data = calendarEvent.fromLocalStorage();
  const currDate = new Date().getTime();

  if (_Data) {
    const _dataFiltered = _Data.filter((ev) => ev.reminder === "on" && !ev.expired);
    const _dataExpired = _Data.filter((ev) => ev.expired);

    _dataFiltered.forEach((element) => {
      const evDate = new Date(element["init-date"]).getTime();
      const reaminingTime = evDate - currDate;

      if (reaminingTime <= 15000) {
        const _timeOut = setTimeout(() => {
          console.log("******* Aviso evento:", element.title);
          element.expired = true;
          calendarEvent.modifyEvent(element.id, element);
        }, reaminingTime);

        arrRem.push({ eventId: element.id, timerId: _timeOut });
      }
    });

    console.log("antes", arrRem);
    _dataExpired.forEach(element => {
      if (arrRem.length) {
        const index = arrRem.findIndex(v => v.eventId === element.id );
        if (index >= 0) {
          clearTimeout(arrRem[index].timerId);
          arrRem.splice(index, 1);
        } 
      }
    });
    console.log("despues", arrRem);
  }
};

// reminder();

// setInterval(() => {
//   console.log("----------------");
//   reminder();
// }, 15000);
