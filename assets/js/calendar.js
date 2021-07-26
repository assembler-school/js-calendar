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
							<span class="calendar__plus">+</span>
					</button>
			`;
		}
	}

	addDotsToCalendar();
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

const goToTodayMonth = () => {
	if (currentMonth !== tdMonth || currentYear !== todayYear) {
		currentMonth = tdMonth;
		currentYear = todayYear;
	}
	setNewDate();
	writeEventsOfTheDay(today);
	writeDayWeek(today);
};

const setNewDate = () => {
	currentDate.setFullYear(currentYear, currentMonth, currentDay);
	month.textContent = monthNames[currentMonth];
	year.textContent = currentYear.toString();
	dates.textContent = '';
	writeMonth(currentMonth);
};

/**
 * Generate colored points in calendar days depending on the event type
 */
const addDotToDate = (element, idDateSelected) => {

	// create html of the dot
	let dot = document.createElement('div');

	//add styles class dot
	dot.classList.add('event__dot');

	//get the color type of the events
	let bg_color = getEventTypeColor(element);

	//add bg color to the dot
	dot.classList.add(`${bg_color}`);

	//get the day selected
	let eventDOM = document.querySelector(`[data-id='${idDateSelected}']`);

	//add dots into eventNote
	eventDOM.appendChild(dot);
}

const addDotsToCalendar = () => {

	//get sort events
	let eventsDots = eventsNotes.sort((a, b) => b.startString - a.startString);

	let calendarDates = document.querySelectorAll(".calendar__date");

	calendarDates.forEach((el) => {
		
		//get the day selected
		const idDateSelected = el.dataset.id;

		if(!idDateSelected) return null;
		
		//find the event dot
		const eventsToday = eventsDots.filter(event => event.startString == idDateSelected);

		//
		eventsToday.forEach((element) => addDotToDate(element, idDateSelected));
	});
}
