function addNewTemplate(containerId, templateId) {
    const templateContent = document.querySelector(`#${templateId}`).content;
    document.getElementById(containerId).appendChild(document.importNode(templateContent, true));
}

function updateTemplate(previousStep, containerId, templateId) {
    document.getElementById(previousStep)?.remove();
    addNewTemplate(containerId, templateId);
}

document.getElementById('monthView-btn').addEventListener("click", (event)=>{
    if(document.querySelector(".mainContent-section").firstElementChild.id === "year-section"){
        event.target.disabled=true;
        document.getElementById("yearView-btn").disabled=false;
        updateTemplate("year-section","mainContent-section","month-template");
    }
});
document.getElementById('yearView-btn').addEventListener("click", (event)=>{
    if(document.querySelector(".mainContent-section").firstElementChild.id === "month-section"){
        event.target.disabled=true;
        document.getElementById("monthView-btn").disabled=false;
        updateTemplate("month-section","mainContent-section","year-template");
    }
});
addNewTemplate("mainContent-section", "month-template");

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