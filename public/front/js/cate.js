$(function() {
  // 1.发送ajax请求 渲染左侧左侧的数据
  $.ajax({
    url: '/category/queryTopCategory',
    type: 'get',
    dataType: 'json',
    success: function(info) {
      console.log(info);
      var htmlStr = template('tmp', info);
      $('.cate_left ul').html(htmlStr);
    }
  });
  // 2.发送ajax请求右侧数据
  render(1);
  function render(id) {
    $.ajax({
      url: '/category/querySecondCategory',
      type: 'get',
      dataType: 'json',
      data: {
        id: id
      },
      success: function(info) {
        console.log(info);

        var htmlStr = template('tmpLogos', info);
        console.log(htmlStr);
        $('.cate_right ul').html(htmlStr);
      }
    });
  }

  $('.cate_left').on('click', 'a', function() {
    // 1. 给当前的a添加样式
    $('.cate_left')
      .find('a')
      .removeClass('current');
    $(this).addClass('current');
    // 2. 获取当前a的id 发送ajax请求
    var id = $(this).data('id');
    // 3.发送ajax请求获取分页数据
    render(id);
  });
});
