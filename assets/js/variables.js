'use strict';

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const currentDate = new Date();
const currentDay = currentDate.getDate();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();

let dates = document.getElementById('dates');
let month = document.getElementById('month');
let year = document.getElementById('year');

let prevMonthDOM = document.getElementById('prev-month');
let nextMonthDOM = document.getElementById('next-month');

prevMonthDOM.addEventListener('click', () => lastMonth());
nextMonthDOM.addEventListener('click', () => lastMonth());