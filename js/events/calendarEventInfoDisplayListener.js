import displayCalendarEventInfo from "../view_modifiers/displayCalendarEventInfo.js";

export default function calendarEventInfoDisplayListener() {
	document.addEventListener("click", (e) => {
		if (e.target.matches("[data-event]") || e.target.matches("[data-event] *")) displayCalendarEventInfo(e.target.dataset.event);
	});
}
