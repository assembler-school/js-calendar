export const calendarEvent = {};

/*
 * This gets data from form
 */
calendarEvent.getDataFromModal = function (form) {
  const _form = document.querySelector(form);
  const _data = new FormData(_form);
  const _arrData = Array.from(_data.entries());
  const _obj = {};

  _obj.id = calendarEvent.generateUUID();

  for (const [name, value] of _arrData) {
    _obj[name] = value;
  }
  calendarEvent.data = _obj;
  return calendarEvent.data;
};

/*
 * This stores data to localstorage
 */
calendarEvent.toLocalStorage = function (data) {
  const _fnToLocalStorage = function (data) {
    const _arr = [],
      ls = localStorage;

    if (data) {
      data.push(calendarEvent.data);
      ls.setItem("events", JSON.stringify(data));
      return;
    }
    _arr.push(calendarEvent.data);
    ls.setItem("events", JSON.stringify(_arr));
  };

  _fnToLocalStorage(calendarEvent.fromLocalStorage(data));
};

/*
 * This gets data from localstorage
 */
calendarEvent.fromLocalStorage = function () {
  return JSON.parse(localStorage.getItem("events"));
};

/*
 * This selected event object from localstorage
 */
calendarEvent.getEvent = function (eventid) {
  const data = calendarEvent.fromLocalStorage();
  return data.filter((ev) => `event${ev.id}` === eventid);
};

/*
 * This prints event info in alert popup (bad structure, this shouldnt be implemented here)
 */
calendarEvent.printDataToAlert = function (obj) {
  const d = document;
  let title = d.getElementById("modal__title");
  let date = d.getElementById("init__date");
  let hour = d.getElementById("init__hour");
  let edate = d.getElementById("end__date");
  let ehour = d.getElementById("end__hour");
  let reminder = d.getElementById("span__reminder");
  let type = d.getElementById("type__event");
  let description = d.getElementById("event__description");

  title.innerHTML = obj["title"];
  const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  let initDate = new Date(obj["init-date"]);
  date.innerHTML = days[initDate.getDay()] + ', ' + months[initDate.getMonth()] + ' ' + initDate.getDate();
  hour.innerHTML = initDate.getHours() + ':' + initDate.getMinutes();
  if(obj["end-date"]) {
    let endDate = new Date(obj["end-date"]);
    edate.innerHTML = days[endDate.getDay()] + ', ' + months[endDate.getMonth()] + ' ' + endDate.getDate();
    ehour.innerHTML = endDate.getHours() + ':' + endDate.getMinutes();
  } else {
    d.getElementById("end__hide").textContent = "All day";
  }
  if (obj["reminder"]){
    reminder.innerHTML = obj["select-time"];
  } else {
    d.getElementById("event__reminder__hide").style.display = "none";
  }
  type.innerHTML = obj["select-event"];
  description.innerHTML = obj["description"];
};

/*
 * This lets you edit an event (bad structure, this shouldnt be implemented here)
 */
calendarEvent.printDataToEdit = function (obj) {
  /* Change elements of 'New event' modal to 'Edit event' modal */
  const form = document.getElementById("edit__form");
  form.elements["title"].value = obj.title;
  form.elements["init-date"].value = obj["init-date"];
  form.elements["end-check"].checked = obj["end-check"];
  if(form.elements["end-check"].checked) {document.querySelector(".ending-date").classList.toggle("height-reset")};
  form.elements["end-date"].value = obj["end-date"];
  form.elements["reminder"].checked = obj["reminder"];
  if(form.elements["reminder"].checked) {document.querySelector(".reminder-time").classList.toggle("height-reset")};
  form.elements["select-time"].value = obj["select-time"];
  form.elements["description"].value = obj.description;
  form.elements["select-event"].value = obj["select-event"];
};

/*
 * This removes an event from localstorage and from DOM  
 */
calendarEvent.removeEvent = function (obj) {
  let allEvents = calendarEvent.fromLocalStorage();
  allEvents = allEvents.filter ((ev) => ev.id !== obj.id);
  localStorage.setItem('events', JSON.stringify(allEvents));

  const removed = document.querySelector('[data-eventid="event' + obj.id + '"]')
  removed.remove();
};

/*
 * This modifies stored event
 */
calendarEvent.modifyEvent = function (obj) {
  const form = document.getElementById("edit__form");
  obj.title           =form.elements["title"].value;
  obj["init-date"]    =form.elements["init-date"].value;
  obj["end-check"]    =form.elements["end-check"].checked;
  obj["end-date"]     =form.elements["end-date"].value;
  obj["reminder"]     =form.elements["reminder"].checked;
  obj["select-time"]  =form.elements["select-time"].value;
  obj.description     =form.elements["description"].value;
  obj["select-event"] =form.elements["select-event"].value;

  let allEvents = calendarEvent.fromLocalStorage();
  const index = allEvents.findIndex(ev => ev.id === obj.id);
  allEvents[index]=obj;
  localStorage.setItem("events", JSON.stringify(allEvents));
};

/*
 * This generates unique
 */
calendarEvent.generateUUID = function () {
  return new Date().getTime();
};
