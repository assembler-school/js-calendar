//
import { calendarEvent } from "./_events.js";

let monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const daysName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
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
            document.querySelector('.calendar__month').appendChild(workClone);
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

/* Dynamic render months of year */
export function renderMonthYear(year, month) {
    /* Get the first day of month and number of days in month */
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    /* Variable declarations for loop */
    let weekDay = firstDay;
    let weekCount = 1;
    let rowCont = 1;
    let whiteClone = document.querySelector('.calendar__year--month[data-month="'+ month +'"] div:nth-child(2)').cloneNode(true);
    /* Loop to fill calendar */
    for (let x = 1; x < daysInMonth + 1; x++) {
        /* Fill the calendar divs with day number */
        try { 
            document.querySelector('.calendar__year--month[data-month="'+ month +'"] .calendar__year--date[data-row="' + weekCount + '"] div[data-col="' + weekDay + '"]').innerHTML = x;
            document.querySelector('.calendar__year--month[data-month="'+ month +'"] .calendar__year--date[data-row="' + weekCount + '"] div[data-col="' + weekDay + '"]').setAttribute("id",`${x}${month}`);
        }
        catch(err) {
            /* Create the week clone to show in calendar */
            let workClone = whiteClone.cloneNode(true);
            rowCont++;
            workClone.setAttribute("data-row",rowCont);
            document.querySelector('.calendar__year--month[data-month="'+ month +'"]').appendChild(workClone);
            /* Fill the clone for first time */
            document.querySelector('.calendar__year--month[data-month="'+ month +'"] .calendar__year--date[data-row="' + weekCount + '"] div[data-col="' + weekDay + '"]').innerHTML = x;
            document.querySelector('.calendar__year--month[data-month="'+ month +'"] .calendar__year--date[data-row="' + weekCount + '"] div[data-col="' + weekDay + '"]').setAttribute("id",`${x}${month}`);
        };
        if (!weekDay) {weekCount++};
        weekDay++;
        weekDay%=7;
    }
}

export function renderYear(year) {
    let nameMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let listMonth = document.querySelector('.calendar__year--month').cloneNode(true);
    renderMonthYear(year, 0);
    for (let index = 1; index < 12; index++) {
        let listMonthClone = listMonth.cloneNode(true);
        document.querySelector('.calendar__year--row').appendChild(listMonthClone);
        document.querySelectorAll('.monthTittle h2')[index].innerHTML = nameMonth[index];
        document.querySelectorAll('.calendar__year--month')[index].setAttribute("data-month", index);
        renderMonthYear(year, index);
    }

}


