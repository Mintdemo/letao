/**
 * Created by 54721 on 2018/12/18.
 */
// 区域滚动初始化
mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005, //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
  indicators: false //是否显示滚动条
});

// 轮播图初始化, 获得slider插件对象
var gallery = mui('.mui-slider');
gallery.slider({
  interval: 4000 //自动轮播周期，若为0则不自动播放，默认为0；
});


// 方法作用: 专门用于解析地址栏参数
// 传递地址参数的键名, 就会返回对应参数值
function getSearch( k ) {
  // 拿到的是地址栏编码过的字符串
  var str = location.search;

  // 解码成中文
  str = decodeURI( str );         // "?key=匡威&age=18&desc=很好"

  // 去掉问号
  // str.slice(start, end);
  // 包括 start, 不包括 end, 如果 end 不写, 表示从 start 截取到最后
  str = str.slice( 1 )                  // "key=匡威&age=18&desc=很好"

  // split 将字符串分割成数组
  var arr = str.split("&");       // ["key=匡威", "age=18", "desc=很好"]

  var obj = {};

  // 遍历数组, 获取键和值
  arr.forEach(function( v, i ) {  // v 每一项   "age=18"
    var key = v.split("=")[0];   // age
    var value = v.split("=")[1]; // 18
    obj[ key ] = value;
  })
  return obj[ k ];
}
