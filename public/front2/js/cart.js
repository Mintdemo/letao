/**
 * Created by 54721 on 2018/12/21.
 */
$(function() {

  // 一进入页面就进行购物车渲染
  render();

  function render() {
    $.ajax({
      type: "get",
      url: "/cart/queryCart",
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.error === 400 ) {
          // 用户未登录, 拦截到登录页, 登录成功之后, 跳回来,
          // 需要将当前页的地址传过去
          location.href = "login.html?retUrl=" + location.href;
          return;
        }

        // 说明已登录, 完成渲染即可, 注意返回的是数组
        var htmlStr = template( "cartTpl", { list: info })
        $('#cartList').html( htmlStr )
      }
    });
  }


  // 删除功能
  // 1. 给删除按钮, 添加点击事件 (事件委托)
  // 2. 获取当前的 id, 发送删除请求
  // 3. 重新渲染
  $('.lt_main').on("click", '.btn_delete', function() {

    var id = $(this).data("id");

    // 发送请求
    $.ajax({
      type: "get",
      url: "/cart/deleteCart",
      data: {
        id: [ id ]
      },
      dataType: "json",
      success: function( info ) {
        console.log( info )
        if ( info.success ) {
          // 重新渲染
          render();
        }
      }

    })

  })


})
