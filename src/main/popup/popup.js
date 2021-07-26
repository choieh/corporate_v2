$(document).ready(function () {
  //load -> create popup
  createPop({
    name: '#popup',
    data_url: 'data/pop.html',
    isMask: true,
    isCk: true,
    custom_css: {
      width: 500,
      backgroundColor: '#fff',
      padding: 40,
      boxSizing: 'border-box',
      color: '#fff',
    },
  });

  //cookie true/false
  let isCookie = document.cookie.indexOf('popup=done');

  if (isCookie == -1) {
    console.log('쿠키 없음');
    $('#popup').show();
    $('.mask').show();
  } else {
    console.log('쿠키 있음');
    $('#popup').hide();
    $('.mask').hide();
  }

  //popup close click
  $('body').on('click', '#popup .close', function (e) {
    e.preventDefault();
    removePop(this);
  });

  //remove Popup
  function removePop(el) {
    let isChecked = $(el).prev().find('input[type=checkbox]').is(':checked');
    const id_name = $(el).parent().attr('id');

    //체크박스 체크 여부에 따라 쿠키 생성
    if (isChecked) setCookie(id_name, 'done', 1);

    $(el)
      .parent()
      .fadeOut(500, function () {
        $(this).remove();
      });

    $('.mask').fadeOut(500, function () {
      $(this).remove();
    });
  }

  //create Popup
  function createPop(opt) {
    //default option
    const def_opt = {
      name: 'popup',
      data_url: 'data/error.html',
      isMask: false,
      isCk: false,
      custom_css: undefined,
    };

    var opt = Object.assign({}, def_opt, opt);

    if (opt.isMask) {
      $('body').append(
        $("<div class='mask'>") //mask div 생성
          .css({
            width: '100%',
            height: '100vh',
            backgroundColor: 'rgba(0,0,0,0.3)',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: 11,
            display: 'none',
          })
          .fadeIn()
      );
    }

    //result css
    let result_css;

    //default css
    const def_css = {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      display: 'none',
      zIndex: 12,
    };

    if (opt.custom_css == undefined) {
      result_css = def_css;
    } else {
      result_css = Object.assign({}, def_css, opt.custom_css);
    }

    let id_name = opt.name.split('#')[1];

    $('body').append(
      $('<aside>')
        .attr('id', id_name)
        .css(result_css)
        .append(
          $("<div class='popContent'>"),
          $("<div class='wrap'>").append(
            $("<input type='checkbox' id='check'>"),
            $("<label for='check'>").text('오늘 하루 그만 보기')
          ),
          $("<a href='#'>").addClass('close').text('Close')
        )
        .fadeIn()
    );

    //check box
    if (!opt.isCk) $(opt.name).find('.wrap').hide();

    $.ajax({
      url: opt.data_url,
    })
      .success(function (data) {
        console.log(data);
        $(opt.name).find('.popContent').html(data);
      })

      .error(function (err) {
        console.error('err');
      });
  }

  function setCookie(cookieName, cookieValue, time) {
    let today = new Date();
    let date = today.getDate();

    today.setDate(date + time);
    let duedate = today.toGMTString();
    document.cookie =
      cookieName + '=' + cookieValue + '; path=/; expires =' + duedate;
  }
});
