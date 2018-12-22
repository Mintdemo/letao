/**
 * Created by 54721 on 2018/12/21.
 */
$(function() {

  // 解析地址栏参数, 获取搜索关键字
  var key = getSearch("key");

  // 1. 将地址栏参数赋值给 input
  $('.search_input').val( key );


  // 2. 发送ajax, 获取搜索结果, 进行列表渲染
  render();


  // 3. 点击搜索按钮, 重新发送请求, 进行渲染
  $('.search_btn').click(function() {
    render();
  })

  // 4. 点击排序, 切换的高亮按钮
  //    (1) 如果有 current 类, 切换箭头方向 (改变箭头类名)
  //    (2) 如果没有 current 类, 就给自己加上, 移除其他的
  $('.lt_sort a[data-type]').click(function() {
    if ( $(this).hasClass("current") ) {
      // 有 current 类, 切换箭头 切换的类名  fa-angle-down   fa-angle-up
      $(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
    }
    else {
      // 没有, 添加上类, 并排他
      $(this).addClass("current").siblings().removeClass("current");
    }

    // 要重新渲染
    render();
  })


  // 作用: 获取搜索框的值, 发送请求, 重新渲染列表数据
  function render() {

    // 让 lt_product 显示成加载中的效果
    $('.lt_product').html('<div class="loading"></div>');

    // 参数处理:
    // 三个必传的参数
    var paramsObj = {};
    paramsObj.proName = $('.search_input').val();
    paramsObj.page = 1;
    paramsObj.pageSize = 100;

    // 还有两个可选的参数  price 价格,  num 库存
    // 根据是否有高亮的 a 来决定是否需要排序传参
    var $current = $('.lt_sort a.current');

    if ( $current.length === 1 ) {
      // 说明有高亮的 a, 需要排序
      console.log( "需要排序" )
      // 给后台传的键, 从自定义属性中获取
      var sortName = $current.data("type");      // price

      // 给后台传排序的值, 根据箭头方向判断 fa-angle-down  （1升序，2降序）
      // 有没有fa-angle-down ? 2 : 1;
      var sortValue = $current.find("i").hasClass("fa-angle-down") ? 2 : 1;   // 2

      // 将参数拼接到对象中
      paramsObj[sortName] = sortValue;
    }
    console.log( paramsObj );

    setTimeout(function() {
      $.ajax({
        type: "get",
        url: "/product/queryProduct",
        data: paramsObj,
        success: function( info ) {
          console.log( info )
          // 根据结果, 进行模板引擎渲染
          var htmlStr = template("productTpl", info);
          $('.lt_product').html( htmlStr );
        }
      })
    }, 1000);
  }

})
