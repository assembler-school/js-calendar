// ----------- VARIABLES --------

// Modal
let buttonEvent = document.querySelector("#calendarEvent");
let modal = document.querySelector("#modal");
let modalClose = document.querySelector("#button-close");
let closeModalBtn = document.querySelector("#close-modal");

// Form
const endDate = document.getElementById("endDate");
const remind = document.getElementById("remind");
const endDateInput = document.getElementById("endDateInput");
const remindInput = document.getElementById("remindInput");
const modalContent = document.getElementById("modal-content");

// --------- EVENT LISTENER --------
window.addEventListener("keydown", pressEscape);
buttonEvent.addEventListener("click", openModal);
modalClose.addEventListener("click", closeModal);
closeModalBtn.addEventListener("click", closeModal);

function openModal() {
  modal.classList.add("--is-visible");
}

function closeModal() {
  modal.classList.remove("--is-visible");
}

// --------- FORM VALIDATION --------
endDate.addEventListener("click", displayStartDate);
remind.addEventListener("click", displayRemindEvent);

// Display start date input
function displayStartDate() {
  endDateInput.classList.toggle("--is-hidden");
}

// Display time to remind
function displayRemindEvent() {
  // remindInput.classList.replace("--is-hidden", "--is-visible");
  remindInput.classList.toggle("--is-hidden");
}

// Escape the modal window when pressing Escape
function pressEscape(event) {
  if(event.key === 'Escape') {
    modal.classList.remove("--is-visible");
  }
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}

/**/
/** FORM VALUES */

let form = document.getElementById('modal-form')
form.addEventListener('submit', getValues)
let infoEvents = document.getElementById('resumeEvent')

let eventValue = {
  name: '',
  startDate: '',
  endDateInput: '',
  remindInput: 0,
  description: '',
  eventType: ''
}

function getValues(e) {
  let events = []

  e.preventDefault()
  eventValue.name = document.getElementById('name').value
  eventValue.startDate = document.getElementById('startDate').value
  eventValue.endDateInput = document.getElementById('endDateInfo').value
  eventValue.remindInput = document.getElementById('time').value
  eventValue.description = document.getElementById('description').value
  eventValue.eventType = document.getElementById('eventType').value

  events = JSON.parse(localStorage.getItem('events')) || []
  events.push(eventValue)
  localStorage.setItem('events', JSON.stringify(events))

  form.reset()
  closeModal()
  showResume()
}

let myLocalStorage = JSON.parse(localStorage.getItem('events'))
function showResume() {
  for (let i = 0; i < myLocalStorage.length; i++) {
    let myObject = myLocalStorage[0]
    let html = `
      <p>${myObject.name}</p>
      <p>${myObject.startDate}</p>
      <p>${myObject.endDateInput}</p>
      <p>${myObject.remindInput}</p>
      <p>${myObject.description}</p>
      <p>${myObject.eventType}</p>
    `
    infoEvents.innerHTML = html
  }
}

//Calendar Functionality

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
let monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
let currentMonthHtml = document.getElementById("currentMY");

currentMonthHtml.innerHTML = monthName[currentMonth] + " " + currentYear;

let daysQuantity = new Date(currentYear, currentMonth + 1, 0).getDate();
let firstDay = new Date (currentYear, currentMonth, 1)

let dayName = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
let dayString = firstDay.toLocaleDateString("en-GB", {
  weekday: "long", 
})
let indexFirstDay = dayName.indexOf(dayString); // 3

for (let index = 1; index <= daysQuantity + indexFirstDay; index++) {
  let createDiv = document.createElement("div")
  if (index > indexFirstDay) {
    createDiv.innerHTML = index - indexFirstDay;
  }
  let calendarDays = document.querySelector("#calendar-days");
  calendarDays.appendChild(createDiv)
}

console.log(indexFirstDay)