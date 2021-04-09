var current_date = new Date;
var current_day = current_date.getDay();
var current_month = current_date.getMonth();
var current_year = current_date.getFullYear();

console.log(current_date);

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

document.querySelector('.month-name').innerHTML = months[current_month];
console.log(days[current_day] + ' ' + months[current_month] + ' ' + current_year);