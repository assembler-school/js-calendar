function calendarMonthConstructor() {
    let weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const monthSection = document.querySelector('#month-section');
    let currentDate = new Date;
    let currentWeekDay = currentDate.getDay();
    let currentDay = currentDate.getDate();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    let month = currentMonth;
    let year = currentYear;
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
            dayOfMonth.classList.add('day_box');
            numberOfDayContainer.classList.add('month_day_number');
            dayOfMonth.appendChild(numberOfDayContainer);
            monthContainer.appendChild(dayOfMonth);
        }
        monthSection.appendChild(monthContainer)
    }

    // Gives you the amount of days on the month (the first month is 1)
    function getMonthDays(currentYear,currentMonth){
        return new Date(currentYear,currentMonth + 1, 0).getDate();
    };

    // Gives you the first day of the month (0 is Sunday, the first month is 0)
    function getFirstMonthDay(currentYear,currentMonth){
        return new Date(currentYear, currentMonth).getDay();
    };

    // Assign a number for each day. It should check what month is and display the number on the right day.
    function populateMonth(month) {
        const numberOfDay = document.querySelectorAll('.month_day_number');
        let day = 1
        for (let i = 0; i < numberOfDay.length; i++) {
            if (i < (getFirstMonthDay(currentYear,month) - 1)) {
                numberOfDay[i].innerHTML = ''
            }   else if (day <= getMonthDays(currentYear,month)) {
                numberOfDay[i].innerHTML = day;
                numberOfDay[i].setAttribute('id',year + '/' + (month+1) + '/' + day);
                day++
            }
        }
    }

    function updateMonthAndYearHeader(monthText, yearText) {
        let currentMonthText = document.querySelector('.currentMonth-text');
        let currentYearText = document.querySelector('.currentYear-text');
        if (!monthText) {
            currentMonthText.innerHTML = monthText;
        }   else {
            currentMonthText.innerHTML = monthText;
        }
        currentYearText.innerHTML = yearText;

    }

    createWeekRow();
    createMonthGrid();
    populateMonth(month);
    today(currentDay,currentMonth,currentYear);
    updateMonthAndYearHeader(monthsNames[month], year)
}

function today(currentDay,currentMonth,currentYear){
    document.querySelector('[id="' + currentYear + '/' + (currentMonth + 1) + '/' + currentDay + '"]').classList += ' current';
  }

calendarMonthConstructor()


