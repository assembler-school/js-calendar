'use strict';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
