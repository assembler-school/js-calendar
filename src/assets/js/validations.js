const formulario = document.getElementById('form');
const createButton = document.getElementById('m-createBtn');

inputs = [
    title = document.getElementById('title'),
    desc = document.getElementById('description'),
    initialDate = document.getElementById('initialDate'),
    endDate = document.getElementById('endDate'),
];
const Newdate = new Date();
const year = Newdate.getFullYear();
const month = Newdate.getMonth()+1;
const day = Newdate.getDate();
const toDay = day + '/' + month + '/' + year;

const expresiones = {
    title: /^[a-zA-ZÀ-ÿ\s\d]{1,60}$/,
    description: /^[a-zA-ZÀ-ÿ\s\d]{1,40}$/
};

    document.getElementById('title').addEventListener('onkeyup',validarTitulo);
    document.getElementById('initialDate').addEventListener('onkeyup',validarInitialDate);
    document.getElementById('endDate').addEventListener('onkeyup',validarEndDate);
    // document.getElementById('description').addEventListener('focus',validarDescription);
function validarFormulario() {
  if(validarTitulo() && validarInitialDate() &&  validarEndDate()){
        createButton.removeAttribute("disabled");
        createButton.style.opacity = 1;
    }
    else{
        createButton.disabled = true;
        createButton.style.opacity = 0.5;
    }
}

document.getElementById('form').addEventListener('change',validarFormulario);
function validarTitulo(e){

    //Validacion Titulo
    if(title.value === null || title.value === ""){
        inputs[0].classList.add("incorrect");
        return false;
    }else if(!expresiones.title.test(inputs[0].value)){ 
        inputs[0].classList.add("incorrect");
        return false;
    }else{
        inputs[0].classList.remove("incorrect");
        return true;
    }
}
function validarInitialDate(){

    //Validacion Initial Date
    if(initialDate.value === null || initialDate.value === ""){
        inputs[2].classList.add("incorrect");
        return false;
    }else{
        inputs[2].classList.remove("incorrect");
        return true;
    }
}
function validarEndDate(){
    const check = document.getElementById('check-box');
    //Validacion End Date
    if(check.checked == false){
        return true;
    }else{
        if(endDate.value === null || endDate.value === ""){
            inputs[3].classList.add("incorrect");
            return false;
        }else if(endDate.value < initialDate.value){
            inputs[3].classList.add("incorrect");
            return false;
        }else{
            inputs[3].classList.remove("incorrect");
            return true;
        }
    }
}
