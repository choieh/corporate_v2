$(document).ready(function () {
  const url =
    'https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos';
  const key = 'e909cd31b9753400ec2d3b2cb838fc01';
  const user = '193212970@N04';
  const set_id = '72157719573830535';

  $.ajax({
    url: url,
    dataType: 'json',
    data: {
      api_key: key,
      per_page: 14,
      format: 'json',
      nojsoncallback: 1,
      user_id: user,
      photoset_id: set_id,
    },
  })
    //데이터 호출 성공 시 html 구조 생성
    .success(function (data) {
      console.log(data.photoset.photo);
      let imgs = data.photoset.photo;

      $(imgs).each(function (index, data) {
        let tit = data.title;
        let num = index + 1;
        num < 10 ? (num = '0' + num) : (num = num);

        let imgSrc = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_w.jpg`;
        let imgSrcBig = `https://live.staticflickr.com/${data.server}/${data.id}_${data.secret}_z.jpg`;

        let tags = `
        <article>
          <div class="items">
            <span>${num + ' / '}</span>
            <div class="pic" data-src=${imgSrcBig}>
              <img src="${imgSrc}" alt="이미지주소">
            </div>
            <h2>${tit}</h2>
          </div>
        </article>
        `;

        $('#gallery').append(tags);
      });
    })

    .error(function (err) {
      console.log('데이터 불러오기 실패');
    });

  $('body').on('click', '#gallery article .items', function () {
    let imgSrc = $(this).find('.pic').attr('data-src');
    console.log(imgSrc);

    let tags = `
    <aside id="imgPop">
      <div class="pic">
        <img src='${imgSrc}'>
      </div>
      <span>CLOSE</span>
    </aside>
    `;

    $('body').append(tags);
  });

  $('body').on('click', '#imgPop span', function () {
    $(this).parent('#imgPop').remove();
  });
});
