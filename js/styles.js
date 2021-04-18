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

function checkResponsive() {
  device = x.matches ? 'mobile' : 'computer';
  responsive();
}
x.addEventListener('change',checkResponsive);

checkResponsive();

function responsive() {
  if(device === 'mobile') {
    currentDateSection.classList.add('mobile-currentDate-section');
    currentTypeOfDateSection.classList.add('mobile-currentTypeofDate-container');

    //Change next previous buttons
    mobileGoPreviousBtn.style.display = 'block';
    mobileGoNextBtn.style.display = 'block';
    goPreviousBtn.style.display = 'none';
    goNextBtn.style.display = 'none';
  } else if(device === 'computer') {
    currentDateSection.classList.remove('mobile-currentDate-section');
    currentTypeOfDateSection.classList.remove('mobile-currentTypeofDate-container');

    //Change next previous buttons
    mobileGoPreviousBtn.style.display = 'none';
    mobileGoNextBtn.style.display = 'none';
    goPreviousBtn.style.display = 'block';
    goNextBtn.style.display = 'block';
  }
  if(calendarView === 'year-view') {
    clearYearCalendar();
    calendarConstructor(year);
  }
}

//Buttons month year styles
function buttonMonthYearStyle() {
  if(calendarView === 'month-view') {
    document.querySelector('.monthView-btn').classList.add('calendar-button');
    document.querySelector('.yearView-btn').classList.remove('calendar-button');
  } else if(calendarView === 'year-view') {
    document.querySelector('.monthView-btn').classList.remove('calendar-button');
    document.querySelector('.yearView-btn').classList.add('calendar-button');
  }
}
