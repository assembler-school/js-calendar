import { closeModal, MODALWINDOW } from "./modal-form.js";

function renderAddEventForm() {

    MODALWINDOW.innerHTML = `
        <div id="modal__overlay" class="modal__overlay"></div>
        <div class="modal__content">
            <span id="modal__close" class="modal__close">&#10799;</span>
            <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.      
            </p>
        </div>
    `;

    // To close the current Modal
    document.getElementById('modal__close').addEventListener('click', closeModal);
    document.getElementById('modal__overlay').addEventListener('click', closeModal);
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') closeModal();
    })

}


export {
    renderAddEventForm
}