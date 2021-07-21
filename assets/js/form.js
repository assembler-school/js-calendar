
/** FORM VALUES */

let form = document.getElementById('modal-form')
form.addEventListener('submit', getValues)
let infoEvents = document.getElementById('resumeEvent')

let eventValue = {
  name: '',
  startDate: '',
  endDateInput: '',
  remindInput: 0,
  description: '',
  eventType: ''
}

function getValues(e) {
  let events = []

  e.preventDefault()
  eventValue.name = document.getElementById('name').value
  eventValue.startDate = document.getElementById('startDate').value
  eventValue.endDateInput = document.getElementById('endDateInfo').value
  eventValue.remindInput = document.getElementById('time').value
  eventValue.description = document.getElementById('description').value
  eventValue.eventType = document.getElementById('eventType').value

  events = JSON.parse(localStorage.getItem('events')) || []
  events.push(eventValue)
  localStorage.setItem('events', JSON.stringify(events))

  form.reset()
  closeModal()
}

let myLocalStorage = JSON.parse(localStorage.getItem('events'))
function showResume() {
  for (let i = 0; i < myLocalStorage.length; i++) {
    let myObject = myLocalStorage[i]

    let html = `
      <p>${myObject.name}</p>
      <p>${myObject.startDate}</p>
      <p>${myObject.endDateInput}</p>
      <p>${myObject.remindInput}</p>
      <p>${myObject.description}</p>
      <p>${myObject.eventType}</p>
    `
    infoEvents.innerHTML = html
    console.log(myObject.name);
  }
}
showResume()