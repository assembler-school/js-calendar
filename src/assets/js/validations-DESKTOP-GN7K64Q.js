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
    title: /^[a-zA-ZÀ-ÿ\s\d]{4,10}$/,
    description: /^[a-zA-ZÀ-ÿ\s\d]{1,40}$/
};

const error = document.getElementById('error');

    function validacionFinal(true){
            const mensajesError = [
        ]
            if(validarTitulo == true && validarInitialDate == true && validarDescripcion == true && validarEndDate == true){        
            createButton.classList.remove('m-action-buttonHidden');
        }
        else{
            return false;
        }
}
function validarTitulo(){
   //Validacion Titulo
    if(title.value === null || title.value === ""){
        mensajesError.push('Enter a title');
        inputs[0].classList.add("incorrect");
    }else if(!expresiones.title.test(inputs[0].value)){ 
        mensajesError.push('The title must have between 4 and 12 values');
        inputs[0].classList.add("incorrect");
    }else{
        inputs[0].classList.remove("incorrect");
        console.log('Title: ' + ' ' + title.value);
    }
}
function validarInitialDate(){
//Validacion Initial Date
    if(initialDate.value === null || initialDate.value === ""){
        mensajesError.push('Enter a Initial Date');
        inputs[2].classList.add("incorrect");
    }else{
        inputs[2].classList.remove("incorrect");
        console.log('Initial Date: ' + ' ' + initialDate.value);
    }
}
function validarEndDate(){
    //Validacion End Date
    if(endDate.value === null || endDate.value === ""){
        mensajesError.push('Enter a Final Date');
        inputs[3].classList.add("incorrect");
    }else if(endDate.value < initialDate.value){
         inputs[3].classList.add("incorrect");
         mensajesError.push('You cannot end an event before creating it');
    }else{
        inputs[3].classList.remove("incorrect");
        console.log('End Date: ' + ' ' + endDate.value);
    }
}
function validarDescripcion(){
    //Validacion Descripcion
    if(desc.value === null || desc.value === ""){
        mensajesError.push('Enter something in the description');
        inputs[1].classList.add("incorrect");
    }else if(!expresiones.description.test(inputs[1].value)){
        mensajesError.push('The description must have between 1 and 40 values');
        inputs[1].classList.add("incorrect");
    }else{
        inputs[1].classList.remove("incorrect");
        console.log('Description: ' + ' ' + desc.value);
    }
}

    error.innerHTML = mensajesError.join(', ');
    
}
document.addEventListener('focusout',validacionFinal);