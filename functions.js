//?----------------------------------------------------- EVENTS ---------------------------------------------------\\
var btnNewAct = document
  .getElementById("addActivity")
  .addEventListener("click", newTask);

var btnCancel = document
  .getElementById("cancel")
  .addEventListener("click", cancelTask);

var closeBtn = document
  .getElementById("close")
  .addEventListener("click", cancelTask);

var saveBtn = document
  .getElementById("save")
  .addEventListener("click", saveTask);
//?----------------------------------------------------- FUNCTIONS ---------------------------------------------------\\
function drawCalendar(firstDay, monthLength) {
  let monthDays = document.getElementById("days");

  firstDay == 6 && monthLength == 31 ? (n = 42) : (n = 35);
  firstDay == 7 && monthLength >= 30 ? (n = 42) : (n = 35);
  firstDay == 1 && monthLength == 28 ? (n = 28) : (n = 35); //! corregir container border

  for (let i = 1; i <= n; i++) {
    var square = document.createElement("div");
    if (i >= firstDay && i < firstDay + monthLength) {
      var str = mm + "-" + (1 + i - firstDay);
      square.setAttribute("id", str);
      square.innerHTML = 1 + i - firstDay;
    }
    square.setAttribute("class", "day-style");
    monthDays.appendChild(square);
  }
}

function newTask() {
  modal.classList.replace("display-none", "modal-display-on");
}

function cancelTask() {
  for (let i = 0; i < inputs.length; i++) {
    inputs[i].removeAttribute("required");
  }
  modal.classList.replace("modal-display-on", "display-none");
}

function saveTask() {
  let initialDate = document.getElementById("initial-date").value;
  let month = initialDate.split("-");
  let monthStorage = storage.getItem(month[1]);

  let task = {
    title: document.getElementById("title").value,
    initialDate: document.getElementById("initial-date").value,
    endDate: document.getElementById("final-date").value, //! GIGANTE (cambio de mes)
    remind: document.getElementById("exp-time").value,
    description: document.getElementById("description").value,
    type: document.getElementById("event-type").value,
  };
  if (monthStorage) {
    let monthObject = JSON.parse(monthStorage);
    monthObject.push(task);
    storage.setItem(month[1], JSON.stringify(monthObject));
  } else {
    let monthObject = [];
    monthObject.push(task);
    storage.setItem(month[1], JSON.stringify(monthObject));
  }
  console.log(storage.getItem(month[1]));
}

function drawTask() {
  for (let x = 0; x < array.length; x++) {
    const element = array[x];
  }
}
