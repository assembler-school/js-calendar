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
    description: /^[a-zA-ZÀ-ÿ\s\d]{5,40}$/
};

const error = document.getElementById('error');

const validarFormulario = (e) =>{
    const mensajesError = [

    ];
    
   //Validacion Titulo
    if(title.value === null || title.value === ""){
        mensajesError.push('Ingresa un titulo');
        inputs[0].classList.add("incorrect");
    }else if(!expresiones.title.test(inputs[0].value)){ 
        mensajesError.push('El titulo debe tener entre 4 y 12 valores');
        inputs[0].classList.add("incorrect");
    }else{
        inputs[0].classList.remove("incorrect");
        console.log('Title: ' + ' ' + title.value);
    }
    //Validacion Descripcion
    if(desc.value === null || desc.value === ""){
        mensajesError.push('Ingresa algo en la descripción');
        inputs[1].classList.add("incorrect");
    }else if(!expresiones.description.test(inputs[1].value)){
        mensajesError.push('La descripcion debe tener entre 5 y 40 caracteres');
        inputs[1].classList.add("incorrect");
    }else{
        inputs[1].classList.remove("incorrect");
        console.log('Description: ' + ' ' + desc.value);
    }
    //Validacion Initial Date
    if(initialDate.value === null || initialDate.value === ""){
        mensajesError.push('Ingresa una fecha Inicial');
        inputs[2].classList.add("incorrect");
    }else{
        inputs[2].classList.remove("incorrect");
        console.log('Initial Date: ' + ' ' + initialDate.value);
    }
    //Validacion End Date
    if(endDate.value === null || endDate.value === ""){
        mensajesError.push('Ingresa una fecha final');
        inputs[3].classList.add("incorrect");
    }else if(endDate.value < initialDate.value){
        mensajesError.push('No puedes finalizar un evento antes de crarlo');
        inputs[3].classList.add("incorrect");
    }else{
        inputs[3].classList.remove("incorrect");
        console.log('End Date: ' + ' ' + endDate.value);
    }
    error.innerHTML = mensajesError.join(', ');
    
}