/**
 * Created by dell on 2017/7/17.
 */
$(function () {
    var flowChart=echarts.init(document.getElementById("flowChart"));
    var flowfenbuChart=echarts.init(document.getElementById("flowfenbuChart"));
    var  option01={
        tooltip: {
            trigger: 'axis'
        },
        xAxis:  {
            // type: 'category',
            axisLabel: {
                formatter: '{value}',
                textStyle: {
                    color: '#fff'
                }
            },
            axisLine:{
                lineStyle:{
                    color:'#338ed7',
                }
            },
            boundaryGap: false,
            splitLine:{show: false},
            data: ['06/01','06/02','06/03','06/04','06/05','06/06','06/07','06/08','06/09','06/10','06/11','06/12','06/13','06/14']
        },
        yAxis: {
            // type: 'value',
            axisLabel: {
                formatter: '{value}',
                textStyle: {
                    color: '#fff'
                }
            },
            axisLine:{
                lineStyle:{
                    color:'#338ed7',
                }
            },
            splitLine:{show: false},
        },
        series: [
            {
                name:'TCP通讯流量',
                type:'line',
                itemStyle: {
                    normal: {
                        color:'#07b4f0',
                        },
                    },
                data:[400, 1100, 500, 1200,1500,700, 1000,556,482,923,482,675,321,258],
            },
            {
                name:'UDP通讯流量',
                type:'line',
                itemStyle: {
                    normal: {
                        color:'#ff3058',
                    },
                },
                data:[600, 800,750,1111,890, 560, 950,546,125,324,857,166,842,741],
            },
            {
                name:'总流量',
                type:'line',
                itemStyle: {
                    normal: {
                        color:'#b0d311',
                    },
                },
                data:[200, 400,550,161,490, 860, 650,189,289,687,489,589,845,689],
            }
        ]
    };
    var  option02={
        tooltip: {
            trigger: 'item'
        },
        xAxis: [
            {
                // type: 'category',
                // show: false,
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: '#fff'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#338ed7',
                    }
                },
                splitLine:{show: false},
                data: [ '0', '50', '100', '150', '200', '250','300','350','400','450','500','550','600']
            }
        ],
        yAxis: [
            {
                // type: 'value',
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: '#fff'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:'#338ed7',
                    }
                },
                splitLine:{show: false},
            }
        ],
        series: [
            {
                name: '',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                                '#ff8463','#07b4f0','#b0d311','#ec4566','#ff8463','#07b4f0','#b0d311','#ec4566','#ff8463','#07b4f0','#b0d311','#ec4566','#ff8463'
                            ];
                            return colorList[params.dataIndex]
                        },
                    }
                },
                data: [12,21,12,25,23,7,22,44,66,33,55,11,22],
            }
        ]
    };
    flowChart.setOption(option01)
    flowfenbuChart.setOption(option02)



})


