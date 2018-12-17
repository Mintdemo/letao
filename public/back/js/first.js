$(function() {
  // 1.发送请求获取数据
  var page = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      url: '/category/queryTopCategoryPaging',
      post: 'get',
      dataType: 'json',
      data: {
        page: page,
        pageSize: pageSize
      },
      success: function(info) {
        console.log(info);
      }
    });
  }
});
