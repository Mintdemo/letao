/**
 * Created by 54721 on 2018/12/20.
 */
$(function() {


  // 一进入页面, 发送ajax请求, 请求左侧一级分类的数据, 完成渲染
  $.ajax({
    type: "get",
    url: "/category/queryTopCategory",
    dataType: "json",
    success: function( info ) {
      console.log( info )
      var htmlStr = template("leftTpl", info);
      $('.lt_category_left ul').html( htmlStr );

      // 调用方法, 默认渲染第一个一级分类 对应的 二级分类
      renderById( info.rows[0].id );
    }
  });


  // 添加一级分类切换效果 (二级联动效果)
  $('.lt_category_left ul').on("click", "a", function() {

    // 1. 切换效果, 给自己加上 current 类, 移除其他 a 的current类
    $('.lt_category_left ul a').removeClass("current");  // 先去掉所有a的 current  排他
    $(this).addClass("current");  // 再自己加上

    // 2. 渲染二级分类
    // 获取 存储的 一级分类 id
    var id = $(this).data("id");
    renderById( id );
  })


  // 根据 一级分类的 id 完成 二级分类的 渲染
  function renderById( id ) {
    // 发送 ajax, 获取二级分类数据, 进行模板渲染
    $.ajax({
      type: "get",
      url: "/category/querySecondCategory",
      data: {
        id: id
      },
      dataType: "json",
      success: function( info ) {
        console.log( info )
        var htmlStr = template("rightTpl", info);
        $('.lt_category_right ul').html( htmlStr );
      }
    })
  }




})

