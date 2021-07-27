import { convertDate } from "./event-view.js";

let expiredContainerDiv = document.getElementById("summary-past");
let expiredEvents = [];

function myExpiredEvents() {
    let events = {...localStorage };

    for (const key in events) {
        let parsedEvent = JSON.parse(events[key])[0];

        let currentTime = new Date().getTime();
        let eventTime;

        if (parsedEvent.finalDate != "") {
            eventTime = new Date(parsedEvent.finalDate).getTime();
        } else {
            eventTime = new Date(parsedEvent.initialDate).getTime();
        }

        if (eventTime < currentTime && parsedEvent.dismissed != "true") {
            let titleEvent = ""
            let initialDate = "";
            let finalDate = ""
            let descriptionEvent = "";
            let eventType = "";

            if (parsedEvent.titleEvent != "") {
                titleEvent = parsedEvent.titleEvent;
            }
            if (parsedEvent.initialDate != "") {
                initialDate = convertDate(parsedEvent.initialDate);
            }
            if (parsedEvent.finalDate != "") {
                finalDate = convertDate(parsedEvent.finalDate);
            }
            if (parsedEvent.descriptionEvent != "") {
                descriptionEvent = parsedEvent.descriptionEvent;
            }
            if (parsedEvent.eventType != "") {
                eventType = parsedEvent.eventType;
            }


            expiredContainerDiv.innerHTML += `
            <div class="expiredEventContainer">
                <span data-eventdismiss="${key}" class="event__dismiss">&#10799;</span>
                <h4>${titleEvent}</h4>
                <p>${initialDate}</p>
                <p>${finalDate}</p>
                <p>${descriptionEvent}</p>
                <p>${eventType}</p>
            </div>
          `;
        }
    }
    let eventDismiss = document.querySelectorAll("[data-eventdismiss]");
    eventDismiss.forEach(event => {
        event.addEventListener("click", dismissSummaryEvent);
    });
}

function dismissSummaryEvent(e) {
    let key = parseInt(e.target.dataset.eventdismiss);
    let localStorageEvent = JSON.parse(localStorage.getItem(key))[0];
    localStorageEvent.dismissed = "true";
    localStorage.setItem(key, JSON.stringify([localStorageEvent]))
    e.target.parentElement.remove();
}


export { myExpiredEvents };