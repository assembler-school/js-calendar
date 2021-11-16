//Apertura modal principal Eventos

btnCrear.onclick = function () {
    today = new Date();
    var date = today.getFullYear() + '-' + esmenos0(today.getMonth() + 1) + '-' + esmenos0(today.getDate()) + 'T' + esmenos0(today.getHours()) + ':' + esmenos0(today.getMinutes());
    let allEventInputs = document.querySelectorAll('.eventComonClass');
    allEventInputs[1].value = date;
    mainModal.style.display = "block";
}

function esmenos0(a) {
    if (a < 10) {
        return ('0' + a)
    } else return a
}

closeModal.onclick = function () {
    cerrar_modal()
};

function cerrar_modal() {
    today = new Date();
    var date = today.getFullYear() + '-' + esmenos0(today.getMonth() + 1) + '-' + esmenos0(today.getDate()) + 'T' + esmenos0(today.getHours()) + ':' + esmenos0(today.getMinutes());
    mainModal.style.display = "none";
    checkboxDate.checked = false;
    ponerdata();
    recordatorio_modal.checked = false;
    recordatorio_modal_time();
    let allEventInputs = document.querySelectorAll('.eventComonClass');
    allEventInputs[0].value = '';
    allEventInputs[1].value = date;
    allEventInputs[2].value = 'No se repite';
    allEventInputs[3].value = '';
    allEventInputs[4].value = 'Meeting';
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

function comprovaciones() {
    let profile_cont_input = document.getElementsByClassName('title-modal-input');
    if (profile_cont_input[0].value.length > 3) {
        profile_cont_input[0].style.color = "var(--azul)";
        profile_cont_input[0].style.backgroundColor = "#ffffff";
    } else {
        profile_cont_input[0].style.backgroundColor = "#F8D8DD";
    }
}

function comprovacionesFechas(event) {
    let profile_cont_input = document.querySelectorAll('.neededDate');
    if (profile_cont_input == 'undefined') {
        event.srcElement.style.backgroundColor = "#F8D8DD";
    } else {
        profile_cont_input[0].style.color = "var(--azul)";
        profile_cont_input[0].style.backgroundColor = "#ffffff";
        if (profile_cont_input[1]) {
            profile_cont_input[1].style.color = "var(--azul)";
            profile_cont_input[1].style.backgroundColor = "#ffffff";
        }
    }
}

function comprovacionFinal() {
    let a = 0;
    let allInputs = document.querySelectorAll('.modal-need');
    for (let i = 0; i < allInputs.length; i++) {
        if (allInputs[i].classList[0] == 'title-modal-input') {
            comprovaciones();
            a++
        } else {
            comprovacionesFechas();
            a++
        }
    }
    if (a == 2 || a == 3) {
        let allEventInputs = document.querySelectorAll('.eventComonClass');
        if (checkboxDate.checked == true && recordatorio_modal.checked == true) {
            finalEvent = new calendarEvent(allEventInputs[0].value, allEventInputs[1].value, allEventInputs[2].value, allEventInputs[3].value, allEventInputs[4].value, allEventInputs[5].value, allEventInputs[6].value);
            cerrar_modal();
            console.log(finalEvent);
        }
    }

}
//poner otro input date

checkboxDate.addEventListener("click", ponerdata)

function ponerdata() {
    var divdate_modal = document.createElement("div")
    var spandate = document.createElement("span")
    var clocki = document.createElement("i")
    var inputdate_modal = document.createElement("input")
    today = new Date();
    var date = today.getFullYear() + '-' + esmenos0(today.getMonth() + 1) + '-' + esmenos0(today.getDate());
    inputdate_modal.type = "Date"
    inputdate_modal.value = date
    inputdate_modal.classList = "date_modal modal-need eventComonClass neededDate"
    clocki.classList = "far fa-clock"
    spandate.classList = "date-picker"
    divdate_modal.id = "div2"
    if (checkboxDate.checked == true) {
        fecha_modal.appendChild(divdate_modal)
        divdate_modal.appendChild(spandate)
        spandate.appendChild(clocki)
        spandate.appendChild(inputdate_modal)
        typedatatimelocal.type = "Date"
        typedatatimelocal.value = date
    } else if (checkboxDate.checked == false) {
        var a = document.getElementById("div2")
        if (a) {
            fecha_modal.removeChild(a)
            typedatatimelocal.type = "datetime-local"
        }
    }
}

//poner selection recordatorio

recordatorio_modal.addEventListener("click", recordatorio_modal_time)

function recordatorio_modal_time() {
    if (recordatorio_modal.checked == true) {
        selctdiv_modal.appendChild(crearlistamin())
    } else if (recordatorio_modal.checked == false) {
        var a = document.getElementById("selectrecord")
        if (a) {
            selctdiv_modal.removeChild(a)
        }
    }
}

function crearlistamin() {
    var selectrecordatorio = document.createElement("select")
    selectrecordatorio.classList = "repit_modal eventComonClass"
    selectrecordatorio.id = "selectrecord"
    const timerecordatorio = [5, 10, 15, 30, 60]
    for (const time of timerecordatorio) {
        var option_modal = document.createElement("option")
        option_modal.innerHTML = time + " minutes"
        selectrecordatorio.appendChild(option_modal)
    }
    return selectrecordatorio
}

eventTitleInput.addEventListener("click", transitiontitle)

function transitiontitle() {
    liniabonito.classList.toggle("liniabonito")
}





// PRUEBAS

let btnPruebas = document.getElementById('pruebas');

btnPruebas.addEventListener('click', function () {
    finalEvent.eraseEvent();
})