// 初始化 bootstrapValidator
// 1. 用户名不能为空
// 2. 用户密码不能为空
// 3. 用户密码长度为6-12位

$(function() {
  // 1.表单验证配置
  $('.form-horizontal').bootstrapValidator({
    // 配置图标
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },

    // 对字段进行校验
    fields: {
      username: {
        // 校验的规则
        validators: {
          // 非空校验
          notEmpty: {
            // 为空时显示的提示信息
            message: '用户名不能为空'
          },
          // 长度要求 2-6 位
          stringLength: {
            min: 2,
            max: 6,
            message: '用户名长度必须是 2-6 位'
          },
          callback: {
            message: '用户名不存在'
          }
        }
      },
      password: {
        validators: {
          notEmpty: {
            message: '密码不能为空'
          },
          // 长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: '密码长度必须是6-12位'
          },
          // 专门用于配置回调提示信息的校验规则
          callback: {
            message: '密码错误'
          }
        }
      }
    }
  });
  // 2.注册表单验证成功事件
  // 步骤：拿到数据 发送ajax请求
  // 2.1 阻止默认行为
  // 2.2 发送ajax请求
  // 2.3 让数据在表单中显示
  $('.form-horizontal').on('success.form.bv', function(e) {
    e.preventDefault();
    $.ajax({
      url: '/employee/employeeLogin',
      type: 'post',
      data: $('.form-horizontal').serialize(),
      dataType: 'json',
      success: function(info) {
        if (info.success) {
          location.href = 'index.html';
        }
        if (info.error === 1000) {
          $('.form-horizontal')
            .data('bootstrapValidator')
            .updateStatus('username', 'INVALID', 'callback');
        }
        if (info.error === 1001) {
          $('.form-horizontal')
            .data('bootstrapValidator')
            .updateStatus('password', 'INVALID', 'callback');
        }
      }
    });
  });

  // 3.表单重置功能
  // 由于 reset 按钮, 本身就可以重置内容, 所以上面两个可以, 需要的是重置状态

  $('[type="reset"]').click(function() {
    // 重置校验状态
    $('#form')
      .data('bootstrapValidator')
      .resetForm();
  });
});
