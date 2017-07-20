/**
 * Created by dell on 2017/7/14.
 */
$(function () {
    var IPDomainChart=echarts.init(document.getElementById("IPDomainChart"));
    var option01 = {
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },

        xAxis : [
            {
                // type : 'category',
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
                data : ['192.134.2.55','192.134.2.55','192.134.2.55','192.134.2.55','192.134.2.55','192.134.2.55']
            }
        ],
        yAxis : [
            {
                // type : 'value',
                show:false,
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
        series : [
            {
                name:'SQL注入',
                type:'bar',
                data:[320, 332, 301, 334,125,235],
                itemStyle: {
                    normal: {
                        color:"#ec4566",
                        barBorderRadius:[3, 3, 0, 0]
                    },
                },
            },
            {
                name:'跨站脚本',
                type:'bar',
                data:[120, 132, 101, 134,456,125],
                itemStyle: {
                    normal: {
                        color:"#b0d311",
                        barBorderRadius:[3, 3, 0, 0]
                    },
                },
            },
            {
                name:'WEB扫描',
                type:'bar',
                data:[220, 182, 191, 234,488,564],
                itemStyle: {
                    normal: {
                        color:"#00def1",
                        barBorderRadius:[3, 3, 0, 0]
                    },
                },
            },
            {
                name:'webshell',
                type:'bar',
                data:[150, 232, 201, 154,874,654],
                itemStyle: {
                    normal: {
                        color:"#07b4f0",
                        barBorderRadius:[3, 3, 0, 0]
                    },
                },
            },

            {
                name:'文件包含',
                type:'bar',
                data:[862, 1018, 964, 1026,987,889],
                itemStyle: {
                    normal: {
                        color:"#ff8463",
                        barBorderRadius:[3, 3, 0, 0]
                    },
                },
            },
        ]
    };
    IPDomainChart.setOption(option01)

})