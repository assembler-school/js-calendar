var currentDate = new Date;
var currentWeekDay = currentDate.getDay();
var currentDay = currentDate.getDate();
var currentMonth = currentDate.getMonth();
var currentYear = currentDate.getFullYear();

var shortDays = ['M','T','W','T','F','S','S'];
var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
var monthsNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

console.log(days[currentWeekDay] + ' ' + currentDay + ' ' + monthsNames[currentMonth] + ' ' + currentYear);

var setYear = currentYear;
console.log(firstOfJanuary(2021));
console.log(firstWeekDay(2021));
console.log(getMonthDays(2021,5));


//Get first day of year
function firstOfJanuary(year){
  return new Date(year,'0','1');
};

//Get day of week first day of year
function firstWeekDay(year){
  return new Date(year,'0','1').getDay();
};

//Get number of days in month
function getMonthDays(year,month){
  return new Date(year,month, 0).getDate();
};


function setStartMonthDay(){

};
