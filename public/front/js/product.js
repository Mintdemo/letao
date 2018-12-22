$(function() {
  // 1.获取id
  var id = getSearch('key');
  $.ajax({
    url: '/product/queryProductDetail',
    type: 'get',
    dataType: 'json',
    data: {
      id: id
    },
    success: function(info) {
      console.log(info);
      var htmlStr = template('pro', info);
      $('.lt_main .mui-scroll').html(htmlStr);

      // 自动轮播
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
      });
      // 数字框初始化
      mui('.mui-numbox').numbox();
    }
  });

  // 给尺码注册点击事件
  $('.lt_main').on('click', '.lt_size span', function() {
    var size = $(this).text();
    $(this)
      .addClass('current')
      .siblings()
      .removeClass('current');
  });
  // 给添加购物车注册事件
  $('#addCart').on('click', function() {
    // 获取尺码
    if ($('.lt_size span').hasClass('current')) {
      var size = $(this).text();
    } else {
      mui.toast('请选择尺码');
      return;
    }
    // var size = $('.lt_size span.current').text();
    // 获取num
    var num = $('.num').val();
    $.ajax({
      url: '/cart/addCart',
      type: 'post',
      data: {
        productId: id,
        num: num,
        size: size
      },
      dataType: 'json',
      success: function(info) {
        if (info.error == 400) {
          location.href = 'login.html?retUrl=' + location.href;
        }
        if (info.success) {
          mui.confirm(
            '添加成功',
            '温馨提示',
            ['去购物车', '继续浏览'],
            function(e) {
              if (e.index == 0) {
                location.href = 'cart.html';
              }
            }
          );
        }
      }
    });
  });
});
