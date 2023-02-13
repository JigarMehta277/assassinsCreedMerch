function toggleMenu() {
  var menu = document.querySelector(".navigation");
  var menuUl = document.querySelector(".menuUl")
  menu.classList.toggle("show-phone");
  menuUl.classList.toggle("show-phone");
}