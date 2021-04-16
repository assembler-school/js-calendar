const storage = window.localStorage;
const cal = document.getElementById('main');
const Darkdays = document.getElementById('modal-event-div');
const checkboxDm = document.getElementById('checkboxDM');
const darkWeek = document.querySelector(".weekdays");

const intializeDarkMode =() =>{
    let darkmodeEnabled =
    localStorage.getItem('checked') ? JSON.parse(localStorage.getItem('checked')) : false;
    if(darkmodeEnabled){
        cal.classList.add('backgrounDark');
        Darkdays.classList.add('colorDark');
        darkWeek.classList.add("colorDark");
        storage.setItem('checked',true);
        checkboxDm.checked = true;
    }
}
intializeDarkMode();
const checkedFunction = () =>{
    if(document.getElementById('checkboxDM').checked){
    cal.classList.add('backgrounDark');
    Darkdays.classList.add('colorDark');
    darkWeek.classList.add("colorDark");
    storage.setItem('checked',true);
}else{
    cal.classList.remove('backgrounDark');
    Darkdays.classList.remove('colorDark');
    darkWeek.classList.remove("colorDark");
    storage.setItem('checked',false);
}
}
checkboxDm.addEventListener('click',checkedFunction);


