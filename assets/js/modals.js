'use strict'

calendarMain.addEventListener("click", clickDate);
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

/**
* Converts a day number to a string.
*
* @param {Number} dayIndex
* @return {String} Returns day as string
*/
function dayOfWeekAsString(dayIndex) {
  return ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][dayIndex] || '';
}

function clickDate(e) {

  const el = e.target;

  if (!el.matches(".btn--modal")) return null;

  //get the day selected
  dateSelected = el.dataset.id;

  //write in screen the events day week
  writeDayWeek(dateSelected)
  let todaysEvents = eventsNotes.filter(appointment => appointment.startDate == dateSelected);
  renderEventNotes(todaysEvents, dateSelected);

  //clear form inputs
  document.querySelector(`#title`).value = '';
  document.querySelector(`#description`).value = '';
  (dateSelected) ? document.querySelector(`#startDate`).value = dateSelected : document.querySelector(`#startDate`).value = '';
  document.querySelector(`#startTime`).value = '09:00';
  (dateSelected) ? document.querySelector(`#endDate`).value = dateSelected : document.querySelector(`#endDate`).value = '';
  document.querySelector(`#endTime`).value = '10:00';

  addEvent(e);
}

//addEventListener on mouse click for closing modal on modal dark background
document.addEventListener('click', function (e) {

  //check is the right element clicked
  if (!e.target.matches('.modal')) return;
  else {

    //if modal have do-not-close class it will not close it self on background click
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

//close modal
cancelModal.addEventListener('click', closeModal);

function closeModal() {
  document.getElementById('modal-example').classList.remove('active');
};