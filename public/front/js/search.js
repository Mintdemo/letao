$(function() {
  // 由于整个页面, 要进行大量的历史记录存储操作, 约定一个键名: search_list
  // 功能分析:
  // 功能1: 历史记录渲染
  // 功能2: 清空所有历史记录
  // 功能3: 点击删除单个历史
  // 功能4: 点击搜索, 添加搜索历史

  // 添加历史记录
  // var arr = ['英短', '美短', '布偶', '起司猫'];
  // var jsonStr = JSON.stringify(arr);
  // localStorage.setItem('search_list', jsonStr);

  // 功能1: 历史记录渲染
  function getArr() {
    // 获取 search_list转换成数组
    var jsonStr = localStorage.getItem('search_list') || '[]';
    var arr = JSON.parse(jsonStr);
    return arr;
  }
  function render() {
    // 获取数组 通过模板引擎动态渲染页面
    var arr = getArr();
    var htmlStr = template('arrTmp', { arr: arr });
    $('.search_his').html(htmlStr);
  }
  render();
  // 功能2: 清空所有历史记录
  $('.trash').on('click', function() {
    // 跳出模态框提示
    // .confirm( message, title, btnValue, callback [, type] )
    confirm('你确定要清空历史记录嘛', '温馨提示', ['取消', '确定'], function(
      e
    ) {
      if (index === 1) {
        localStorage.removeItem('search_list');
        render();
      }
    });
  });
  //  功能3: 点击删除单个历史
  $('.search_his').on('click', '.btn_delete', function() {
    var id = $(this).data('id');
    var arr = getArr();
    arr.splice(id, 1);
    localStorage.setItem('search_list', JSON.stringify(arr));
    render();
  });
  // 功能4: 点击搜索, 添加搜索历史
  $('.search_btn').on('click', function() {
    var text = $('.search_input')
      .val()
      .trim();
    // 如果输入为空 return
    if (text === '') {
      mui.toast('请输入搜索关键字');
      return;
    }
    var arr = getArr();
    // 优化：
    // 如果已经有重复的元素存在 删除 更换其位置
    var index = arr.indexOf(text);
    if (index !== -1) {
      arr.splice(index, 1);
    }
    if (arr.length > 10) {
      arr.pop();
    }
    arr.unshift(text);
    $('.search_input').val('');
    localStorage.setItem('search_list', JSON.stringify(arr));
    render();
  });
});
// if (arr.indexOf(arr.id) != -1) {
//   var items = arr.splice(id, 1);
//   arr.unshift(items);
// } else {
//
// }
// 清空搜索框
