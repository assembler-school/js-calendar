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
            document.querySelector('.calendar__year--month[data-month="'+ month +'"] .calendar__year--date[data-row="' + weekCount + '"] div[data-col="' + weekDay + '"]').setAttribute("id",x);
        }
        catch(err) {
            /* Create the week clone to show in calendar */
            let workClone = whiteClone.cloneNode(true);
            rowCont++;
            workClone.setAttribute("data-row",rowCont);
            document.querySelector('.calendar__year--month[data-month="'+ month +'"]').appendChild(workClone);
            /* Fill the clone for first time */
            document.querySelector('.calendar__year--month[data-month="'+ month +'"] .calendar__year--date[data-row="' + weekCount + '"] div[data-col="' + weekDay + '"]').innerHTML = x;
            //console.log('');
            document.querySelector('.calendar__year--month[data-month="'+ month +'"] .calendar__year--date[data-row="' + weekCount + '"] div[data-col="' + weekDay + '"]').setAttribute("id",x);
        };
        if (!weekDay) {weekCount++};
        weekDay++;
        weekDay%=7;
    }
    /* Adapts the height of the week rows to the total */
/*     document.querySelectorAll('.calendar__year--date').forEach((row)=> {
        row.style.height = 'calc((100% - 25px) / ' + rowCont + ')';
    }); */
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
        document.getElementById((new Date()).getDate()).className += 'today';
        document.getElementById((new Date()).getDate()).childNodes[0].innerHTML = date.getDate();
    }
<<<<<<< HEAD
}
=======
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
>>>>>>> develop
