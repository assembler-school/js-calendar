
// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("openButton");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// cogemos el boton create
let btn__create = document.getElementById("createBtn");

// When the user clicks the button, open the modal
openButton.onclick = function() {
  modal.style.display = "flex";
}

function closeForm() {
  document.getElementById("myModal").style.display = "none";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}


// Set current date on Caledar
let today = new Date().toISOString().substr(0, 10);
document.querySelector("#initialCal").value = today;

// Show calendar when checkbox checked
let checkboxEnd = document.getElementById("checkboxEnd")
let endDate = document.getElementById("endCal");

function displayEnd () {
  if(checkboxEnd.checked == true) {
      endDate.style.display = "block"
  } else {
    endDate.style.display = "none"
  }
} // End Function

// Show Remind me select when checked
let reminderCheckBox = document.getElementById("reminderCheckBox");
let reminderTextArea = document.getElementById("reminderSelect");

function reminderShowSelectBox() {
  if (reminderCheckBox.checked == true) {
    reminderTextArea.style.display = "flex"
  } else {
    reminderTextArea.style.display = "none"
  }
} // End function

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
// Local storage input and output testing

let inputTitleKey = document.getElementById("titleBox")
let inputDescriptionValue = document.getElementById("textAreaDescription")
let buttonSubmit = document.getElementById("createBtn")
let eventOutput = document.getElementById("event__display1")

buttonSubmit.onclick = function () {
  let key = inputTitleKey.value;
  let value = inputDescriptionValue.value;

 
  if (key && value) {
    localStorage.setItem(key, value);
  }
};

for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  let value = localStorage.getItem(key);

  eventOutput.innerHTML += `${key}: ${value}`;
  console.log(key)
  console.log(value)
}


/* *********************************
---------- EVENTOS -----------------
********************************* */
btn__create.addEventListener("click", createEvent);

function createEvent (){
  console.log(btn__create)
}
