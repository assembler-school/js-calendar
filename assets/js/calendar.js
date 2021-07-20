let firstDay; //First day of the week wich starts the month
let lastDay;
let currentDate = new Date();
let currentMonth = currentDate.getMonth() + 1;
let currentYear = currentDate.getFullYear();

firstDay = function () {
  return new Date(currentYear, currentMonth - 1, 1).getDay();
};

lastDay = function () {
  return new Date(currentYear, currentMonth - 1, 0).getDate();
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
  for (let i = 0; i <= lastDay(); i++) {
    let newBlank = document.createElement("div");
    newBlank.innerHTML = i + 1;
    daysMonth.appendChild(newBlank);
  }
}

function nextButton() {
  let nextBtn = document.getElementById("next-btn");
  nextBtn.addEventListener("click", nextMonth);
}

function nextMonth() {
  currentMonth += 1;
  console.log(currentMonth);
  let daysMonth = document.getElementById("daysMonth");
  daysMonth.innerHTML = "";
  insertBlankDays();
  insertDays();
  monthTitle();
}

function monthTitle() {
  let calendarTitle = document.getElementById("calendar-title");
  calendarTitle.innerHTML = currentDate.toLocaleString("es", { month: "long" });
}

export { insertBlankDays, insertDays, nextButton, monthTitle };
