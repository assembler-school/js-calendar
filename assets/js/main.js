// ----------- VARIABLES --------
let buttonEvent = document.querySelector("#calendarEvent");
let modal = document.querySelector('#modal');
let buttonClose = document.getElementById('button-close');


// --------- EVENT LISTENER --------

buttonEvent.addEventListener("click", openModal);
buttonClose.addEventListener('click', console.log('funchiona'))
// buttonClose.addEventListener("click", function () {
//   modal.classList.remove('modal--is-visible')
// });

function openModal() {
  modal.classList.add('modal--is-visible')

}

// function closeModal() {
//   modal.classList.remove('modal--is-visible')
// }
