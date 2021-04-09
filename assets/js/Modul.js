
// Get the modal
let modal = document.getElementById("myModal");

// Get the button that opens the modal
let btn = document.getElementById("openButton");

// Get the <span> element that closes the modal
let span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
openButton.onclick = function() {
  modal.style.display = "flex";
}

function closeForm() {
  document.getElementById("myModal").style.display = "none";
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

function reminderShowTextArea() {
  if (reminderCheckBox.checked == true) {
    reminderTextArea.style.display = "flex"
  } else {
    reminderTextArea.style.display = "none"
  }
} // End function