import { swapTemplate, removeTemplate } from "./_templates.js";
import { formValidation } from "./_form_validation.js";
import { calendarEvent } from "./_events.js";
import * as render from "./_month_render.js";

/*
 * All listeners are listed here
 *
 */
export function handleDocumentEvents() {
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
    if (e.target.matches('input[value="Create"]')) {
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
      document
        .querySelector(".calendar__month")
        .classList.add("swing-right-fwd");
    }
    if (e.target.matches(".fa-chevron-left")) {
      addMonth(updatedYear, updatedMonth, false);
      document
        .querySelector(".calendar__month")
        .classList.add("swing-left-fwd");
    }

    /*
     * Mobile burguer menu
     */
    if (e.target.matches("#navOpen") || e.target.matches("#navOpen *")) {
      document.getElementById("main").style.display = "block";
      swapTemplate("template__mobile", "main");
    }
    if (e.target.matches("#navClose") || e.target.matches("#navClose *")) {
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
      [_event] = calendarEvent.getEvent(e.target.dataset.eventid);
      swapTemplate("alert-template", "modal-section");
      calendarEvent.printDataToAlert(_event);
    }

    /*
     * Click in edit event
     */
    if (e.target.matches(".edit")) {
      swapTemplate("edit-template", "modal-section");
      calendarEvent.printDataToEdit(_event);
    }

    /*
     * Form validation for edit
     */
    if (e.target.matches('input[value="Save"]')) {
      e.preventDefault();

      if (!formValidation(e, true)) {
        calendarEvent.modifyEvent(_event);
        removeTemplate("edit-template", "modal-section");
        render.renderEvents(updatedYear, updatedMonth);
      }
    }

    /*
     * Click in remove event
     */
    if (e.target.matches(".remove")) {
      removeTemplate("alert-template", "modal-section");
      calendarEvent.removeEvent(_event);
    }

    /*
     *
     */
    if (e.target.matches(".calendar__week > div")) {
      const dia = e.target.id;
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
}

let _event;
let updatedMonth = new Date().getMonth();
let updatedYear = new Date().getFullYear();
function addMonth(year, month, direction) {
  direction ? month++ : month--;
  updatedYear = render.updateDate(year, month).year;
  updatedMonth = render.updateDate(year, month).month;
  swapTemplate("month", "calendar");
  render.renderMonth(updatedYear, updatedMonth);
  render.addTag(updatedYear, updatedMonth);
  render.highlightToday(year, month);
  render.renderEvents(year, month);
}
