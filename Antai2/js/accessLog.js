/**
 * Created by dell on 2017/7/13.
 */
$(function () {
    var accessChart=echarts.init(document.getElementById("accessChart"));
    var option01 = {
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
            data: ['0','12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00','21:00','22:00','23:00','24:00','01:00','02:00','03:00','04:00']
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
                data: [111,55, 255, 49,588, 81,777, 741, 789,666,444,888,456,654,123,321,258,852]
            },

        ]
    }; // 访问趋势图
    accessChart.setOption(option01);


})