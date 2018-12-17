$(function() {
  var cpage = 1;
  var isDelete;
  var id;
  render();
  // 1.发送ajax 获取数据 渲染页面
  function render() {
    $.ajax({
      url: '/user/queryUser',
      type: 'get',
      data: {
        page: cpage,
        pageSize: 5
      },
      dataType: 'json',
      success: function(info) {
        console.log(info);
        var htmlstr = template('tmp', info);
        $('tbody').html(htmlstr);

        // 2. 分页插件
        $('#pagintor').bootstrapPaginator({
          bootstrapMajorVersion: 3, //默认是2，如果是bootstrap3版本，这个参数必填
          currentPage: info.page, //当前页
          totalPages: Math.ceil(info.total / info.size), //总页数
          onPageClicked: function(event, originalEvent, type, page) {
            //为按钮绑定点击事件 page:当前点击的按钮值
            console.log(page);
            cpage = page;
            render();
          }
        });
      }
    });
  }
  // 2.给按钮注册事件委托
  $('tbody').on('click', '.btn', function() {
    $('#disab').modal('show');
    isDelete =
      $(this)
        .parent()
        .data('delete') === 1
        ? 0
        : 1;
    // isDelete === 1 ? 0 : 1;
    id = $(this)
      .parent()
      .data('id');
  });
  // 3.获取模态框的确认按钮
  // 3.1 修改isDelete的值
  $('#confrim').on('click', function() {
    // 保存原有的isDelete值
    // 获取到取反 向后台发送ajax请求
    $.ajax({
      url: '/user/updateUser',
      type: 'post',
      dataType: 'json',
      data: {
        id: id,
        isDelete: isDelete
      },
      success: function(info) {
        // 3.2 关闭模态框
        // 3.3 重新渲染
        if (info.success) {
          $('#disab').modal('hide');
          render();
        }
      }
    });
  });
});
