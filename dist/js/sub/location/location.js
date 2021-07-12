$(document).ready(function () {
  var container = document.querySelector('#map');
  var branch_btns = document.querySelectorAll('.branch li');
  var active_btn = document.querySelector('.branch li.on');
  var active_index = active_btn.getAttribute('data-index');

  var t_on = document.querySelectorAll('.traffic li')[0];
  var t_off = document.querySelectorAll('.traffic li')[1];

  var drag = true;
  var zoom = false;

  var options = {
    center: new kakao.maps.LatLng(37.52614981193943, 127.04202745394979),
    level: 3,
  };

  //marker info
  var markerOptions = [
    {
      title: 'PLACE 1',
      latlng: new kakao.maps.LatLng(37.52614981193943, 127.04202745394979),
      imgSrc: 'img/marker1.png',
      imgSize: new kakao.maps.Size(80, 120),
      imgPos: { offset: new kakao.maps.Point(40, 120) },
      button: branch_btns[0],
    },
    {
      title: 'PLACE 2',
      latlng: new kakao.maps.LatLng(37.51275843105193, 127.10165092665869),
      imgSrc: 'img/marker2.png',
      imgSize: new kakao.maps.Size(80, 120),
      imgPos: { offset: new kakao.maps.Point(40, 120) },
      button: branch_btns[1],
    },
    {
      title: 'PLACE 3',
      latlng: new kakao.maps.LatLng(37.50856132395596, 127.05979730785786),
      imgSrc: 'img/marker3.png',
      imgSize: new kakao.maps.Size(80, 120),
      imgPos: { offset: new kakao.maps.Point(40, 120) },
      button: branch_btns[2],
    },
  ];

  //create map
  var map = new kakao.maps.Map(container, options);
  var mapTypeControl = new kakao.maps.MapTypeControl();
  map.addControl(mapTypeControl, kakao.maps.ControlPosition.BOTTOMRIGHT);

  for (var i = 0; i < markerOptions.length; i++) {
    new kakao.maps.Marker({
      map: map,
      position: markerOptions[i].latlng,
      title: markerOptions[i].title,
      image: new kakao.maps.MarkerImage(
        markerOptions[i].imgSrc,
        markerOptions[i].imgSize,
        markerOptions[i].imgPos
      ),
    });

    (function (index) {
      markerOptions[index].button.onclick = function (e) {
        e.preventDefault();

        for (var k = 0; k < markerOptions.length; k++) {
          markerOptions[k].button.classList.remove('on');
        }
        markerOptions[index].button.classList.add('on');
        moveTo(markerOptions[index].latlng);
      };
    })(i);
  }

  function moveTo(target) {
    var moveLatLon = target;
    map.setCenter(moveLatLon);
  }

  //browser resize(keep center)
  window.onresize = function () {
    map.setCenter(markerOptions[active_index].latlng);
  };

  //traffic on, off
  t_on.addEventListener('click', function (e) {
    e.preventDefault();

    map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    t_on.classList.add('on');
    t_off.classList.remove('on');
  });
  t_off.addEventListener('click', function (e) {
    e.preventDefault();
    map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
    t_on.classList.remove('on');
    t_off.classList.add('on');
  });

  //auto drag
  setDraggable(drag);
  function setDraggable(draggable) {
    map.setDraggable(draggable);
  }

  //map zoom
  setZoomable(zoom);
  function setZoomable(zoomable) {
    map.setZoomable(zoomable);
  }
});
