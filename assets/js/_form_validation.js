const validation = {};

export function formValidation(e, validateAll) {
  const inputsRequired = document.querySelectorAll("input[required]");

  /* Prevent default message */
  document.addEventListener(
    "invalid",
    (function () {
      return function (e) {
        e.preventDefault();
      };
    })(),
    true
  );

  /* Inject span with validation message */
  const showSpanMessage = function (all, input) {
    if (input) {
      if (input.nextSibling.localName !== "span") {
        const span = document.createElement("span");
        span.id = input.name;
        span.textContent = input.title;
        span.classList.add("title__error", "off");
        input.insertAdjacentElement("afterend", span);
      }
    }
  };

  /* Validate focused input */
  const inputValidation = function (e) {
    let input = e.target;
    const span = document.getElementById(input.name);

    if (span) span.classList.replace("on", "off");

    if (!input.validity.valid) {
      showSpanMessage(false, input);
      document.getElementById(input.name).classList.replace("off", "on");
    }
  };

  /* Ending date to start from the beginning date */
  const endDate = document.querySelector('input[name="end-date"]');
  const initDate = document.querySelector('input[name="init-date"]').value;
  const endChecked = document.querySelector('input[name="end-check"]').checked;
  endDate.style.opacity = '0.6';
  if (initDate) {
    endDate.disabled = false;
    endDate.setAttribute('min', initDate);
    endDate.style.opacity = '1';
  }
  if (!endChecked) {endDate.value = "";}


  /* Validate all form required input */
  const formValidation = function (e) {
    inputsRequired.forEach((element) => {
      const span = document.getElementById(element.name);
      if (span) span.classList.replace("on", "off");

      if (!element.validity.valid) {
        showSpanMessage(false, element);
        document.getElementById(element.name).classList.replace("off", "on");
      }
    });
  };

  /* Choose validation */
  if (validateAll) {
    formValidation(e);
    let result = document.querySelector("span.on");
    return result;
  }
  inputValidation(e);
}
