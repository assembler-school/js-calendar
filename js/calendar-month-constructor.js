function calendarMonthConstructor(month,year){
    //Calendar view
    calendarView = 'month-view';
    const monthSection = document.querySelector('#month-section');

    // January is 0;
    // Creates the name of the weeks
    function createWeekRow() {
        let weekRow = document.createElement('div');
        let dayOfWeek;
        weekRow.classList.add('week-days-header');
        for (let i = 0; i < 7; i++) {
            dayOfWeek = document.createElement('h2');
            dayOfWeek.classList.add('dayOfWeek-name');
            weekRow.appendChild(dayOfWeek);
        }
        let weekRowChilds = weekRow.childNodes;
        let j = 0
        weekRowChilds.forEach(e => {
            e.textContent += weekDays[j]
            j++;
        })
        monthSection.appendChild(weekRow)
    }

    // Creates the grid for the month
    function createMonthGrid() {
        let monthContainer = document.createElement('div');
        monthContainer.classList.add('month-container');
        for (let i = 0; i < 42; i++) {
            let dayOfMonth = document.createElement('div');
            let numberOfDayContainer = document.createElement('div');
            let eventContainer = document.createElement('div');
            dayOfMonth.classList.add('day_box');
            numberOfDayContainer.classList.add('month_day_number');
            eventContainer.classList.add('event-container');
            dayOfMonth.appendChild(numberOfDayContainer);
            dayOfMonth.appendChild(eventContainer);
            monthContainer.appendChild(dayOfMonth);
        }
        monthSection.appendChild(monthContainer)
    }

    // Gives you the amount of days on the month (the first month is 1)
    function getMonthDays(currentYear,currentMonth){
        return new Date(currentYear,currentMonth + 1, 0).getDate();
    }

    // Gives you the first day of the month (0 is Sunday, the first month is 0)
    function getFirstMonthDay(year,month){
        let day = new Date(year, month).getDay();
        //return 7 because in calendar week start on monday and get day starts on sunday
        if(day == 0){
            return 7;
        }else{
            return day;
        }
    }

    // Assign a number for each day. It should check what month is and display the number on the right day.
    function populateMonth(month) {
        const numberOfDay = document.querySelectorAll('.month_day_number');
        let day = 1
        for (let i = 0; i < numberOfDay.length; i++) {
            if (i < (getFirstMonthDay(year,month) - 1)) {
                numberOfDay[i].innerHTML = ''
            }   else if (day <= getMonthDays(year,month)) {
                numberOfDay[i].innerHTML = day;

                idMonth = month + 1;
                idDay = day;
                if(idMonth < 10){
                    idMonth = '0' + idMonth
                }
                if(idDay < 10){
                    idDay = '0' + idDay;
                }

                numberOfDay[i].setAttribute('id',year + '/' + idMonth + '/' + idDay);
                let fullDateId = formatDate(new Date(`${year}/${idMonth}/${idDay}`));
                numberOfDay[i].parentNode.addEventListener('click', (event) => {
                    if (event.target.classList.contains('event-container')
                        || event.target.classList.contains('event-text')) return;
                    showModalWithDay(fullDateId);
                });
                day++
            }
        }
    }

    function updateMonthAndYearHeader(monthText, yearText) {
        let currentMonthText = document.querySelector('.currentMonth-text');
        let currentYearText = document.querySelector('.currentYear-text');
        currentMonthText.innerHTML = monthText;
        currentYearText.innerHTML = yearText;
    }
    clearMonthCalendar();
    createWeekRow();
    createMonthGrid();
    populateMonth(month);
    updateMonthAndYearHeader(monthsNames[month], year);
    today(month,currentDay,currentMonth,currentYear);
    displayEventsInMonth(idMonth, calendarEvents,year);
    loadListennersForDetails()
    buttonMonthYearStyle();
}