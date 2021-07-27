'use strict';

const setReminderDate = (event) => {
  //get reminderNote variables
  reminderNote.id = event.id
  reminderNote.date = getReminderDate(event);

  //add add reminderDate in reminders array
  reminders.push(reminderNote);

  //sort the reminders array
  reminders = reminders.sort((a, b) => b.date - a.date);

  //convert reminders to string
  let remindersString = JSON.stringify(reminders);

  //set reminders in localStorage
  (() => localStorage.setItem("reminders", remindersString))();
}

const getReminderDate = (event) => {
  //convert string to date
  const startDate = convertStringToDate(event.startDate, event.startTime);

  //get initial timestamp of the event
  const initialTimestamp = new Date(startDate).getTime();

  //convert minutes to miliseconds
  const reminderMilliseconds = parseInt(event.reminder) * 60000;

  //return the reminder timestamp
  const reminderDate = new Date(initialTimestamp - reminderMilliseconds);

  //return the result
  return reminderDate;
}

const activateReminders = (reminders) => {

  setInterval(function () {

    //iterate every reminder
    reminders.forEach(reminder => {

      //get the event of the reminder
      eventsNotes.forEach(event => {

        //
        if (event.id == reminder.id) { activateReminderEvent(event); }
      });
    });
  }, 10 * 1000);
}

const activateReminderEvent = (event) => {
  let currentDate = new Date();
  let reminderDate = getReminderDate(event);
  let startDate = convertStringToDate(event.startDate, event.startTime);

  console.log(event);
  console.log('currentDate', currentDate);
  console.log('reminderDate', reminderDate);
  console.log('startDate', startDate);

  if (currentDate > reminderDate && startDate > currentDate) {
    // alert(event.title);
    deleteReminderDate(event);
  }

  if (reminderDate > currentDate) {
    deleteReminderDate(event);
  }

}

const deleteReminderDate = (event) => {

  console.log(reminders);

  //find and remove the event by id in the events list
  reminders = reminders.filter((reminder) => reminder.id != event.id);

  console.log(reminders);

  //convert reminders to string
  let remindersString = JSON.stringify(reminders);

  //save the reminders list in localStorage
  () => localStorage.setItem("reminders", remindersString);
}
