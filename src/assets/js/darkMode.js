const cal = document.getElementById('main');
const Darkdays = document.getElementById('modal-event-div');
const checkboxDm = document.getElementById('checkboxDM');
const darkWeek = document.querySelector(".weekdays");

const checkedFunction = () =>{
    if(document.getElementById('checkboxDM').checked){
    cal.classList.add('backgrounDark');
    Darkdays.classList.add('colorDark');
    darkWeek.classList.add("colorDark")
}else{
    cal.classList.remove('backgrounDark');
    Darkdays.classList.remove('colorDark');
    darkWeek.classList.remove("colorDark")
}
}
checkboxDm.addEventListener('click',checkedFunction);