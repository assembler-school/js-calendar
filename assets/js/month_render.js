//
let actualDate = new Date();
console.log(actualDate);
let date = actualDate;

function renderMonth(selectedDate) {
    let month = selectedDate.getMonth();
    let year = selectedDate.getFullYear();
    let firstDay = (new Date(year, month)).getDay();
    console.log(firstDay);
    let dayOne = document.querySelector('#first__week div[data-col="' + firstDay + '"]');
    let daysInMonth = 32 - new Date(year, month, 32).getDate();
    console.log(daysInMonth);
}

renderMonth(date);