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
                initialDate = new Date(parsedEvent.initialDate).toLocaleString("en", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                });
            }
            if (parsedEvent.finalDate != "") {
                finalDate = new Date(parsedEvent.finalDate).toLocaleString("en", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                });
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
                <div class="prevEvents__headerTitles">
                <h4 class="prevEvents__title">${titleEvent}</h4>
                <p>from ${initialDate} to ${finalDate}</p>
                </div>
                <div>
                <p class="prevEvents__description">${descriptionEvent}</p>
                </div>
                <div>
                <p class="prevEvents__eventType">${eventType}</p>
                </div>
                <hr class="inlineEvent">
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