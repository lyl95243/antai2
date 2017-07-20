/**
 * Created by dell on 2017/7/8.
 */
$(function () {
    var threatTrendEchart=echarts.init(document.getElementById("threatTrendEchart"));
    var ProNameEchart=echarts.init(document.getElementById("ProNameEchart"));
    var attkIPEchart=echarts.init(document.getElementById("attkIPEchart"));
    var attkedIPEchart=echarts.init(document.getElementById("attkedIPEchart"));
    var attkTypeEchart=echarts.init(document.getElementById("attkTypeEchart"));
    var attkAreaEchart=echarts.init(document.getElementById("attkAreaEchart"));

    var option = {
        tooltip: {
            trigger: 'axis',
            formatter: '{a} <br/>{b} : {c}'
        },
        xAxis: {

            splitLine: {show: false},
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
            data: ['0','12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00','21:00','22:00']
        },
        yAxis: {

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
                name: '',
                type: 'line',
                data: [111,55, 25, 49,588, 81,777, 741,  789,666,444,888]
            },

        ]
    };
    var option2={
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        xAxis : [
            {
                // type : 'category',
                data: ['192.168.1.55','192.168.1.55','192.168.1.55','192.168.1.55','192.168.1.55','192.168.1.55'],
                splitLine: {show: false},
                axisLabel: {
                    formatter: '{value}',
                    textStyle: {
                        color: '#fff'
                    },
                    interval:0,//横轴信息全部显示
                    rotate:-70,//-30度角倾斜显示
                },
            }
        ],
        yAxis : [
            {
                // type : 'value',
                splitLine: {show: false},
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
            }
        ],
        series: [
            {
                name: '黑客攻击排名',
                type: 'bar',
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                                '#ff8463','#07b4f0','#b0d311','#ec4566','#ff8463','#ff8463'
                            ];
                            return colorList[params.dataIndex]
                        },
                        barBorderRadius:[3, 3, 0, 0]
                    }
                },
                data: [55,44,33,22,13,7],

            }
        ]
    };
    threatTrendEchart.setOption(option);
    ProNameEchart.setOption(option2);
    attkIPEchart.setOption(option2);
    attkedIPEchart.setOption(option2);
    attkTypeEchart.setOption(option2);
    attkAreaEchart.setOption(option2);

})