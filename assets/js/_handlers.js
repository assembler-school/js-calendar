import { swapTemplate, removeTemplate } from "./_templates.js";
import { formValidation } from "./_form_validation.js";

/*
 * All listeners are listed here
 *
 */
// export function handleCreateEvent() {
//   // add template to DOM
//   swapTemplate("modal-template", "modal-section");

//   // Valdation
//   formValidation();

//   // remove template from DOM
//   document.querySelectorAll(".close").forEach((element) => {
//     element.addEventListener("click", function (e) {
//       removeTemplate("modal-template", "modal-section");
//     });
//   });

//   // stop propagation from modal to shadow
//   document.getElementById("modal").addEventListener("click", function (e) {
//     e.stopPropagation();
//   });
// }

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
