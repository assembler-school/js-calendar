let firstDay; //First day of the week wich starts the month
let lastDay;
let currentDate = new Date();
let currentMonth = currentDate.getMonth() + 1;
let currentYear = currentDate.getFullYear();

firstDay = function () {
  return new Date(currentYear, currentMonth - 1, 1).getDay();
};

lastDay = function () {
  return new Date(currentYear, currentMonth, 0).getDate(); //SI LE RESTAMOS UNO AL CURRENT MONTH NO FUNCIONA IGUAL QUE PARA GETDAY, Y CALCULA MAL EL MES
};

function insertBlankDays() {
  let daysMonth = document.getElementById("daysMonth");
  if (firstDay() == 0) {
    for (let i = 0; i < 6; i++) {
      let newBlank = document.createElement("div");
      newBlank.innerHTML = "";
      daysMonth.appendChild(newBlank);
    }
  } else {
    for (let i = 1; i < firstDay(); i++) {
      let newBlank = document.createElement("div");
      newBlank.innerHTML = "";
      daysMonth.appendChild(newBlank);
    }
  }
}

function insertDays() {
  let daysMonth = document.getElementById("daysMonth");
  console.log(lastDay());
  for (let i = 0; i < lastDay(); i++) {
    let newBlank = document.createElement("div");
    newBlank.innerHTML = i + 1;
    daysMonth.appendChild(newBlank);
  }
}

function nextButton() {
  let nextBtn = document.getElementById("next-btn");
  nextBtn.addEventListener("click", nextMonth);
}
function prevButton() {
  let prevBtn = document.getElementById("prev-btn");
  prevBtn.addEventListener("click", prevMonth);
}

function nextMonth() {
  currentMonth += 1;
  let daysMonth = document.getElementById("daysMonth");
  daysMonth.innerHTML = "";
  insertBlankDays();
  insertDays();
  monthTitle();
}

function prevMonth() {
  currentMonth -= 1;
  let daysMonth = document.getElementById("daysMonth");
  daysMonth.innerHTML = "";
  insertBlankDays();
  insertDays();
  monthTitle();
}

function monthTitle() {
  let calendarTitle = document.getElementById("calendar-title");
  calendarTitle.innerHTML = new Date(
    currentYear,
    currentMonth - 1
  ).toLocaleString("en", { month: "long", year: "numeric" });
}

export {
  insertBlankDays,
  insertDays,
  nextButton,
  prevButton,
  monthTitle,
  firstDay,
};
