'use strict';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//get the today date
var todayDate = new Date();
var todayDay = todayDate.getDate();
var todayMonth = todayDate.getMonth();
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
const todayMonthDOM = document.getElementById('today-month');   // marcel TODAY BUTTON 

prevMonthDOM.addEventListener('click', () => goToPrevMonth());
nextMonthDOM.addEventListener('click', () => goToNextMonth());
todayMonthDOM.addEventListener('click', () => goToTodayMonth());    // marcel TODAY BUTTON 

//events variables
var eventsNotes = new Array();
var eventNote = {};

const form = document.querySelector('.form');
let eventsDay = document.getElementById('eventsDay');

var dateSelected;