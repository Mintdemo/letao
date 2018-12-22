/**
 * Created by 54721 on 2018/12/21.
 */
$(function() {

  // 1. 获取地址栏传递过来的参数 productId
  var productId = getSearch("productId");

  // 2. 进入页面, 完成渲染
  $.ajax({
    type: "get",
    url: "/product/queryProductDetail",
    data: {
      id: productId
    },
    dataType: "json",
    success: function( info ) {
      console.log( info )
      var htmlStr = template("productTpl", info);
      $('.lt_main .mui-scroll').html( htmlStr );

      // 在轮播图动态渲染完成后, 需要手动初始化
      // 获得slider插件对象
      var gallery = mui('.mui-slider');
      gallery.slider({
        interval: 5000 //自动轮播周期，若为0则不自动播放，默认为0；
      });

      // 数字框手动初始化
      mui('.mui-numbox').numbox()
    }
  });


  // 3. 给尺码添加可选功能
  $('.lt_main').on("click", ".lt_size span", function() {
    // 给尺码添一个 current 类, 并且排他
    $(this).addClass("current").siblings().removeClass("current");
  });


  // 4. 加入购物车功能
  //    (1) 如果未登录, 后台返回 error, 拦截到登陆页
  //    (2) 如果已登录, 后台返回加入购物车的结果
  $('#addCart').click(function() {

    // 获取尺码和数量
    var size = $('.lt_size span.current').text();
    var num = $('.mui-numbox-input').val();

    if ( !size ) {
      mui.toast( "请选择尺码" );
      return;
    }

    // 发送ajax
    $.ajax({
      type: "post",
      url: "/cart/addCart",
      data: {
        productId: productId,
        num: num,
        size: size
      },
      dataType: "json",
      success: function( info ) {
        console.log( info );
        if ( info.error === 400 ) {
          // 未登录, 拦截到登录页, 由于将来登录成功, 需要跳回来
          // 可以将当前页的地址传递过去, 就可以跳回来了
          location.href = "login.html?retUrl=" + location.href;
          return;
        }

        // 说明成功了
        if ( info.success ) {
          // 加入成功, 显示确认框
          mui.confirm( "添加成功", "文星提示", ["去购物车", "继续浏览"], function( e ) {
            if ( e.index === 0 ) {
              location.href = "cart.html";
            }
          })
        }
      }
    })


  })

})
