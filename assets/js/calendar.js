'use strict';

/**
 * Print on screen the month calendar.
 *
 * @param {Number} month
 */
const renderMonth = (month) => {

	//print the days before the current month starts
	for (let i = startDay(); i > 0; i--) {
		dates.innerHTML += `
			<div class="calendar__date calendar__prev">
				<span class="event__number">${getTotalDays(currentMonth - 1) - (i - 1)}</span>
			</div>
		`;
	}

	//print all the days of the current month
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
					<span class="event__number">${day}</span>
					<ul class="event__dots"></ul>
					<span class="calendar__plus">+</span>
				</button>
			`;
		} else {
			dates.innerHTML += `
				<button class="btn btn--modal calendar__date" data-id="${yearId}-${monthId}-${dayId}">
					<span class="event__number">${day}</span>
					<ul class="event__dots"></ul>
					<span class="calendar__plus">+</span>
				</button>
			`;
		}
	}

	addDotsToCalendar();
};

/**
 * Get total days in a month
 *
 * @param {Number} month
 * @return {Number} Returns days as number
 */

//to know if the month has 31 or 30
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

/**
 * Check if a year is leap or not
 * @return {Boolean} Returns leap as boolean
 */
const isLeap = () => {
	return (
		(currentYear % 100 !== 0 && currentYear % 4 === 0) ||
		currentYear % 400 === 0
	);
};

/**
 * Get the day of the week that the month starts
 * @return {Number} Returns day as number
 */
const startDay = () => {
	let start = new Date(currentYear, currentMonth, 1);
	return start.getDay() - 1 === -1 ? 6 : start.getDay() - 1;
};

/**
 * Print prev month in the calendar
 */
const goToPrevMonth = () => {
	if (currentMonth !== 0) {
		currentMonth--;
	} else {
		currentMonth = 11;
		currentYear--;
	}

	setNewDate();
};

/**
 * Print next month in the calendar
 */
const goToNextMonth = () => {
	if (currentMonth !== 11) {
		currentMonth++;
	} else {
		currentMonth = 0;
		currentYear++;
	}

	setNewDate();
};

/**
 * Print today month in the calendar
 */
const goToTodayMonth = () => {
	if (currentMonth !== tdMonth || currentYear !== todayYear) {
		currentMonth = tdMonth;
		currentYear = todayYear;
	}
	setNewDate();
	renderEventsOfTheDay(today);
	renderDayWeek(today);
};

/**
 *	Update and print the current date in the calendar screen
 */
const setNewDate = () => {
	//set the new current date
	currentDate.setFullYear(currentYear, currentMonth, currentDay);

	//print date variables in the DOM
	month.textContent = monthNames[currentMonth];
	year.textContent = currentYear.toString();

	//clear the dates element in the DOM
	dates.textContent = '';

	//print the current dates month
	renderMonth(currentMonth);
};

/**
 * Add colored dots on the calendar for the days that you have events
 */
const addDotsToCalendar = () => {

	//get sort events
	let eventsDots = eventsNotes.sort((a, b) => b.startDate - a.startDate);

	//get the calendar dates
	let calendarDates = document.querySelectorAll(".calendar__date");

	//loop every calendar date
	calendarDates.forEach((el) => {

		//get the day selected
		const idDateSelected = el.dataset.id;

		//if it doesn't have id out of the loop
		if (!idDateSelected) return null;

		//filter the events dots and save in eventsToday array
		const eventsToday = eventsDots.filter(event => event.startDate == idDateSelected);

		//create dots for every event day
		eventsToday.forEach((eventToday) => addDotToDate(eventToday, idDateSelected));
	});
}

/**
 * Generate colored dot in calendar days depending on the event type
 *
 * @param {Object} eventToday
 * @param {String} idDateSelected
 */
const addDotToDate = (eventToday, idDateSelected) => {

	//create html of the dot
	let dot = document.createElement('li');

	//add styles class dot
	dot.classList.add('event__dot');

	//get the color type of the events
	let bg_color = getEventTypeColor(eventToday);

	//add bg color to the dot
	dot.classList.add(`${bg_color}`);

	//get dotList of the day selected
	let dotList = document.querySelector(`[data-id='${idDateSelected}'] .event__dots`);

	//add dots into the event dot list
	dotList.appendChild(dot);
}