var shortDays = ['M','T','W','T','F','S','S'];
var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
var monthsNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

//CALENDAR CONSTRUCTOR
function calendarConstructor(){
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

  //Create weeks
  var months = document.querySelectorAll('.month');
  months.forEach((month) => {
    for(i=0;i<8;i++){
      let div = document.createElement('div');
      div.setAttribute('class','week');
      month.appendChild(div);
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
  var months = document.querySelectorAll('.month');
  months.forEach((month) => {
    month.firstChild.classList.add('month-name');
  });
  //Setting month names
  var monthName = document.querySelectorAll('.month-name');
  monthName.forEach((month,i=0) => {
    month.innerHTML = monthsNames[i];
    i++;
  });


  //Setting week-days class
  var months = document.querySelectorAll('.month');
  months.forEach((month) => {
    let secondChild = month.childNodes
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
};