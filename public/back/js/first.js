$(function() {
  // 1.发送请求获取数据
  var cpage = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      post: 'get',
      dataType: 'json',
      data: {
        page: cpage,
        pageSize: pageSize
      },
      success: function(info) {
        console.log(info);
        var htmlStr = template('cartTmp', info);
        $('tbody').html(htmlStr);

        $('#pagintor').bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          onPageClicked: function(event, originalEvent, type, page) {
            cpage = page;
            render();
          }
        });
      }
    });
  }
  // 功能二：点击添加分类按钮 弹出模态框 向后台发送ajax 请求
  $('#add').on('click', function() {
    $('#myCart').modal('show');
  });

  // 配置表单验证
  // categoryName

  $('#form').bootstrapValidator({
    // 指定图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    // 配置验证项
    fields: {
      categoryName: {
        // 校验规则
        validators: {
          // 非空
          notEmpty: {
            // 提示信息
            message: '请输入一级分类名称'
          }
        }
      }
    }
  });
  // 验证成功注册success.bv 发送ajax请求
  $('#form').on('success.form.bv', function(e) {
    e.preventDefault();
    $.ajax({
      url: '/category/addTopCategory',
      type: 'post',
      dataType: 'json',
      data: $('#form').serialize(),
      success: function(info) {
        if (info.success) {
          $('#myCart').modal('hide');
          // 添加成功后重新渲染第一页
          cpage = 1;
          render();
          // 添加以后清空表单内容 重置表单状态
          $('#form')
            .data('bootstrapValidator')
            .resetForm(true);
        }
      }
    });
  });
});
