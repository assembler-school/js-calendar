var burger = document.querySelector('#burger');

burger.addEventListener('click', showMenu);

function showMenu(e) {
  let menu = document.querySelector("#menu");

  //Clicked outside the box
  if (!menu.contains(e.target) || !burger.contains(e.target)) {
    menu.classList.remove('showMenu');
  }

  menu.classList.toggle('showMenu')
};