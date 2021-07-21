'use strict';

/**
   * Toggle styles when we press the switch button
   */

var changeButton = document.getElementById("toggle_classes");
changeButton.addEventListener("click", switchStyle);

function switchStyle() {
  calc.classList.toggle("darkMode");
  calc.classList.toggle("lightMode");
}