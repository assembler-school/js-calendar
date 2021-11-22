import * as storage from "./storage.js";
import { changeMonth, actDate, getRandomQuote } from "./index.js";

// función al recargar la página
window.onload = refreshApp;

var arrayFuture = storage.getFuture();
var arrayPast = storage.getPast();

function refreshApp() {
  console.log("Welcome");
  obtenerLocalStorage();
  getRandomQuote();
}

var addTask = document.getElementById("addTask");
addTask.addEventListener("click", openModal);

function openModal() {
  var checkDate = document.getElementById("checkDate");
  checkDate.addEventListener("click", showFin);
  var checkNot = document.getElementById("checkNot");
  checkNot.addEventListener("click", showNotification);
  var aceptTaskAdd = document.getElementById("aceptTask");
  aceptTaskAdd.addEventListener("click", aceptTask);
}

//muestra el input dateFinal
function showFin() {
  var checkBox = document.getElementById("checkDate");
  var dateF = document.getElementById("dateFinal");
  if (checkBox.checked == true) {
    dateF.classList.remove("hidden");
  } else {
    dateF.classList.add("hidden");
  }
}

//muestra el selector Recive Notification
function showNotification() {
  var checkBoxNot = document.getElementById("checkNot");
  var timing = document.getElementById("time");
  if (checkBoxNot.checked == true) {
    timing.classList.remove("hidden");
  } else {
    timing.classList.add("hidden");
  }
}

// Crear un objeto
function createObj(
  title,
  dateInitial,
  dateFin,
  notification,
  typeEvent,
  description,
  id
) {
  return {
    title: title,
    dateInitial: dateInitial,
    dateFin: dateFin,
    notification: notification,
    typeEvent: typeEvent,
    description: description,
    id: id,
  };
}

//recibe todas las variables y las guarda en un objeto
function aceptTask() {
  var title = document.getElementById("nameEvent").value;
  var dateInitial = document.getElementById("dateStart").value;
  console.log(dateInitial);
  dateInitial = new Date(dateInitial).getTime();
  console.log(dateInitial);
  var dateFin = document.getElementById("dateFinal").value;
  dateFin = new Date(dateFin).getTime();
  var timing = document.getElementById("time");
  var notification = timing.options[timing.selectedIndex].text;
  var typeE = document.getElementById("typeEvent");
  var typeEvent = typeE.options[typeE.selectedIndex].text;
  var description = document.getElementById("description").value;
  var id = Date.now();
  if (title != "" && !isNaN(dateInitial)) {
    console.log(
      title,
      dateInitial,
      dateFin,
      notification,
      typeEvent,
      description
    );
    console.log("esto funciona");
    var eventTask = createObj(
      title,
      dateInitial,
      dateFin,
      notification,
      typeEvent,
      description,
      id
    );
    guardarLocalSotorage(eventTask);
    changeMonth(actDate);
    closeModal();
    //removeEvenListenerAddTask();
  }
  var titleInput = document.getElementById("nameEvent");
  var dateInitialInput = document.getElementById("dateStart");

  if (title == "") {
    titleInput.style.border = "2px solid red";
  } else {
    titleInput.style.border = "0px solid yellow";
  }

  if (isNaN(dateInitial)) {
    dateInitialInput.style.border = "2px solid red";
  } else {
    titleInput.style.border = "none";
  }
  console.log("esto no funciona");
}
// Guardar los datos del objeto en localStorage
function guardarLocalSotorage(objeto) {
  arrayFuture.push(objeto);
  localStorage.setItem("future", JSON.stringify(arrayFuture));
}

function obtenerLocalStorage() {
  if (localStorage.getItem("future")) {
    var future = JSON.parse(localStorage.getItem("future")) || [];
    console.log(future);
  } else {
    console.log("No hay nuevas tareas");
  }
}

// Funcion para borrar los event listener del modal AddTask
function removeEvenListenerAddTask() {
  checkDate.removeEventListener("click", showFin);
  checkNot.removeEventListener("click", showNotification);
  aceptTaskAdd.removeEventListener("click", aceptTask);
}

function closeModal() {
  removeEvenListenerAddTask();
  // aceptTaskAdd.setAttribute("data-bs-dismiss","modal")
  // $("#exampleModal").modal(toggle)
  var myModal = bootstrap.Modal.getInstance(
    document.getElementById("exampleModal")
  );
  console.log(myModal);
  myModal.hide();
}
