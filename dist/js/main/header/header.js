$(document).ready(function () {
  const menuBtn = document.querySelector('.btnCall');
  const menuMo = document.querySelector('.menuMo');

  menuBtn.addEventListener('click', (e) => {
    e.preventDefault();
    menuBtn.classList.toggle('on');
    menuMo.classList.toggle('on');
  });
});
