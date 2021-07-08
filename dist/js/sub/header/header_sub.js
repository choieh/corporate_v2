$(document).ready(function () {
  const menuBtn = document.querySelector('.btnCall');
  const menuMo = document.querySelector('.menuMo');

  menuBtn.addEventListener('click', (e) => {
    e.preventDefault();

    let isOn = menuMo.classList.contains('on');

    menuBtn.classList.toggle('on');
    menuMo.classList.toggle('on');

    if (!isOn) {
      $('body').css({ overflow: 'hidden' });
    } else {
      $('body').css({ overflow: 'visible' });
    }
  });
});
