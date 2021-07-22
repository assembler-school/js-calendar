import { createEventInfo } from "../templates/templates.js";
import getMonthName from "../utils/getMonthName.js";

export default function showModalInfo(idEvent) {
	const calendarEvents = JSON.parse(localStorage.getItem("calendarEvents"));
	const body = document.querySelector("body");

	const fragment = createEventInfo();
	body.appendChild(fragment);
	let type = document.querySelector(".modal__type");

	for (const calendarEvent of calendarEvents) {
		if (calendarEvent.id === parseInt(idEvent)) {
			let p = document.createElement("p");
			p.textContent = e.id;
			p.style.display = "none";
			p.id = "id-event";
			document.querySelector("#event-info").appendChild(p);

			document.querySelector("#event-info-date").textContent = `${getMonthName(e.initialDate.month)} ${e.initialDate.day} ${e.initialDate.year}`;
			document.querySelector("#event-info-title").textContent = e.title;
			document.querySelector("#event-info-description").textContent = e.description;
			switch (e.type) {
				case "Meeting":
					type.style.backgroundColor = "red";
					break;
				case "Task":
					type.style.backgroundColor = "green";
					break;
				case "Personal":
					type.style.backgroundColor = "orange";
					break;
				case "Study":
					type.style.backgroundColor = "blue";
					break;
				default:
					break;
			}
			console.log(e.title, e.initialDate, e.description, e.type);
		}
	}
}
