//Identificación de elementos

var btnCrear = document.getElementById('crear_minicalendar');
var mainModal = document.getElementById('modal_crear');
var closeModal = document.getElementById('nav_modal');
var eventTitleInput = document.querySelector('.input_modal>input');
var btnSave = document.getElementById('save-modal');



//Apertura modal principal Eventos

btnCrear.onclick = function () {
    mainModal.style.display = "block";
}

closeModal.onclick = function () {
    mainModal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == mainModal) {
        mainModal.style.display = "none";
    }
}

//Validación

btnSave.addEventListener("click", comprovacionFinal);
eventTitleInput.addEventListener("mouseup", comprovaciones);
eventTitleInput.addEventListener("keyup", comprovaciones);

function comprovaciones(event) {
    let profile_cont_input = event.srcElement.value;
    if (profile_cont_input.length > 3) {
        event.srcElement.style.color = "var(--azul)";
        event.srcElement.style.backgroundColor = "#ffffff";
    } else {
        event.srcElement.style.backgroundColor = "#F8D8DD";
    }
}

function comprovacionFinal() {
    let allInputs = document.querySelectorAll('.');

    switch (key) {
        case value:

            break;

        default:
            break;
    }
}