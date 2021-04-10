import { swapTemplate, removeTemplate } from "./_templates.js";
/*
 * All listeners are listed here, ipmport
 * what you need.
 */
export function handleCreateEvent() {
  swapTemplate("modal-template", "modal-section");

  document.querySelectorAll(".close").forEach((element) => {
    element.addEventListener("click", function () {
      removeTemplate("modal-template", "modal-section");
    });
  });
}
