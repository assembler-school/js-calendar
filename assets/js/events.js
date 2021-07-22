'use strict';

// editEvent = (event) => { }

// setEvent = (event) => { }

// deleteEvent = (event) => { }

const writeEventsOfTheDay = (day) => {

  //clear events of the day
  eventsDay.innerHTML = ``;

  if (eventsDay.innerHTML == ``) {
    eventsDay.innerHTML += `
      <div class="event">
        <p class="event__title">You have no events this day</p>
      </div>
    `;
  }
  
  if (!eventsNotes.length) return;

  //get the eventsNotes from localStorage
  eventsNotes = JSON.parse(localStorage.getItem('events'));

  //print every eventNote of the day selected
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
}
