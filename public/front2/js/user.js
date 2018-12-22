/**
 * Created by 54721 on 2018/12/21.
 */

$(function() {


  // 渲染当前用户数据
  $.ajax({
    type: "get",
    url: "/user/queryUserMessage",
    dataType: "json",
    success: function( info ) {
      console.log( info );
      // 根据后台的返回结果, 如果是 error 拦截到登陆页
      if ( info.error === 400 ) {
        // 拦截到登录页
        location.href = "login.html";
        return;
      }

      // 已登录, 返回了用户信息
      var htmlStr = template("userTpl", info);
      $('#userInfo').html( htmlStr )
    }
  });


  // 退出功能
  $('#logout').click(function() {
    $.ajax({
      type: "get",
      url: "/user/logout",
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.success ) {
          location.href = "login.html";
        }
      }
    })
  })

})