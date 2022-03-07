`#html` `#css` `#js` `#dom` `#localstorage` `#JSON` `#master-in-software-engineering`

## Introduction

<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.2-blue.svg?cacheSeconds=2592000" />
</p>

In this project you will have to create a calendar using the main web fundamentals.

The calendar must be interactive for the users allowing them to create events without refreshing the whole page.


## What are the main goals in this project?

- Improve your knowledge of JavaScript
- Learn to work with the HTML DOM
- Learn to work with localStorage
- Learn and improve your knowledge in logic processes
- Learn to validate forms using Javascript
- Learn to work with JSON format

## Index <!-- omit in toc -->

- [Requirements](#requirements)
- [Repository](#repository)
- [Technologies used](#technologies-used)
- [Project delivery](#project-delivery)
- [Resources](#resources)

## Requirements

- You must develop this project using a single HTML page
- You cannot use third-party libraries
- You must use localStorage to store all the events, this way, if you reload the page, the events will remain stored in the browser
- You must use semantic HTML5 elements for all the contents of the application

## Repository

First of all you must fork this project into your GitHub account.

To create a fork on GitHub is as easy as clicking the “fork” button on the repository page.

<img src="https://docs.github.com/assets/images/help/repository/fork_button.jpg" alt="Fork on GitHub" width='450'>

## Develop a calendar

The development process will be organized in 3 phases:

### Phase 1:

- <b>Header Page</b>
- The header page should contain:
 - A button to add a new event to the calendar which opens a modal window.
 - The modal should:
   - Open when the header button is clicked
   - Have a modal with a transparent background color
   - Have a modal should have a form to create a new event. <b>(read the event details bellow)</b>
   - The modal should also have a button to close it (the modal).
   \
   This will remove the modal from the page when it is clicked
     - The modal can also be closed by clicking on the modal transparent background or by pressing the <b><em>Escape</em></b> key on the keyboard
   - The modal should have a button to <b>Save</b> the new event and also, a button to <b>Cancel</b> this
     - Both buttons will close the modal after the operation is completed
   - Once the event is saved, it will be displayed at the exact date where the calendar was clicked

- <b>Event details</b>
  - <b>Before the event is created, the required fields must be completed by the user. If they are not, the user cannot create that event</b>
  - Title (max length 60 characters, <b>required</b>)
  - Initial Date with time <b>(required)</b>
    - You must check that the date corresponds to one day for the given month
  - Include a checkbox to add an optional end date <b>(optional)</b>
    - If it is checked, it will display a new input to add a date to save the end date of the event
    - This will create an end date for the event. The duration will be the time between the start date and the end date
    - Both dates should be storing the date and time
    - The date should be rendered in the local format of the user, you can use something similar to Intl.dateTimeFormat
  - The Checkbox will set a reminder that let the user know when an event will expire <b>(optional)</b>.
    - If the checkbox is selected it display a select element with the following options:
      - 5 minutes before
      - 10 minutes before
      - 15 minutes before
      - 30 minutes before
      - 1 hour before
    - You must use the <b>setInterval</b> function to check every 10 seconds if the event has a reminder in place and whether the end date ends on the same day and by what time it ends.
    - If the event is expired you should show the event name in a different color. You will also display a warning message on the screen showing the user thata particular event has expired. Details of the event will also be shown.
    - If there is more than one expire event, show all of them together in the warning box
  - Event description (a text box with a max length of 500 characters, <b>optional</b>)
  - Type of event (select, <b>optional</b>)
    - Meeting
    - Personal
    - Study
    - etc

- <b>Calendar</b>

  - The calendar will display the current month (i.e. May)
  - The user can create events at any day of the given month and they should be displayed on the calendar
  - At least, display the event title in the calendar
  - If there is more than one event for a particular day, you should display them below each other
  - The user can see all the details of the event by clicking the event title. This will open a new modal window with all the information.
  - The event details´ modal will also have a button to remove the event from the calendar. When it is clicked, it will remove the event from the calendar
  - The modal can be closed in several ways: with a close button, with the escape key and by clicking on the transparent background that fills the entire screen

### Phase 2:

- All the months for the given year should be rendered when the main page is loaded (Dynamic Rendering)
- When the user wants to create a new event, they must select which month to include it in (this month or any other)
- The day that corresponds with “today” will have a different custom style in the calendar box
- Display a button on each day of the month. This button will only be displayed when the user hovers over on that day.
  - Clicking on this button will open the add new event modal. The day of the month will be pre-selected, so that the modal opens with the date in which the user clicked

### Phase 3:

- Only show one month in the view at the same time
- To change the month create two buttons that the user can click to show the next or previous month
- Create an animation for when the user is swipping between months


## Wireframes

Refer to the samples below for some detailed wireframes. They will allow to better understand the project requirements. You should implement your own style.

<b>Main page</b>:

<a href='https://www.linkpicture.com/view.php?img=LPic6225c2ac221131678791620'><img src='https://www.linkpicture.com/q/JSPicture1.png' type='image'></a>

<b>Add event modal</b>:

<a href='https://www.linkpicture.com/view.php?img=LPic6225c2ac221131678791620'><img src='https://www.linkpicture.com/q/JSPicture2.png' type='image'></a>

## Requirements

- You must develop this project using a single HTML page
- You cannot use third-party libraries
- You must use localStorage to store all the events, this way, if you reload the page, the events will remain stored in the browser
- You must use Git, Github and branches
- When doing a commit, you must follow this best practices:
- https://www.freecodecamp.org/news/writing-good-commit-messages-a-practical-guide/
- <b>You must improve the design of the wireframes we provided, such that it resembles a real calendar</b>
- Every input element and buttons should have a <b>minimum height or height of 44px</b> such that users can interact with them on mobile devices. Except for the checkboxes that should have a size of - - 20x20px with padding or margin around them
- You must use semantic HTML5 elements for all the contents of the application
- You must handle correctly all event listeners that appear or disappear from the screen such as modal windows
- All input elements should have thier label element
- You must use the corresponding input element for each type of data

## Extras 💯

Once the main features have been implemented, you can create, in no particular order, the following extra requirements. Nonetheless, they can be implemented at any stage should you prefer to do so.

<b>It is easier to develop a feature from the beginning than to modify it later.</b>

### Browser compatibility

You should check that everything is compatible with other current browsers, and, as an extra step, it should also be compatible with older browsers.

### Input validation

The validation should be done when the input field loses focus, that is, users type a value, they change focus to another element, then the field validation runs.
- When the user focuses again on the input element with the error, the validation message and any error styles should be removed until the user loses focus on the input element again. If the error is resolved there should be no error message.

### Responsive design

All the screens and steps should be responsive so that they can be used in any device size.

### Accessibility

Modals should have the option to press TAB or SHIFT + TAB to focus elements inside the modal window. This means that if the users are pressing “TAB” or “SHIFT + TAB” keys when a modal window is opened, they should only be able to tab through the elements inside the modal.

### Expired events

Try improving the functionality when checking the events that have expired. In a more efficient way than every 10 seconds

## Project delivery

To evaluate the project you will need the following deliverables:
- Project repository with the source code and the documentation listed below
  - This project has to be forked and send a PR (pull request) to the original repository: 
https://github.com/assembler-institute/js-calendar
  - You have all the instructions in the following link:
https://www.notion.so/Submitting-a-solution-524dab1a71dd4b96903f26385e24cdb6
- A daily log with the main events of the project that happened each day
- A presentation in Google Slides explaining:
  - What lessons you’ve learned during this project
  - What problems have you encountered when developing this project?
  - Explain how you changed roles to develop the project for each phase (screen)


## Resources

- [JavaScript HTML DOM](https://www.w3schools.com/js/js_htmldom.asp)
- [JavaScript Dates](https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Date)
- [LocalStorage](https://developer.mozilla.org/es/docs/Web/API/Window/localStorage)
- [JavaScript Timeout](https://www.w3schools.com/jsref/met_win_settimeout.asp)
