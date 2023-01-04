// DATES AND TIME FROM SEPARATE PARAMETERS ////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getFullDate_WithoutTimezone_TimezonOffsetMethod_FromParameters(year, month, day, minute, hour, second) {
  let initDate;
  if (hour && minute && second) {
    initDate = new Date(year, month, day, minute, hour, second);
  } else initDate = new Date(year, month, day);

  return new Date(initDate.getTime() + Math.abs(initDate.getTimezoneOffset() * 60000));
}
function getFullDate_WithoutTimezone_UTCMethod_FromParameters(year, month, day, minute, hour, second) {
  let initDate;
  if (hour && minute && second) {
    initDate = new Date(year, month, day, minute, hour, second);
  } else initDate = new Date(year, month, day);

  return new Date(Date.UTC(initDate.getFullYear(), initDate.getMonth(), initDate.getDate(), initDate.getHours(), initDate.getMinutes()));
}

// DATES AND TIME FROM DATE ////////////////////////////////////////////////////////////////////////////////////////////////////////////

// FULL SIMPLE DATETIME

function getFullDate(date) {
  return new Date(date);
}
function getFullDateTime(date, hour, minute, second) {
  return new Date(`${date}T${hour.toString().length === 1 ? "0" + hour : hour}:${minute === 00 ? "00" : minute}:${second === 00 ? "00" : second}`);
}

function getFullTime(hour, minute, second) {
  return `${hour.toString().length === 1 ? "0" + hour : hour}:${minute.toString().length === 1 ? "0" + minute : minute}:${second.toString().length === 1 ? "0" + second : second}`;
}

// RECOVER DATETIME FROM INPUT VALUES
function getFullDate_WithoutTimezone_ISOMethod(date) {
  return new Date(new Date(date).toISOString().slice(0, -1));
}

// ADD HOURS TO DATETIME
function addHours_toDate(date, hours) {
  return new Date(date.setHours(date.getHours() + hours));
}

// STORAGE IN JSON FORMAT
function getFullDate_WithoutTimezone_UTCMethod(date) {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes()));
}

// SET DATE INPUTS
function getDate_toString_ISOMethod(date) {
  return new Date(date).toISOString().split('T')[0];
}

// PRINT IN DISPLAY

function getDateWithoutTime(date) {
  return new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', timeZone: 'America/New_York' }).formatToParts(date);
}
function getStringLocaleDate(date, lang) {
  return Intl.DateTimeFormat(lang, { dateStyle: 'full' }).format(date);
}

// STORAGE ////////////////////////////////////////////////////////////////////////////////////////////////////////////

function saveStorage(key, el) {
  localStorage.setItem(key, JSON.stringify(el));
}
function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
function removeStorage(key) {
  localStorage.removeItem(key);
}
function reloadEvents(event) {
  allEvents.push(event);
}
function reloadReminderEvents(event) {
  reminders.push(event);
}

// OTHER METHODS ////////////////////////////////////////////////////////////////////////////////////////////////////////////

function arrayRemove(arr, id) {
  return arr.filter(event => {
    return event.id !== id;
  });
}

function getEmptyDaysInMonth(year, month, day, lang) {
  const date = getFullDate_WithoutTimezone_TimezonOffsetMethod_FromParameters(year, month, day);
  const dateStr = date.toLocaleDateString(lang, {
    weekday: "long",
  });
  return weekDays.indexOf(dateStr);
}

function changeStyles(action, element, nav) {
  if (action === 'on') {
    document.getElementById(nav).style.opacity = '1';
    document.getElementById(nav).style.height = 'auto';
    document.getElementById(nav).style.lineHeight = 'inherit';
    document.getElementById(nav).style.overflow = 'visible';
  } else {
    element.style.opacity = '0';
    element.style.height = '0';
    element.style.lineHeight = '0';
    element.style.overflow = 'hidden';
  }
}

function setVisibility(action, element) {
  element.style.visibility = action;
}