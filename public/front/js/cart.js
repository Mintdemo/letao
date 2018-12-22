$(function() {
  render();
  function render() {
    // 渲染页面
    $.ajax({
      type: 'get',
      url: '/cart/queryCart',
      dataType: 'json',
      success: function(info) {
        console.log(info);
        if (info.error === 400) {
          // 用户未登录, 拦截到登录页, 登录成功之后, 跳回来,
          // 需要将当前页的地址传过去
          location.href = 'login.html?retUrl=' + location.href;
          return;
        }
        var htmlStr = template('proTpl', { list: info });
        $('.mui-table-view').html(htmlStr);
      }
    });
  }
  // 删除功能 btn_delete
  $('.mui-table-view').on('click', '.btn_delete', function() {
    var id = $(this).data('id');
    $.ajax({
      type: 'get',
      url: '/cart/deleteCart',
      data: {
        id: [id]
      },
      dataType: 'json',
      success: function(info) {
        if (info.success) {
          render();
        }
      }
    });
  });
});
