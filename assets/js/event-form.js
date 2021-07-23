/* IMPORT */
import { closeModal, MODALWINDOW, escapeEventListener } from "./modal.js";
import { renderCalendar } from "./calendar.js";

let monthEvents = {}; // To save event Ids for each month

/* EVENT FUNCTIONALITIES */
function renderAddEventForm(time) {
  // Display the modal box for adding a new event
  MODALWINDOW.innerHTML = `
    <div id="modalOverlay" class="modal__overlay"></div>
    <div class="modal__content">
      <span id="modalClose" class="modal__close">&#10799;</span>
      ${eventForm}
    </div>
  `;

  // Adding current time to input date
  document.getElementById("initialDate").value = time

  // To close the current Modal
  document.getElementById("modalClose").addEventListener("click", closeModal); // Closing by clicking the X button
  document.getElementById("modalOverlay").addEventListener("click", closeModal); // Closing by clicking outside the modal box
  document.getElementById("cancelEvent").addEventListener("click", closeModal); // Closing by clicking the cancel button
  document.addEventListener("keydown", escapeEventListener);

  // Dinamic form fields
  document.getElementById("displayEnd").addEventListener("click", function () {
    displayInputField("containerFinalDate");
  });

  document
    .getElementById("displayReminder")
    .addEventListener("click", function () {
      displayInputField("containerSetRemainder");
    });

  // Submit addEventForm
  document
    .getElementById("addEventForm")
    .addEventListener("submit", formHandler);
}

function formHandler(event) {
  event.preventDefault();

  let formData = new FormData(event.target);

  let eventObject = {};

  // Display the key/value pairs
  for (var pair of formData.entries()) {
    eventObject[pair[0]] = pair[1];
  }

  eventObject.currentIdEvent = Date.now(); // Unique timestamp of event creation date

  let currentEventYear = new Date(formData.get("initialDate")).getFullYear();
  let currentEventMonth = new Date(formData.get("initialDate")).getMonth();

  let monthEventUnix = new Date(currentEventYear, currentEventMonth).getTime();

  let monthEvents = window.localStorage.getItem(monthEventUnix);

  if (monthEvents) {
    // When have events on current month
    monthEvents = JSON.parse(window.localStorage.getItem(monthEventUnix)); // Parse to array
    monthEvents.push(eventObject); // Push new event
    window.localStorage.setItem(monthEventUnix, JSON.stringify(monthEvents)); // Update month array in storage
  } else {
    // When there is no event on current month then create the month key
    window.localStorage.setItem(monthEventUnix, JSON.stringify([eventObject]));
  }

  // Close Modal
  closeModal();

  // Render Calendar
  renderCalendar(0); // PARAMETER 0 INDICATES THAT THE CURRENT MONTH HAS NO CHANGES
}

// Show and Hide elements in the form
function displayInputField(element) {
  document.getElementById(element).classList.toggle("display-none");
}

/* HTML CODE FOR ADD EVENT FORM */

let eventForm = `
<form id="addEventForm">
  <div>
      <label for="title">Title</label>
      <input type="text" id="title" name="titleEvent" maxlength="60" required />
  </div>
  <div>
      <label for="initialDate">Initial Date</label>
      <input type="datetime-local" id="initialDate" name="initialDate" required />
  </div>
  <div>
      <label for="displayEnd">Do you need an end time?</label>
      <input type="checkbox" id="displayEnd" />End date
  </div>
  <div id="containerFinalDate" class="container__finaldate display-none">
      <label for="finalDate">Final Date</label>
      <input type="datetime-local" id="finalDate" name="finalDate" />
  </div>
  <div>
      <label for="displayReminder">Remind me when this event starts</label>
      <input type="checkbox" id="displayReminder" />
  </div>
  <div id="containerSetRemainder" class="display-none">
      <label for="setReminder">Time:</label>
      <select id="setReminder" name="reminderEvent">
          <option value="0" selected hidden>Select time</option>
          <option value="5">5min</option>
          <option value="10">10min</option>
          <option value="15">15min</option>
          <option value="30">30min</option>
          <option value="60">60min</option>
      </select>
  </div>
  <div>
      <label for="textArea">Description</label>
      <textarea id="textArea" name="descriptionEvent"></textarea>
  </div>
  <div>
      <label for="eventType">Event Type</label>
      <select id="eventType" name="eventType">
        <option value="type-default" selected hidden>Select type</option>
        <option value="meeting">Meeting</option>
        <option value="personal">Personal</option>
        <option value="study">Study</option>
        <option value="others">Others</option>
      </select>
  </div>
  <div>
      <button id="cancelEvent" class="form__button cancel">Cancel
      </button>
      <button type="submit" id="createEvent" class="form__button submit">Create
      </button>
  </div>
</form>
`;

/* EXPORT */

export { renderAddEventForm };
