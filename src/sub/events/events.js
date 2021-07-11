$(document).ready(function () {
  const url = 'data/board.json';
  const frame = $('.community .event table');
  const resultData = callData(url);

  createTable(frame, resultData);

  function callData(url) {
    let result;

    $.ajax({
      url: url,
      dataType: 'json',
      async: false,
    })
      .success((data) => {
        result = data.board;
      })
      .error((err) => {
        console.error(err);
      });

    return result;
  }

  function createTable(target, data) {
    target.append(
      $("<caption class='sr-only'>").text('이벤트 게시판'),
      $('<tbody>')
    );

    for (let i = 0; i < data.length; i++) {
      target
        .find('tbody')
        .append(
          $('<tr>').append(
            $('<td>').text(data[i].date),
            $('<td>').append(
              $('<a>').attr('href', '#').text(data[i].title),
              $('<p>').text(data[i].description)
            ),
            $('<td>').append(
              $('<p>').text(data[i].writer),
              $('<p class="pay">').text(data[i].pay)
            )
          )
        );
    }
  }
});
