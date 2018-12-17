// 基于准备好的dom，初始化echarts实例
var zhu = document.querySelector('.echarts .zhu');
var myChart = echarts.init(zhu);

// 指定图表的配置项和数据
var option = {
  title: {
    text: '2017年注册人数'
  },
  tooltip: {},
  legend: {
    data: ['人数']
  },
  xAxis: {
    data: ['1月', '2月', '3月', '4月', '5月', '6月']
  },
  yAxis: {},
  series: [
    {
      name: '人数',
      type: 'bar',
      data: [1500, 700, 400, 550, 400, 700]
    }
  ]
};

// 使用刚指定的配置项和数据显示图表。
myChart.setOption(option);

// 饼图
var dot = document.querySelector('.echarts .dot');
var myChart = echarts.init(dot);
option1 = {
  // 标题说明
  title: {
    text: '热门品牌销售',
    subtext: '2017年6月',
    x: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left',
    data: ['耐克', '阿迪', '新百伦', '啦啦啦', '嘻嘻嘻']
  },
  series: [
    {
      name: '访问来源',
      type: 'pie',
      radius: '55%',
      center: ['50%', '60%'],
      data: [
        { value: 335, name: '耐克' },
        { value: 310, name: '阿迪' },
        { value: 234, name: '新百伦' },
        { value: 135, name: '啦啦啦' },
        { value: 1548, name: '嘻嘻嘻' }
      ],
      itemStyle: {
        emphasis: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
};
myChart.setOption(option1);
