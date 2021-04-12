import { swapTemplate, removeTemplate } from "./_templates.js";
import { formValidation } from "./_form_validation.js";
import { addMonth, currentDate } from "./calendar.js";
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
      formValidation(e, true);
    }

    /*
     * buttons to switch month
     */
    if (e.target.matches(".fa-chevron-right")) {
      let updatedMonth = currentDate.getMonth();
      let updatedYear = currentDate.getFullYear();
      addMonth(updatedYear, updatedMonth, true);
    }
    if (e.target.matches(".fa-chevron-left")) {
      let updatedMonth = currentDate.getMonth();
      let updatedYear = currentDate.getFullYear();
      addMonth(updatedYear, updatedMonth, false);
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
}
