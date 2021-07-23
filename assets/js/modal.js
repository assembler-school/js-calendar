/* IMPORT */

import { renderAddEventForm } from "./event-form.js";

/* GET ELEMENTS OF THE DOM */

const ADDBUTTON = document.getElementById("plus-btn");
const MODALWINDOW = document.getElementById("modal-window");

ADDBUTTON.addEventListener("click", () => displayModal("addEvent"));

function displayModal(type) {
  MODALWINDOW.innerHTML = ""; // First we clean our modal

  if (type === "addEvent") {
    // If we want to display our box for new events
    // Function Add Event
    renderAddEventForm();
  } else {
    //
  }

  // ? PENDIENTE DE REVISAR JOSE
  /* 
    let modalFormContent = `<template id="template-form"><p>Formulario De evento</p></template>`;
    MODALFORM.insertAdjacentHTML('beforeend', modalFormContent);

    let templateContent = document.getElementById('template-form').content;
    let copyTemplate = document.importNode(templateContent, true);

    MODALFORM.appendChild(copyTemplate);
    */
}

function closeModal() {
  MODALWINDOW.innerHTML = "";
  document.removeEventListener("keydown", escapeEventListener);
}

function escapeEventListener(e) {
  // Closing by pressing Escape
  if (e.key === "Escape") closeModal();
}

/* EXPORT */

export { displayModal, closeModal, MODALWINDOW, escapeEventListener };
