export const _event = {};

_event.getDataFromModal = function (form) {
  const formElements = document.querySelector(form);
  const obj = {};

  //   for (let index = 0; index < formElements.length; index++) {
  //     obj[formElements[index].name] = formElements[index].value;
  //   }

  obj.title = formElements.elements[0].value;
  obj.intialDate = formElements.elements[1].value;
  obj.checkEndDate = formElements.elements[2].checked;
  obj.EndDate = formElements.elements[3].value;
  obj.checkReminder = formElements.elements[4].checked;
  obj.ReminderTime = formElements.elements[5].value;
  obj.Description = formElements.elements[6].value;
  obj.eventType = formElements.elements[7].value;
};