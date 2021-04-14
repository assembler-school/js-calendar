import { swapTemplate, removeTemplate } from "./_templates.js";
import { formValidation } from "./_form_validation.js";
import { calendarEvent } from "./_events.js";
import * as render from "./_month_render.js";
import * as reminder from "./_reminder.js";

/*
 * All listeners are listed here
 *
 */
export function handleDocumentEvents(e) {
  // click event
  document.addEventListener("click", (e) => {
    /*
     * show / hide modal popup
     */
    // show modal
    if (
      e.target.matches("button#create-event") ||
      e.target.matches("button#create-event *")
    ) {
      swapTemplate("modal-template", "modal-section");
    }
    // close modal
    if (e.target.matches(".close")) {
      removeTemplate("modal-template", "modal-section");
    }

    /*
     * form validation
     */
    if (e.target.matches('input[type="submit"]')) {
      e.preventDefault();

      if (!formValidation(e, true)) {
        const data = calendarEvent.getDataFromModal("#modal form");
        calendarEvent.toLocalStorage(data);
        render.renderEvents(updatedYear, updatedMonth);
      }
    }

    /*
     * buttons to switch month
     */
    if (e.target.matches(".fa-chevron-right")) {
      addMonth(updatedYear, updatedMonth, true);
      document.querySelector("#calendar").classList.add("swing-right-fwd");
    }
    if (e.target.matches(".fa-chevron-left")) {
      addMonth(updatedYear, updatedMonth, false);
      document.querySelector("#calendar").classList.add("swing-left-fwd");
    }

    /*
     * Mobile burguer menu
     */
    if (e.target.matches("#navOpen") || e.target.matches("#navOpen *")) {
      document.getElementById("main").style.display = "block";
      swapTemplate("template__mobile", "main");
    }
    if (e.target.matches("#navClose i") || e.target.matches("#navClose i *")) {
      removeTemplate("template__mobile", "main");
      document.getElementById("main").style.display = "none";
    }

    /*
     * checkbox End-date
     */
    if (e.target.matches('[name="end-check"]')) {
      const check = document.querySelector('[name="end-date"]');
      check.disabled ? (check.disabled = false) : (check.disabled = true);
    }

    /*
     * Click in event
     */
    if (e.target.matches("[data-eventid]")) {
      const [_event] = calendarEvent.getEvent(e.target.dataset.eventid);
      swapTemplate("modal-template", "modal-section");
      calendarEvent.printDataToModal("#modal form", _event);
    }

    /*
     * Click on day to show modal
     */
    if (e.target.matches(".calendar__week > div")) {
      const day = e.target.id,
        month = document.querySelector("#nav__tag").textContent,
        year = document.querySelector("#nav__year").textContent;

      swapTemplate("modal-template", "modal-section");
      const initDate = document.querySelector('[name="init-date"]');
      initDate.value = render.getDateTimeFormat(year, month, day);
    }

    /*
     * Click on reminder
     */
    if (e.target.matches('[name="reminder"]')) {
      const rm = document.querySelector(".reminder-time");
      // rm.classList.toggle("height-anim");
      rm.classList.toggle("height-reset");
    }

    /*
     * Click month tag
     */
    if (e.target.matches("#nav__tag, #nav__year")) {
      const rm = document.querySelector(".month-list");
      rm.classList.toggle("show");
    }
    if (e.target.matches(".month-list *")) {
      const ev = e.target,
       month = ev.dataset.month || ev.firstChild.dataset.month,
       rm = document.querySelector(".month-list");

       goToMonth(updatedYear,  parseInt(month));
      rm.classList.toggle("show");
    }
  });

  // focusot event
  document.addEventListener("focusout", (e) => {
    /*
     * form validation
     */
    if (e.target.matches("input[required]")) {
      formValidation(e, false);
    }
  });

   // animation end
   document.addEventListener("animationend", (e) => {
    /*
     * clear animations
     */
    const swing = document.querySelectorAll(".swing-right-fwd, .swing-left-fwd")
    swing.forEach(element => {
      const cls = element.classList;
      cls.contains("swing-right-fwd") ? cls.remove("swing-right-fwd") : 0;
      cls.contains("swing-left-fwd") ? cls.remove("swing-left-fwd") : 0;
    });
  });
}

let updatedMonth = new Date().getMonth();
let updatedYear = new Date().getFullYear();
function addMonth(year, month, boolean) {
  boolean ? month++ : month--;
  updatedYear = render.updateDate(year, month).year;
  updatedMonth = render.updateDate(year, month).month;
  swapTemplate("month", "calendar");
  render.renderMonth(updatedYear, updatedMonth);
  render.addTag(updatedYear, updatedMonth);
  render.highlightToday(year, month);
  render.renderEvents(year, month);
  render.renderYear();
}

/*
 * This render month without adding
 * To add month use _handlers.js/addMonth
 */
export function goToMonth(year, month) {
  updatedYear = year;
  updatedMonth = month;
  swapTemplate("month", "calendar");
  render.renderMonth(year, month);
  render.addTag(year, month);
  render.highlightToday(year, month);
  render.renderEvents(year, month);
  render.renderYear();
}
