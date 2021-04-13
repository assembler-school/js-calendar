var setCalendarMonthCounter = 0;
var setCalendarYearCounter = 0;

document.querySelector('.goPrevious-btn').addEventListener('click',previousButton);
document.querySelector('.goToday-btn').addEventListener('click',todayButton);
document.querySelector('.goNext-btn').addEventListener('click',nextButton);

//Go to previous or next calendar
function previousButton(){
  if(calendarView == '' || calendarView == 'month-view'){
    console.log('-1')
    setCalendarMonthCounter -= 1;
    clearMonthCalendar();
    calendarMonthConstructor(setCalendarMonthCounter);
  };
  if(calendarView == 'year-view'){
    console.log('-1')
    setCalendarYearCounter -= 1;
    clearYearCalendar();
    calendarConstructor(setCalendarYearCounter);
  };
};

function todayButton(){
  if(calendarView == '' || calendarView == 'month-view'){
    clearMonthCalendar();
    calendarMonthConstructor(currentMonth);
    console.log(currentMonth);
  };
  if(calendarView == 'year-view'){
    clearYearCalendar();
    calendarConstructor(currentYear);
  };
};

function nextButton(){
  if(calendarView == '' || calendarView == 'month-view'){
    console.log('+1')
    setCalendarMonthCounter += 1;
    clearMonthCalendar();
    calendarMonthConstructor(setCalendarMonthCounter);
  };
  if(calendarView == 'year-view'){
    console.log('+1')
    setCalendarYearCounter += 1;
    clearYearCalendar();
    calendarConstructor(setCalendarYearCounter);
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