$(document).ready(function () {
  let helpArr = [];
  const help = $('.help_txt > p');
  const input = $('input, textarea');

  setArr(help, helpArr);
  init();

  $(input).on('focusin', function () {
    let aClass = $(this).closest('article').attr('class');
    let i = $(this).closest('article').index();

    $(help).css({ display: 'block' });
    $(help).siblings('h2').show();
    $(help).siblings('.default').hide();

    if (aClass == helpArr[i - 1]) {
      $(help).removeClass('on');
      $(help)
        .eq(i - 1)
        .addClass('on')
        .show();
    }
  });

  $('.input_btn > input').on('click', function () {
    init();
  });

  function init() {
    $(help).hide();
    $(help).siblings('.default').show();
    $(help).removeClass('on');
    $(help).siblings('h2').hide();
  }

  function setArr(el, arr) {
    $(el).each(function (index, data) {
      arr.push($(data).attr('class'));
    });
  }
});
