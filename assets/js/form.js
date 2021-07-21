/** FORM VALUES */

let form = document.getElementById('modal-form')
form.addEventListener('submit', getValues)

let eventValue = {
  name: '',
  startDate: '1-1-2001',
  endDateInput: '31-1-2001',
  remindInput: 5,
  description: 'Hello maldito kitty',
  eventType: 'Personal'
}

let array = []

function getValues(e) {
  let events

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

  console.log(events);
  form.reset()
}

