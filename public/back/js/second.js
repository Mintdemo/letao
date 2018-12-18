$(function() {
  // 1.发送ajax请求获取数据渲染页面
  var cpage = 1;
  render();
  function render() {
    $.ajax({
      url: '/category/querySecondCategoryPaging',
      type: 'get',
      dataType: 'json',
      data: {
        page: cpage,
        pageSize: 5
      },
      success: function(info) {
        // console.log(info);
        var tmpStr = template('tmp', info);
        $('tbody').html(tmpStr);
        // 实例化分页
        $('#pagintor').bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          onPageClicked: function(event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            cpage = page;
            render();
          }
        });
      }
    });
  }
  // 2.添加功能
  $('#add').on('click', function() {
    $('#myAdd').modal('show');
    // 发送ajax请求 获取一级数据
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      dataType: 'json',
      data: {
        page: 1,
        pageSize: 100
      },
      success: function(info) {
        console.log(info);
        var tepStr = template('downtmp', info);
        $('.menu').html(tepStr);
      }
    });
  });
  // 3.给所有的a注册点击事件
  $('.menu').on('click', '.cate', function() {
    var text = $(this).text();
    $('.txtcate').text(text);
  });
  // 3.添加表单校验
  $('#drop').bootstrapValidator({
    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //3. 指定校验字段
    fields: {
      //校验用户名，对应name表单的name属性
      categoryId: {
        validators: {
          //不能为空
          notEmpty: {
            message: '分类不能为空'
          }
        }
      },
      brandName: {
        validators: {
          //不能为空
          notEmpty: {
            message: '分类不能为空'
          }
        }
      },
      brandLogo: {
        validators: {
          //不能为空
          notEmpty: {
            message: '图片不能为空'
          }
        }
      }
    }
  });
  // 4. 调用fileupload方法完成文件上传初始化
  $('#fileupload').fileupload({
    dataType: 'json',
    // e 事件对象, data 数据
    // 文件上传完成时, 响应回来时调用 (类似于success)
    done: function(e, data) {
      console.log(data);
      var result = data.result; // 后台返回的对象
      var picUrl = result.picAddr; // 图片路径
      console.log(picUrl);

      // 设置给 img src
      $('#imgBox img').attr('src', picUrl);
    }
  });
  // 5.验证完毕注册事件提交
