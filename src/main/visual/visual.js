$(document).ready(function () {
  const swiper = new Swiper('#visual', {
    loop: true,
    effect: 'fade',
    speed: 800,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  //swiper events
  swiper.on('slideChangeTransitionStart', function () {
    anime({
      targets: '.swiper-slide-active .desc .el',
      translateY: [50, 0],
      delay: anime.stagger(150, { start: 700 }),
      opacity: [0, 1],
      easing: 'easeInOutQuart',
    });

    anime({
      targets: '.swiper-slide-active .index',
      translateY: [-50, 0],
      delay: 1200,
      opacity: [0, 1],
      easing: 'easeInOutQuart',
    });

    anime({
      targets: '.swiper-slide-active .leftPic img',
      scale: [1.2, 1],
      delay: 1500,
      opacity: [0, 1],
      easing: 'easeInOutQuart',
    });

    anime({
      targets: '.swiper-slide-active .rightPic img',
      scale: [1.2, 1],
      delay: 1500,
      opacity: [0, 1],
      easing: 'easeInOutQuart',
    });

    anime({
      targets: '.swiper-button-next',
      translateX: [50, 0],
      scale: [0.3, 0.5],
      delay: 2000,
      opacity: [0, 1],
      easing: 'easeInOutQuart',
    });

    anime({
      targets: '.swiper-button-prev',
      translateX: [-50, 0],
      scale: [0.3, 0.5],
      delay: 2000,
      opacity: [0, 1],
      easing: 'easeInOutQuart',
    });
  });

  //load animation
  anime({
    targets: '.swiper-slide-active .desc .el',
    translateY: [50, 0],
    delay: anime.stagger(150, { start: 700 }),
    opacity: [0, 1],
    easing: 'easeInOutQuart',
  });

  anime({
    targets: '.swiper-slide-active .index',
    translateY: [-50, 0],
    delay: 1200,
    opacity: [0, 1],
    easing: 'easeInOutQuart',
  });

  anime({
    targets: '.swiper-slide-active .leftPic img',
    scale: [1.2, 1],
    delay: 1500,
    opacity: [0, 1],
    easing: 'easeInOutQuart',
  });

  anime({
    targets: '.swiper-slide-active .rightPic img',
    scale: [1.2, 1],
    delay: 1500,
    opacity: [0, 1],
    easing: 'easeInOutQuart',
  });

  anime({
    targets: ' .swiper-button-next',
    translateX: [50, 0],
    scale: [0.3, 0.5],
    delay: 2000,
    opacity: [0, 1],
    easing: 'easeInOutQuart',
  });

  anime({
    targets: ' .swiper-button-prev',
    translateX: [-50, 0],
    scale: [0.3, 0.5],
    delay: 2000,
    opacity: [0, 1],
    easing: 'easeInOutQuart',
  });

  //sliding text event
  slidingTxt('.swiper-slide-active .titText1', 500, 0);
  slidingTxt('.swiper-slide-active .titText2', 500, 200);

  //swiper change -> sliding Text event
  swiper.on('slideChangeTransitionStart', function () {
    slidingTxt('.swiper-slide-active .titText1', 500, 0);
    slidingTxt('.swiper-slide-active .titText2', 500, 200);
  });

  //sliding function
  function slidingTxt(el, speed, delay) {
    let ease = 'easeInExpo';
    $(el).find('h2').css({ opacity: 0 });
    let bgColor = $(el).attr('data-color');
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
          $(this).siblings('h2').css({ opacity: 1 });
          $(this)
            .stop()
            .animate({ left: '100%' }, speed, ease, function () {
              $(this).remove();
            });
        }
      );
  }
});
