const checkboxEndDate = document.querySelector("#existEndDate");
const checkboxExpiration = document.querySelector("#expiration");
const containerPreviousTime = document.querySelector("#previousTime");
const containerEndDate = document.querySelector("#showEndDate");
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

const showPreviousTime = () => {
  if (checkboxExpiration.checked) {
    containerPreviousTime.classList.add(isVisible);
    time.required = true;

  } else {
    containerPreviousTime.classList.remove(isVisible);
    time.required = false;

  }
};