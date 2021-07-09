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

  $('#gnb >li').on('mouseenter', function () {
    $(this).find('.sub').show();
    $(this).children('a').addClass('on');
  });

  $('#gnb >li').on('mouseleave', function () {
    $(this).find('.sub').hide();
    $(this).children('a').removeClass('on');
  });

  $('#gnb > li').each(function (index) {
    $('#gnb > li')
      .eq(index)
      .find('a')
      .first()
      .on('focusin', function () {
        $('#gnb > li').eq(index).find('.sub').show();
      });

    $('#gnb > li')
      .eq(index)
      .find('a')
      .last()
      .on('focusout', function () {
        $('#gnb > li').eq(index).find('.sub').hide();
      });
  });
});
