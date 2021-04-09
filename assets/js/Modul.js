
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