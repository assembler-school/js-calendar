var currentDate = new Date;
var currentDay = currentDate.getDate();
var currentMonth = currentDate.getMonth();
var currentYear = currentDate.getFullYear();

var month = currentMonth;
var year = currentYear;
var idMonth
var idDay

var shortDays = ['M','T','W','T','F','S','S'];
var weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
var monthsNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let optDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: "2-digit", minute: "2-digit" };
var calendarView = '';

var nextRemindersList = [];
var pastRemindersList = [];
var currentTimeout;
var calendarEvents = {};
var reminders = {};

var device = '';