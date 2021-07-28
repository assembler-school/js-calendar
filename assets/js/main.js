// ----------- VARIABLES --------

// Modal form
let buttonEvent = document.querySelector("#calendarEvent");
let modal = document.querySelector("#modal");
let modalClose = document.querySelector("#button-close");
let closeModalBtn = document.querySelector("#close-modal");
let infoEvents = document.getElementById("modal-resume");
let modalInfoContent = document.getElementById("modal-resume-content");

// Form element
const endDate = document.getElementById("endDate");
const remind = document.getElementById("remind");
const endDateInput = document.getElementById("endDateInput");
const remindInput = document.getElementById("remindInput");
const modalContent = document.getElementById("modal-content");
const startDateOfEvent = document.getElementById("startDate")
const preSelectedDate = document.getElementById("pre-select")

// --------- EVENT LISTENER --------
window.addEventListener("keydown", pressEscape);
buttonEvent.addEventListener("click", openModal);
modalClose.addEventListener("click", closeModal);
closeModalBtn.addEventListener("click", closeModal);
endDate.addEventListener("click", displayEndDate);
remind.addEventListener("click", displayRemindEvent);

// Open form
function openModal() {
  modal.classList.add("--is-visible");
  startDateOfEvent.classList.remove("--is-hidden");
  preSelectedDate.classList.add("--is-hidden");
  document.getElementById("startDate").required = true;
  form.reset();
}

// Close form
function closeModal() {
  if (modal) {
    modal.classList.remove("--is-visible");
  }
  if (infoEvents) {
    infoEvents.classList.remove("--is-visible");
  }
}

// Display end date input
function displayEndDate() {
  endDateInput.classList.toggle("--is-hidden");
}

// Display time options of remind input
function displayRemindEvent() {
  remindInput.classList.toggle("--is-hidden");
}

// Escape the modal window when pressing Escape
function pressEscape(event) {
  if (event.key === "Escape") {
    if (modal) {
      closeModal();
    }
    if (infoEvents) {
      closeModal();
    }
  }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    closeModal();
  }
  if (event.target == infoEvents) {
    infoEvents.classList.remove("--is-visible");
  }
};


/** FORM VALUES */

let form = document.getElementById("modal-form");
form.addEventListener("submit", getValues);

let eventValue = {
  name: "",
  startDate: "",
  startTime: "",
  endDateInput: "",
  endTime: "",
  remindInput: 0,
  description: "",
  eventType: "",
};

// Save input values in an object
let events = [];
events = JSON.parse(localStorage.getItem("events")) || [];
let eventDate;

function getValues(e) {
  // e.preventDefault();
  eventValue.name = document.getElementById("name").value;

  if(document.getElementById("startDate").value) {
    eventValue.startDate = document.getElementById("startDate").value;
  } else {
    eventValue.startDate = clicked
  }

  eventValue.startTime = document.getElementById("startTime").value;

  eventValue.endDateInput = document.getElementById("endDateInfo").value;
  eventValue.endTime = document.getElementById("endTime").value;
  eventValue.remindInput = document.getElementById("time").value;
  eventValue.description = document.getElementById("description").value;
  eventValue.eventType = document.getElementById("eventType").value;

  // Save object in localStorage
  events.push(eventValue);
  localStorage.setItem("events", JSON.stringify(events));

  form.reset();
  closeModal();
}

// Display info of event
let myLocalStorage = JSON.parse(localStorage.getItem("events"));

function showResume(index) {
  infoEvents.classList.add("--is-visible");

  let myObject = myLocalStorage[index];

  // Count remaining time from current date to start date
  let dateOfEvent = myObject.startDate + " " + myObject.startTime
  let setDate = Date.parse(dateOfEvent);
  // console.log(setDate)
  let currentDate = Date.parse(new Date());
  if (setDate > currentDate) {
    var timeLeft = ((setDate - currentDate)/1000)
  }

  let html = `
  <button id="close-resume" class="modal__close">X</button>
  <p>Name: ${myObject.name}</p>
  <p>Start date: ${myObject.startDate}</p>
  <p>Start time: ${myObject.startTime}</p>
  <p>End date: ${myObject.endDateInput}</p>
  <p>Remind: ${myObject.remindInput}</p>
  <p>Description: ${myObject.description}</p>
  <p>Event type: ${myObject.eventType}</p> 
  <p>Remaining Time: <span id="time-left"></span></p> 
  <button id="delete-event">Delete</button>
  `;
  modalInfoContent.innerHTML = html;

  // Display remaining time of event 
  // From current date to start date
  let timeRemain = document.querySelector("#time-left")
  timeRemain.innerHTML = timeLeft

  function setTime() {
    timeLeft--;
    timeRemain.innerHTML = timeLeft;
  }
  setInterval(setTime, 1000);

  // Delete event
  let deleteEventBtn = document.getElementById("delete-event");
  let closeModalResumeBtn = document.getElementById("close-resume");
  closeModalResumeBtn.addEventListener("click", closeModal);

  deleteEventBtn.addEventListener("click", () => {
    myLocalStorage.splice(index, 1);
    localStorage.setItem("events", JSON.stringify(myLocalStorage));
    closeModal();
    window.location = window.location
  });
}

// Open modal form with pre-selected date
let clicked = null;

function openModalExtra(dayMatch) {

  clicked = dayMatch

  modal.classList.add("--is-visible");
  startDateOfEvent.classList.add("--is-hidden");
  document.getElementById("startDate").required = false;
  preSelectedDate.classList.remove("--is-hidden");

  preSelectedDate.innerHTML  = dayMatch
  form.reset();

}

