/***********************************************/
//---------------GLOBAL VARIABLES---------------/
/**********************************************/

//Title box Input
let inputTitleKey = document.getElementById("titleBox")
//Initial Calendar Input
let inputDateValue = document.getElementById("initialCal")
//End Calendar Input & checkbox
let inputDateEndValue = document.getElementById("endCal")
let endDate = document.getElementById("endCal");
let checkboxEnd = document.getElementById("checkboxEnd")
//Time Selector Input
let inputTimedValue = document.getElementById("timeSelector")
//Reminder Input
let inputReminderValue = document.getElementById("reminderSelect")
//Event type Input
let inputEventTypeValue = document.getElementById("eventSelect")
//Reminder Inputs
let reminderCheckBox = document.getElementById("reminderCheckBox");
let reminderTextArea = document.getElementById("reminderSelect");
//Remind me interval variables
let fiveMin = document.getElementById('fiveMin');
let tenMin = document.getElementById('tenMin');
let fiveTenMin = document.getElementById('fiveTenMin');
let threeTeneMin = document.getElementById('threeTenMin');
let oneHour = document.getElementById('oneHour');
//TextArea Input
let inputDescriptionValue = document.getElementById("textAreaDescription");
//Create Button
let buttonSubmit = document.getElementById("createBtn");
// Event Output
let eventOutput = document.querySelector(".event__display");
//Pesco la fecha seleccionada en el calendario de Einar
let fechaSeleccionada = document.querySelector(".fechaSeleccionada");

//Pesco la fecha actual
const exactlyToday = new Date().getDate();
console.log(exactlyToday, "La fecha actual wey");


let localStorageEvents = localStorage.getItem(inputDateValue.value) ? JSON.parse(localStorage.getItem(inputDateValue.value)) : [];
const calendar = document.querySelector('.calendar');


// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("openButton");


// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// Set current date on Caledar
let today = new Date().toISOString().substr(0, 10);
document.querySelector("#initialCal").value = today;


/**********************************************/
//--------------- Functions --------------------
/**********************************************/
// Close form 
function closeForm() {
  document.getElementById("myModal").style.display = "none";
  inputTitleKey.value = '';
  inputDescriptionValue.value = '';
  

  inputTitleKey.classList.remove('error')
}
// Show calendar when checkbox checked 
function displayEnd () {
  if(checkboxEnd.checked == true) {
      endDate.style.display = "block"
  } else {
    endDate.style.display = "none"
  }
} // End Function


// Show Remind me select when checked
function reminderShowSelectBox() {
  if (reminderCheckBox.checked == true) {
    reminderTextArea.style.display = "flex"
  } else {
    reminderTextArea.style.display = "none"
  }
} // End function

//This function shows the event in the output box
function createEvent (){

  let section = document.createElement("section");

  section.setAttribute("class", "event__display");
  section.insertAdjacentHTML("afterbegin", `<h1>${inputTitleKey.value}</h1><button class="btn__remove-event fas fa-trash" id="btn__remove__event"></button><div>${inputDateValue.value}, ${inputDateEndValue.value},${inputEventTypeValue.value}, ${inputTimedValue.value}, ${inputReminderValue.value}, ${inputDescriptionValue.value}</div>`);
  events.appendChild(section);
}

//This function saves the event in the local Stroage
function saveEvent () {
  if (inputTitleKey.value) {
inputTitleKey.classList.remove('error');

localStorageEvents.push({
  title: inputTitleKey.value,
  end_date: endDate.value,
  time: inputTimedValue.value,
  reminder: inputReminderValue.value,
  event_type: inputEventTypeValue.value,
  Description: inputDescriptionValue.value

});
localStorage.setItem(inputDateValue.value , JSON.stringify(localStorageEvents));
  } else {
inputTitleKey.classList.add('error');
  }
 
}
// Hace falta repasar
// function reLoad (){
//   if(inputDateValue.value === inputDateValue.value ) {
//     saveEvent()
//   } else {
//     location.reload
//   }
// }

//Reminder Functions 
//Set interval of diferents options



/*************************************************/
//--------------Modal Functions-------------------/
/************************************************/
// When the user clicks the button, open the modal
openButton.onclick = function() {
  modal.style.display = "flex";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
/* *********************************
---------- EVENT FUNCTIONS --------
********************************* */
//Aquí he creado una clase cosntructora de ventos donde se tendrían que almacenar todos su valores y posteriormente convertirlos en JSONS
class Event {
  constructor(titulo, dateValue, dateEndValue, timedValue, reminderValue, eventType, descriptionValue) {
    this.titulo = titulo;
    this.dateValue = dateValue;
    this.dateEndValue = dateEndValue;
    this.timedValue = timedValue;
    this.reminderValue = reminderValue;
    this.eventType = eventType;
    this.descriptionValue = descriptionValue;
  }
}

//
Event.prototype.sentJSON = function (){

    // let miJSON = JSON.stringify(supuestafecha);
    // console.log(miJSON);

}

let days = document.querySelectorAll(".days div");
days = Array.from(days);
console.log(days);

days.forEach(function(divs){

  divs.addEventListener("click", getID);

});

function getID(clicked){

  selectedDay = clicked.target;
  fechaSeleccionada.innerHTML = "la fecha seleccionada: "+selectedDay.id;

}

// Pesco el div donde se guardaran los eventos
let events = document.querySelector(".events");

/* *********************************/
//---------- BUTTON FUNCTIONS ------/
/**********************************/
//funcion que envia el formulario y ademas nos crea el objeto
// Saves event at the event output 
buttonSubmit.onclick = function () {

  const supuestafecha = new Event(`${inputTitleKey.value}`,`${inputDateValue.value}`,`${inputDateEndValue.value}`,`${inputTimedValue.value}`,`${inputReminderValue.value}`,`${inputEventTypeValue.value}`,`${inputDescriptionValue.value}`);
  console.log(supuestafecha);
  supuestafecha.sentJSON();
  // buttonSubmit.addEventListener("click", createEvent);
  createEvent();
  saveEvent();
  closeForm();
};

/* *********************************
---------- DARK MODE -----------------
********************************* */
const toggleSwitch = document.querySelector('.switch input[type="checkbox"]');

toggleSwitch.addEventListener("change", changeTheme);

function changeTheme() {
  if (toggleSwitch.checked) {
    document.documentElement.setAttribute("mode-changes", "light");
  } else {
    document.documentElement.setAttribute("mode-changes", "dark");
  }
}

function isToday (){

  if (exactlyToday != supuestafecha.timedValue){
    console.log("me cogio bien la fecha?");
    return

  }
  return
}

//  eventOutput.innerHTML += `${key}: ${value}<br />`;
// //  console.log(key)
//  console.log(value)



// let key = inputTitleKey.value;
// let value = supuestafecha;
// //  [inputDescriptionValue.value ,
//  //   inputDateValue.value,
//  //   inputDateEndValue.value,
//  //   inputTimedValue.value,
//  //   inputReminderValue.value,
//  //   inputEventTypeValue.value]




//  if (key && value) {
//  localStorage.setItem(key, value);
// }

// for (let i = 0; i < localStorage.length; i++) {
//   let key = localStorage.key(i);
//   let value = localStorage.getItem(key);
// 

