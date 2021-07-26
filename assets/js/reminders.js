'use strict';

const setReminderDate = (event) => {
  //get reminderNote variables
  reminderNote.id = event.id
  reminderNote.date = getReminderDate(event);

  //add add reminderDate in reminders array
  reminders.push(reminderNote);

  //convert reminders to string
  let remindersString = JSON.stringify(reminders);

  //set reminders in localStorage
  (() => localStorage.setItem("reminders", remindersString))();
}

const getReminderDate = (event) => {
  //convert string to date
  const startDate = convertStringToDate(event.startString, event.startTime);

  //get initial timestamp of the event
  const initialTimestamp = new Date(startDate).getTime();

  //convert minutes to miliseconds
  const reminderMilliseconds = parseInt(event.reminder) * 60000;

  //get the reminder timestamp
  const reminderDate = new Date(initialTimestamp - reminderMilliseconds);

  return reminderDate;
}

const deleteReminderDate = (reminderNote) => { }

const activateReminders = (reminders) => {
  console.log('reminder');
  // console.log(reminder);
  // reminders.forEach(event => activateReminderEvent(event));
}

const activateReminderEvent = (event) => {
  let currentDate = new Date();
  let reminderDate = getReminderDate(event);
  let startDate = convertStringToDate(event.startString, event.startTime);

  console.log(event);
  console.log(currentDate);

  if (currentDate > reminderDate && startDate < reminderDate) {
    console.log('yes');
  } else {
    console.log('no');
  }

}