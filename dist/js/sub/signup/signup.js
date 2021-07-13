$(document).ready(function () {
  $("input[type='submit']").on('click', function (e) {
    if (!isCheck('agree')) e.preventDefault();
    if (!isTxt('userid')) e.preventDefault();
    if (!pwdLive() || !pwdMatch('pwd1', 'pwd2')) {
      e.preventDefault();
    }
    if (!isTxt('email1') || !isSelect('email2')) {
      e.preventDefault();
    }
    if (!isCheck('gender')) e.preventDefault();
    if (!isTxt('message', 10)) e.preventDefault();
  });

  txtKeyUp('userid');
  txtKeyUp('message', 10);

  $("input[name='pwd1']").keyup(function () {
    pwdLive();
  });

  $("input[name='pwd2']").keyup(function () {
    pwdMatch('pwd1', 'pwd2');
  });

  //function ---------------------------------------
  //텍스트 인증
  function isTxt(name, leng) {
    if (leng == undefined) leng = 5;
    let txt = $('[name=' + name + ']').val();
    if (txt == '') {
      $('[name=' + name + ']')
        .siblings('p')
        .show();
      return false;
    } else {
      if (txt.length >= leng) {
        $('[name=' + name + ']')
          .siblings('p')
          .hide();
        return true;
      } else {
        $('[name=' + name + ']')
          .siblings('p')
          .show();
        return false;
      }
    }
  }

  //텍스트 실시간
  function txtKeyUp(name, leng) {
    if (leng == undefined) leng = 5;
    $('[name=' + name + ']').keyup(function () {
      isTxt(name, leng);
    });
  }

  //라디오버튼 인증
  function isCheck(name) {
    let isCheck = $('input[name=' + name + ']').is(':checked');

    if (isCheck) {
      $('input[name=' + name + ']')
        .parent()
        .siblings('p')
        .hide();
      return true;
    } else {
      $('input[name=' + name + ']')
        .parent()
        .siblings('p')
        .show();
      return false;
    }
  }

  //셀렉트 인증
  function isSelect(name) {
    let sel = $('select[name=' + name + ']')
      .children('option:selected')
      .val();

    if (sel == '') {
      $('select[name=' + name + ']')
        .siblings('p')
        .show();
      return false;
    } else {
      $('select[name=' + name + ']')
        .siblings('p')
        .hide();
      return true;
    }
  }

  //비밀번호 실시간 유효성 검사
  function pwdLive() {
    let $pwd1 = $("input[name='pwd1']");
    let $pwd2 = $("input[name='pwd2']");
    let pwd1 = $pwd1.val();
    let i = 0;

    let num = /[0-9]/;
    let eng = /[a-zA-Z]/;
    let spc = /[~!#$%^&*]/;

    //0글자일때
    if (pwd1.length == 0) {
      $pwd1.siblings('span').removeClass('true error');
      $pwd1.siblings('p').show();
      $pwd2.siblings('p').show();
      return false;
    } else {
      //5글자이상
      if (pwd1.length >= 5) {
        i++;
        $pwd1.siblings('.leng').removeClass('error');
        $pwd1.siblings('.leng').addClass('true');
      } else {
        $pwd1.siblings('.leng').removeClass('true');
        $pwd1.siblings('.leng').addClass('error');
      }
      //숫자포함
      if (num.test(pwd1)) {
        i++;
        $pwd1.siblings('.num').removeClass('error');
        $pwd1.siblings('.num').addClass('true');
      } else {
        $pwd1.siblings('.num').removeClass('true');
        $pwd1.siblings('.num').addClass('error');
      }
      //영문자
      if (eng.test(pwd1)) {
        i++;
        $pwd1.siblings('.eng').removeClass('error');
        $pwd1.siblings('.eng').addClass('true');
      } else {
        $pwd1.siblings('.eng').removeClass('true');
        $pwd1.siblings('.eng').addClass('error');
      }
      //특수문자
      if (spc.test(pwd1)) {
        i++;
        $pwd1.siblings('.spc').removeClass('error');
        $pwd1.siblings('.spc').addClass('true');
      } else {
        $pwd1.siblings('.spc').removeClass('true');
        $pwd1.siblings('.spc').addClass('error');
      }
      if (i == 4) {
        $pwd1.siblings('p').hide();
        return true;
      } else {
        return false;
      }
    }
  }

  //비밀번호 실시간 일치 확인
  function pwdMatch(name1, name2) {
    let $pwd1 = $('input[name=' + name1 + ']');
    let $pwd2 = $('input[name=' + name2 + ']');
    let pwd1 = $pwd1.val();
    let pwd2 = $pwd2.val();
    //일치
    if (pwdLive() == true && pwd1 == pwd2) {
      $pwd2.siblings('p').hide();
      return true;
    } else {
      $pwd2.siblings('p').show();
      return false;
    }
  }
});
