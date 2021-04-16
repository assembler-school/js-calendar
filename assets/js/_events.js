export const calendarEvent = {};

/*
 * This gets data from from
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
 * This selected event object from localstorage
 */
calendarEvent.printDataToModal = function (form, obj) {
  const _form = document.querySelector(form);
  _form.elements["title"].value = obj.title;
  _form.elements["init-date"].value = obj["init-date"];
  _form.elements["end-check"].checked = obj["end-check"];
  _form.elements["end-date"].value = obj["end-date"];
  _form.elements["reminder"].checked = obj["reminder"];
  _form.elements["select-time"].value = obj["select-time"];
  _form.elements["description"].value = obj.description;
  _form.elements["select-event"].value = obj["select-event"];
};

/*
 * This generates unique ID from index array
 */
calendarEvent.generateUUID = function () {
  const ls = localStorage;
  if (ls.getItem("events")) {
    return JSON.parse(ls.getItem("events")).length;
  }
  return 0;
};

/*
 * This modified stored event
 */
calendarEvent.modifyEvent = function (id, obj) {
  const ls = localStorage;
  const _data = calendarEvent.fromLocalStorage(),
    _dataFiltered = _data.filter((ev) => ev.id === id),
    [_event] = _dataFiltered;

  _data[_event.id] = obj;
  ls.setItem("events", JSON.stringify(_data));
};
