const cal = document.getElementById('main');
const Darkdays = document.getElementById('modal-event-div');
const checkboxDm = document.getElementById('checkboxDM');

const checkedFunction = () =>{
    if(document.getElementById('checkboxDM').checked){
    cal.classList.add('backgrounDark');
    Darkdays.classList.add('colorDark');
}else{
    cal.classList.remove('backgrounDark');
    Darkdays.classList.remove('colorDark');
}
}
checkboxDm.addEventListener('click',checkedFunction);