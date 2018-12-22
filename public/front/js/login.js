$(function() {
  // 获取到当前验证码发送ajax判断是否正确
  // 如果正确 跳转到商品页
  // 如果错误 提示totas
  $('#btnCfr').on('click', function() {
    var uname = $('[ type="text"]')
      .val()
      .trim();
    var upass = $('[type="password"]')
      .val()
      .trim();
    if (uname == '' && upass == '') {
      mui.toast('用户名或密码不能为空');
      return;
    }
    $.ajax({
      type: 'post',
      url: '/user/login',
      data: {
        username: uname,
        password: upass
      },
      dataType: 'json',
      success: function(info) {
        if (info.error === 403) {
          mui.toast('用户名或者密码错误');
          return;
        }
        if (info.success) {
          if (location.search.indexOf('retUrl') != -1) {
            var retUrl = location.search.replace('?retUrl=', '');
            console.log(retUrl);
            location.href = retUrl;
          } else {
            location.href = 'user.html';
          }
        }
      }
    });
  });
});
