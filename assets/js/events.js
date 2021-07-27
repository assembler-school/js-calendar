'use strict';

/**
 * Print the event list of the day in the screen
 *
 * @param {String} day
 */
const renderEventsOfTheDay = (day) => {

  //clear events of the day
  eventsDay.innerHTML = ``;

  //if there are no events exit the function
  (!eventsNotes.length) ? eventsNotes = new Array() : null;

  //get the eventsNotes from localStorage
  eventsNotes = JSON.parse(localStorage.getItem('events'));

  //print every eventNote of the day selected
  eventsNotes.forEach(event => {

    let bg_color = getEventTypeColor(event);

    if (day == event.startDate) {
      eventsDay.innerHTML += `
        <div class="event" data-id="${event.id}">
          <div class="event__content">
            <div class="event__color ${bg_color}"></div>
            <p class="event__title">${event.title}</p>
            <p class="event__time">
              <span>${event.startTime}</span>
              <span> - </span>
              <span>${event.endTime}</span>
            </p>
            <p class="event__description">${event.description}</p>
            <label class="event__type">${event.type}</label>
          </div>
          <button class="btn event__btn event__btn--close">X</button>
        </div>
      `;
    }
  });

  //print message alert if no events in the day selected
  if (eventsDay.innerHTML == ``) {
    eventsDay.innerHTML += `
      <div class="event">
        <p class="event__message event__message--alert">You have no events this day</p>
      </div>
    `;
  }
}

/**
 * Render the events of the corresponding day so that they do not repeat themselves
 *
 * @param {Object} todaysNotes
 * @param {String} selectedDate
 */
function renderEventNotes(todaysNotes, selectedDate) {
  eventsDay.innerHTML = ``;
  todaysNotes.forEach(event => {
    let bg_color = getEventTypeColor(event);
    if (selectedDate == event.startDate) {
      eventsDay.innerHTML += `
      <div class="event" data-id="${event.id}">
        <div class="event__content">
        <div class="event__color ${bg_color}"></div>
          <p class="event__title">${event.title}</p>
          <p class="event__time">
            <span>${event.startTime}</span>
            <span> - </span>
            <span>${event.endTime}</span>
          </p>
          <p class="event__description">${event.description}</p>
          <label class="event__type">${event.type}</label>
        </div>
        <button class="btn event__btn event__btn--close">X</button>
      </div>
    `;
    }
  });
}

/**
 * Render the day of the week as a title in the events column
 *
 * @param {String} dateSelected
 */
function renderDayWeek(dateSelected) {

  //convert dateSelected string to date
  const targetDateArr = dateSelected.split("-");
  const targetYear = targetDateArr[0];
  const targetMonth = targetDateArr[1] - 1;
  const targetDay = targetDateArr[2];
  const targetDate = new Date(targetYear, targetMonth, targetDay);

  //convert 01 to friday
  const targetDayNumber = targetDate.getDay();
  const targetDayWeek = dayOfWeekAsString(targetDayNumber);

  //get the events title
  const eventTitle = document.querySelector('.events__title');

  //set the events title
  eventTitle.innerHTML = targetDayWeek + " " + targetDay;
}

/**
 * Get the respective background color according the event type
 *
 * @param {Object} eventSelected
 * @return {String} Returns background color of the event as string
 */
const getEventTypeColor = (eventSelected) => {
  let bg_color;

  switch (eventSelected.type) {
    case "Meeting":
      bg_color = "bg--red";
      break;
    case "Call":
      bg_color = "bg--blue";
      break;
    case "Coffee with":
      bg_color = "bg--green";
      break;
    case "Peer Helping":
      bg_color = "bg--yellow";
      break;
    default:
      bg_color = "bg--red";
      break;
  }

  return bg_color;
}

//add event listener to events list of the day in order to delete an event
document.querySelector("#eventsDay").addEventListener("click", deleteEvent);

/**
 * Delete event of the events list in the screen
 *
 * @param {Object} e event of the delete event button
 */
function deleteEvent(e) {

  //get the target element
  const el = e.target;

  //check if matches with close button
  if (!el.matches(".event__btn--close")) return;

  //get the event DOM
  const eventDOM = el.parentElement;

  //get the data id of the event
  const eventId = eventDOM.dataset.id;

  //find and remove the event by id in the events list
  eventsNotes = eventsNotes.filter((event) => event.id != eventId);

  //convert EventsNotes to string
  const eventsString = JSON.stringify(eventsNotes);

  //save the events list in localStorage
  (() => localStorage.setItem("events", eventsString))();

  //show the event list of the day
  renderEventsOfTheDay(dateSelected);

  //clean month dates
  dates.textContent = '';

  //reload month calendar
  renderMonth(currentMonth);
}
