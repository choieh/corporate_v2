$(document).ready(function () {
  //scroll
  const section = $('.myScroll');
  const leng = section.length;
  let posArr = [];
  let baseLine = -500;

  //skipNavi
  $('#skipNavi a').on('focusin', function () {
    $(this).addClass('skip');
  });

  $('#skipNavi a').on('focusout', function () {
    $(this).removeClass('skip');
  });

  //scroll
  setPos();

  $(window).on('resize', setPos);

  $(window).on('scroll', function () {
    let scroll = $(this).scrollTop();

    activateMotion(scroll);
  });

  function setPos() {
    posArr = [];
    for (let i = 0; i < leng; i++) {
      posArr.push(section.eq(i).offset().top);
    }
  }

  function activateMotion(scroll) {
    for (let i = 0; i < leng; i++) {
      if (scroll >= posArr[i] + baseLine) {
        section.eq(i).addClass('motion');
      } else {
        if (scroll == 0) {
          section.removeClass('motion');
        }
      }
    }
  }
});
