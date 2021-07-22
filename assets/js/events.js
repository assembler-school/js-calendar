'use strict';

// editEvent = (event) => { }

// setEvent = (event) => { }

// deleteEvent = (event) => { }

const writeEventsOfTheDay = (day) => {

  //clear events of the day
  eventsDay.innerHTML = ``;

  //get the eventsNotes in localStorage
  eventsNotes = JSON.parse(localStorage.getItem('events'));

  eventsNotes.forEach(event => {
    if (day == event.startDate) {
      eventsDay.innerHTML += `
        <div class="event">
          <div class="event__item">
            <p class="event__title">${event.title}</p>
            <span class="start__time">${event.startTime}</span><span> - </span>
            <span class="end__time">${event.endTime}</span>
          </div>
        </div>
      `;
    }
  });

  if (eventsDay.innerHTML == ``) {
    eventsDay.innerHTML += `
      <div class="event">
        <p class="event__title">You have no events this day</p>
      </div>
    `;
  }
}
