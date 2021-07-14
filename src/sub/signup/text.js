$(document).ready(function () {
  let helpArr = [];
  const help = $('.help_txt p');
  const input = $('input, textarea');

  setArr(help, helpArr);

  $(input).on('focusin', function () {
    let aClass = $(this).closest('article').attr('class');

    let i = $(this).closest('article').index();

    if (aClass == helpArr[i - 1]) {
      $(help).removeClass('on');
      $(help)
        .eq(i - 1)
        .addClass('on');
    }
  });

  function setArr(el, arr) {
    $(el).each(function (index, data) {
      arr.push($(data).attr('class'));
    });
  }
});
