//Identificación de elementos

var btnCrear = document.getElementById('crear_minicalendar');
var mainModal = document.getElementById('modal_crear');
var closeModal = document.getElementById('nav_modal');



//Apertura modal principal Eventos

// When the user clicks on the button, open the modal
btnCrear.onclick = function () {
    mainModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
closeModal.onclick = function () {
    mainModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == mainModal) {
        mainModal.style.display = "none";
    }
}