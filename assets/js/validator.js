'use strict'

/**
 * Validate on submit
 *
 * @param {Object} e event of the submit form
 */
function validateOnSubmit(e) {
  e.preventDefault();

  //declare eventNote as object
  let eventNote = {};

  //set the timestamp as id in the eventNote object
  eventNote[`id`] = new Date().getTime();

  //set the values in the eventNote object
  eventNote[`title`] = document.querySelector(`#title`).value;
  eventNote[`description`] = document.querySelector(`#description`).value;
  eventNote[`startDate`] = document.querySelector(`#startDate`).value;
  eventNote[`startTime`] = document.querySelector(`#startTime`).value;
  eventNote[`endDate`] = document.querySelector(`#endDate`).value;
  eventNote[`endTime`] = document.querySelector(`#endTime`).value;
  eventNote[`type`] = document.querySelector(`#type`).value;
  eventNote[`reminder`] = document.querySelector(`#reminder`).value;

  //save the eventNote in the eventsNotes array
  eventsNotes.push(eventNote);

  //convert eventsNotes to string
  let eventsString = JSON.stringify(eventsNotes);

  //save the eventsNotes in localStorage
  (() => localStorage.setItem("events", eventsString))();

  //save the reminder in localStorage
  setReminderDate(eventNote);

  //close the modal
  closeModal();

  //write the event
  renderEventsOfTheDay(dateSelected);

  //clear the month dates of the DOM
  dates.textContent = '';

  //reload month calendar
  renderMonth(currentMonth);
}

//add event listener to the form modal save button
form.addEventListener('submit', validateOnSubmit);