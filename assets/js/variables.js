'use strict';

const monthNames = ['January', 'Febrary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

var dates = document.getElementById('dates');
var month = document.getElementById('month');
var year = document.getElementById('year');

var prevMonthDOM = document.getElementById('prev-month');
var nextMonthDOM = document.getElementById('prev-month');

prevMonthDOM.addEventListener('click', () => lastMonth());
nextMonthDOM.addEventListener('click', () => lastMonth());