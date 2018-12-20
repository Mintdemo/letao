$(function() {
  var cpage = 1;
  var pageSize = 2;
  var picArr = [];
  // 1.渲染页面
  render();
  function render() {
    $.ajax({
      url: '/product/queryProductDetailList',
      type: 'get',
      dataType: 'json',
      data: {
        page: cpage,
        pageSize: pageSize
      },
      success: function(info) {
        var htmlStr = template('tmp', info);
        $('tbody').html(htmlStr);
        // 渲染分页
        // 根据返回的数据, 实现动态渲染分页插件
        $('#paginator').bootstrapPaginator({
          // 版本号
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: info.page,
          // 总页数
          totalPages: Math.ceil(info.total / info.size),
          // 添加页码点击事件
          onPageClicked: function(a, b, c, page) {
            console.log(page);
            // 更新当前页
            cpage = page;
            // 重新渲染
            render();
          }
        });
      }
    });
  }

  // 2.点击添加商品事件
  $('#addpro').on('click', function() {
    $('#myPro').modal('show');

    // 请求分类数据
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      type: 'get',
      data: {
        page: 1,
        pageSize: 50
      },
      dataType: 'json',
      success: function(info) {
        var htmltmp = template('protmp', info);
        $('.cate').html(htmltmp);
      }
    });
  });
  // 3.给a注册点击事件
  $('.cate').on('click', '.catepro', function() {
    $('.txtcate').text($(this).text());
    $('[ name ="brandId"]').val($(this).data('id'));
    $('#addproduct')
      .data('bootstrapValidator')
      .updateStatus('brandId', 'VALID');
  });

  // 4.fileupload上传文件初始化
  $('#fileupload').fileupload({
    dataType: 'json',
    done: function(e, data) {
      var picObj = data.result;
      // 把返回的图片信息进行存储
      picArr.unshift(picObj);
      var picUrl = picObj.picAddr;
      if (picArr.length > 3) {
        // 移除最后一项
        picArr.pop();
        // 移除最后一张图片\
        console.log($('#imgbox img:last-of-type'));

        $('#imgBox img:last-of-type').remove();
      }
      // 把得到的图片添加到结构最前面
      $('#imgBox').prepend('<img src="' + picUrl + '" width="100">');
      // 把获取到的路径赋值给 隐藏域

      if (picArr.length === 3) {
        $('#addproduct')
          .data('bootstrapValidator')
          .updateStatus('picStatus', 'VALID');
      }
    }
  });

  // 5.表单校验
  $('#addproduct').bootstrapValidator({
    // 将默认的排除项, 重置掉 (默认会对 :hidden, :disabled等进行排除)
    excluded: [],

    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    //配置校验字段
    fields: {
      // 二级分类
      brandId: {
        validators: {
          notEmpty: {
            message: '请选择二级分类'
          }
        }
      },
      // 请输入商品名称
      proName: {
        validators: {
          notEmpty: {
            message: '请输入商品名称'
          }
        }
      },
      // 商品描述
      proDesc: {
        validators: {
          notEmpty: {
            message: '请输入商品描述'
          }
        }
      },
      // 请输入商品库存
      // 商品库存
      // 要求: 必须是非零开头的数字, 非零开头, 也就是只能以 1-9 开头
      num: {
        validators: {
          notEmpty: {
            message: '请输入商品库存'
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: '库存必须是非零开头的数字'
          }
        }
      },
      // 请输入商品尺码
      size: {
        validators: {
          notEmpty: {
            message: '请输入商品尺码'
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: '请输入正确的格式 11-11'
          }
        }
      },
      // 请输入商品原价
      oldPrice: {
        validators: {
          notEmpty: {
            message: '请输入商品原价'
          }
        }
      },
      // 请输入商品现价
      price: {
        validators: {
          notEmpty: {
            message: '请输入商品现价'
          }
        }
      },
      // 图片
      picStatus: {
        validators: {
          notEmpty: {
            message: '请上传三张图片'
          }
        }
      }
    }
  });
  // 6.表单提交
  $('#addproduct').on('success.form.bv', function(e) {
    e.preventDefault();
    var params = $('#addproduct').serialize();
    console.log(params);

    params += '&picArr=' + JSON.stringify(picArr);
    console.log(params);

    $.ajax({
      url: '/product/addProduct',
      type: 'post',
      data: params,
      success: function(info) {
        console.log(info);
        if (info.success) {
          $('#addModal').modal('hide');
          $('#myPro').modal('hide');
          cpage = 1;
          render();
          $('#addproduct')
            .data('bootstrapValidator')
            .resetForm(true);
          // 手动恢复 图片和下拉菜单
          $('#imgBox img').remove();
          picArr = [];
          $('.txtcate').text('请选择二级分类');
        }
      }
    });
  });
});
