/**
 * Created by 54721 on 2018/12/20.
 */
$(function() {
  // localStorage
  // 1. 本地存储, 操作历史记录, 不用发请求, 即可使用, 对服务器压力更小
  // 2. 如果在服务端进行存储每个用户对应的数据, 是需要用户登录的, 而搜索功能, 不登陆也能使用

  /*
   以下三句话, 放在控制台执行, 专门用于添加假数据
      var arr = [ "匡威", "阿迪王", "匡威王", "特步王" ];
      var jsonStr = JSON.stringify( arr );
      localStorage.setItem("search_list", jsonStr)
  * */

  // 由于整个页面, 要进行大量的历史记录存储操作, 约定一个键名: search_list

  // 功能分析:
  // 功能1: 历史记录渲染
  // 功能2: 清空所有历史记录
  // 功能3: 点击删除单个历史
  // 功能4: 点击搜索, 添加搜索历史


  /*
  * 功能1: 历史记录渲染
  * (1) 从本地存储取出搜索历史
  * (2) 取出来的是 jsonStr, 转成数组
  * (3) 利用模板引擎渲染  (将数组包装成对象)
  * */
  render();


  // 专门用于获取本地历史, 返回一个数组
  function getHistory() {
    var jsonStr = localStorage.getItem("search_list") || '[]';
    var arr = JSON.parse( jsonStr );  // 转数组
    return arr;
  }

  // 读取本地历史, 根据数组, 完成模板渲染
  function render() {
    var arr = getHistory();
    // 利用模板引擎渲染
    var htmlStr = template( "searchTpl", { arr: arr } );
    $('.lt_history').html( htmlStr );
  }


  /*
  * 功能2: 清空历史记录
  * (1) 给清空按钮添加点击事件 (事件委托绑定);
  * (2) 利用removeItem清空历史
  * (3) 重新渲染
  * */
  $('.lt_history').on("click", ".btn_empty", function() {

    mui.confirm( "你确认要清空历史记录吗?", "文星提示", ["取消", "确认"], function( e ) {

      if ( e.index === 1 ) {
        // 清空历史
        localStorage.removeItem( "search_list" );
        // 重新渲染
        render();
      }

    })

  });


  /*
  * 功能3: 删除单个功能
  * (1) 给所有删除按钮, 添加点击事件  (事件委托绑定)
  * (2) 获取下标, 删除数组的对应项  splice(从哪开始, 删几个, 替换的项1, 替换的项2, .....);
  * (3) 将数组转成 jsonStr, 存储到本地历史中
  * (4) 重新渲染
  * */
  $('.lt_history').on("click", ".btn_delete", function() {
    // 将外层的 this 存在 that中
    var that = this;

    // mui中提供的消息框, 确认框等
    // 显示确认框
    // 参数1: 确认框内容
    // 参数2: 确认框的标题
    // 参数3: 按钮文本数组
    // 参数4: 关闭确认框的回调函数
    // mui.confirm( content, title, 按钮文本数组, 回调函数 );
    mui.confirm( "你确认要进行删除操作吗", "文星提示", ["取消", "确认"], function( e ){
      if ( e.index === 1 ) {
        // 点击的确认, 下标为 1  (index)
        // 获取下标
        var index = $(that).data("index");

        // 获取数组
        var arr = getHistory();

        // 删除数组的对应项 arr.splice( 从哪开始, 删除几个, 替换的项1, 替换的项2, .... );
        arr.splice( index, 1 );

        // 转成 jsonStr, 存储到本地
        localStorage.setItem( "search_list", JSON.stringify( arr ) );

        // 重新渲染
        render();
      }
    })



  });


  /*
  * 功能4: 添加功能
  * (1) 给搜索按钮, 添加点击事件
  * (2) 获取搜索关键字, 添加到数组的最前面 unshift
  * (3) 转成jsonStr, 存储到本地
  * (4) 重新渲染
  * */
  $('.search_btn').click(function() {

    var key = $('.search_input').val().trim();

    if ( key === "" ) {
      // 提示消息框
      // mui.toast( "提示内容" )
      mui.toast( "请输入搜索关键字" )
      return;
    }

    // 获取数组
    var arr = getHistory();

    // 1. 如果有重复的要删除, 在每次添加前, 判断下有没有重复项,
    //    如果有, 将重复的删除即可
    var index = arr.indexOf( key );
    if ( index !== -1 ) {
      // 有重复项, 删除对应项, arr.splice(从哪开始, 删除几个, 替换的项1, 替换的项2, ....)
      arr.splice( index, 1 );
    }

    // 2. 如果长度超过 10, 删除最后一项
    if ( arr.length >= 10 ) {
      arr.pop();
    }

    // 添加到数组最前面
    arr.unshift( key );

    // 转成 jsonStr, 存储到本地
    localStorage.setItem( "search_list", JSON.stringify( arr ) );

    // 重新渲染
    render();

    // 清空输入框内容
    $('.search_input').val("");

    // 跳转到搜索列表页
    location.href = "searchList.html?key=" + key;

  })

})
