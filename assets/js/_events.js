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
    ls= localStorage;

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
 * This generates unique ID from index array
 */
calendarEvent.generateUUID = function () {
  const ls= localStorage;
  if (ls.getItem("events")) {
    return JSON.parse(ls.getItem("events")).length;
  }
  return 0;
};

// calendarEvent.probando = function () {
//   const myObject1 = {};
//   const myObject2 = {};
//   const myArray = [];

//   myObject1.name = "brahim";
//   myObject2.name = "jordi";
//   myArray.push(myObject1);
//   myArray.push(myObject2);

//   return localStorage.setItem("events", JSON.stringify(myArray));
// };
