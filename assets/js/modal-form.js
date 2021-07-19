import { renderAddEventForm } from "./event.js";

/**
 * Constant Variables
 */
const ADDBUTTON = document.getElementById('plus-btn');
const MODALWINDOW = document.getElementById('modal-window');

ADDBUTTON.addEventListener('click', () => displayModal('addEvent'));

function displayModal(type) {
    
    MODALWINDOW.innerHTML = '';

    if (type === 'addEvent') {
        // Function Add Event
        renderAddEventForm();
    } else {
        //
        
    }

    /*
    let modalFormContent = `<template id="template-form"><p>Formulario De evento</p></template>`;
    MODALFORM.insertAdjacentHTML('beforeend', modalFormContent);

    let templateContent = document.getElementById('template-form').content;
    let copyTemplate = document.importNode(templateContent, true);

    MODALFORM.appendChild(copyTemplate);
    */

}

function closeModal() {
    MODALWINDOW.innerHTML = '';
}


export {
    displayModal,
    closeModal,
    MODALWINDOW
}