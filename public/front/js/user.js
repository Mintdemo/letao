$(function() {
  // /user/queryUserMessage
  $.ajax({
    type: 'get',
    url: ' /user/queryUserMessage',
    dataType: 'json',
    success: function(info) {
      // 退出成功跳转登录页
      if (info.error === 400) {
        // 拦截到登录页
        location.href = 'login.html';
        return;
      }
      var htmlStr = template('tmp', info);
      $('#userInfo').html(htmlStr);
    }
  });

  // logout
  $('#logout').on('click', function() {
    $.ajax({
      type: 'get',
      url: '/user/logout',
      dataType: 'json',
      success: function(info) {
        // 退出成功跳转登录页
        if (info.success) {
          location.href = 'login.html';
        }
      }
    });
  });
});
