$(function() {
  // 步骤一：获取到值渲染到搜索框
  var key = getSearch('key');
  $('.search_input').val(key);
  render();

  $('.search_btn').on('click', function() {
    render();
  });
  $('.nav a[data-type]').on('click', function() {
    if ($(this).hasClass('current')) {
      $(this)
        .find('i')
        .toggleClass('fa-angle-down')
        .toggleClass('fa-angle-up');
    } else {
      $(this)
        .addClass('current')
        .siblings()
        .removeClass('current');
      // 切换类
    }
    render();
  });
  function render() {
    // 添加预加载动画
    $('.lt_product ul').html('<div class="loading"></div>');
    var prodatas = {};
    prodatas.proName = $('.search_input').val();
    prodatas.page = 1;
    prodatas.pageSize = 100;
    //  两个可选参数 Num 和 pic价格  默认1 升序 2降序
    // 通过判断a有没有类名 来判断是否需要排序
    var currentls = $('.nav a.current');
    if (currentls.length == 1) {
      var order = currentls.data('type');
      var ordervalue = currentls.find('i').hasClass('fa-angle-down') ? 2 : 1;
      prodatas[order] = ordervalue;
    }

    setTimeout(function() {
      $.ajax({
        url: '/product/queryProduct',
        type: 'get',
        data: prodatas,
        dataType: 'json',
        success: function(info) {
          console.log(info);
          var htmlStr = template('proTpm', info);
          $('.lt_product ul').html(htmlStr);
        }
      });
    }, 1000);
  }
  $('.lt_product ul').on('click', 'li', function() {
    var id = $(this).data('id');
    location.href = 'product.html?key=' + id;
  });
});
