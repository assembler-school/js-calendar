var x = window.matchMedia("(max-width: 400px)");

//Elements

var currentDateSection = document.querySelector('.currentDate-section');
var currentTypeOfDateSection = document.querySelector('.currentTypeofDate-container');
var currentTypeOfDate = document.querySelector('.currentDate-section');
//Year calendar
var yearDays = document.querySelector('.days');



//Nex previous buttons
var mobileGoPreviousBtn = document.querySelector('.mobile-goPrevious-btn');
var mobileGoNextBtn = document.querySelector('.mobile-goNext-btn');
var goPreviousBtn = document.querySelector('.goPrevious-btn');
var goNextBtn = document.querySelector('.goNext-btn');

if(x.matches){
  device = 'mobile'
}else{
  device = 'computer'
}
x.addEventListener('change',(device) => {
  if(x.matches){
    device = 'mobile'
  }else{
    device = 'computer'
  }
  responsive(device)
})
responsive(device)

function responsive(device){
  if(device === 'mobile'){
    currentDateSection.classList.add('mobile-currentDate-section');
    currentTypeOfDateSection.classList.add('mobile-currentTypeofDate-container');

    //Change next previous buttons
    mobileGoPreviousBtn.style.display = 'block';
    mobileGoNextBtn.style.display = 'block';
    goPreviousBtn.style.display = 'none';
    goNextBtn.style.display = 'none';

    //Year calendar
    yearDays.classList.add('mobile-days')

  }else if(device === 'computer'){
    currentDateSection.classList.remove('mobile-currentDate-section');

    //Change next previous buttons
    mobileGoPreviousBtn.style.display = 'none';
    mobileGoNextBtn.style.display = 'none';
    goPreviousBtn.style.display = 'block';
    goNextBtn.style.display = 'block';


  }
}