$(document).ready(function () {
  callData({
    target: '.videoList',
    key: 'AIzaSyDmpnomFJJs_AwW4QBAxL1aA6iwe4pP0kg',
    count: 8,
    playlist: 'PLZaa9fHTPwr_AzkOnOujYPoKeDjz1qnmM',
  });

  $('body').on('click', '.videoList article', function (e) {
    e.preventDefault();
    console.log(this);

    let vidSrc = $(this).find('.pic').attr('href');

    createPop(vidSrc);
  });

  $('body').on('click', '.videoPop span', function () {
    $(this)
      .parent()
      .fadeOut(400, function () {
        $(this).find('iframe').remove();
      });
  });

  function createPop(vidSrc) {
    $('.videoPop').fadeIn();
    $('.videoPop .inner').append(
      $('<iframe>').attr({
        src: 'https://www.youtube.com/embed/' + vidSrc,
        frameborder: 0,
        allowfullscreen: true,
        width: '80%',
        height: '80%',
      })
    );
  }

  function callData(opt) {
    $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/playlistItems',
      dataType: 'jsonp',
      data: {
        part: 'snippet',
        key: opt.key, //api키값
        maxResults: opt.count, //호출 갯수
        playlistId: opt.playlist, // 플레이리스트 아이디
      },
    })
      .success((data) => {
        console.log(data.items);
        let items = data.items;
        let tags = '';

        $(items).each((index, data) => {
          console.log(data.snippet.resourceId.videoId);
          let title = data.snippet.title;
          let desc = data.snippet.description;
          let date = data.snippet.publishedAt;
          date = date.split('T')[0];
          if (desc.length > 50) {
            desc = desc.substr(0, 50) + '...';
          }

          tags += `
          <article>
          <a href="${data.snippet.resourceId.videoId}" class="pic">
            <img src="${data.snippet.thumbnails.high.url}">
            <div class='hoverLine'>
              <div class="top"></div>
              <div class="left"></div>
              <div class="right"></div>
              <div class="bottom"></div>
            </div>
          </a>
          <div class="txt">
            <h3>${title}</h3>
            <p class='desc'>${desc}</p>
            <p class='date'>${date}</p>
            <a href="#">+</a>
          </div>
        </article>
        `;
        });
        $(opt.target).append(tags);
      })

      .error((err) => {
        console.log(err);
      });
  }
});
