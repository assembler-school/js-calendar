hideModal();
document.getElementById("createEventBtn").addEventListener("click", showModal);
document.addEventListener("keyup", e => {
    if (e.key === "Escape" && document.querySelector(".modal.showUp")) {
        hideModal();
    }
});
function showModal() {
    let modal = document.getElementById("modalDiv");
    modal.classList.add('showUp');
    modal.style.display = "block";
}

function hideModal() {
    let modal = document.getElementById("modalDiv");
    modal.classList.remove('showUp')
    modal.style.display = "none";
}