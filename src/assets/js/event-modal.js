
/*! This function is to be executed each time someone click on an event
TODO associate eventListener
*/

function eventModal (event) {
    /* 
    TODO Here it has to include some code to get the information from localStorage 
    */
   /* 
   TODO it has to include the data inside the modal
   */
  //* Showing the modal
    const modalBackground = document.getElementById("modal-event-section");

    modalBackground.classList.remove("hidden");
}

// ! Function to add a mock event

function addEventTesting () {
    const daysContainer = document.getElementById("modal-event-div").children;
    let newEvent = document.createElement("div");
    newEvent.classList.add("event-in-calendar");
    newEvent.classList.add("blue-event");
    newEvent.innerHTML = "Evento Prueba";
    daysContainer[5].appendChild(newEvent);
    const allEvents = document.querySelectorAll("event-in-calendar");
    for (let event of allEvents) {
        event.addEventListener('click', eventModal);
    }
}