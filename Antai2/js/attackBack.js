/**
 * Created by dell on 2017/7/13.
 */
$(function () {
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
    var  reqForm = 0, reqTo = 0, resForm = 0, resTo = 0;
    var startTime=getQueryString("startTime");
    var endTime=getQueryString("endTime");
    var fastTime=getQueryString("fastTime");
    var attkIP=getQueryString("attackIP");
    var attkCountry=getQueryString("attkCountry");
    var attkType=getQueryString("attkType");
    var protocol=getQueryString("protocol");
    var attkNum=getQueryString("attkNum");
    var alertLevel=getQueryString("alertLevel"),alertLevell;
    if(alertLevel=="高级威胁"){
        alertLevell=3
    }else if(alertLevel=="中级威胁"){
        alertLevell=2
    }else if(alertLevel=="低级威胁"){
        alertLevell=1
    }else{
        alertLevell=-1
    }
    var attkNum=getQueryString("attkNum");
    // 事件列表
    function eventList(pageNum) {
        Ajax(
            "/smarteye/api/search/ipevent/search?startTime="+startTime+"&endTime="+endTime+"&fastTime="+fastTime+"&attkIP="+attkIP+"&attackedIP=&attkType="+attkType+"&protocol="+protocol+"&alertLevel="+alertLevell+"&reqFromSS="+reqForm+"&reqToSS="+reqTo+"&resFromSS="+resForm+"&resToSS="+resTo+"&page="+pageNum+"&pageSize=10&sortField=reqTime&isasc=false",
            "get",
            "json",
            "",
            false,
            function (result) {
                console.log(result);
                var arrResults=eval(result.results);
                var tb=$("#IPInforList");
                tb.html("");
                var tableTh='<tr class="tableTh"><th>攻击时间</th><th>被攻击IP</th><th>利用协议</th><th>请求流量</th><th>响应流量</th><th>攻击类型</th><th>威胁级别</th><th>深度分析</th></tr>'
                tb.append(tableTh);
                var eventType = "";
                $.each(arrResults,function (i) {
                    // 攻击类型
                    eventType = "";
                    for (var z = 0; z < arrLeixingT.length; z++) {
                        if (arrResults[i].attkType == arrLeixingT[z]) {
                            eventType = arrLeixing[z]
                        }
                    }
                    // 危险级别
                    var levell = "";
                    if (arrResults[i].attkLevel == 1) {
                        levell = "低级威胁"
                    } else if (arrResults[i].attkLevel == 2) {
                        levell = "中级威胁"
                    } else if (arrResults[i].attkLevel == 3) {
                        levell = "高级威胁"
                    };
                    var tableCon='<tr><td>'+arrResults[i].time+'</td>' +
                        '<td>'+arrResults[i].attackedIP+'</td>' +
                        '<td><span>'+arrResults[i].protocol+'</span></td>' +
                        '<td>'+arrResults[i].reqStreamSize+'</td>' +
                        '<td>'+arrResults[i].resStreamSize+'</td>' +
                        '<td><span style="background:#E3221F">'+arrResults[i].attkType+'</span></td>' +
                        '<td>'+levell+'</td>' +
                        '<td><button class="trace">查看详情</button></td></tr>'
                    tb.append(tableCon)
                });
                $("#IPInforList").delegate("tr .trace","click",function () {
                    window.open("attackDetails.html","_self")
                });
                var totalCount=result.count;
                var currentPage=result.curPage;
                var pageCount=result.pageCount;
                var pageSize=10;
                $(".pagtotal").html(pageCount);
                if(pageCount>=1){
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
                        },onPageClicked:function (event, originaEvent, type, page) {
                           Ajax(
                               "/smarteye/api/search/ipevent/search?startTime="+startTime+"&endTime="+endTime+"&fastTime="+fastTime+"&attkIP="+attkIP+"&attackedIP=&attkType="+attkType+"&protocol="+protocol+"&alertLevel="+alertLevell+"&reqFromSS="+reqForm+"&reqToSS="+reqTo+"&resFromSS="+resForm+"&resToSS="+resTo+"&page="+page+"&pageSize=10&sortField=reqTime&isasc=false",
                               "get",
                               "json",
                               "",
                               false,
                               function (result) {
                                   console.log(result);
                                   var arrResults = eval(result.results);
                                   var tb = $("#IPInforList");
                                   tb.html("");
                                   var tableTh = '<tr class="tableTh"><th>攻击时间</th><th>被攻击IP</th><th>利用协议</th><th>请求流量</th><th>响应流量</th><th>攻击类型</th><th>威胁级别</th><th>深度分析</th></tr>'
                                   tb.append(tableTh);
                                   var eventType = "";
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
                                       if (arrResults[i].attkLevel == 1) {
                                           levell = "低级威胁"
                                       } else if (arrResults[i].attkLevel == 2) {
                                           levell = "中级威胁"
                                       } else if (arrResults[i].attkLevel == 3) {
                                           levell = "高级威胁"
                                       }
                                       ;
                                       var tableCon = '<tr><td>' + arrResults[i].time + '</td>' +
                                           '<td>' + arrResults[i].attackedIP + '</td>' +
                                           '<td><span>' + arrResults[i].protocol + '</span></td>' +
                                           '<td>' + arrResults[i].reqStreamSize + '</td>' +
                                           '<td>' + arrResults[i].resStreamSize + '</td>' +
                                           '<td><span style="background:#E3221F">' + arrResults[i].attkType + '</span></td>' +
                                           '<td>' + levell + '</td>' +
                                           '<td><button class="trace">查看详情</button></td></tr>'
                                       tb.append(tableCon);
                                       $("#IPInforList").delegate("tr .trace", "click", function () {
                                           window.open("attackDetails.html", "_self")
                                       });
                                   });
                                   protosColor()
                               }
                           )
                        }
                    };
                    $("#yema").bootstrapPaginator(options)
                }
            }
        )
    };
    eventList(1);
    // 到第几页
    $("#assetsTopage").click(function () {
        var toPage=$(this).prev("span").find("input").val();
        // console.log(toPage);
        eventList(toPage);

    });
    // 攻击IP基本信息
    $("#IPInfor tr:last-child").find("td").eq(0).html(attkIP)
    $("#IPInfor tr:last-child").find("td").eq(1).html(attkCountry)
    $("#IPInfor tr:last-child").find("td").eq(2).html(startTime)
    $("#IPInfor tr:last-child").find("td").eq(3).html(endTime)
    $("#IPInfor tr:last-child").find("td").eq(4).html(attkNum)
    // 攻击总流量
    Ajax(
        "/smarteye/api/search/ipevent/attackSize?startTime="+startTime+"&endTime="+endTime+"&fastTime="+fastTime+"&attkIP="+attkIP+"",
        "get",
        "json",
        "",
        false,
        function (result) {
            $("#IPInfor tr:last-child").find("td").eq(6).html(result)
        }
    )
    // 访问总流量
    Ajax(
        "/smarteye/api/search/ipevent/streamSize?startTime="+startTime+"&endTime="+endTime+"&fastTime="+fastTime+"&attkIP="+attkIP+"",
        "get",
        "json",
        "",
        false,
        function (result) {
            $("#IPInfor tr:last-child").find("td").eq(5).html(result)
        }
    )

    // 攻击IP相关统计
        //   被攻击IP总数
         var attkIPData=[];
        function attkedIP(){
           Ajax(
               "http://192.168.1.22:8080/smarteye//api/search/ipevent/facet?field=srcIP&startTime="+startTime+"&endTime="+endTime+"&fastTime="+fastTime+"&attkIP="+attkIP+"&alertLevel="+alertLevell+"&page=1&pageSize=10&topN=5&isasc=false",
               "get",
               "json",
               "",
               false,
               function (result) {
                   console.log(result);
                   var facets=eval(result.facets);
                       $.each(facets,function (i) {
                           attkIPData.push({
                               name:facets[i].key,
                               value:facets[i].count
                           });
                       });
                   $("#attkIP").html(result.total);
                   attkedIPEchart()
               }
           )
        }
        attkedIP()
        function attkedIPEchart() {
            var attackedIPchart=echarts.init(document.getElementById("attackedIPchart"));
            var option01 = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                series: [
                    {
                        name:'被攻击IP',
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
                        data:attkIPData
                    }
                ]
            }; // 被攻击IP总数
            attackedIPchart.setOption(option01);
        }
    //   攻击类型总数
    var attkTypeData=[];
    function attkedType(){
        Ajax(
            "http://192.168.1.22:8080/smarteye//api/search/ipevent/facet?field=mainRuleType&startTime="+startTime+"&endTime="+endTime+"&fastTime="+fastTime+"&attkIP="+attkIP+"&alertLevel="+alertLevell+"&page=1&pageSize=10&topN=5&isasc=false",
            "get",
            "json",
            "",
            false,
            function (result) {
                console.log(result);
                var facets=eval(result.facets);
                $.each(facets,function (i) {
                    attkTypeData.push({
                        name:facets[i].key,
                        value:facets[i].count
                    });
                });
                $("#attkType").html(result.total);
                attkedTypeEchart()
            }
        )
    }
    attkedType()
    function attkedTypeEchart() {
        var attackTypechart=echarts.init(document.getElementById("attackTypechart"));
        var option02 = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
                {
                    name:'攻击类型',
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
                    data:attkTypeData
                }
            ]
        }; // 攻击类型总数
        attackTypechart.setOption(option02);
    }
    //   攻击协议总数
    var attkProtoData=[];
    function attkProto(){
        Ajax(
            "http://192.168.1.22:8080/smarteye//api/search/ipevent/facet?field=protocol&startTime="+startTime+"&endTime="+endTime+"&fastTime="+fastTime+"&attkIP="+attkIP+"&alertLevel="+alertLevell+"&page=1&pageSize=10&topN=5&isasc=false",
            "get",
            "json",
            "",
            false,
            function (result) {
                console.log(result);
                var facets=eval(result.facets);
                $.each(facets,function (i) {
                    attkProtoData.push({
                        name:facets[i].key,
                        value:facets[i].count
                    });
                });
                $("#attkProto").html(result.total);
                attkProtoEchart()
            }
        )
    }
    attkProto()
    function attkProtoEchart() {
        var proNamechart=echarts.init(document.getElementById("proNamechart"));
        var option03 = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
                {
                    name:'攻击协议',
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
                    data:attkProtoData
                }
            ]
        }; // 攻击协议总数
        proNamechart.setOption(option03);
    }
    //   威胁级别总数
    var attkLevelData=[];
    function attkLevel(){
        Ajax(
            "http://192.168.1.22:8080/smarteye//api/search/ipevent/facet?field=protocol&startTime="+startTime+"&endTime="+endTime+"&fastTime="+fastTime+"&attkIP="+attkIP+"&alertLevel="+alertLevell+"&page=1&pageSize=10&topN=5&isasc=false",
            "get",
            "json",
            "",
            false,
            function (result) {
                console.log(result);
                var facets=eval(result.facets);
                $.each(facets,function (i) {
                    attkLevelData.push({
                        name:facets[i].key,
                        value:facets[i].count
                    });
                });
                $("#attkLevel").html(result.total);
                attkLevelEchart()
            }
        )
    }
    attkLevel()
    function attkLevelEchart() {
        var attackedchart=echarts.init(document.getElementById("attackedchart"));
        var option04 = {
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            series: [
                {
                    name:'威胁级别',
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
                    data:attkLevelData
                }
            ]
        }; // 被攻击IP总数
        attackedchart.setOption(option04);
    }

    var tendencyChart=echarts.init(document.getElementById("tendencyChart"));
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
    tendencyChart.setOption(option05);
    // 利用协议颜色
    function protosColor() {
        var protos=["HTTP","SMTP","IMAP","POP3","TELNET","FTP","DNS"]
        var attkTypeColor=["#19ab3c","#e3221f","#626afb"];
        for (var i = 0; i < $("#IPInforList tr td span").length; i++) {
            for(var j=0;j<protos.length;j++){
                if ($("#IPInforList tr td span").eq(i).html() == protos[j]) {
                    $("#IPInforList tr td span").eq(i).css({
                        background: attkTypeColor[j%3]
                    })
                }
            }
        }
    }
    protosColor()
})


