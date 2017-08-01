/**
 * Created by dell on 2017/7/7.
 */
$(function () {
    var inputPlaceHolder;
    $("input").focus(function () {
        inputPlaceHolder = $(this).attr("placeholder")
        $(this).prop("placeholder", "");
        $(this).val("")
    })
    $("input").blur(function () {
        $(this).prop("placeholder", inputPlaceHolder)
    })

    var startTime = "", endTime = "", fastTime = 3;
    $(".calendarXl>ul li").click(function () {
        var liHtml = $(this).html();
        switch (liHtml) {
            case "本周":
                fastTime = 0
                break;
            case "本月":
                fastTime = 1
                break;
            case "本年":
                fastTime = 2
                break;
            case "至今":
                fastTime = 3
                break;
            case "截止本周":
                fastTime = 4
                break;
            case "截止本月":
                fastTime = 5
                break;
            case "截止本年":
                fastTime = 6
                break;
            case "今日":
                fastTime = 7
                break;
            case "昨日":
                fastTime = 8
                break;
            case "前日":
                fastTime = 9
                break;
            case "上周今日":
                fastTime = 10
                break;
            case "上周":
                fastTime = 11
                break;
            case "上月":
                fastTime = 12
                break;
            case "去年":
                fastTime = 13
                break;
            case "最后15分钟":
                fastTime = 14
                break;
            case "最后30分钟":
                fastTime = 15
                break;
            case "最后1小时":
                fastTime = 16
                break;
            case "最后4小时":
                fastTime = 17
                break;
            case "最后12小时":
                fastTime = 18
                break;
            case "最后24小时":
                fastTime = 19
                break;
            case "最后7天":
                fastTime = 20
                break;
            case "最后30天":
                fastTime = 21
                break;
            case "最后60天":
                fastTime = 22
                break;
            case "最后90天":
                fastTime = 23
                break;
            case "最后6个月":
                fastTime = 24
                break;
            case "最后1周":
                fastTime = 25
                break;
            case "最后2周":
                fastTime = 26
                break;
            case "最后3周":
                fastTime = 27
                break;
        }
    });

    $(".calendar>p").bind("DOMNodeInserted",function () {
        // console.log(1);
        console.log(fastTime);

    });
    $(".startTime").click(function () {
       var startTime=$("#hello1").val();
        console.log(startTime);
    })
    function quanju() {
        // 实时攻击信息
        var realTimer,realTimeNum=0;
        function realTimeAttk(pageSize) {
            Ajax(
                "/smarteye/api/search/dashboard/search?startTime=" + startTime + "&endTime=" + endTime + "&fastTime=" + fastTime + "&page=1&pageSize=" + pageSize + "",
                "get",
                "json",
                "",
                false,
                function (result) {
                    // console.log(result);
                    var tb = $("#realTimeAttkTable");
                    tb.html("");
                    var tableTh = '<tr><th>攻击时间</th><th>攻击者IP</th><th>攻击者地址</th><th>攻击者目标IP</th><th>攻击者目标地址</th><th>攻击协议</th><th>攻击类型</th></tr>'
                    tb.append(tableTh);

                    var arrResults = eval(result.results);
                    if(arrResults.length>5){
                        var arrResults2 = [];
                        for (var i = 0; i < arrResults.length; i += 5) {
                            arrResults2.push(arrResults.slice(i, i + 5))
                        }
                        // console.log(arrResults2);
                        realTimeNum=arrResults2.length;
                        var j = 0;
                        function table() {
                            $.each(arrResults2[j], function (i) {
                                if (arrResults2[j][i].attkCountry == "") {
                                    arrResults2[j][i].attkCountry = "中国"
                                }
                                if (arrResults2[j][i].targetCountry == "") {
                                    arrResults2[j][i].targetCountry = "中国"
                                }
                                var imgSrc = "";
                                if (arrResults2[j][i].attkLoc == "") {
                                    imgSrc = "images/flags/CN.png";
                                } else {
                                    imgSrc = "images/flags/" + arrResults2[j][i].attkLoc + ".png"
                                }
                                ;
                                var targetImgSrc = "";
                                if (arrResults2[j][i].targetLoc == "") {
                                    targetImgSrc = "images/flags/CN.png";
                                } else {
                                    targetImgSrc = "images/flags/" + arrResults2[j][i].targetLoc + ".png"
                                }
                                ;
                                var tableCon = '<tr><td>' + arrResults2[j][i].time + '</td>' +
                                    '<td>' + arrResults2[j][i].attkIP + '</td>' +
                                    '<td class="tdImg"><img src=' + imgSrc + ' alt="">' + arrResults2[j][i].attkCountry + '</td>' +
                                    '<td>' + arrResults2[j][i].targetIP + '</td>' +
                                    '<td class="tdImg"><img src=' + targetImgSrc + ' alt="">' + arrResults2[j][i].targetCountry + '</td>' +
                                    '<td>' + arrResults2[j][i].protocol + '</td>' +
                                    '<td>' + arrResults2[j][i].attkType + '</td></tr>'
                                tb.append(tableCon)
                            })
                        };
                        table()
                        realTimer = setInterval(function () {
                            j++;
                            if (j >= arrResults2.length) {
                                j = 0
                            }
                            tb.html("");
                            var tableTh = '<tr><th>攻击时间</th><th>攻击者IP</th><th>攻击者地址</th><th>攻击者目标IP</th><th>攻击者目标地址</th><th>攻击协议</th><th>攻击类型</th></tr>'
                            tb.append(tableTh)
                            table()
                        }, 1000)
                    }else {
                        $.each(arrResults, function (i) {
                            if (arrResults[i].attkCountry == "") {
                                arrResults[i].attkCountry = "中国"
                            }
                            if (arrResults[i].targetCountry == "") {
                                arrResults[i].targetCountry = "中国"
                            }
                            var imgSrc = "";
                            if (arrResults[i].attkLoc == "") {
                                imgSrc = "images/flags/CN.png";
                            } else {
                                imgSrc = "images/flags/" + arrResults[i].attkLoc + ".png"
                            }
                            ;
                            var targetImgSrc = "";
                            if (arrResults[i].targetLoc == "") {
                                targetImgSrc = "images/flags/CN.png";
                            } else {
                                targetImgSrc = "images/flags/" + arrResults[i].targetLoc + ".png"
                            }
                            ;
                            var tableCon = '<tr><td>' + arrResults[i].time + '</td>' +
                                '<td>' + arrResults[i].attkIP + '</td>' +
                                '<td class="tdImg"><img src=' + imgSrc + ' alt="">' + arrResults[i].attkCountry + '</td>' +
                                '<td>' + arrResults[i].targetIP + '</td>' +
                                '<td class="tdImg"><img src=' + targetImgSrc + ' alt="">' + arrResults[i].targetCountry + '</td>' +
                                '<td>' + arrResults[i].protocol + '</td>' +
                                '<td>' + arrResults[i].attkType + '</td></tr>'
                            tb.append(tableCon)
                        })
                    }
                }
            )
        }
        realTimeAttk(1000);
        var realTimerW=setInterval(function () {
            clearInterval(realTimer)
            realTimeAttk(1000)
        }, 1000*realTimeNum)
        // $("#realTimeAttkTable").hover(function () {
        //     clearInterval(realTimer)
        //     clearInterval(realTimerW)
        // },function () {
        //     setTimeout(function () {
        //         clearInterval(realTimer)
        //         realTimeAttk(120)
        //     }, 10)
        // })

        // 攻击目标
        var attkDstTimer, attkDstNum = 0;
        function attkDst(topN) {
            Ajax(
                "/smarteye/api/search/dashboard/attkDstFacet?startTime=" + startTime + "&endTime=" + endTime + "&fastTime=" + fastTime + "&topN=" + topN + "",
                "get",
                "json",
                "",
                false,
                function (result) {
                    // console.log(result);
                    var tb = $("#attkDstTable");
                    tb.html("");
                    var tableTh = '<tr><th>IP</th><th>国家</th><th>攻击总数</th></tr>'
                    tb.append(tableTh);
                    if(result.length>5){
                        var j = 0;
                        var arrResults = [];
                        for (var i = 0; i < result.length; i += 5) {
                            arrResults.push(result.slice(i, i + 5))
                        }
                        attkDstNum = arrResults.length
                        function table() {
                            $.each(arrResults[j], function (i) {
                                if (arrResults[j][i].additional == "") {
                                    arrResults[j][i].additional = "中国"
                                }
                                var tableCon = '<tr><td>' + arrResults[j][i].key + '</td>' +
                                    '<td>' + arrResults[j][i].additional + '</td>' +
                                    '<td>' + arrResults[j][i].count + '</td></tr>'
                                tb.append(tableCon)
                            })
                        }
                        table();
                        attkDstTimer = setInterval(function () {
                            j++;
                            if (j >= arrResults.length) {
                                j = 0
                            }
                            tb.html("");
                            var tableTh = '<tr><th>IP</th><th>国家</th><th>攻击总数</th></tr>'
                            tb.append(tableTh)
                            table()
                        }, 1500)
                    }else {
                        attkDstNum=1
                        $.each(result, function (i) {
                            if (result[i].additional == "") {
                                result[i].additional = "中国"
                            }
                            var tableCon = '<tr><td>' + result[i].key + '</td>' +
                                '<td>' + result[i].additional + '</td>' +
                                '<td>' + result[i].count + '</td></tr>'
                            tb.append(tableCon)
                        })
                        for(var i=0;i<5-result.length;i++){
                            var tableCon = '<tr style="height: 30px;"><td></td>' +
                                '<td></td>' +
                                '<td></td></tr>'
                            tb.append(tableCon)
                        }
                    }
                }
            )
        }
        attkDst(1000)
        setInterval(function () {
            clearInterval(attkDstTimer)
            attkDst(1000)
        }, 1500 * attkDstNum)

        // 攻击源
        var attkSrcTimer, attkSrcNum = 0;
        function attkSrc(topN) {
            Ajax(
                "/smarteye/api/search/dashboard/attkSrcFacet?startTime=" + startTime + "&endTime=" + endTime + "&fastTime=" + fastTime + "&topN=" + topN + "",
                "get",
                "json",
                "",
                false,
                function (result) {
                    // console.log(result);
                    var tb = $("#attkSrc");
                    tb.html("");
                    var tableTh = '<tr><th>IP</th><th>国家</th><th>攻击总数</th></tr>'
                    tb.append(tableTh);
                    if(result.length>5){
                        var arrResults = [];
                        for (var i = 0; i < result.length; i += 5) {
                            arrResults.push(result.slice(i, i + 5))
                        }
                        attkSrcNum = arrResults.length;
                        var j = 0;
                        function table() {
                            $.each(arrResults[j], function (i) {
                                if (arrResults[j][i].additional == "") {
                                    arrResults[j][i].additional = "中国"
                                }
                                var tableCon = '<tr><td>' + arrResults[j][i].key + '</td>' +
                                    '<td>' + arrResults[j][i].additional + '</td>' +
                                    '<td>' + arrResults[j][i].count + '</td></tr>'
                                tb.append(tableCon)
                            })
                        }
                        table();
                        attkSrcTimer = setInterval(function () {
                            j++;
                            if (j >= arrResults.length) {
                                j = 0
                            }
                            tb.html("");
                            var tableTh = '<tr><th>IP</th><th>国家</th><th>攻击总数</th></tr>'
                            tb.append(tableTh)
                            table()
                        }, 1500)
                    }else {
                        attkSrcNum=1
                        $.each(result, function (i) {
                            if (result[i].additional == "") {
                                result[i].additional = "中国"
                            }
                            var tableCon = '<tr><td>' + result[i].key + '</td>' +
                                '<td>' + result[i].additional + '</td>' +
                                '<td>' + result[i].count + '</td></tr>'
                            tb.append(tableCon)
                        })
                        for(var i=0;i<5-result.length;i++){
                            var tableConn = '<tr style="height: 30px;"><td></td>' +
                                '<td></td>' +
                                '<td></td></tr>'
                            tb.append(tableConn)
                        }
                    }
                }
            )
        }
        attkSrc(1000)
        setInterval(function () {
            clearInterval(attkSrcTimer)
            attkSrc(1000)
        }, 1500 * attkSrcNum)

        // 利用协议
        var protocolTimer, protoNum = 0;
        function proto(isasc) {
            Ajax(
                "/smarteye/api/search/dashboard/protoFacet?startTime=" + startTime + "&endTime=" + endTime + "&fastTime=" + fastTime + "&topN=" + isasc + "",
                "get",
                "json",
                "",
                false,
                function (result) {
                    // console.log(result);
                    var tb = $("#attkProtoTable");
                    tb.html("");
                    var tableTh = '<tr><th>利用协议</th><th>总数</th></tr>'
                    tb.append(tableTh)
                    if (result.length > 5) {
                        var j = 0;
                        var arrResults = [];
                        for (var i = 0; i < result.length; i += 5) {
                            arrResults.push(result.slice(i, i + 5))
                        }
                        protoNum = arrResults.length;
                        function table() {
                            $.each(arrResults[j], function (i) {
                                if (arrResults[j][i].additional == "") {
                                    arrResults[j][i].additional = "中国"
                                }
                                var tableCon = '<tr><td>' + arrResults[j][i].key + '</td>' +
                                    '<td>' + arrResults[j][i].count + '</td></tr>'
                                tb.append(tableCon);
                            })
                        }

                        table()
                        protocolTimer = setInterval(function () {
                            j++;
                            if (j >= arrResults.length) {
                                j = 0
                            }
                            tb.html("");
                            var tableTh = '<tr><th>利用协议</th><th>总数</th></tr>'
                            tb.append(tableTh)
                            table()
                        }, 1500)
                    } else {
                        protoNum = 1;
                        $.each(result, function (i) {
                            if (result[i].additional == "") {
                                result[i].additional = "中国"
                            }
                            var tableCon = '<tr><td>' + result[i].key + '</td>' +
                                '<td>' + result[i].count + '</td></tr>'
                            tb.append(tableCon);
                        })
                        for (var j = 0; j < 5 - result.length; j++) {
                            var tableConn = '<tr style="height: 30px;"><td></td>' +
                                '<td></td></tr>'
                            tb.append(tableConn)
                        }
                    }
                }
            )
        }
        proto(1000)
        setInterval(function () {
            clearInterval(protocolTimer)
            proto(1000)
        }, 1500 * protoNum)

        // 攻击类型
        var attkTypeTimer, attkTypeNum = 0;
        function attkType(isasc) {
            Ajax(
                "/smarteye/api/search/dashboard/attkTypeFacet?startTime=" + startTime + "&endTime=" + endTime + "&fastTime=" + fastTime + "&topN="+isasc+"",
                "get",
                "json",
                "",
                false,
                function (result) {
                    // console.log(result);
                    var tb = $("#attkTypeTable");
                    tb.html("");
                    var tableTh = '<tr><th>攻击类型</th><th>总数</th></tr>'
                    tb.append(tableTh)
                    if (result.length < 5) {
                        $.each(result, function (i) {
                            if (result[i].additional == "") {
                                result[i].additional = "中国"
                            }
                            var tableCon = '<tr><td>' + result[i].key + '</td>' +
                                '<td>' + result[i].count + '</td></tr>'
                            tb.append(tableCon);
                        })
                        for (var j = 0; j < 5 - result.length; j++) {
                            var tableConn = '<tr style="height: 30px;"><td></td>' +
                                '<td></td></tr>'
                            tb.append(tableConn)
                        }
                    }else {
                        var j = 0;
                        var arrResults = [];
                        for (var i = 0; i < result.length; i += 5) {
                            arrResults.push(result.slice(i, i + 5))
                        }
                        attkTypeNum = arrResults.length;
                        function table() {
                            $.each(arrResults[j], function (i) {
                                if (arrResults[j][i].additional == "") {
                                    arrResults[j][i].additional = "中国"
                                }
                                var tableCon = '<tr><td>' + arrResults[j][i].key + '</td>' +
                                    '<td>' + arrResults[j][i].count + '</td></tr>'
                                tb.append(tableCon);
                            })
                        }
                        table()
                        attkTypeTimer = setInterval(function () {
                            j++;
                            if (j >= arrResults.length) {
                                j = 0
                            }
                            tb.html("");
                            var tableTh = '<tr><th>利用协议</th><th>总数</th></tr>'
                            tb.append(tableTh)
                            table()
                        }, 1500)
                    }
                }
            )
        }
        attkType(1000)
        setInterval(function () {
            clearInterval(attkTypeTimer);
            attkType(1000)
        },1500*attkTypeNum)

        // 域名排名
        var domainTimer,domainNum=0;
        function domain(topN) {
            Ajax(
                "/smarteye/api/search/dashboard/domainFacet?startTime=" + startTime + "&endTime=" + endTime + "&fastTime=" + fastTime + "&topN="+topN+"&isasc=false",
                "get",
                "json",
                "",
                false,
                function (result) {
                    // console.log(result);
                    var tb = $("#domain");
                    tb.html("");
                    var tableTh = '<tr class="domainT"><th>域名</th><th>访问次数</th><th>访问百分比</th></tr>'
                    tb.append(tableTh)
                    if(result.length<5){
                        $.each(result, function (i) {
                            var tableCon = '<tr><td>' + result[i].key + '</td>' +
                                '<td>' + result[i].count + '</td>' +
                                '<td>' + result[i].percent + '</td></tr>'
                            tb.append(tableCon);
                        })
                        for(var i=0;i<5-result.length;i++){
                            var tableConn = '<tr style="height: 30px;"><td></td>' +
                                '<td></td><td></td></tr>'
                            tb.append(tableConn)
                        }
                    }else{
                        var j = 0;
                        var arrResults = [];
                        for (var i = 0; i < result.length; i += 5) {
                            arrResults.push(result.slice(i, i + 5))
                        }
                        domainNum = arrResults.length;
                        function table() {
                            $.each(arrResults[j], function (i) {
                                var tableCon = '<tr><td>' + arrResults[j][i].key + '</td>' +
                                    '<td>' + arrResults[j][i].count + '</td>' +
                                    '<td>'+arrResults[j][i].percent+'</td></tr>'
                                tb.append(tableCon);
                            })
                        }
                        table()
                        domainTimer = setInterval(function () {
                            j++;
                            if (j >= arrResults.length) {
                                j = 0
                            }
                            tb.html("");
                            var tableTh = '<tr class="domainT"><th>域名</th><th>访问次数</th><th>访问百分比</th></tr>'
                            tb.append(tableTh)
                            table()
                        }, 1500)
                    }
                }
            )
        }
        domain(10000);
        setInterval(function(){
            clearInterval(domainTimer);
            domain(10000)
        },1500*domainNum)

        // 服务流量排名
        var serverSteamTimer,serverStreamNum=0;
        function serverStrean(topN) {
            Ajax(
                "/smarteye/api/search/dashboard/serverStreamFacet?startTime="+startTime+"&endTime="+endTime+"&fastTime="+fastTime+"&topN="+topN+"&isasc=false",
                "get",
                "json",
                "",
                false,
                function (result) {
                    // console.log(result);
                    var tb = $("#serverStream");
                    tb.html("");
                    var tableTh = '<tr class="domainT"><th>服务名称</th><th>入口总流量</th><th>出口总流量</th></tr>'
                    tb.append(tableTh)
                    if(result.length<5){
                        $.each(result, function (i) {
                            var tableCon = '<tr><td>' + result[i].proto + '</td>' +
                                '<td>' + result[i].inBytes + '</td>' +
                                '<td>' + result[i].outBytes + '</td></tr>'
                            tb.append(tableCon);
                        })
                        for(var i=0;i<5-result.length;i++){
                            var tableConn = '<tr style="height: 30px;"><td></td>' +
                                '<td></td><td></td></tr>'
                            tb.append(tableConn)
                        }
                    }else{
                        var j = 0;
                        var arrResults = [];
                        for (var i = 0; i < result.length; i += 5) {
                            arrResults.push(result.slice(i, i + 5))
                        }
                        serverStreamNum = arrResults.length;
                        function table() {
                            $.each(arrResults[j], function (i) {
                                var tableCon = '<tr><td>' + result[i].proto + '</td>' +
                                    '<td>' + result[i].inBytes + '</td>' +
                                    '<td>' + result[i].outBytes + '</td></tr>'
                                tb.append(tableCon);
                            })
                        }
                        table()
                        serverSteamTimer = setInterval(function () {
                            j++;
                            if (j >= arrResults.length) {
                                j = 0
                            }
                            tb.html("");
                            var tableTh = '<tr class="domainT"><th>服务名称</th><th>入口总流量</th><th>出口总流量</th></tr>'
                            tb.append(tableTh)
                            table()
                        }, 1500)
                    }


                }
            )
        }
        serverStrean(1000)
        setInterval(function(){
            clearInterval(serverSteamTimer);
            serverStrean(1000)
        },1500*serverStreamNum)

        // 攻击类型排名
        function attkTypeTrend() {
            Ajax(
                "http://192.168.1.22:8080/smarteye/api/search/dashboard/attkTypeTrend?startTime=" + startTime + "&endTime=" + endTime + "&fastTime=" + fastTime + "&topN=5",
                "get",
                "json",
                "",
                false,
                function (result) {
                    // console.log(result);
                    attkTypeTrendEchart()
                }
            )
        }
        function attkTypeTrendEchart() {
            var attkTypeChart = echarts.init(document.getElementById("attkTypeChart"));
            var option02 = {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        // type : 'category',
                        axisLabel: {
                            formatter: '{value}',
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#338ed7',
                            }
                        },
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    }
                ],
                yAxis: [
                    {
                        // type : 'value',
                        axisLabel: {
                            formatter: '{value}',
                            textStyle: {
                                color: '#fff'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#338ed7',
                            }
                        },
                        splitLine: {show: false},
                    }
                ],
                series: [
                    {
                        name: 'SQL注入',
                        type: 'bar',
                        data: [320, 332, 301, 334, 390, 330, 320],
                        itemStyle: {
                            normal: {
                                color: "#ec4566",
                                barBorderRadius: [3, 3, 0, 0]
                            },
                        },
                    },
                    {
                        name: '跨站脚本',
                        type: 'bar',
                        data: [120, 132, 101, 134, 90, 230, 210],
                        itemStyle: {
                            normal: {
                                color: "#b0d311",
                                barBorderRadius: [3, 3, 0, 0]
                            },
                        },
                    },
                    {
                        name: 'WEB扫描',
                        type: 'bar',
                        data: [220, 182, 191, 234, 290, 330, 310],
                        itemStyle: {
                            normal: {
                                color: "#00def1",
                                barBorderRadius: [3, 3, 0, 0]
                            },
                        },
                    },
                    {
                        name: 'webshell',
                        type: 'bar',
                        data: [150, 232, 201, 0, 190, 330, 410],
                        itemStyle: {
                            normal: {
                                color: "#07b4f0",
                                barBorderRadius: [3, 3, 0, 0]
                            },
                        },
                    },
                    {
                        name: '文件包含',
                        type: 'bar',
                        data: [862, 1018, 964, 1026, 1679, 1600, 1570],
                        itemStyle: {
                            normal: {
                                color: "#ff8463",
                                barBorderRadius: [3, 3, 0, 0]
                            },
                        },
                    },
                ]
            };
            attkTypeChart.setOption(option02)
        }
        attkTypeTrend();

        // 出入口流量统计
        var dataKey = [], dataTCP = [], dataUDP = [], dataTotal = [];
        var TCP = true,UDP=true,total=true,MaxStream=[],streamUnit="";
        function streamTrend() {
            Ajax(
                "/smarteye/api/search/dashboard/streamTrend?interval=2",
                "get",
                "json",
                "",
                false,
                function (result) {
                    // console.log(result);
                    var bytes=1;
                    $.each(result, function (i) {
                        dataKey.push(result[i].key);
                        MaxStream.push(result[i].k2Count.TCP,result[i].k2Count.UDP,result[i].k2Count.total)
                    });
                    var maxStream=MaxStream[0];
                    for(var i=0;i<MaxStream.length;i++){
                        if(MaxStream[i]>maxStream){
                            maxStream=MaxStream[i]
                        }
                    };
                    if(maxStream>1024*1024*1024){
                        bytes=1024*1024*1024;
                        streamUnit="G"
                    }else if(maxStream>1024*1024){
                        bytes=1024*1024;
                        streamUnit="M"
                    }else if(maxStream>1024){
                        bytes=1024;
                        streamUnit="KB"
                    }else if(maxStream<=1024){
                        bytes=1
                    }
                    // console.log(maxStream/1024/1024/1024);
                    $.each(result, function (i) {
                        dataTCP.push((result[i].k2Count.TCP/bytes).toFixed(2));
                        dataUDP.push((result[i].k2Count.UDP/bytes).toFixed(2));
                        dataTotal.push((result[i].k2Count.total/bytes).toFixed(2));
                    });
                    streamTrendEchart(dataTCP,dataUDP,dataTotal);

                }
            )
        }
        streamTrend();
        // setInterval(function () {
        //     dataKey = []; dataTCP = []; dataUDP = []; dataTotal = [];MaxStream=[];
        //     streamTrend()
        // },2000)
        function streamTrendEchart(dataTCP,dataUDP,dataTotal) {
            var flowEchart = echarts.init(document.getElementById("flowEchart"));
            var option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: "{a} <br/>{b}: {c} "+streamUnit+""
                },
                grid: {
                    left: '3%',
                    right: '8%',
                    bottom: '6%',
                    top: '8%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel: {
                        formatter: '{value}',
                        textStyle: {
                            color: '#fff'
                        }
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#338ed7',
                        }
                    },
                    data: dataKey
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'+streamUnit+'',
                        textStyle: {
                            color: '#fff'
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#338ed7',
                        }
                    },
                    splitLine: {show: false},
                },
                series: [
                    {
                        name: 'TCP通讯流量',
                        type: 'line',
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#07b4f0'
                                }
                            }
                        },
                        data: dataTCP
                    },
                    {
                        name: 'UDP通讯流量',
                        type: 'line',
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#ff3058'
                                }
                            }
                        },
                        data: dataUDP
                    },
                    {
                        name: '总流量',
                        type: 'line',
                        itemStyle: {
                            normal: {
                                lineStyle: {
                                    color: '#b0d311'
                                }
                            }
                        },
                        data: dataTotal
                    }
                ]
            };
            flowEchart.setOption(option)
        }
        $(".TCPFlow").click(function () {
            if (TCP) {
                streamTrendEchart([],dataUDP,dataTotal);
                TCP = false;
            }else{
                streamTrendEchart(dataTCP,dataUDP,dataTotal);
                TCP = true;UDP=true;total=true;
            }
        });
        $(".UDPFlow").click(function () {
            if (UDP) {
                streamTrendEchart(dataTCP,[],dataTotal);
                UDP = false;
            }else{
                streamTrendEchart(dataTCP,dataUDP,dataTotal);
                TCP = true;UDP=true;total=true;
            }
        });
        $(".totalFlow").click(function () {
            if (total) {
                streamTrendEchart(dataTCP,dataUDP,[]);
                total = false;
            }else{
                streamTrendEchart(dataTCP,dataUDP,dataTotal);
                TCP = true;UDP=true;total=true;
            }
        });

    }
    quanju();
})



