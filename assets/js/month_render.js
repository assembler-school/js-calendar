//
let actualDate = new Date();
console.log(actualDate);
let date = actualDate;

function renderMonth(selectedDate) {
    let month = selectedDate.getMonth();
    let year = selectedDate.getFullYear();
    let firstDay = (new Date(year, month)).getDay();
    let daysInMonth = 32 - new Date(year, month, 32).getDate();

    let dayOne = document.querySelector('#first__week div[data-col="' + firstDay + '"]');
    console.log(dayOne);
    let weekDay = firstDay;
    let weeks = document.getElementsByClassName('week');
    console.log(weeks[0]);
    let weekCount = 1;

    for (let x = 1; x < daysInMonth + 1; x++) {
        if (weekDay == 0) {
            document.querySelector('.week:nth-child(' + weekCount + ') div[data-col="' + weekDay + '"]').innerHTML = x;
            weekCount++;
            weekDay++;
        } else if (weekDay == 6) {
            document.querySelector('.week:nth-child(' + weekCount + ') div[data-col="' + weekDay + '"]').innerHTML = x;
            weekDay = 0;
        } else {
            document.querySelector('.week:nth-child(' + weekCount + ') div[data-col="' + weekDay + '"]').innerHTML = x;
            weekDay++;
        }
    }
}

renderMonth(date);