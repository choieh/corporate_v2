$(document).ready(function () {
  const slideTxt1 = $('.titleTxt li');
  const slideTxt2 = $('.subTxt li');
  const slidePic1 = $('.leftPic');
  const slidePic2 = $('.rightPic');
  const count = $('.index li');
  const prev = $('.prev');
  const next = $('.next');
  let speed = 500;

  init(slidePic1);
  init(slidePic2);

  slidingTxt('.titleTxt li .top', 600, 0);
  slidingTxt('.titleTxt li .bottom', 700, 400);

  prev.on('click', function (e) {
    e.preventDefault();
    let index = slidePic2.find('li').attr('data-index');
    console.log(index);
    activation(index);
    slidePrev(slidePic1);
    slidePrev(slidePic2);
  });

  next.on('click', function (e) {
    e.preventDefault();
    let index = slidePic2.find('li').attr('data-index');
    console.log(index);
    activation(index);
    slideNext(slidePic1);
    slideNext(slidePic2);
  });

  function activation(index) {
    if (index == 4) index += 0;
    //sliding text
    slideTxt1.removeClass('on');
    slideTxt1.eq(index).addClass('on');
    slidingTxt('.titleTxt li .top', 600, 0);
    slidingTxt('.titleTxt li .bottom', 700, 400);

    //subtext opacity
    slideTxt2.removeClass('on');
    slideTxt2.eq(index).addClass('on');

    count.removeClass('on');
    count.eq(index).addClass('on');
  }

  function slidingTxt(el, speed, delay) {
    let ease = 'easeInExpo';
    let bgColor = $(el).attr('data-color');

    $(el).find('.true').css({ opacity: 0 });

    $(el).append(
      $("<em class='mask'>").css({
        display: 'block',
        width: '100%',
        height: '100%',
        backgroundColor: bgColor,
        position: 'absolute',
        top: 0,
        left: '-100%',
      })
    );

    $(el)
      .find('.mask')
      .stop()
      .delay(delay)
      .animate(
        {
          left: 0,
        },
        speed,
        ease,
        function () {
          $(this).siblings('.true').css({ opacity: 1 });
          $(this)
            .stop()
            .animate({ left: '100%' }, speed, ease, function () {
              $(this).remove();
            });
        }
      );
  }

  // slide init
  function init(el) {
    let leng = el.children('ul').find('li').length;
    el.children('ul').css({ width: 100 * leng + '%' });
    el.children('ul')
      .find('li')
      .css({ width: 100 / leng + '%' });
    el.children('ul').find('li').last().prependTo(el.children('ul'));
  }

  //prev
  function slidePrev(el) {
    el.children('ul').animate({ marginLeft: 0 }, speed, function () {
      $(this).css({ marginLeft: '-100%' });
      $(this).children('li').last().prependTo(this);
    });
  }
  //next
  function slideNext(el) {
    el.children('ul').animate({ marginLeft: '-200%' }, speed, function () {
      $(this).css({ marginLeft: '-100%' });
      $(this).children('li').first().appendTo(this);
    });
  }
});
