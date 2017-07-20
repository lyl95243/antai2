/**
 * Created by dell on 2017/7/7.
 */
$(function () {

    var flowEchart=echarts.init(document.getElementById("flowEchart"));
    var attkTypeChart=echarts.init(document.getElementById("attkTypeChart"));
    var option = {
        tooltip: {
            trigger: 'axis',
            formatter: '{a} <br/>{b} : {c}'
        },
        xAxis: {
            boundaryGap: false,
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
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        },
        yAxis: {
            axisLabel: {
                formatter: '{value}',
                textStyle: {
                    color: '#fff'
                },
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
                name: 'TCP通讯流量',
                type: 'line',
                itemStyle : {
                    normal : {
                        lineStyle:{
                            color:'#07b4f0'
                        }
                    }
                },
                data: [400, 1100, 500, 1200, 1500, 700, 1000],
            },
            {
                name: 'UDP通讯流量',
                type: 'line',
                itemStyle : {
                    normal : {
                        lineStyle:{
                            color:'#ff3058'
                        }
                    }
                },
                data: [600, 800, 750, 1111, 890, 560, 950],
            },
            {
                name: 'UDP通讯流量',
                type: 'line',
                itemStyle : {
                    normal : {
                        lineStyle:{
                            color:'#b0d311'
                        }
                    }
                },
                data: [800, 600, 450, 1211, 850, 770, 910],
            }
        ]
    };
    var option02 = {
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
                data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis : [
            {
                // type : 'value',
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
                data:[320, 332, 301, 334, 390, 330, 320],
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
                data:[120, 132, 101, 134, 90, 230, 210],
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
                data:[220, 182, 191, 234, 290, 330, 310],
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
                data:[150, 232, 201, 154, 190, 330, 410],
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
                data:[862, 1018, 964, 1026, 1679, 1600, 1570],
                itemStyle: {
                    normal: {
                        color:"#ff8463",
                        barBorderRadius:[3, 3, 0, 0]
                    },
                },
            },
        ]
    };
    flowEchart.setOption(option)
    attkTypeChart.setOption(option02)




})