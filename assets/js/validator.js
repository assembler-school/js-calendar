'use strict'

/**
 * Validate on submit
 */
function validateOnSubmit(e) {
  e.preventDefault();

  //clear eventNote object
  eventNote = {};

  //set the id in the eventNote object
  eventNote[`id`] = new Date().getTime();

  //set the values in the eventNote object
  eventNote[`title`] = document.querySelector(`#title`).value;
  eventNote[`description`] = document.querySelector(`#description`).value;
  eventNote[`startDate`] = document.querySelector(`#startDate`).value;
  eventNote[`startTime`] = document.querySelector(`#startTime`).value;
  eventNote[`endDate`] = document.querySelector(`#endDate`).value;
  eventNote[`endTime`] = document.querySelector(`#endTime`).value;
  eventNote[`type`] = document.querySelector(`#type`).value;

  //save the eventNote in the eventsNotes array
  eventsNotes.push(eventNote);

  //convert eventsNotes to string
  let eventsString = JSON.stringify(eventsNotes);

  //save the eventsNotes in localStorage
  (() => localStorage.setItem("events", eventsString))();

  //close the modal
  closeModal()

  //write the event
  writeEventsOfTheDay(dateSelected);
}

form.addEventListener('submit', validateOnSubmit);
