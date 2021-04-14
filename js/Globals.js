var currentDate = new Date;
var currentWeekDay = currentDate.getDay();
var currentDay = currentDate.getDate();
var currentMonth = currentDate.getMonth();
var currentYear = currentDate.getFullYear();

var month = currentMonth;
var year = currentYear;

var shortDays = ['M','T','W','T','F','S','S'];
var weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
var monthsNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

var calendarView = '';

var reminders = JSON.parse(localStorage.getItem('reminders')) || {};
var nextRemindersList = [];
var pastRemindersList = [];
var currentTimeout;
