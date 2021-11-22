function getFuture() {
  return JSON.parse(localStorage.getItem("future")) || [];
}

function getPast() {
  return JSON.parse(localStorage.getItem("past")) || [];
}

function setFuture(arrayFuture) {
  localStorage.setItem("future", JSON.stringify(arrayFuture));
}

function setPast() {}

export { getFuture, getPast, setFuture, setPast };
