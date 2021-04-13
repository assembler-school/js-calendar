console.log(days[currentWeekDay] + ' ' + currentDay + ' ' + monthsNames[currentMonth] + ' ' + currentYear);

// console.log(firstOfJanuary(2021));
// console.log('First week day: ' + new Date(year,month).getDay());
// console.log(getMonthDays(2021,5));


//GET DAY,MONTH,YEAR DATA
//Get first day of month
function getFirstMonthDay(year,month){
  let date = new Date(year, month).getDay();
  //return 7 because in calendar week start on monday and get day starts on sunday
  if(date == 0){
    return 7;
  }else{
    return date;
  }
};

//Get number of days in month
function getMonthDays(year,month){
  return new Date(year,month, 0).getDate()
};



//CALENDAR CONSTRUCTOR
function calendarConstructor(changeYear){
  var yearView = document.querySelector('#year-section');
  //Create year-rows
  for(i=0;i<3;i++){
    let div = document.createElement('div');
    div.setAttribute('class','year-row');
    yearView.appendChild(div);
  }

  //Create months
  var yearRows = document.querySelectorAll('.year-row');
  yearRows.forEach((row) => {
    for(i=0;i<4;i++){
      let div = document.createElement('div');
      div.setAttribute('class','month');
      row.appendChild(div);
    }
  })

  //Create row for month name
  var months = document.querySelectorAll('.month');
  months.forEach((element) => {
    for(i=0;i<2;i++){
      let div = document.createElement('div');
      div.setAttribute('class','week');
      element.appendChild(div);
    };
  });

  //Create week days
  var weeks = document.querySelectorAll('.week');
  weeks.forEach((week) =>{
    for(i=0;i<7;i++){
      let div = document.createElement('div');
      div.setAttribute('class','days');
      week.appendChild(div);
    };
  });

  //Setting month-name class
  months.forEach((element) => {
    element.firstChild.classList.add('month-name');
  });
  //Setting month names
  var monthName = document.querySelectorAll('.month-name');
  monthName.forEach((element,i=0) => {
    element.innerHTML = monthsNames[i];
    i++;
  });


  //Setting week-days class
  var months = document.querySelectorAll('.month');
  months.forEach((element) => {
    let secondChild = element.childNodes
    secondChild[1].classList.add('week-days');
  });
  //Setting week-days names
  var weekDays = document.querySelectorAll('.week-days');
  weekDays.forEach((week) => {
    let childs = week.childNodes;
    let i = 0;
    childs.forEach((child) => {
      child.innerHTML += shortDays[i];
      i++;
    });
  });
  populateCalendar(changeYear);
};



//POPULATE CALENDAR DAYS
function populateCalendar(changeYear){
  //Body of the calendar
  var months = document.querySelectorAll('.month');

  //Change between years
  if(!changeYear || changeYear == currentYear){
    year = currentYear;
  }else{
    year = currentYear + changeYear;
  };
  console.log(year);

  var iMonth = 1;
  months.forEach((element) => {

    let date = 1;

    //Dates checker
    // console.log('iMonth-' + iMonth);
    // console.log('Month days-' + getMonthDays(year,iMonth))
    // console.log('First week day-' + (getFirstMonthDay(year,iMonth-1)));

    for (let i = 0; i < 6; i++) {
      // creates a table row
      // let row = document.createElement("tr");
      let row = document.createElement('div');
      row.setAttribute('class','week');

      //creating individual cells, filing them up with data.
      for (let j = 0; j < 7; j++) {
        if(date <= getMonthDays(year, iMonth)){
          if (i === 0 && (j+1) < getFirstMonthDay(year,iMonth-1)) {
            let cell = document.createElement('div');
            cell.setAttribute('class','days');
            cellText = document.createTextNode("");
            cell.appendChild(cellText);
            row.appendChild(cell);
          }

          else {
            let cell = document.createElement('div');
            cell.setAttribute('class','days');
            cell.setAttribute('id',year + '/' + iMonth + '/' + date);
            let cellText = document.createTextNode(date);
            cell.appendChild(cellText);
            row.appendChild(cell);
            date++;
          }
        }
      }
      element.appendChild(row); // appending each row into calendar body.
    }
    iMonth++;
  });
  // today(month,currentDay,currentMonth,currentYear);
};


//COLORING CURRENT DAY IN CALENDAR
// function today(month,currentDay,currentMonth,currentYear){
//   if(month === currentMonth){
//     document.querySelector('[id="' + currentYear + '/' + (currentMonth + 1) + '/' + currentDay + '"]').classList += ' year-current-day';
//   }
// }
