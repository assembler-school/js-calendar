function calendarMonthConstructor() {
    let weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const monthSection = document.querySelector('#month-section');

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

    // Assign a number for each day. It should check what month is and display the number on the right day.
    function setDayNumber(month) {
        const numberOfDay = document.querySelectorAll('.month_day_number');
        let i = 1;
        numberOfDay.forEach(day => {
            day.innerHTML = i
            if (i > month) {
                day.classList.add('day-not-month')
            }
            i++
        })
    }

    createWeekRow();
    createMonthGrid();
    setDayNumber(31);
}

calendarMonthConstructor()



