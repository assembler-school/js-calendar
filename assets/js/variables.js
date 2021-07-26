'use strict';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//get the today date
var todayDate = new Date();
var todayDay = pad(todayDate.getDate())
var todayMonth = pad(todayDate.getMonth() + 1);
var todayYear = todayDate.getFullYear();
var today = todayYear + "-" + todayMonth + "-" + todayDay;

//get the current date
const currentDate = new Date();
const currentDay = currentDate.getDate();
var currentMonth = currentDate.getMonth();
var currentYear = currentDate.getFullYear();

let dates = document.getElementById('dates');
let month = document.getElementById('month');
let year = document.getElementById('year');

const prevMonthDOM = document.getElementById('prev-month');
const nextMonthDOM = document.getElementById('next-month');

prevMonthDOM.addEventListener('click', () => goToPrevMonth());
nextMonthDOM.addEventListener('click', () => goToNextMonth());

//get the eventsNotes in localStorage
var eventsNotes = JSON.parse(localStorage.getItem('events'));
var eventNote = {};

//if not eventsNotes create empty array
(!eventsNotes) ? eventsNotes = new Array() : null;

//get the reminders in localStorage
var reminders = JSON.parse(localStorage.getItem('reminders'));
var reminderNote = {};

//if not eventsNotes create empty array
(!reminders) ? reminders = new Array() : null;

const form = document.querySelector('.form');
let eventsDay = document.getElementById('eventsDay');

var dateSelected;

//modals variable
var calendarMain = document.querySelector(".calendar__main");
var addEventBtn = document.querySelector("#add-event");
var cancelModal = document.getElementById('modalCancel');
var saveModal = document.getElementById('modalSave');