export const calendarEvent = {};


calendarEvent.getDataFromModal = function (form) {
  const _form = document.querySelector(form);
  const _data = new FormData(_form);
  const _arrData = Array.from(_data.entries());
  const _obj = {};

  for (const [name, value] of _arrData) {
    _obj[name] = value;
  }

  calendarEvent.data = _obj;
  return calendarEvent.data;
};


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


calendarEvent.fromLocalStorage = function () {
  return JSON.parse(localStorage.getItem("events"));
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
