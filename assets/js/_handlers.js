import { swapTemplate, removeTemplate } from "./_templates.js";
/*
 * All listeners are listed here, ipmport
 * what you need.
 */
export function handleCreateEvent() {
  swapTemplate("modal-template", "modal-section");

  document.querySelectorAll(".close").forEach((element) => {
    element.addEventListener("click", function (e) {
      removeTemplate("modal-template", "modal-section");
    });
  });

  // stop propagation from modal to shadow
  document.getElementById("modal").addEventListener("click", function (e) {
    e.stopPropagation();
  });
}
