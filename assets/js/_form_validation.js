const validation = {};

export function formValidation(e, validateAll) {
  const inputsRequired = document.querySelectorAll("input[required]");

  // prevent default message
  document.addEventListener("invalid",(function () {
      return function (e) {
        e.preventDefault();
      };
    })(),true);

  // inject span with validation message
  inputsRequired.forEach((element) => {
    if (element.nextSibling.localName !== "span") {
      const span = document.createElement("span");
      span.id = element.name;
      span.textContent = element.title;
      span.classList.add("title__error", "off");
      element.insertAdjacentElement("afterend", span);
    }
  });

  // validate focused input
  const inputValidation = function (e) {
    let input = e.target;
    document.getElementById(input.name).classList.add("on");
    document.getElementById(input.name).classList.remove("off");
    if (input.validity.valid) {
      document.getElementById(input.name).classList.remove("on");
      document.getElementById(input.name).classList.add("off");
    }
  };

  // validate all form required input
  const formValidation = function (e) {
    inputsRequired.forEach((element) => {
      document.getElementById(element.name).classList.add("on");
      document.getElementById(element.name).classList.remove("off");
      if (element.validity.valid) {
        document.getElementById(element.name).classList.remove("on");
        document.getElementById(element.name).classList.add("off");
      }
    });
  };

  // choose validation 
  if (validateAll) {
    formValidation(e);
    return;
  }
  inputValidation(e);
}
