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
      } else {
        // If event is during the current day
        if (event.finalDate && event.finalDate != "") {
          let eventFinalDate = new Date(event.finalDate).getTime();
          //console.log('Evento tiene fecha final');

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
      
      let initialDate = new Date(event.initialDate).toLocaleString("en", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });

      eventsInfo += `
        <div class="summary-event__container">
            <div class="summary-event__title row"><h4>${event.titleEvent}</h4><span class="summary-event__date">${initialDate}</span></div>
            <p class="summary-event__description">${event.descriptionEvent}</p>
        </div>
      `;
    })

    let formatDate = new Date(dayUnix).toLocaleString('en', {
      month: "long",
      year: "numeric",
      day: "numeric"
    })
    containerEvents.innerHTML = `
      <p class="summary__date">${formatDate}</p>
      ${eventsInfo}
    `;

}

export {
  displayDayEvents
}