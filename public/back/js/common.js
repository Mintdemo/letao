// 需求：在第一个ajax发送的时候,开启进度条
//       在全部的ajax回来的时候,关闭进度条
// 需要用到 ：AJax全局事件
// 1. login.index 引包  js css
// 2. 全局监听 ajax
$(document).on('ajaxStart', function() {
  // 第一个ajax 发送时, 开启进度条
  NProgress.start();
});
// 注册所有Ajax请求完成时要调用的处理程序
$(document).on('ajaxStop', function() {
  setTimeout(function(param) {
    NProgress.done();
  }, 3000);
});

$(function() {
  // 1.点击 侧边栏切换显示与隐藏 sildedown
  $('.nav_tog').on('click', function() {
    $('.child').slideToggle();
  });
  // 2.点击左侧icon  隐藏左边导航栏
  $('.icon_left').on('click', function() {
    $('aside').toggleClass('current');
    $('.lt_top').toggleClass('current');
    $('.main').toggleClass('current');
  });

  // 3.点击退出 弹出模态框
  $('.icon_right').on('click', function() {
    $('#myModal').modal('show');
  });

  // 退出两种方式
  // 1. 发ajax让后台, 销毁当前用户的登录状态, 实现退出   (推荐)
  // 2. 清除浏览器缓存, 将cookie清空, 本地存储的 sessionId 也没了
  // 给退出按钮, 添加点击事件, 需要在退出时, 销毁当前用户的登录状态

  // 需求：点击退出 销毁用户状态
  $('#exit').on('click', function() {
    $.ajax({
      url: '/employee/employeeLogout',
      type: 'get',
      dataType: 'json',
      success: function(info) {
        if (info.success) {
          // 退出成功 跳转到登录页面
          location.href = 'login.html';
        }
      }
    });
  });
});
