$(document).ready(function () {
  $(window).on('scroll', function () {
    let currentPos = $(this).scrollTop();
    let isMotion = $('.recentEvent').offset().top;

    if (currentPos >= isMotion - 400) {
      counter('.eventItem .countG', 158, 20);
      counter('.eventItem .countY', 67, 48);
      counter('.eventItem .countE', 85, 40);
    } else {
      if (currentPos == 0) {
        $('.eventItem h4').text('0');
      }
    }
  });

  function counter(el, num, time) {
    const item = $(el);
    let current_num = parseInt(item.text());
    if (current_num >= num) return;

    let timer = setInterval(function () {
      current_num++;

      if (current_num == num) {
        clearInterval(timer);
      }

      item.text(current_num);
    }, time);
  }
});
