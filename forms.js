const checkboxEndDate = document.querySelector("#existEndDate");
const checkboxExpiration = document.querySelector("#expiration");
const containerPreviousTime = document.querySelector("#previousTime");
const containerEndDate = document.querySelector("#showEndDate");
const initDate = document.querySelector("#initDate");
const title = document.querySelector("#title");
const description = document.querySelector("#description");
const type = document.querySelector("#type");
const endDate = document.querySelector("#endDate");
const time = document.querySelector("#time");
const containerExpiration = document.querySelector("#showExpiration");

function initForm() {
  checkboxEndDate.addEventListener("change", showEndDate);
  checkboxExpiration.addEventListener("change", showPreviousTime);
  form.addEventListener("submit", addEvent);
  formEvent.addEventListener("submit", removeEvent);
}

const showEndDate = () => {
  if (checkboxEndDate.checked) {
    containerEndDate.classList.add(isVisible);
    containerExpiration.classList.add(isVisible);
    checkboxExpiration.checked = true;
    containerPreviousTime.classList.add(isVisible);
    endDate.required = true;
    time.required = true;

  } else {
    containerEndDate.classList.remove(isVisible);
    containerExpiration.classList.remove(isVisible);
    endDate.required = false;
    time.required = false;
  }
};

function hideEndDateAndRemind() {
  containerEndDate.classList.remove(isVisible);
  containerExpiration.classList.remove(isVisible);
  checkboxEndDate.checked = false;
  checkboxExpiration.checked = false;
  endDate.required = false;
  time.required = false;
}

function setDatesInForm(result) {
  initDate.value = result;
  endDate.value = result;
  title.value = '';
  description.value = '';
  type.value = '';
}

function setEventData(event) {
  document.querySelector("#titleEvent").value = event.title;
  document.querySelector("#initEventDate").value = getDate_toString_ISOMethod(event.initDate);
  document.querySelector("#endEventDate").value = getDate_toString_ISOMethod(event.endDate);
  document.querySelector("#descriptionEvent").value = event.description;
  document.querySelector("#optionTimeEvent").value = event.time;
  document.querySelector("#optionTimeEvent").textContent = event.time;
  document.querySelector("#optionTypeEvent").value = event.type;
  document.querySelector("#optionTypeEvent").textContent = event.type;
  document.querySelector("#idEvent").value = event.id;
}

const showPreviousTime = () => {
  if (checkboxExpiration.checked) {
    containerPreviousTime.classList.add(isVisible);
    time.required = true;

  } else {
    containerPreviousTime.classList.remove(isVisible);
    time.required = false;
  }
};