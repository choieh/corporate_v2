$(document).ready(function () {
  const key = 'AIzaSyDmpnomFJJs_AwW4QBAxL1aA6iwe4pP0kg';

  const playId = 'PLZaa9fHTPwr_AzkOnOujYPoKeDjz1qnmM';

  callData(key, playId);

  function callData(key, playId) {
    $.ajax({
      url: 'https://www.googleapis.com/youtube/v3/playlistItems',
      dataType: 'jsonp',
      data: {
        part: 'snippet',
        key: key,
        maxResults: 3,
        playlistId: playId,
      },
    })
      .success(function (data) {
        let items = data.items;
        let tags = '';
        console.log(items);

        $(items).each(function (index, data) {
          tags += `
          <article>
            <a href="youtube.html">
              <div class="txt">
                <h3>${data.snippet.title}</h3>
                <span> <i class="fas fa-play"></i></span>
              </div>
              <div class="pic">
              <img src="${data.snippet.thumbnails.high.url}">
              </div>
            </a>
          </article>
          `;
        });
        $('#card .inner').append(tags);
      })

      .error(function (err) {
        console.log(err);
      });
  }
});