//Calendar Rendering and Functionality
let calendarDays = document.querySelector("#calendar-days");

let monthName = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let dayName = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

let currentDate = new Date();
let currentDay = currentDate.getDate();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function renderCalendar() {
  let currentMonthHtml = document.getElementById("currentMY");

  currentMonthHtml.innerHTML = monthName[currentMonth] + " " + currentYear;

  // Get the number of days in a month
  let daysQuantity = new Date(currentYear, currentMonth + 1, 0).getDate();
  
  // Get the first date of the month, and also the last days of previous month
  let firstDay = new Date(currentYear, currentMonth, 1);

  let dayString = firstDay.toLocaleDateString("en-GB", {
    weekday: "long",
  });
  
  let indexFirstDay = dayName.indexOf(dayString); // 3

  // Draw the day square of each month 
  for (let index = 1; index <= daysQuantity + indexFirstDay; index++) {
    let createDiv = document.createElement("div");
    createDiv.classList.add('calendar__day')

    if (index > indexFirstDay) {
      let numberOfDays = index - indexFirstDay;
      createDiv.innerHTML = numberOfDays;

      // Create button to add event to each square of day
      let createDivBtn = document.createElement("button");
      createDivBtn.innerHTML = `Create`
      createDiv.appendChild(createDivBtn)
      createDivBtn.classList.add("--is-hidden")

      // Display the button the mouse hover
      createDiv.addEventListener("mouseover", () => createDivBtn.classList.remove("--is-hidden"))

      // Hide the button when the mouse move out
      createDiv.addEventListener("mouseout", () => createDivBtn.classList.add("--is-hidden") )

      // open the modal 
      createDivBtn.addEventListener("click", () => openModalExtra(dayMatch))

      // Get info of event 

      // Get the right date format
      let dayMatch = `${currentYear}-${currentMonth + 1}-${numberOfDays}`;

      if (numberOfDays < 10) {
        dayMatch = `${currentYear}-${currentMonth + 1}-0${numberOfDays}`;
      }

      if (currentMonth < 10 || numberOfDays < 10) {
        dayMatch = `${currentYear}-0${currentMonth + 1}-0${numberOfDays}`;
      }

      if (numberOfDays >= 10) {
        dayMatch = `${currentYear}-0${currentMonth + 1}-${numberOfDays}`;
      }

      // Search for event on localStorage by start date and name
      for (let index = 0; index < events.length; index++) {
        eventDate = events[index].startDate.split("T")[0];
        if (eventDate === dayMatch) {
          eventDiv = document.createElement("button");
          eventDiv.innerHTML = events[index].name;
          createDiv.appendChild(eventDiv);

          // Display info of each event
          eventDiv.addEventListener("click", () => showResume(index));

          // Mark expired events with red color
          checkExpiredEvents(index);
        }
      }

      // Highlight current date
      let loopDate = new Date();
      if (
        currentDay === numberOfDays &&
        currentMonth === loopDate.getMonth() &&
        currentYear === loopDate.getFullYear()
      ) {
        createDiv.classList.add("--is-selected");
      }
    }
    calendarDays.appendChild(createDiv);
  }
}

// Move between months and years
function clickArrow() {
  let prevArrow = document.getElementById("previousMonth");
  let nextArrow = document.getElementById("nextMonth");

  // Go forward
  nextArrow.addEventListener("click", () => {
    calendarDays.innerHTML = "";
    if (currentMonth === 11) {
      currentMonth = 0;
      currentYear++;
    } else {
      currentMonth++;
    }

    renderCalendar();
    calendarDays.classList.add("--is-moving-right");
  });

  // Go back
  prevArrow.addEventListener("click", () => {
    calendarDays.innerHTML = "";
    if (currentMonth === 0) {
      currentMonth = 11;
      currentYear--;
    } else {
      currentMonth--;
    }
    renderCalendar();
  });
}

renderCalendar();
clickArrow();


// Check expired events
function checkExpiredEvents(value) {

  // If the event has no end date, compare start date and current date
  if (!events[value].endDateInput) {
    let startDateInfo = events[value].startDate + " " + events[value].startTime
    let setDate = Date.parse(startDateInfo);
    let currentDate = Date.parse(new Date());
    if (setDate < currentDate) {
      eventDiv.classList.add("--is-expired")
      // alert("The event " + events[value].name +  " has expired")
    }
  }

  // If the event has end date, compare end date and current date
  if (events[value].endDateInput) {
    let endDateInfo = events[value].endDateInput + " " + events[value].endTime
    let setDate = Date.parse(endDateInfo);
    let currentDate = Date.parse(new Date());
    if (setDate < currentDate) {
      eventDiv.classList.add("--is-expired")
      // alert("The event " + events[value].name +  " has expired")
    }
  }
}

// Event Reminder, use current date and start date of event as the benchmark
function renderTimeEvent() {
  for (let i = 0; i < events.length; i++) {
    let dateOfEvent = events[i].startDate + " " + events[i].startTime
    let setDate = Date.parse(dateOfEvent);
    let currentDate = Date.parse(new Date());

    // Compare current day and event's start date 
    if (setDate > currentDate) {
      var timeLeft = ((setDate - currentDate)/1000)
    }

    // console.log(timeLeft)
    
    // Compare remaining time and remind requirements
    if (events[i].remindInput) {
      let remindInfoInMinute = events[i].remindInput;
      let remindInfoInSeconds = remindInfoInMinute*60
      if (timeLeft === remindInfoInSeconds) {
        alert("You have some minutes left")
       }
    }
  }
}

setInterval(renderTimeEvent, 1000)


