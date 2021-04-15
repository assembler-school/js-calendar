document.querySelector('.goPrevious-btn').addEventListener('click',previousButton);
document.querySelector('.goToday-btn').addEventListener('click',todayButton);
document.querySelector('.goNext-btn').addEventListener('click',nextButton);

//Go to previous or next calendar
function previousButton(){
  if(calendarView == '' || calendarView == 'month-view'){
    month -= 1;
    clearMonthCalendar();
    calendarMonthConstructor(month);
  };
  if(calendarView == 'year-view'){
    year -= 1;
    clearYearCalendar();
    calendarConstructor(year);
  };
};

function todayButton(){
  if(calendarView == '' || calendarView == 'month-view'){
    clearMonthCalendar();
    month = currentMonth;
    year = currentYear;
    calendarMonthConstructor(year,month);
  }
  if(calendarView == 'year-view'){
    clearYearCalendar();
    year = currentYear;
    month = currentMonth;
    calendarConstructor(year);
  }
}

function nextButton(){
  if(calendarView == '' || calendarView == 'month-view'){
    month += 1;
    clearMonthCalendar();
    calendarMonthConstructor(month);
  }
  if(calendarView == 'year-view'){
    year += 1;
    clearYearCalendar();
    calendarConstructor(year);
  }
}


//Remove month and year calendars
function clearMonthCalendar(){
  document.querySelector('#month-section').innerHTML = '';
}
function clearYearCalendar(){
  document.querySelector('#year-section').innerHTML = '';
}


//Select today
function today(month,currentDay,currentMonth,currentYear){
  if(document.querySelector(".main-content-section").firstElementChild.id === "month-section"){
      var idCurrentMonth = currentMonth + 1;
      var idCurrentDay = currentDay;
      if(idCurrentMonth < 10){
          idCurrentMonth = '0' + idCurrentMonth
      }
      if(idCurrentDay < 10){
          idCurrentDay = '0' + idCurrentDay;
      }
      if(month === currentMonth && year == currentYear){
          document.querySelector('[id="' + currentYear + '/' + idCurrentMonth + '/' + idCurrentDay + '"]').parentNode.classList += ' month-current-day';
      }
  }else if(document.querySelector(".main-content-section").firstElementChild.id === "year-section"){
    var idCurrentMonth = currentMonth + 1;
    var idCurrentDay = currentDay;
    if(idCurrentMonth < 10){
        idCurrentMonth = '0' + idCurrentMonth
    }
    if(idCurrentDay < 10){
        idCurrentDay = '0' + idCurrentDay;
    }
    if(year === currentYear){
      document.querySelector('[id="' + currentYear + '/' + idCurrentMonth + '/' + idCurrentDay + '"]').classList.add('year-current-day');
    }
  }
}