/* Render events in the month of parameter */
export function renderEvents(year, month) {
    const d = document;
    let allEvents = calendarEvent.fromLocalStorage();

    if (allEvents) {
      let monthEvents = allEvents.filter ((ev) => new Date(ev["init-date"]).getFullYear() === year && new Date(ev["init-date"]).getMonth() === month);

      /* Create the events in calendar and set its HTML attributes */
      monthEvents.forEach(function (monthEvents){
        if(d.querySelector(`[data-eventid="event${monthEvents.id}"]`)) {
          d.querySelector(`[data-eventid="event${monthEvents.id}"]`).remove()
        }
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

/* Render events of today in mobile menu */
export function renderNavEvents() {
    let todayDate = new Date();
    let allEvents = calendarEvent.fromLocalStorage()
    if (allEvents) {
      let todayEvents = allEvents.filter ((ev) => 
        new Date(ev["init-date"]).getFullYear() === todayDate.getFullYear() && 
        new Date(ev["init-date"]).getMonth() === todayDate.getMonth() && 
        new Date(ev["init-date"]).getDate() === todayDate.getDate());
      todayEvents.forEach(function (todayEvents){
        let eventDiv = document.createElement("span");
        eventDiv.setAttribute("data-eventid","event" + todayEvents.id);
        eventDiv.setAttribute("class","event event__type--" + todayEvents["select-event"]);
        eventDiv.innerHTML = todayEvents.title;
        document.querySelector(".nav__mobile--event").appendChild(eventDiv);
      });
    }
}

/* Update month and year to use normally */
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

/* Add year and month in the calendar nav bar */
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

export function addTagYear(year) {
    let yearTag = document.getElementById('nav__year');
    let yearMobileTag = document.getElementById('nav__mobile--year');

    yearTag.innerHTML = year;
    yearMobileTag.innerHTML = year;
}

/* Give a class to today to highlight */
export function highlightToday(year, month){
    let date = new Date();
    if (year === date.getFullYear() && month===date.getMonth()) {
        document.getElementById(date.getDate()).className += 'today';
        document.getElementById(date.getDate()).childNodes[0].innerHTML = date.getDate();
    }
}
export function highlightTodayYear(year){
    let date = new Date();
    if (year === date.getFullYear()) {
        document.getElementById(`${date.getDate()}${date.getMonth()}`).className += 'todayYear';
        document.getElementById(`${date.getDate()}${date.getMonth()}`).innerHTML = '<span>' + date.getDate(); + '</span>';
    }
}



/* This gets dateTime local */
export function getDateTimeFormat(year, month, day ){
    const _fngetMonth = function (_month) {
        return monthList.findIndex((month) => month === _month);
      };
      
    if (day) {    
        const curTime = new Date(),
        pr = new Date(year, _fngetMonth(month), parseInt(day) + 1),
        resDate = pr.toISOString().slice(0, 11);

        const prTime = pr.setHours(curTime.getHours(),curTime.getMinutes()),
        resTime = new Date(prTime).toTimeString().slice(0,5);

        return (resDate + resTime);
    }
}

/* This render year list */
export function renderMonthList(){
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


/* This checks event visibility */
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
          v.classList.add("visibility-hidden");
        } else{
            v.classList.remove("visibility-hidden");
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
  
/* This function tracks expired events
   Set interval of 1 min */
let interval;
export function checkExpiredEvents() {
  const lsEvents = calendarEvent.fromLocalStorage();
  const currTime = new Date().getTime();
  const currDate = new Date();

  /* clear interval */  
  interval ? clearInterval(interval) : 0;

  /* check expired events - tracking */
  const _fnCheckExpired = function (events) {
    events.forEach((el) => {
      const evId = el.dataset.eventid.slice(5);
      const evFiltered = lsEvents.filter((ev) => ev.id == evId);
      let endTime;
      
      /* Tracking events with end-date */
      if (evFiltered.length) {
        const initDt = evFiltered[0]["init-date"];
        const endDt = evFiltered[0]["end-date"];

        endTime = endDt? new Date(endDt).getTime() : new Date(initDt).setHours(23, 59, 59);

      if (endTime - currTime <= 60000) {
        const time = (endTime - currTime) > 0 ? (endTime - currTime) : 0;
        const timeOut = setTimeout(() => {
          el.classList.add("expired", "fade-out");
        }, time);
      }
    }
  });
}

  const domEvents = document.querySelectorAll(".event:not(.expired)");
  _fnCheckExpired(domEvents);

  interval = setInterval(() => {
    const domEvents = document.querySelectorAll(".event:not(.expired)");
    _fnCheckExpired(domEvents);
  }, 60000);
};

/* This function renders week view */
export function renderWeekView(container){

  /* Days name */
  const dayWrapper = document.createElement("div");
  dayWrapper.classList.add("calendar__weekDay");
  daysName.forEach(day => {
  const div = document.createElement("div");
    div.textContent = day;
    dayWrapper.appendChild(div);
  });
  
  /* Global container */
  const  mainContainer = document.createElement("div");
  mainContainer.classList.add("calendar__week-view");

  /* Create Hours */
  const hoursWrapper = document.createElement("div");
  hoursWrapper.classList.add("week-hour-wr");

  for (let index = 0; index < 24; index++) {
    const element = document.createElement("div");
    const span = document.createElement("span");
    span.textContent = "00:00";
    element.classList.add("week-hour");
    element.appendChild(span);
    hoursWrapper.appendChild(element);
  }

    /* Create calendar */
  const fractionWrapper = document.createElement("div");
  fractionWrapper.classList.add("fraction-wrapper");

  for (let i = 0; i < 24; i++) {
    const el = document.createElement("div");
    el.classList.add("calendar__fraction");
    el.setAttribute("data-row", i);
    
    for (let f = 0; f < 7; f++) {
      const fraction = document.createElement("div");
      fraction.setAttribute("data-col", f);
      el.appendChild(fraction);
    }
    fractionWrapper.appendChild(el) ;
  }

  /* Append wrappers */
  mainContainer.appendChild(hoursWrapper);
  mainContainer.appendChild(fractionWrapper);
  container.innerHTML = "";
  container.appendChild(dayWrapper);
  container.appendChild(mainContainer);
}