//
import { calendarEvent } from "./_events.js";

let monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

/* Dynamic render of month */
export function renderMonth(year, month) {
    /* Get the first day of month and number of days in month */
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    /* Variable declarations for loop */
    let weekDay = firstDay;
    let weekCount = 1;
    let rowCont = 1;
    let whiteClone = document.querySelector('.calendar__month div:first-child').cloneNode(true);
    /* Loop to fill calendar */
    for (let x = 1; x < daysInMonth + 1; x++) {
        /* Fill the calendar divs with day number */
        try { 
            document.querySelector('.calendar__week:nth-child(' + weekCount + ') div[data-col="' + weekDay + '"]').innerHTML = '<span class="spanDay">' + x + '</span>';
            document.querySelector('.calendar__week:nth-child(' + weekCount + ') div[data-col="' + weekDay + '"]').setAttribute("id",x);
        }
        catch(err) {
            /* Create the week clone to show in calendar */
            let workClone = whiteClone.cloneNode(true);
            rowCont++;
            workClone.setAttribute("data-row",rowCont);
            document.querySelector('.calendar__month').appendChild(workClone)
            /* Fill the clone for first time */
            document.querySelector('.calendar__week:nth-child(' + weekCount + ') div[data-col="' + weekDay + '"]').innerHTML = '<span class="spanDay">' + x + '</span>';
            document.querySelector('.calendar__week:nth-child(' + weekCount + ') div[data-col="' + weekDay + '"]').setAttribute("id",x);
        };
        if (!weekDay) {weekCount++};
        weekDay++;
        weekDay%=7;
    }
    /* Adapts the height of the week rows to the total */
    document.querySelectorAll('.calendar__week').forEach((row)=> {
        row.style.height = 'calc(100%  / ' + rowCont + ')'
    });
}

/* Render events in the month of parameter */
export function renderEvents(year, month) {
    const d = document;
    let allEvents = calendarEvent.fromLocalStorage();

    if (allEvents) {
    let monthEvents = allEvents.filter ((allEvents) => new Date(allEvents["init-date"]).getFullYear() === year && new Date(allEvents["init-date"]).getMonth() === month);

    /* Create the events in calendar and set its attributes */
    monthEvents.forEach(function (monthEvents){
        let eventDiv = document.createElement("div");
        eventDiv.setAttribute("data-eventid","event" + monthEvents.id);
        eventDiv.setAttribute("class","event fade-in event__type--" + monthEvents["select-event"]);
        eventDiv.innerHTML = monthEvents.title;
        if (!d.querySelector(`[data-eventid="event${monthEvents.id}"]`)) {
            d.getElementById(new Date(monthEvents["init-date"]).getDate()).appendChild(eventDiv);
        }
    });
}
}

export function updateDate(year,month) {
    if (month === 12) {
        year++;
    } else if (month===-1){
        year--;
    }
    month+=12;
    month%=12;
    return {year : year,month : month};
}

export function addTag(year, month) {
    let monthTag = document.getElementById('nav__tag');
    let yearTag = document.getElementById('nav__year');
    let monthMobileTag = document.getElementById('nav__mobile--tag');
    let yearMobileTag = document.getElementById('nav__mobile--year');

    monthTag.innerHTML = monthList[month];
    yearTag.innerHTML = year;
    monthMobileTag.innerHTML = monthList[month];
    yearMobileTag.innerHTML = year;
}

export function highlightToday(year, month){
    let date = new Date();
    if (compareMonth(year,month,date.getFullYear(),date.getMonth())) {
        document.getElementById((new Date()).getDate()).className += 'today';
        document.getElementById((new Date()).getDate()).childNodes[0].innerHTML = date.getDate();
    }
}

export function compareMonth(year,month,year2,month2){
    let sameMonth = false;
    if (year===year2 && month===month2) {sameMonth=true};
    return sameMonth;
}

/*
 * This gets dateTime local
 */
export function getDateTimeFormat(year, month, day ){
    const _fngetMonth = function (_month) {
        return monthList.findIndex((month) => month === _month);
      };
      
    if (day) {
        const _curTime = new Date().toLocaleTimeString(),
        pr = new Date(year, _fngetMonth(month), parseInt(day) + 1).toISOString(),
        res = pr.slice(0, 11);
        return (res + _curTime).slice(0,16);
    }
}

/*
 * This render year list
 */
export function renderYear(){
    const month_list = document.querySelector('.month-list');
    monthList.forEach((e, index) => {
        let month = document.createElement('div');
        let inMonth = document.createElement('div');
        inMonth.dataset.month = index;
        inMonth.textContent = e;
        month.appendChild(inMonth);
        month_list.appendChild(month);
    });
}


/*
 * This checks event visibility
 *
 */
export function checkEventsVisibility() {
    const evContainer = document.querySelectorAll("[data-col]");
    const getChildOffset = function (element) {
      return (
        element.offsetTop +
        element.offsetHeight -
        element.parentElement.offsetHeight + 15
      );
    };
  
    evContainer.forEach((container) => {
      let evHidden = 0;
      const ev = container.querySelectorAll("[data-eventid]");
  
      ev.forEach((v) => {
        if (getChildOffset(v) > 0) {
          evHidden++;
          v.style.visibility = "hidden";
        } else {
          v.style.visibility = "visible";
        }
      });
  
      const existSpan = container.querySelector("span.hidden-events");
      if (existSpan) {
        existSpan.remove();
      }
  
      if (evHidden) {
        const span = document.createElement("span");
        span.textContent = evHidden + " más";
        span.classList.add("hidden-events");
        container.appendChild(span);
      }
    });
  }
  