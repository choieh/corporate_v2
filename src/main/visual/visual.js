$(document).ready(function () {
  const slideTxt1 = $('.titleTxt');
  const slideTxt2 = $('.subTxt');
  const slidePic1 = $('.leftPic');
  const slidePic2 = $('.rightPic');
  const index = $('.index');
  const prev = $('.prev');
  const next = $('.next');
  let speed = 500;

  init(index);
  init(slideTxt1);
  init(slideTxt2);
  init(slidePic1);
  init(slidePic2);

  prev.on('click', function (e) {
    e.preventDefault();
    slidePrev(index);
    slidePrev(slideTxt1);
    slidePrev(slideTxt2);
    slidePrev(slidePic1);
    slidePrev(slidePic2);
  });

  next.on('click', function (e) {
    e.preventDefault();
    slideNext(index);
    slideNext(slideTxt1);
    slideNext(slideTxt2);
    slideNext(slidePic1);
    slideNext(slidePic2);
  });

  function init(el) {
    let leng = el.children('ul').find('li').length;
    el.children('ul').css({ width: 100 * leng + '%' });
    el.children('ul')
      .find('li')
      .css({ width: 100 / leng + '%' });
    el.children('ul').find('li').last().prependTo(el.children('ul'));
  }

  function slidePrev(el) {
    el.children('ul').animate({ marginLeft: 0 }, speed, function () {
      $(this).css({ marginLeft: '-100%' }); //원위치로 이동
      $(this).children('li').last().prependTo(this);
    });
  }

  function slideNext(el) {
    el.children('ul').animate({ marginLeft: '-200%' }, speed, function () {
      $(this).css({ marginLeft: '-100%' });
      $(this).children('li').first().appendTo(this);
    });
  }
});
