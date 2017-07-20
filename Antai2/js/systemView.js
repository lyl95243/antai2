/**
 * Created by dell on 2017/7/18.
 */
$(function () {
    // 系统版本
    Ajax(
        "/smarteye//api/system/sysOverview/sysVersion",
        "get",
        "json",
        "",
        false,
        function (result) {
            $("#sysVersion").html(result.sysVersion)
            $("#ruleVersion").html(result.ruleVersion)
        }
    )
    // 系统状态
    var mem=[],disk=[],CPU=[];
    function sysState() {
        Ajax(
            "/smarteye/api/system/sysOverview/sysStatus",
            "get",
            "json",
            "",
            false,
            function (result) {
                console.log(result);
                mem.push(result.memUsage);
                disk.push(result.diskUsage)
                CPU.push(result.cpuUsage)
            }
        );
    };
    sysState()
    var chart01 = echarts.init(document.getElementById('chart01'));
    var chart02 = echarts.init(document.getElementById('chart02'));
    var chart03 = echarts.init(document.getElementById('chart03'));
    var option01 = {
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },
        series : [
            {
                name:'内存利用率',
                type:'gauge',
                axisTick: {            // 坐标轴小标记
                    splitNumber: 5,   // 每份split细分多少段
                    length :8,        // 属性length控制线长
                    show:false
                },
                splitLine: {           // 分隔线
                    length :28,         // 属性length控制线长
                    show:false
                },
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 30,
                        color: [[0.2, '#b0d311'],[0.8, '#07b4f0'],[1, '#ed4566']],
                    }
                },
                pointer: {
                    width:5,
                    length: '90%',
                    color:'#07b4f0'
                },
                detail : {
                    show : true,
                    formatter:'{value}%',
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontSize : 20
                    },
                    offsetCenter: [0, 70],
                },
                data:mem
            }
        ]
    };
    var option02 = {
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },
        series : [
            {
                name:'CPU利用率',
                type:'gauge',
                axisTick: {            // 坐标轴小标记
                    splitNumber: 5,   // 每份split细分多少段
                    length :8,        // 属性length控制线长
                    show:false
                },
                splitLine: {           // 分隔线
                    length :28,         // 属性length控制线长
                    show:false
                },
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 30,
                        color: [[0.2, '#b0d311'],[0.8, '#07b4f0'],[1, '#ed4566']],
                    }
                },
                pointer: {
                    width:5,
                    length: '90%',
                    color:'#07b4f0'
                },
                detail : {
                    show : true,
                    formatter:'{value}%',
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontSize : 20
                    },
                    offsetCenter: [0, 70],
                },
                data:CPU
            }
        ]
    };
    var option03 = {
        tooltip : {
            formatter: "{a} <br/>{b} : {c}%"
        },
        series : [
            {
                name:'硬盘利用率',
                type:'gauge',
                axisTick: {            // 坐标轴小标记
                    splitNumber: 5,   // 每份split细分多少段
                    length :8,        // 属性length控制线长
                    show:false
                },
                splitLine: {           // 分隔线
                    length :28,         // 属性length控制线长
                    show:false
                },
                axisLine: {            // 坐标轴线
                    lineStyle: {       // 属性lineStyle控制线条样式
                        width: 30,
                        color: [[0.2, '#b0d311'],[0.8, '#07b4f0'],[1, '#ed4566']],
                    }
                },
                pointer: {
                    width:5,
                    length: '90%',
                    color:'#07b4f0'
                },
                detail : {
                    show : true,
                    formatter:'{value}%',
                    textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                        fontSize : 20
                    },
                    offsetCenter: [0, 70],
                },
                data:disk
            }
        ]
    };
    chart01.setOption(option01);
    chart02.setOption(option02);
    chart03.setOption(option03);
    setInterval(function () {
        mem=[];disk=[];CPU=[];
        sysState()
        option01.series[0].data=mem;
        option02.series[0].data=CPU;
        option03.series[0].data=disk;
        chart01.setOption(option01,true);
        chart02.setOption(option02,true);
        chart03.setOption(option03,true);
    },3000)

    // 时间
    function dateTime() {
        var date=new Date();
        var month=date.getMonth()+1,
            day=date.getDate(),
            hours=date.getHours(),
            minutes=date.getMinutes(),
            second=date.getSeconds();
        var outputTime = date.getFullYear() + '-' + (month<10 ? '0' : '') + month + '-' + (day<10 ? '0' : '') + day +" &nbsp;" + (hours<10 ? '0' : '') + hours+":" + (minutes<10 ? '0' : '') + minutes+":"+ (second<10 ? '0' : '') + second
        $("#time").html(outputTime)
    }
    dateTime()
    setInterval(function () {
        dateTime()
    },1000)

})