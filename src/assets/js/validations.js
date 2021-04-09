const formulario = document.getElementById('form');

const inputs = [
    document.getElementById('title'),
    document.getElementById('description')
];

const dates = {
    'initialDate' : document.getElementById('initialDate'),
    'endDate' : document.getElementById('endDate')
}

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth()+1;
const day = date.getDate();
const toDay = day + '/' + month + '/' + year;

console.log(toDay);

const expresiones = {
    title: /^[a-zA-ZÀ-ÿ\s\d]{4,10}$/,
    description: /^[a-zA-ZÀ-ÿ\s\d]{5,40}$/
}
const validarTextos = (e) =>{
   switch(e.target.name){
       case "title":
           if(expresiones.title.test(e.target.value)){
               console.log('Conseguido');
           }else{
                console.log('KK de burra');
           }
        break;

        case "description":
            if(expresiones.description.test(e.target.value)){
                console.log('Conseguido');
           }else{
                console.log('KK de burra');
           }
        break;
   }
}
//console.log(key + ' ' + value);
const validarFechas = () =>{
    if(dates.endDate.value < dates.initialDate.value){
        console.log('No pudes finalizar un evento antes de crearlo');
    }else{
        console.log('Todo OK');
    }
}
/*const validarFechas = () =>{
    switch(){

    }
}*/

Object.entries(dates).forEach( (value)=>{
    //value[1].addEventListener('focusin',validarFechas );
    value[1].addEventListener('focusout', validarFechas);
});

inputs.forEach( (input)=>{
    input.addEventListener('keyup',validarTextos );
    input.addEventListener('blur', validarTextos);
});

formulario.addEventListener('submit', (e) => {
    e.preventDefault(); 
});