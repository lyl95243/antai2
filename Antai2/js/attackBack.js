/**
 * Created by dell on 2017/7/13.
 */
$(function () {
    var attackedIPchart=echarts.init(document.getElementById("attackedIPchart"));
    var attackTypechart=echarts.init(document.getElementById("attackTypechart"));
    var proNamechart=echarts.init(document.getElementById("proNamechart"));
    var attackedchart=echarts.init(document.getElementById("attackedchart"));
    var tendencyChart=echarts.init(document.getElementById("tendencyChart"));
    var option01 = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '22',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                                '#07b4f0','#ed4566','#ebebeb'
                            ];
                            return colorList[params.dataIndex]
                        },
                    }
                },
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                ]
            }
        ]
    }; // 被攻击IP总数
    var option02 = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '22',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                                '#ff8463','#07b4f0','#b0d311','#ebebeb','#ed4566'
                            ];
                            return colorList[params.dataIndex]
                        },
                    }
                },
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                    {value:330, name:'邮件营销'},
                    {value:434, name:'联盟广告'},
                ]
            }
        ]
    }; // 攻击类型总数
    var option03 = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '22',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: function(params) {
                            // build a color map as your need.
                            var colorList = [
                                '#b0d311','#ed4566','#ebebeb'
                            ];
                            return colorList[params.dataIndex]
                        },
                    }
                },
                data:[
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:234, name:'联盟广告'},
                ]
            }
        ]
    }; // 攻击协议总数
    var option04 = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        series: [
            {
                name:'访问来源',
                type:'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '22',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                itemStyle: {
                    normal: {
                        color: function(params) {
                            var colorList = [
                                '#ed4566','#ebebeb','#b0d311','#ff8463','#07b4f0'
                            ];
                            return colorList[params.dataIndex]
                        },
                    }
                },
                data:[
                    {value:234, name:'联盟广告'},
                    {value:330, name:'邮件营销'},
                    {value:335, name:'直接访问'},
                    {value:310, name:'邮件营销'},
                    {value:434, name:'联盟广告'},
                ]
            }
        ]
    }; // 被攻击IP总数
    var option05 = {
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
    }; // 趋势图
    attackedIPchart.setOption(option01);
    attackTypechart.setOption(option02);
    proNamechart.setOption(option03);
    attackedchart.setOption(option04);
    tendencyChart.setOption(option05);

    $(".trace").click(function () {
        console.log(1);
    })


})