// 发送ajax请求 判断用户是否登陆 如果没有登录就拦截
$.ajax({
  url: '/employee/checkRootLogin',
  type: 'get',
  success: function(info) {
    if (info.error == 400) {
      location.href = 'login.html';
    }
  }
});
