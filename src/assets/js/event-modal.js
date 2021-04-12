
/*! This function is to be executed each time someone click on an event
TODO associate eventListener
*/

function eventModal (event) {
    event.stopPropagation(); // Needed to prevent execution of parent div
    /* 
    TODO Here it has to include some code to get the information from localStorage 
    */
    /* 
    TODO it has to load the data inside the modal
   */
  //* Showing the modal
    const modalBackground = document.getElementById("modal-event-section");

    //* Adding eventListener to modal
    
    modalBackground.classList.remove("hidden");
}

// ! Function to add a mock event

function addEventTesting () {
    const daysContainer = document.getElementById("modal-event-div").children;
    let newEvent = document.createElement("div");
    newEvent.classList.add("event-in-calendar");
    newEvent.classList.add("blue-event");
    newEvent.innerHTML = "Evento Prueba";
    newEvent.addEventListener('click', eventModal);
    daysContainer[5].appendChild(newEvent);
    const allEvents = document.querySelectorAll(".event-in-calendar");
    
    /*
    ! This code may be usable for later
    for (let event of allEvents) {
        event.addEventListener('click', eventModal);
    } */
}
addEventTesting();