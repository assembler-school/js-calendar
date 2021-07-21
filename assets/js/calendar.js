'use strict';

const writeMonth = (month) => {

    for (let i = startDay(); i > 0; i--) {
        dates.innerHTML += ` <div class="calendar__date calendar__prev">${getTotalDays(currentMonth - 1) - (i - 1)}</div>`;
    }

    for (let i = 1; i <= getTotalDays(month); i++) {
        if (i === currentDay) {
            dates.innerHTML += `<button class="calendar__date calendar__today btn btn--modal" data-id="modal-${i}">${i}</button>`;
        } else {
            dates.innerHTML += `<button class="calendar__date btn btn--modal" data-id="modal-${i}">${i}</button>`;
        }
    }
}

const getTotalDays = month => {
    if (month === -1) month = 11;

    if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 || month == 11) {
        return 31;

    } else if (month == 3 || month == 5 || month == 8 || month == 10) {
        return 30;

    } else {

        return isLeap() ? 29 : 28;
    }
}

const isLeap = () => {
    return ((currentYear % 100 !== 0) && (currentYear % 4 === 0) || (currentYear % 400 === 0));
}

const startDay = () => {
    let start = new Date(currentYear, currentMonth, 1);
    return ((start.getDay() - 1) === -1) ? 6 : start.getDay() - 1;
}

const lastMonth = () => {
    if (currentMonth !== 0) {
        currentMonth--;
    } else {
        currentMonth = 11;
        currentYear--;
    }

    setNewDate();
}

const nextMonth = () => {
    if (currentMonth !== 11) {
        currentMonth++;
    } else {
        currentMonth = 0;
        currentYear++;
    }

    setNewDate();
}

const setNewDate = () => {
    currentDate.setFullYear(currentYear, currentMonth, currentDay);
    month.textContent = monthNames[currentMonth];
    year.textContent = currentYear.toString();
    dates.textContent = '';
    writeMonth(currentMonth);
}

writeMonth(currentMonth);