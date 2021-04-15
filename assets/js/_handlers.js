import { swapTemplate, removeTemplate } from "./_templates.js";
import { formValidation } from "./_form_validation.js";
import { calendarEvent } from "./_events.js";
import * as render from "./_month_render.js";

/*
 * All listeners are listed here
 *
 */
export function handleDocumentEvents(e) {
	// click event
	document.addEventListener("click", (e) => {
		/*
		 * show / hide modal popup
		 */
		// show modal
		if (
			e.target.matches("button#create-event") ||
			e.target.matches("button#create-event *")
		) {
			swapTemplate("modal-template", "modal-section");
		}
		// close modal
		if (e.target.matches(".close")) {
			removeTemplate("modal-template", "modal-section");
		}

		/*
		 * form validation
		 */
		if (e.target.matches('input[type="submit"]')) {
			e.preventDefault();

			if (!formValidation(e, true)) {
				const data = calendarEvent.getDataFromModal("#modal form");
				calendarEvent.toLocalStorage(data);
				render.renderEvents(updatedYear, updatedMonth);
			}
		}

		/*
		 * buttons to switch month
		 */
		if (e.target.matches(".fa-chevron-right")) {
			addMonth(updatedYear, updatedMonth, true);
			// document.getElementById("calendar").classList.add("slide-top");
			// document.getElementById("calendar").classList.add("swing-right-fwd");
			document
				.querySelector(".calendar__month")
				.classList.add("swing-right-fwd");
		}
		if (e.target.matches(".fa-chevron-left")) {
			addMonth(updatedYear, updatedMonth, false);
			document
				.querySelector(".calendar__month")
				.classList.add("swing-left-fwd");
		}

		/*
		 * Mobile burguer menu
		 */
		if (e.target.matches("#navOpen") || e.target.matches("#navOpen *")) {
			document.getElementById("main").style.display = "block";
			swapTemplate("template__mobile", "main");
		}
		if (e.target.matches("#navClose") || e.target.matches("#navClose *")) {
			removeTemplate("template__mobile", "main");
			document.getElementById("main").style.display = "none";
		}

		/*
		 * checkbox End-date
		 */
		if (e.target.matches('[name="end-check"]')) {
			const check = document.querySelector('[name="end-date"]');
			check.disabled ? (check.disabled = false) : (check.disabled = true);
		}

		/*
		 * Click in event
		 */
		if (e.target.matches("[data-eventid]")) {
			const [_event] = calendarEvent.getEvent(e.target.dataset.eventid);
			swapTemplate("modal-template", "modal-section");
			calendarEvent.printDataToModal("#modal form", _event);
		}

		/*
		 *
		 */
		if (e.target.matches(".calendar__week > div")) {
			const dia = e.target.id;
			console.log(dia);
		}
	});

	// focusot event
	document.addEventListener("focusout", (e) => {
		/*
		 * form validation
		 */
		if (e.target.matches("input[required]")) {
			formValidation(e, false);
		}
	});
	/*
	 *  Accesibility from the modal with TAB or SHIFT + TAB
	 */
	document.addEventListener("keydown", accessKeyboard);
	function accessKeyboard(e) {
		const focusableInputs = document.querySelectorAll(".focus");
		const focusable = Array.from(focusableInputs);
		let index = focusable.indexOf(document.activeElement);
		let nextIndex = 0;

		// tab key
		if (e.keyCode === 9) {
			e.preventDefault();
			if (index >= 0) {
				nextIndex = index + 1;
			} else {
				nextIndex = 0;
			}
			if (index == 5) {
				nextIndex = 0;
			}
			//shift + tab
			if (e.keyCode === 16) {
				e.preventDefault();
				if (index >= 0) {
					nextIndex = index + 1;
				} else {
					nextIndex = 0;
				}
				if (index == 5) {
					nextIndex = 0;
				}
			}
		}
		// Escape to close modal
		if (e.keyCode === 27) {
			removeTemplate("modal-template", "modal-section");
			console.log("pressed key");
		}
		console.log();
		focusableInputs[nextIndex].focus();
		e.stopPropagation();
		console.log(document.activeElement);
		console.log(focusable);
	}
}

let updatedMonth = new Date().getMonth();
let updatedYear = new Date().getFullYear();
function addMonth(year, month, boolean) {
	boolean ? month++ : month--;
	updatedYear = render.updateDate(year, month).year;
	updatedMonth = render.updateDate(year, month).month;
	swapTemplate("month", "calendar");
	render.renderMonth(updatedYear, updatedMonth);
	render.addTag(updatedYear, updatedMonth);
	render.highlightToday(year, month);
	render.renderEvents(year, month);
}
