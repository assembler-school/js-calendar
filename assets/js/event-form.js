/* IMPORT */
import { closeModal, MODALWINDOW, escapeEventListener } from "./modal.js";
import { renderCalendar } from "./calendar.js";

let monthEvents = {}; // To save event Ids for each month

/* EVENT FUNCTIONALITIES */
function renderAddEventForm(data, autocomplete) {
    // Display the modal box for adding a new event
    MODALWINDOW.innerHTML = `
    <div id="modalOverlay" class="modal__overlay"></div>
    <div class="modal__content">
      <span id="modalClose" class="modal__close">&#10799;</span>
      ${eventForm}
    </div>
  `;

    if (autocomplete) {
        renderEditEventForm(data);
    } else {
        // Adding current time to input date
        document.getElementById("initialDate").value = data;
    }

    // To close the current Modal
    document.getElementById("modalClose").addEventListener("click", closeModal); // Closing by clicking the X button
    document.getElementById("modalOverlay").addEventListener("click", closeModal); // Closing by clicking outside the modal box
    document.getElementById("cancelEvent").addEventListener("click", closeModal); // Closing by clicking the cancel button
    document.addEventListener("keydown", escapeEventListener);

    // Dinamic form fields
    document.getElementById("displayEnd").addEventListener("click", function() {
        displayInputField("containerFinalDate");
    });

    document
        .getElementById("displayReminder")
        .addEventListener("click", function() {
            displayInputField("containerSetRemainder");
        });

    // Submit addEventForm
    document
        .getElementById("addEventForm")
        .addEventListener("submit", formHandler);
}

function renderEditEventForm(data) {
    // Change button text
    document.getElementById("submitForm").textContent = "Edit";

    // Show trash bin
    let trashIcon = document.getElementById("trash-bin");
    trashIcon.classList.remove("display-none");
    trashIcon.addEventListener("click", () => deleteEventById(data));

    // Get current Event from storage and mapp values to form
    let storageEvent = JSON.parse(localStorage.getItem(parseInt(data)))[0];
    let formElements = document.querySelectorAll("#addEventForm [name]");
    formElements.forEach((element) => {
        for (let key in storageEvent) {
            if (key == element.name) {
                element.value = storageEvent[key];

                // Set to checked inputs
                if (key === "finalDate" && storageEvent[key] != "") {
                    document.getElementById("displayEnd").checked = true;
                    document
                        .getElementById("containerFinalDate")
                        .classList.remove("display-none");
                }

                if (key === "reminderEvent" && storageEvent[key] != "0") {
                    document.getElementById("displayReminder").checked = true;
                    document
                        .getElementById("containerSetRemainder")
                        .classList.remove("display-none");
                }
            }
        }
    });

    // Add param Id to form
    document.getElementById("addEventForm").setAttribute("data-event", data);
}

function deleteEventById(id) {
    let confirmation = confirm("Are you sure you want to delete this event?");
    if (confirmation) {
        // Play Sound
        new Audio("./assets/trash.mp3").play();
        // Remove item from storage
        window.localStorage.removeItem(id);

        closeModal();
        renderCalendar(0);
        document.getElementById("summary-current").innerHTML = "";
    }
}

function formHandler(event) {
    event.preventDefault();

    let form = event.target;
    let eventId = form.getAttribute("data-event");

    let formData = new FormData(form);

    let eventObject = {};

    // Display the key/value pairs
    for (var pair of formData.entries()) {
        eventObject[pair[0]] = pair[1];
    }

    // To check edit/new
    if (eventId === null || eventId === "") {
        // Save Event in LocalStorage
        let keyEvent = new Date().getTime();
        window.localStorage.setItem(keyEvent, JSON.stringify([eventObject]));
    } else {
        // Edit existing event
        window.localStorage.setItem(eventId, JSON.stringify([eventObject]));
    }

    // Close Modal
    closeModal();

    // Render Calendar
    renderCalendar(0); // PARAMETER 0 INDICATES THAT THE CURRENT MONTH HAS NO CHANGES
}

// Show and Hide elements in the form
function displayInputField(element) {
    let elm = document.getElementById(element);
    elm.classList.toggle("display-none");

    if (elm.classList.contains("display-none")) {
        document.querySelector(`#${element} [name]`).value = "";
    }
}

/* HTML CODE FOR ADD EVENT FORM */

let eventForm = `
<form id="addEventForm">
  <div class="eventform__title">
      <!-- <label for="title">Title</label> -->
      <input type="text" id="title" class="eventform__inputtitle" name="titleEvent" maxlength="60" placeholder="Insert your title" required />
  </div>
  <div>
      <label class="initialdate__modal" for="initialDate">&#128337 Starts</label>
      <input type="datetime-local" class="initialdate__modal--input" id="initialDate" name="initialDate" required />
  </div>
  <div>
  <input type="checkbox" class="endtime__modal" id="displayEnd" />
  <label for="displayEnd" class="endtime__modal">Check if there is an end time?</label>
  </div>
  <div id="containerFinalDate" class="container__finaldate display-none">
      <label class="finaldate__modal" for="finalDate">&#128337 Ends</label>
      <input type="datetime-local" class="finaldate__modal--input" id="finalDate" name="finalDate" />
  </div>
  <div>
  <input type="checkbox" id="displayReminder" />
      <label for="displayReminder" class="notificationdiv">Notification &#128276</label>
  </div>
  <div id="containerSetRemainder" class="display-none setreminder">
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
      <label for="descriptionEvent">Description</label>
      <textarea id="descriptionEvent" name="descriptionEvent"></textarea>
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
      <button type="submit" id="submitForm" class="form__button submit">Create
      </button>

      <div id="trash-bin" class="trash-bin display-none">&#128465;</div>
  </div>

</form>
`;

/* EXPORT */

export { renderAddEventForm, deleteEventById };