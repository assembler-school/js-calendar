'use strict'

var myEvents;

/**
 * Validate on submit
 */
function validateOnSubmit(e) {
  e.preventDefault();

  // clear eventNote object
  eventNote = {};

  // set the id in the eventNote object
  eventNote[`id`] = new Date().getTime();

  // set the title in the eventNote object
  eventNote[`title`] = document.querySelector(`#title`).value;

  // set the description in the eventNote object
  eventNote[`description`] = document.querySelector(`#description`).value;

  // set the startDate in the eventNote object
  eventNote[`startDate`] = document.querySelector(`#startDate`).value;

  // set the startTime in the eventNote object
  eventNote[`startTime`] = document.querySelector(`#startTime`).value;

  // set the endDate in the eventNote object
  eventNote[`endDate`] = document.querySelector(`#endDate`).value;

  // set the endTime in the eventNote object
  eventNote[`endTime`] = document.querySelector(`#endTime`).value;

  console.log(eventNote);

  // save the eventNote in the eventsNotes array
  eventsNotes.push(eventNote);

  // convert eventsNotes to string
  let eventsString = JSON.stringify(eventsNotes);

  // save the eventsNotes in localStorage
  (() => localStorage.setItem("events", eventsString))();

  // save the eventsNotes in localStorage
  myEvents = JSON.parse(localStorage.getItem('events'));

  // write the event
  // startGame();
}

form.addEventListener('submit', validateOnSubmit);
