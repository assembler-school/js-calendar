const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const calendarContainer = document.querySelector("#months");
const formInitDate = document.querySelector("#initDate");
const formCreation = document.querySelector("#form");
const formEvent = document.querySelector("#formEvent");
const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

const userLang = window.navigator.language;

function loadMonths() {

  navigator = currentMonth;

  for (let month = 0; month < monthNames.length; month++) {

    const monthContainer = document.createElement('div');
    monthContainer.setAttribute('id', month);
    monthContainer.classList.add('month');
    monthContainer.style.transition = 'opacity 3s ease-out';
    if (month !== currentMonth) {
      changeStyles("off", monthContainer);
    }

    const emptyDays = getEmptyDaysInMonth(currentYear, month, 1, "en");
    const daysInMonth = getDateTimeFullParams(currentYear, month + 1, 0).getDate();

    for (let day = 1; day <= emptyDays + daysInMonth; day++) {

      const domDay = document.createElement('div');
      domDay.classList.add('day');
      if (day === currentDay && month === currentMonth) domDay.classList.add('current');

      if (day > emptyDays) {
        addDay(domDay, day, month, currentYear, emptyDays);
      } else {
        domDay.classList.add('empty');
      }
      monthContainer.appendChild(domDay);
    }
    calendarContainer.appendChild(monthContainer);
  }

  monthDisplay.innerHTML = `<p>${getStringLocaleDate(currentDate, userLang)}</p>`;
  loadEvents();
}

function addDay(element, day, month, year, emptyDays) {
  element.textContent = day - emptyDays;
  element.setAttribute('data-day', day - emptyDays);
  element.setAttribute('data-month', month);
  element.addEventListener('click', function (e) {
    if (e.target.hasAttribute('data-day')) {
      document.querySelector("#modal").classList.add(isVisible);
      const date = getDateTimeFullParams(year, month, day - emptyDays, 12, 00, 00);
      const result = date.toISOString().split('T')[0];
      document.querySelector("#initDate").value = result;
      document.querySelector("#endDate").value = result;
      hideEndDateAndRemind();
    }
  });
}


loadMonths();
initMonthButtons();
initModalCreation();
initModalEvent();
initForm();
threadPendingTasks();
threadRemindTasks();



