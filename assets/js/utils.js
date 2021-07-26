'use strict';

/**
   * Toggle styles when we press the switch button
   */

var changeButton = document.getElementById("toggle_classes");
changeButton.addEventListener("click", switchStyle);

function switchStyle() {
  calendarMain.classList.toggle("darkMode");
  calendarMain.classList.toggle("lightMode");
}

function pad(val) {
  let valString = val + "";

  if (valString.length < 2) {
    return "0" + valString;
  } else {
    return valString;
  }
}