const checkboxEndDate = document.querySelector("#existEndDate");
const checkboxExpiration = document.querySelector("#expiration");
const containerPreviousTime = document.querySelector("#previousTime");
const containerEndDate = document.querySelector("#showEndDate");
const endDate = document.querySelector("#endDate");
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

  } else {
    containerEndDate.classList.remove(isVisible);
    containerExpiration.classList.remove(isVisible);
    endDate.required = false;
  }
};

const showPreviousTime = () => {
  if (checkboxExpiration.checked) {
    containerPreviousTime.classList.add(isVisible);
  } else {
    containerPreviousTime.classList.remove(isVisible);
  }
};