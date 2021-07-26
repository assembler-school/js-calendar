'use strict';

const writeMonth = (month) => {

	for (let i = startDay(); i > 0; i--) {
		dates.innerHTML += `
            <div class="calendar__date calendar__prev">
                ${getTotalDays(currentMonth - 1) - (i - 1)}
            </div>
        `;
	}

	for (let day = 1; day <= getTotalDays(month); day++) {
		let dayId = pad(day);
		let monthId = pad(month + 1);
		let yearId = currentYear;

		if (
			day === currentDay &&
			todayMonth - 1 === currentMonth &&
			todayYear === currentYear
		) {
			dates.innerHTML += `
                <button class="btn btn--modal calendar__date calendar__today" data-id="${yearId}-${monthId}-${dayId}">
                    <span class="">${day}</span>
                    <span class="calendar__plus">+</span>
                </button>
            `;
		} else {
			dates.innerHTML += `
                <button class="btn btn--modal calendar__date" data-id="${yearId}-${monthId}-${dayId}">
                    <span class="">${day}</span>
		    <div class="dot"id="dotId"></div>
                    <span class="calendar__plus">+</span>
                </button>
            `;
		}
	}
};

const getTotalDays = (month) => {
	if (month === -1) month = 11;

	if (
		month == 0 ||
		month == 2 ||
		month == 4 ||
		month == 6 ||
		month == 7 ||
		month == 9 ||
		month == 11
	) {
		return 31;
	} else if (month == 3 || month == 5 || month == 8 || month == 10) {
		return 30;
	} else {
		return isLeap() ? 29 : 28;
	}
};

const isLeap = () => {
	return (
		(currentYear % 100 !== 0 && currentYear % 4 === 0) ||
		currentYear % 400 === 0
	);
};

const startDay = () => {
	let start = new Date(currentYear, currentMonth, 1);
	return start.getDay() - 1 === -1 ? 6 : start.getDay() - 1;
};

const goToPrevMonth = () => {
	if (currentMonth !== 0) {
		currentMonth--;
	} else {
		currentMonth = 11;
		currentYear--;
	}

	setNewDate();
};

const goToNextMonth = () => {
	if (currentMonth !== 11) {
		currentMonth++;
	} else {
		currentMonth = 0;
		currentYear++;
	}

	setNewDate();
};

const goToTodayMonth = () =>
{
	if (currentMonth !== tdMonth) {
		currentMonth = tdMonth;
	} if (currentYear !== todayYear)
			currentYear = todayYear;
			setNewDate();
};

const setNewDate = () => {
	currentDate.setFullYear(currentYear, currentMonth, currentDay);
	month.textContent = monthNames[currentMonth];
	year.textContent = currentYear.toString();
	dates.textContent = '';
	writeMonth(currentMonth);
};


//generate colored points in calendar days depending on the event type:

// create html of the dot
// get the color type of the events
// change html of the div id=dot corresponding to the color of events created
// associate date of the event list to the calendar selected day
//show the correct color dot to the day
//test:
// function changeDot(event){
// let event__color = getEventTypeColor(event);

// 	if ( == ) {
// 	dotId.innerHTML += `
//         <div class="dot" ${event__color}"></div>`
// }
