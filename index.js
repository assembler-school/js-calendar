
// OPEN MODAL
const isVisible = "is-visible";
const openModal = document.querySelector("[data-open]");
openModal.addEventListener("click", function () {
  const modalId = this.dataset.open;
  document.getElementById(modalId).classList.add(isVisible);
});

// CLOSE MODAL
const closeModal = document.querySelectorAll("[data-close]");

for (const el of closeModal) {
  el.addEventListener("click", function() {
    this.parentElement.parentElement.parentElement.classList.remove(isVisible);
  });
}
document.addEventListener("click", e => {
  if (e.target == document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});
document.addEventListener("keyup", e => {
  if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
    document.querySelector(".modal.is-visible").classList.remove(isVisible);
  }
});