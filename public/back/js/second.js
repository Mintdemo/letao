$(function() {
  // 1.渲染
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
  // 2.添加功能 -- 分类渲染
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
    $('[name="categoryId"]').val($(this).data('id'));
    // 每次value赋值以后更新隐藏域的状态
    $('#form')
      .data('bootstrapValidator')
      .updateStatus('categoryId', 'VALID');
  });

  // 4.表单校验
  $('#form').bootstrapValidator({
    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 校验的字段
    fields: {
      // 品牌名称
      brandName: {
        //校验规则
        validators: {
          notEmpty: {
            message: '请输入二级分类名称'
          }
        }
      },
      // 一级分类的id
      categoryId: {
        validators: {
          notEmpty: {
            message: '请选择一级分类'
          }
        }
      },
      // 图片的地址
      brandLogo: {
        validators: {
          notEmpty: {
            message: '请上传图片'
          }
        }
      }
    }
  });
  // 4. 调用fileupload方法完成文件上传初始化
  $('#fileupload').fileupload({
    dataType: 'json',
    url: '/category/addSecondCategoryPic',
    // e 事件对象, data 数据
    // 文件上传完成时, 响应回来时调用 (类似于success)
    done: function(e, data) {
      console.log(data);
      var result = data.result; // 后台返回的对象
      var picUrl = result.picAddr; // 图片路径
      console.log(picUrl);
      $('#imgBox img').attr('src', picUrl);
      // 把路径给隐藏域
      $('[name="brandLogo"]').val(picUrl);
      // 路径赋值给隐藏域以后 手动更新状态
      $('#form')
        .data('bootstrapValidator')
        .updateStatus('brandLogo', 'VALID');
    }
  });
  // 5.提交
  $('#form').on('success.form.bv', function(e) {
    e.preventDefault();
    $.ajax({
      url: '/category/addSecondCategory',
      type: 'post',
      dataType: 'json',
      data: $('#form').serialize(),
      success: function(info) {
        if (info.success) {
          $('#myAdd').modal('hide');
          cpage = 1;
          render();
          // 清空表单校验以及状态
          $('#form')
            .data('bootstrapValidator')
            .resetForm(true);
          // 手动清除 下拉菜单和图片框
          $('.txtcate').text('请选择一级分类');
          $('#imgBox img').attr('src', './images//none.png');
        }
      }
    });
  });
});
