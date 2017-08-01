/**
 * Created by dell on 2017/7/13.
 */
$(function () {
    var inputPlaceHolder;
    $("input").focus(function () {
        // console.log(1);
        inputPlaceHolder = $(this).attr("placeholder")
        $(this).prop("placeholder", "");
        $(this).val("")
    })
    $("input").blur(function () {
        $(this).prop("placeholder", inputPlaceHolder)
    })

    // 事件类型下拉选项
    var text = "", arrText = [], leixing = "", arrLeixing = [], leixingT = "", arrLeixingT = [];
    var oAjax = new XMLHttpRequest();
    oAjax.open("GET", "RuleTypes.txt", true);
    oAjax.send(null);
    oAjax.onreadystatechange = function () {
        if (oAjax.readyState == 4) {
            if (oAjax.status == 200) {
                text = oAjax.responseText;
                arrText = text.split("\n");
                var reg = /\"/g;
                for (var i = 0; i < arrText.length; i++) {
                    leixing = arrText[i].split(",")[1];
                    arrLeixing.push(leixing)
                    leixingT = arrText[i].split(",")[0];
                    arrLeixingT.push(leixingT);
                    // console.log(arrLeixing);  //要显示的
                    // console.log(arrLeixingT);  传参的
                }
                for (var j = 0; j < arrLeixing.length - 1; j++) {
                    var option = '<option value='+arrLeixingT[j]+'>' + arrLeixing[j] + '</option>'
                    $("#attakType").append(option)
                }
                // gongjileixing();
            } else {
                console.log("请求失败");
            }
        }
    }

// 筛选项
    var attkIP = "", attkedIP = "", protocol = "", alertLevel = -1, reqForm = 0, reqTo = 0,
        resForm = 0, resTo = 0, startTime = "", endTime = "", attkType = "", fastTime = 3,value=3, liHtml = "";
    $(".calendarXl>ul li").click(function () {
        liHtml = $(this).html();
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
    var dstIPTimer, srcIPTimer, mainRuleTimer, srcCountryTimer
    $("#search").click(function () {
            attkIP = $("#attkIP").val(),
            attkedIP = $("#attkedIP").val(),
            protocol = $("#protocol option:selected").val(),
            alertLevel = $("#alertLevel option:selected").val(),
            reqForm = $("#reqForm").val(),
            reqTo = $("#reqTo").val(),
            resForm = $("#resForm").val(),
            resTo = $("#resTo").val(),
            startTime = $(".startTime").val(),
            endTime = $(".endTime").val();
            attkType=$("#attakType option:selected").val();

        // sessionStorage.setItem("key", fastTime);
        // value=fastTime
        // 清除攻击IP 被攻击IP 攻击国家 攻击类型 滚动的定时器
        clearInterval(srcIPTimer);
        $("#srcIPTable").hover(function () {

        }, function () {
            clearInterval(srcIPTimer);
        });
        clearInterval(dstIPTimer);
        $("#dstIP").hover(function () {

        }, function () {
            clearInterval(dstIPTimer);
        });
        clearInterval(mainRuleTimer);
        $("#mainRuleType").hover(function () {

        }, function () {
            clearInterval(mainRuleTimer);
        });
        clearInterval(srcCountryTimer);
        $("#srcCountry").hover(function () {

        }, function () {
            clearInterval(srcCountryTimer);
        });
        quanju();
        setTimeout(function () {
            $("#srcIPTable,#dstIP,#mainRuleType,#srcCountry").css({marginTop:0})
        },250)

    });
    // value = sessionStorage.getItem("key");
    // console.log(value);
    // var url=window.location.href;
    // location.href=url+"?startTime="+startTime+"&endTime="+endTime+"&fastTime="+fastTime+"&attkIP="+attkIP+"&attkedIP=" +
    //     ""+attkedIP+"&protocol="+protocol+"&alertLevel="+alertLevel+"&reqForm"+reqForm+"&reqTo="+reqTo+"&resForm=" +
    //     ""+resForm+"&resTo="+resTo+"&attkType="+attkType;
    function quanju() {
        // 告警日志追踪
        var pageNumber = 1;
        // console.log(value);
        function alertLogTrace(pageNum, isasc) {
            Ajax(
                "/smarteye/api/search/alertlog/search?startTime=" + startTime + "&endTime=" + endTime + "&fastTime=" + fastTime + "&attkIP=" + attkIP + "&attackedIP=" + attkedIP + "&attkType=" + attkType + "&protocol=" + protocol + "&alertLevel=" + alertLevel + "&reqFromSS=" + reqForm + "&reqToSS=" + reqTo + "&resFromSS=" + resForm + "&resToSS=" + resTo + "&page=" + pageNum + "&pageSize=10&&sortField=reqTime&isasc=" + isasc + "",
                "get",
                "json",
                "",
                false,
                function (result) {
                    var eventType = "";
                    var arrResults = eval(result.results);
                    var tb = $("#alertLogs");
                    tb.html("");
                    var tableTh = '<tr class="tableTh"><th id="reqTime">访问时间<span class="caret"></span></th><th>攻击IP</th><th>攻击国家</th><th>被攻击IP</th> <th>被攻击国家</th> <th>攻击类型</th> <th>利用协议</th> <th id="reqFlow">请求流量<span class="caret"></span></th> <th id="resFlow">响应流量<span class="caret"></span></th> <th>威胁级别</th> <th>规则标志</th> <th>操作</th></tr>'
                    tb.append(tableTh);
                    $.each(arrResults, function (i) {
                        // 攻击类型
                        eventType = "";
                        for (var z = 0; z < arrLeixingT.length; z++) {
                            if (arrResults[i].attkType == arrLeixingT[z]) {
                                eventType = arrLeixing[z]
                            }
                        }
                        // 危险级别
                        var levell = "";
                        if (arrResults[i].alertLevel == 1) {
                            levell = "低级威胁"
                        } else if (arrResults[i].alertLevel == 2) {
                            levell = "中级威胁"
                        } else if (arrResults[i].alertLevel == 3) {
                            levell = "高级威胁"
                        }
                        ;
                        var imgSrc = "";
                        if (arrResults[i].attkLocation == "") {
                            imgSrc = "images/flags/CN.png";
                        } else {
                            imgSrc = "image/flags/" + arrResults[i].attkLocation + ".png"
                        }
                        ;
                        if (arrResults[i].attkCountry == "") {
                            arrResults[i].attkCountry = "中国"
                        }
                        var imgSrcAttked = "";
                        if (arrResults[i].attackedLocation == "") {
                            imgSrcAttked = "images/flags/CN.png";
                        } else {
                            imgSrcAttked = "images/flags/" + arrResults[i].attackedLocation + ".png"
                        }
                        ;
                        if (arrResults[i].attackedCountry == "") {
                            arrResults[i].attackedCountry = "中国"
                        }
                        ;
                        var tableCon = '<tr><td>' + arrResults[i].time + '</td>' +
                            '<td>' + arrResults[i].attkIP + '</td>' +
                            '<td  class="tdImg"><img src="' + imgSrc + '">' + arrResults[i].attkCountry + '</td>' +
                            '<td>' + arrResults[i].attackedIP + '</td>' +
                            '<td class="tdImg"><img src="' + imgSrcAttked + '">' + arrResults[i].attackedCountry + '</td>' +
                            '<td><span>' + eventType + '</span></td>' +
                            '<td class="protos">' + arrResults[i].protocol + '</td>' +
                            '<td>' + arrResults[i].reqStreamSize + '</td>' +
                            '<td>' + arrResults[i].resStreamSize + '</td>' +
                            '<td>' + levell + '</td><td>' + arrResults[i].ruleID + '</td>' +
                            '<td><button class="trace">查看详情</button></td></tr>'
                        tb.append(tableCon);
                    });
                    // 点击查看详情
                    $("#alertLogs").delegate(" tr .trace","click",function () {
                        var protos = $(this).parents("tr").find(".protos").html();
                        var index = $(this).parents("tr").index() - 1;
                        var esID = arrResults[index].esID;
                        var indexL = arrResults[index].index;
                        var type = arrResults[index].type;
                        if (protos == "SMTP" || protos == "POP3" || protos == "IMAP") {
                            window.open("emailDetails.html?esID=" + esID + "&indexL=" + indexL + "&type=" + type + "", "_self")
                        } else {
                            window.open("webDetails.html?esID=" + esID + "&indexL=" + indexL + "&type=" + type + "", "_self")
                        }
                    });
                    // gongjileixing()
                    if (arrResults.length < 10) {
                        for (var j = 0; j < 10 - arrResults.length; j++) {
                            var tableConn = '<tr style="height: 38px;"><td></td>' +
                                '<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
                            tb.append(tableConn)
                        }
                    }
                    ;
                    var totalCount = result.count; // 总条数
                    var currentPage = result.curPage; // 当前页
                    var pageCount = result.pageCount;
                    var pageSize = 10;  // 每页条数
                    $(".pagetotal").html(pageCount);
                    if (pageCount > 1) {
                        var options = {
                            bootstrapMajorVersion: 2,
                            currentPage: currentPage,
                            totalPages: pageCount,
                            numberOfPages: 5,
                            itemTexts: function (type, page, current) {
                                switch (type) {
                                    case "first":
                                        return "&lt;&lt";
                                    case "prev":
                                        return "&lt";
                                    case "next":
                                        return "&gt;&gt";
                                    case "last":
                                        return "&gt";
                                    case "page":
                                        return page;
                                }
                            }, onPageClicked: function (event, originaEvent, type, page) {
                                pageNumber = page;
                                Ajax(
                                    "/smarteye/api/search/alertlog/search?startTime=" + startTime + "&endTime=" + endTime + "&fastTime=" + fastTime + "&attkIP=" + attkIP + "&attackedIP=" + attkedIP + "&attkType=" + attkType + "&protocol=" + protocol + "&alertLevel=" + alertLevel + "&reqFromSS=" + reqForm + "&reqToSS=" + reqTo + "&resFromSS=" + resForm + "&resToSS=" + resTo + "&page=" + page + "&pageSize=10&sortField=reqTime&isasc="+isasc+"",
                                    "get",
                                    "json",
                                    "",
                                    false,
                                    function (result) {
                                        console.log(result);
                                        var arrResults = eval(result.results)
                                        tb.html("");
                                        var tableTh = '<tr class="tableTh"><th id="reqTime">访问时间<span class="caret"></span></th><th>攻击IP</th><th>攻击国家</th><th>被攻击IP</th> <th>被攻击国家</th> <th>攻击类型</th> <th>利用协议</th> <th id="reqFlow">请求流量<span class="caret"></span></th> <th id="resFlow">响应流量<span class="caret"></span></th> <th>威胁级别</th> <th>规则标志</th> <th>操作</th></tr>'
                                        tb.append(tableTh);
                                        $.each(arrResults, function (i) {
                                            // 危险级别
                                            var levell = "";
                                            if (arrResults[i].alertLevel == 1) {
                                                levell = "低级威胁"
                                            } else if (arrResults[i].alertLevel == 2) {
                                                levell = "中级威胁"
                                            } else if (arrResults[i].alertLevel == 3) {
                                                levell = "高级威胁"
                                            }
                                            ;
                                            var imgSrc = "";
                                            if (arrResults[i].attkLocation == "") {
                                                imgSrc = "images/flags/CN.png";
                                            } else {
                                                imgSrc = "image/flags/" + arrResults[i].attkLocation + ".png"
                                            }
                                            ;
                                            if (arrResults[i].attkCountry == "") {
                                                arrResults[i].attkCountry = "中国"
                                            }
                                            var imgSrcAttked = "";
                                            if (arrResults[i].attackedLocation == "") {
                                                imgSrcAttked = "images/flags/CN.png";
                                            } else {
                                                imgSrcAttked = "images/flags/" + arrResults[i].attackedLocation + ".png"
                                            }
                                            ;
                                            if (arrResults[i].attackedCountry == "") {
                                                arrResults[i].attackedCountry = "中国"
                                            }
                                            ;
                                            // 攻击类型
                                            eventType = "";
                                            for (var z = 0; z < arrLeixingT.length; z++) {
                                                if (arrResults[i].attkType == arrLeixingT[z]) {
                                                    eventType = arrLeixing[z]
                                                }
                                            }
                                            var tableCon = '<tr><td>' + arrResults[i].time + '</td>' +
                                                '<td>' + arrResults[i].attkIP + '</td>' +
                                                '<td  class="tdImg"><img src="' + imgSrc + '">' + arrResults[i].attkCountry + '</td>' +
                                                '<td>' + arrResults[i].attackedIP + '</td>' +
                                                '<td class="tdImg"><img src="' + imgSrcAttked + '">' + arrResults[i].attackedCountry + '</td>' +
                                                '<td><span>' + eventType + '</span></td>' +
                                                '<td>' + arrResults[i].protocol + '</td>' +
                                                '<td>' + arrResults[i].reqStreamSize + '</td>' +
                                                '<td>' + arrResults[i].resStreamSize + '</td>' +
                                                '<td>' + levell + '</td><td>' + arrResults[i].ruleID + '</td>' +
                                                '<td><button class="trace">查看详情</button></td></tr>'
                                            tb.append(tableCon);
                                        });
                                        // 点击查看详情
                                        $("#alertLogs").delegate(" tr .trace","click",function () {
                                            var protos = $(this).parents("tr").find(".protos").html();
                                            var index = $(this).parents("tr").index() - 1;
                                            var esID = arrResults[index].esID;
                                            var indexL = arrResults[index].index;
                                            var type = arrResults[index].type;
                                            if (protos == "SMTP" || protos == "POP3" || protos == "IMAP") {
                                                window.open("emailDetails.html?esID=" + esID + "&indexL=" + indexL + "&type=" + type + "", "_self")
                                            } else {
                                                window.open("webDetails.html?esID=" + esID + "&indexL=" + indexL + "&type=" + type + "", "_self")
                                            }
                                        });
                                        // gongjileixing()
                                    }
                                )
                            }
                        }
                        $("#yema").bootstrapPaginator(options)
                    }
                }
            );
        }

        setTimeout(function () {
            alertLogTrace(1, false)
        }, 200);
        // 箭头
        var reqIsasc =true;
        $("#alertLogs").delegate("tr #reqTime,#reqFlow,#resFlow", "click", function () {
            if (!reqIsasc) {
                alertLogTrace(pageNumber, false);
                $("#reqTime,#reqFlow,#resFlow").find("span").removeClass().addClass("caret");
                reqIsasc =true;
            } else if(reqIsasc){
                alertLogTrace(pageNumber, true);
                $("#reqTime,#reqFlow,#resFlow").find("span").removeClass().addClass("caretDao");
                reqIsasc=false;
            }
        })
        // 到第几页
        $("#assetsTopage").click(function () {
            var toPage = $(this).prev("span").find("input").val();
            // console.log(toPage);
            alertLogTrace(toPage, true);
        })
        // 告警日志趋势图
        var alertX = [], alertY = [];

        function alertLog(interval, weixie) {
            Ajax(
                "/smarteye/api/search/alertlog/dateHist?field=reqTime&startTime=" + startTime + "&endTime=" + endTime + "&fastTime=" + fastTime + "&attkIP=" + attkIP + "&attackedIP=" + attkedIP + "&attkType=" + attkType + "&protocol=" + protocol + "&alertLevel=" + weixie + "&reqFromSS=" + reqForm + "&reqToSS=" + reqTo + "&resFromSS=" + resForm + "&resToSS=" + resTo + "&interval=" + interval + "&page=1&pageSize=10",
                "get",
                "json",
                "",
                false,
                function (result) {
                    // console.log(result);
                    alertX = [];
                    alertY = []
                    $.each(result, function (i) {
                        // if(i>100){
                        //     $("#accessChart").css({width:500+"%"})
                        // }
                        alertX.push(result[i].key)
                        alertY.push(result[i].count)
                    });
                    alertEchart();
                }
            )
        };
        alertLog(2, -1);
        function alertEchart() {
            var accessChart = echarts.init(document.getElementById("accessChart"));
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
                        },
                    },
                    axisLine: {
                        lineStyle: {
                            color: '#338ed7',
                        }
                    },
                    boundaryGap: false,
                    // data: ['0', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '24:00', '01:00', '02:00', '03:00', '04:00']
                    data: alertX
                },
                yAxis: {
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
                },
                series: [
                    {
                        name: '',
                        type: 'line',
                        // data: [111, 55, 255, 49, 588, 81, 777, 741, 789, 666, 444, 888, 456, 654, 123, 321, 258, 852]
                        data: alertY
                    },
                ]
            }; // 告警日志趋势图
            accessChart.setOption(option01);
        };
        $("#accessChartTime,#accesswexieTime").change(function () {
            var interval = $("#accessChartTime option:selected").val();
            var weixie = $("#accesswexieTime option:selected").val();
            alertLog(interval, weixie)
        })

        // 告警总数
        Ajax(
            "/smarteye/api/search/alertlog/count?startTime=" + startTime + "&endTime=" + endTime + "&fastTime=" + fastTime + "&attkIP=" + attkIP + "&attackedIP=" + attkedIP + "&attkType=" + attkType + "&protocol=" + protocol + "&alertLevel=" + alertLevel + "&reqFromSS=" + reqForm + "&reqToSS=" + reqTo + "&resFromSS=" + resForm + "&resToSS=" + resTo + "",
            "get",
            "json",
            "",
            false,
            function (result) {
                $("#accessLogTrace span").html(result)
            }
        )
        // 攻击IP
        function srcIP(isasc, zhengdao) {
            Ajax(
                "/smarteye/api/search/alertlog/facet?field=srcIP&startTime=" + startTime + "&endTime=" + endTime + "&fastTime=" + fastTime + "&attkIP=" + attkIP + "&attackedIP=" + attkedIP + "&attkType=" + attkType + "&protocol=" + protocol + "&alertLevel=" + alertLevel + "&reqFromSS=" + reqForm + "&reqToSS=" + reqTo + "&resFromSS=" + resForm + "&resToSS=" + resTo + "&topN=1000&isasc=" + isasc + "",
                "get",
                "json",
                "",
                false,
                function (result) {
                    // console.log(result);
                    var tb = $("#srcIPTable");
                    tb.html("");
                    // var tableTh='<tr class="tableTr"><th id="zhengdaoxu" colspan="2">攻击IP排名'+zhengdao+'</th></tr>'
                    // tb.append(tableTh);
                    $.each(result, function (i) {
                        var tableCon = '<tr><td>' + result[i].key + '</td>' +
                            '<td>' + result[i].count + '</td></tr>'
                        tb.append(tableCon);
                    });
                    if (result.length < 5) {
                        for (var j = 0; j < 5 - result.length; j++) {
                            var tableConn = '<tr style="height: 38px;"><td></td>' +
                                '<td></td></tr>'
                            tb.append(tableConn)
                        }
                    }
                    ;
                    if (result.length > 5) {
                        var gun = 0;

                        function hua() {
                            gun++;
                            $("#srcIPTable").animate({marginTop: -gun * 1}, 30, function () {
                                if (gun >= 37) {
                                    $(this).find("tr").eq(0).appendTo($(this))
                                    $(this).css({marginTop: 0})
                                    gun = 0
                                }
                            })
                        };
                        srcIPTimer = setInterval(function () {
                            hua()
                        }, 50);
                        $("#srcIPTable").hover(function () {
                            clearInterval(srcIPTimer)
                        }, function () {
                            srcIPTimer = setInterval(function () {
                                hua()
                            }, 50)
                        })
                    }
                }
            );
        };
        // 被攻击IP
        function dstIP(isasc, zhengdao) {
            Ajax(
                "/smarteye/api/search/alertlog/facet?field=dstIP&startTime=" + startTime + "&endTime=" + endTime + "&fastTime=" + fastTime + "&attkIP=" + attkIP + "&attackedIP=" + attkedIP + "&attkType=" + attkType + "&protocol=" + protocol + "&alertLevel=" + alertLevel + "&reqFromSS=" + reqForm + "&reqToSS=" + reqTo + "&resFromSS=" + resForm + "&resToSS=" + resTo + "&topN=1000&isasc=" + isasc + "",
                "get",
                "json",
                "",
                false,
                function (result) {
                    // console.log(result);
                    var tb = $("#dstIP");
                    tb.html("");
                    // var tableTh='<tr class="tableTr"><th id="zhengdaoxu" colspan="2">被攻击IP排名'+zhengdao+'</th></tr>'
                    // tb.append(tableTh);
                    $.each(result, function (i) {
                        var tableCon = '<tr><td>' + result[i].key + '</td>' +
                            '<td>' + result[i].count + '</td></tr>'
                        tb.append(tableCon);
                    });
                    if (result.length < 5) {
                        for (var j = 0; j < 5 - result.length; j++) {
                            var tableConn = '<tr style="height: 38px;"><td></td>' +
                                '<td></td></tr>'
                            tb.append(tableConn)
                        }
                    };
                    if (result.length > 5) {
                        var gun = 0;
                        function hua() {
                            gun++;
                            $("#dstIP").animate({marginTop: -gun * 1}, 30, function () {
                                if (gun >= 37) {
                                    $(this).find("tr").eq(0).appendTo($(this))
                                    $(this).css({marginTop: 0})
                                    gun = 0
                                }
                            })
                        };
                        dstIPTimer = setInterval(function () {
                            hua()
                        }, 50);
                        $("#dstIP").hover(function () {
                            console.log(3);
                            clearInterval(dstIPTimer)
                        }, function () {
                            console.log(4);
                            dstIPTimer = setInterval(function () {
                                hua()
                            }, 50)
                        })
                    }
                }
            );
        };
        // 攻击类型
        function mainRuleType(isasc, zhengdao) {
            Ajax(
                "/smarteye/api/search/alertlog/facet?field=mainRuleType&startTime=" + startTime + "&endTime=" + endTime + "&fastTime=" + fastTime + "&attkIP=" + attkIP + "&attackedIP=" + attkedIP + "&attkType=" + attkType + "&protocol=" + protocol + "&alertLevel=" + alertLevel + "&reqFromSS=" + reqForm + "&reqToSS=" + reqTo + "&resFromSS=" + resForm + "&resToSS=" + resTo + "&topN=1000&isasc=" + isasc + "",
                "get",
                "json",
                "",
                false,
                function (result) {
                    // console.log(result);
                    var tb = $("#mainRuleType");
                    tb.html("");
                    // var tableTh='<tr class="tableTr"><th id="zhengdaoxu" colspan="2">攻击类型'+zhengdao+'</th></tr>'
                    // tb.append(tableTh);
                    var attkType = "";
                    $.each(result, function (i) {
                        // 攻击类型
                        attkType = "";
                        for (var z = 0; z < arrLeixingT.length; z++) {
                            if (result[i].key == arrLeixingT[z]) {
                                attkType = arrLeixing[z]
                            }
                        }
                        var tableCon = '<tr><td>' + attkType + '</td>' +
                            '<td>' + result[i].count + '</td></tr>'
                        tb.append(tableCon);
                    });
                    if (result.length < 5) {
                        for (var j = 0; j < 5 - result.length; j++) {
                            var tableConn = '<tr style="height: 38px;"><td></td>' +
                                '<td></td></tr>'
                            tb.append(tableConn)
                        }
                    }
                    ;
                    if (result.length > 5) {
                        var gun = 0;

                        function hua() {
                            gun++;
                            $("#mainRuleType").animate({marginTop: -gun * 1}, 30, function () {
                                if (gun >= 37) {
                                    $(this).find("tr").eq(0).appendTo($(this))
                                    $(this).css({marginTop: 0})
                                    gun = 0
                                }
                            })
                        };
                        mainRuleTimer = setInterval(function () {
                            hua()
                        }, 50);
                        $("#mainRuleType").hover(function () {
                            clearInterval(mainRuleTimer)
                        }, function () {
                            mainRuleTimer = setInterval(function () {
                                hua()
                            }, 50)
                        })
                    }
                }
            );
        };
        // 攻击国家
        function srcCountry(isasc, zhengdao) {
            Ajax(
                "/smarteye/api/search/alertlog/facet?field=srcCountry&startTime=" + startTime + "&endTime=" + endTime + "&fastTime=" + fastTime + "&attkIP=" + attkIP + "&attackedIP=" + attkedIP + "&attkType=" + attkType + "&protocol=" + protocol + "&alertLevel=" + alertLevel + "&reqFromSS=" + reqForm + "&reqToSS=" + reqTo + "&resFromSS=" + resForm + "&resToSS=" + resTo + "&topN=1000&isasc=" + isasc + "",
                "get",
                "json",
                "",
                false,
                function (result) {
                    // console.log(result);
                    var tb = $("#srcCountry");
                    tb.html("");
                    // var tableTh='<tr class="tableTr"><th id="zhengdaoxu" colspan="2">攻击国家'+zhengdao+'</th></tr>'
                    // tb.append(tableTh);
                    $.each(result, function (i) {
                        if (result[i].key == "") {
                            result[i].key = "中国"
                        }
                        var tableCon = '<tr><td>' + result[i].key + '</td>' +
                            '<td>' + result[i].count + '</td></tr>'
                        tb.append(tableCon);
                    });
                    if (result.length < 5) {
                        for (var j = 0; j < 5 - result.length; j++) {
                            var tableConn = '<tr style="height: 38px;"><td></td>' +
                                '<td></td></tr>'
                            tb.append(tableConn)
                        }
                    }
                    ;
                    if (result.length > 5) {
                        var gun = 0;

                        function hua() {
                            gun++;
                            $("#srcCountry").animate({marginTop: -gun * 1}, 30, function () {
                                if (gun >= 37) {
                                    $(this).find("tr").eq(0).appendTo($(this))
                                    $(this).css({marginTop: 0})
                                    gun = 0
                                }
                            })
                        };
                        srcCountryTimer = setInterval(function () {
                            hua()
                        }, 50);
                        $("#srcCountry").hover(function () {
                            clearInterval(srcCountryTimer)
                        }, function () {
                            srcCountryTimer = setInterval(function () {
                                hua()
                            }, 50)
                        })
                    }
                }
            );
        };

        srcIP(false, "<span class='caret'></span>");
        dstIP(false, "<span class='caret'></span>");
        setTimeout(function () {
            mainRuleType(false, "<span class='caret'></span>");
        }, 200)
        srcCountry(false, "<span class='caret'></span>");

        // 攻击IP正倒序排列
         var srcIPzhengdao=true
        $("#srcIPTableTh").delegate("tr th span", "click", function () {
            clearInterval(srcIPTimer);
            $("#srcIPTable").hover(function () {

            }, function () {
                clearInterval(srcIPTimer)
            })

            if (!srcIPzhengdao) {
                $(this).removeClass().addClass("caret")
                srcIP(false);
                srcIPzhengdao=true
            } else if(srcIPzhengdao){
                $(this).removeClass().addClass("caretDao")
                srcIP(true);
                srcIPzhengdao=false
            }
        });
        // 被攻击IP正倒序排列
         var dstIPzhengdao=true;
        $("#dstIPTh").delegate("tr th span", "click", function () {
            clearInterval(dstIPTimer);
            $("#dstIP").hover(function () {

            }, function () {
                clearInterval(dstIPTimer)
            })

            if (!dstIPzhengdao) {
                $(this).removeClass().addClass("caret")
                dstIP(false);
                dstIPzhengdao=true;
            } else if(dstIPzhengdao){
                $(this).removeClass().addClass("caretDao")
                dstIP(true);
                dstIPzhengdao=false
            }
        });
        // 攻击类型正倒序排列
        var mainRulezhengdao=true;
        $("#mainRuleTypeTh").delegate("tr th span", "click", function () {
            clearInterval(mainRuleTimer);
            $("#mainRuleType").hover(function () {

            }, function () {
                clearInterval(mainRuleTimer)
            })

            if (!mainRulezhengdao) {
                $(this).removeClass().addClass("caret")
                mainRuleType(false);
                mainRulezhengdao=true;
            } else if(mainRulezhengdao){
                $(this).removeClass().addClass("caretDao")
                mainRuleType(true);
                mainRulezhengdao=false
            }
        });
        // 攻击国家正倒序排列
        var srcCountryzhengdao=true;
        $("#srcCountryTh").delegate("tr th span", "click", function () {
            clearInterval(srcCountryTimer);
            $("#srcCountry").hover(function () {

            }, function () {
                clearInterval(srcCountryTimer)
            })
            if (!srcCountryzhengdao) {
                $(this).removeClass().addClass("caret")
                srcCountry(false);
                srcCountryzhengdao=true
            } else if(srcCountryzhengdao){
                $(this).removeClass().addClass("caretDao")
                srcCountry(true);
                srcCountryzhengdao=false
            }
        });
    }

    quanju();
})

