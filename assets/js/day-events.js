import { convertDate } from './event-view.js';


function displayDayEvents(dateObj) {

    let containerEvents = document.getElementById('summary-day');
    containerEvents.innerHTML = '';

    let eventsObj = {...localStorage}
    let dayEvents = [];
    
    let dayUnix = parseInt(dateObj.unix);
    let currentDay = parseInt(dateObj.number);

    let currentDate = new Date(dayUnix).getTime();
    let currentMonth = new Date(dayUnix).getMonth(); 
    let currentYear = new Date(dayUnix).getFullYear();
    let tomorrowDate = new Date(currentYear, currentMonth,  currentDay + 1).getTime();

    for (const key in eventsObj) {
      let event = JSON.parse(eventsObj[key])[0];

      // Verify the event is for the current day
      let eventInitialDate = new Date(event.initialDate).getTime();
      
      if (eventInitialDate >= currentDate && eventInitialDate < tomorrowDate) {
        dayEvents.push(event);
      }

      // If event is during the current day
      if (event.finalDate && event.finalDate != "") {
        let eventFinalDate = new Date(event.finalDate).getTime();
        console.log('Evento tiene fecha final');

        // If event date is on range
        if (
          eventInitialDate <= dayUnix &&
          eventInitialDate < tomorrowDate &&
          eventFinalDate >= currentDate
        ) {
          dayEvents.push(event);
        }
      }  
    }

    // Sort Array
    dayEvents.sort((a, b) => {
      let timeA = new Date(a.initialDate).getTime();
      let timeB = new Date(b.initialDate).getTime();

      if (timeA < timeB) {
        return -1;
      } else if (timeA > timeB) {
        return 1;
      } else if (timeA === timeB) {
        return 0;
      }
    });

    let eventsInfo = ''
    dayEvents.forEach((event, i) => {
      eventsInfo += `
        <div class="event__container">

            <div><h4>${event.titleEvent}</h4></div>
            <p>${event.descriptionEvent}</p>
            <span></span>
        </div>
      `;
    })

    containerEvents.innerHTML = `
      <span>${convertDate(dayUnix)}</span>
      ${eventsInfo}
    `;

}

export {
  displayDayEvents
}