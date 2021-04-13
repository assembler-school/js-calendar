document.querySelector('.goPrevious-btn').addEventListener('click',previousButton);
document.querySelector('.goToday-btn').addEventListener('click',todayButton);
document.querySelector('.goNext-btn').addEventListener('click',nextButton);

//Go to previous or next calendar
function previousButton(){
  if(calendarView == '' || calendarView == 'month-view'){
    console.log('-1')
    month -= 1;
    clearMonthCalendar();
    calendarMonthConstructor(month);
  };
  if(calendarView == 'year-view'){
    console.log('-1')
    year -= 1;
    clearYearCalendar();
    calendarConstructor(year);
  };
};

function todayButton(){
  if(calendarView == '' || calendarView == 'month-view'){
    clearMonthCalendar();
    month = currentMonth;
    calendarMonthConstructor(month);
  };
  if(calendarView == 'year-view'){
    clearYearCalendar();
    year = currentYear;
    calendarConstructor(year);
  };
};

function nextButton(){
  if(calendarView == '' || calendarView == 'month-view'){
    console.log('+1')
    month += 1;
    clearMonthCalendar();
    calendarMonthConstructor(month);
  };
  if(calendarView == 'year-view'){
    console.log('+1')
    year += 1;
    clearYearCalendar();
    calendarConstructor(year);
  };
};


//Remove month and year calendars
function clearMonthCalendar(){
  document.querySelector('#month-section').innerHTML = '';
}
function clearYearCalendar(){
  document.querySelector('#year-section').innerHTML = '';
}


//Check calendar view
document.querySelector('#month-section');