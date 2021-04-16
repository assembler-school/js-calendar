import { swapTemplate, removeTemplate } from "./_templates.js";
import { formValidation } from "./_form_validation.js";
import { calendarEvent } from "./_events.js";
import * as render from "./_month_render.js";
import { setReminder } from "./_reminder.js";

/*
 * All listeners are listed here
 *
 */
export function handleDocumentEvents(e) {
  // click event
  document.addEventListener("click", (e) => {
    /*
     * show week view
     */
    // show modal
    if (e.target.matches("button#show-week")) {
      swapTemplate("week-view", "calendar");
      e.target.classList.add("nav__center--selected");
      document
        .querySelector(".nav__center:nth-child(2)")
        .classList.remove("nav__center--selected");
    }

    /*
     * button to view more events
     */
    // show modal
    if (e.target.matches(".hidden-events")) {
      const d = document;
      showPopupEvents(e, "#calendar");
      setTimeout(() => {
        d.querySelector(".cloned-day").classList.add("scaling");
      }, 0);
    }
    /*
     * show / hide modal popup
     */
    // show modal
    if (e.target.matches("span.retract")) {
      const clnModal = document.querySelector(".cloned-day");
      if (clnModal) {
        clnModal.remove();
      }
    }

    /*
     * show / hide modal popup
     */
    // show modal
    if (
      e.target.matches("button#create-event") ||
      e.target.matches("button#create-event *")
    ) {
      const clnModal = document.querySelector(".cloned-day");
      if (clnModal) {
        clnModal.remove();
      }
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
        render.checkEventsVisibility();
        let remindersArr = [];
        setReminder(remindersArr);
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
      const end = document.querySelector(".ending-date");
      end.classList.toggle("height-reset");
    }

    /*
     * Click in event
     */
    if (e.target.matches("[data-eventid]")) {
      const clnModal = document.querySelector(".cloned-day");
      if (clnModal) {
        clnModal.remove();
      }
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

      const clnModal = document.querySelector(".cloned-day");
      if (clnModal) {
        clnModal.remove();
      }

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

      goToMonth(updatedYear, parseInt(month));
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

  // resize
  window.addEventListener("resize", render.checkEventsVisibility);

  // keyboard
  document.addEventListener("keydown", accessKeyboard);
  function accessKeyboard(e) {
    const focusableInputs = document.querySelectorAll(".focus");
    const focusable = Array.from(focusableInputs);
    let index = focusable.indexOf(document.activeElement);
    let nextIndex = 0;

    // tab key
    if (e.keyCode === 9) {
      e.preventDefault();
      if (index >= 0) {
        nextIndex = index + 1;
      } else {
        nextIndex = 0;
      }
      if (index == 5) {
        nextIndex = 0;
      }
      //shift + tab
      if (e.keyCode === 16) {
        e.preventDefault();
        if (index >= 0) {
          nextIndex = index + 1;
        } else {
          nextIndex = 0;
        }
        if (index == 5) {
          nextIndex = 0;
        }
      }
    }
    // Escape to close modal
    if (e.keyCode === 27) {
      removeTemplate("modal-template", "modal-section");
    }

    focusableInputs[nextIndex].focus();
    e.stopPropagation();
  }

  // animation end
  document.addEventListener("animationend", (e) => {
    /*
     * clear animations
     */
    const swing = document.querySelectorAll(
      ".swing-right-fwd, .swing-left-fwd"
    );
    swing.forEach((element) => {
      const cls = element.classList;
      cls.contains("swing-right-fwd") ? cls.remove("swing-right-fwd") : 0;
      cls.contains("swing-left-fwd") ? cls.remove("swing-left-fwd") : 0;
    });
  });

  // mouse over event
  // document.addEventListener("mouseover", (e) => {
  //   const day =  document.querySelector(".cloned-day .spanDay");
  //   day.textContent = "X";
  //   console.log("hahaha");
  // });
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
  render.checkEventsVisibility();
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
  render.checkEventsVisibility();
}

/*
 * This render month without adding
 * To add month use _handlers.js/addMonth
 */
function showPopupEvents(e, parent) {
  let itm = e.target.parentElement;
  let cln = itm.cloneNode(true);

  // replace "ver mas" -> "ver menos"
  for (const iterator of cln.children) {
    const clnModal = document.querySelector(".cloned-day");
    if (clnModal) {
      clnModal.remove();
    }

    if (iterator.classList.contains("hidden-events")) {
      iterator.textContent = "X";
      iterator.className = "retract";
      // iterator.remove();
    }
  }

  // hide events based on height of container
  const ev = cln.querySelectorAll("[data-eventid]");
  ev.forEach((v) => {
    if (v.classList.contains("visibility-hidden")) {
      v.classList.remove("visibility-hidden");
    }
  });

  // apply same dimensions and position of container
  const container = document.createElement("div"),
    p = document.querySelector(parent);
  container.classList.add("cloned-day");
  container.style.top = e.target.parentElement.offsetTop + "px";
  container.style.left = e.target.parentElement.offsetLeft + "px";
  container.style.width = e.target.parentElement.offsetWidth + "px";

  container.appendChild(cln);
  p.appendChild(container);
}
