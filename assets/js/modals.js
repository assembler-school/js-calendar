'use strict'

var calcMonth = document.querySelector(".calendar__month");
var addEventBtn = document.querySelector("#add-event");

calcMonth.addEventListener("click", clickDate);
addEventBtn.addEventListener("click", clickDate);

const addEvent = (e) => {
  //select right modal from id-data
  let modal = document.querySelectorAll('#modal-example');
  Array.prototype.forEach.call(modal, function (el) {

    //add active class on modal
    el.classList.add('active');
  });
}

const showEventsList = (e) => {
  //select right modal from id-data
  let modal = document.querySelectorAll('#' + e.target.dataset.id);
  Array.prototype.forEach.call(modal, function (el) {

    //add active class on modal
    el.classList.add('active');
  });
}

function clickDate(e) {

  const el = e.target;

  if (!el.matches(".btn--modal")) return null;

  const keyId = el.dataset.id;

  console.log(keyId)

  addEvent(e);
}

//addEventListener on mouse click for closing modal on modal dark background
document.addEventListener('click', function (e) {

  //check is the right element clicked
  if (!e.target.matches('.modal')) return;
  else {

    // if modal have do-not-close class it will not close it self on background click
    if (e.target.classList.contains('do-not-close')) return;
    else {

      //remove active class on modal
      e.target.classList.remove('active');
    }
  }
});

//addEventListener on mouse click for closing modal on custom button
document.addEventListener('click', function (e) {

  //check is the right element clicked
  if (!e.target.matches('.close-modal')) return;
  else {

    //select right modal from id-data
    var modal = document.querySelectorAll('#' + e.target.dataset.id);
    Array.prototype.forEach.call(modal, function (el) {

      //remove active class on modal
      el.classList.remove('active');
    });
  }
});

//addEventListener on mouse click for standard closing modal on right top "x"
document.addEventListener('click', function (e) {

  //check is the right element clicked
  if (!e.target.matches('.modal__close')) return;
  else {
    //remove active class on modal
    e.target.parentElement.parentElement.classList.remove('active');
  }
});