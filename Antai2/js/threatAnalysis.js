/**
 * Created by dell on 2017/7/8.
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
                for(var j=0;j<arrLeixing.length-1;j++){
                    var option= '<option value='+arrLeixingT[j]+'>'+arrLeixing[j]+'</option>'
                    $("#attakType").append(option)
                }
                // gongjileixing();
                protosColor()
            } else {
                console.log("请求失败");
            }
        }
    }

    var attkIP="",protocol="",alertLevel=-1,startTime="",endTime="",attkType="", fastTime=3;
    $(".calendarXl>ul li").click(function () {
        var liHtml=$(this).html();
        switch (liHtml)
        {
            case "本周":
                fastTime=0
                break;
            case "本月":
                fastTime=1
                break;
            case "本年":
                fastTime=2
                break;
            case "至今":
                fastTime=3
                break;
            case "截止本周":
                fastTime=4
                break;
            case "截止本月":
                fastTime=5
                break;
            case "截止本年":
                fastTime=6
                break;
            case "今日":
                fastTime=7
                break;
            case "昨日":
                fastTime=8
                break;
            case "前日":
                fastTime=9
                break;
            case "上周今日":
                fastTime=10
                break;
            case "上周":
                fastTime=11
                break;
            case "上月":
                fastTime=12
                break;
            case "去年":
                fastTime=13
                break;
            case "最后15分钟":
                fastTime=14
                break;
            case "最后30分钟":
                fastTime=15
                break;
            case "最后1小时":
                fastTime=16
                break;
            case "最后4小时":
                fastTime=17
                break;
            case "最后12小时":
                fastTime=18
                break;
            case "最后24小时":
                fastTime=19
                break;
            case "最后7天":
                fastTime=20
                break;
            case "最后30天":
                fastTime=21
                break;
            case "最后60天":
                fastTime=22
                break;
            case "最后90天":
                fastTime=23
                break;
            case "最后6个月":
                fastTime=24
                break;
            case "最后1周":
                fastTime=25
                break;
            case "最后2周":
                fastTime=26
                break;
            case "最后3周":
                fastTime=27
                break;
        }
    });
    $("#search").click(function () {
            attkIP=$("#attkIP").val(),
            protocol=$("#protocol option:selected").val(),
            attkType=$("#attakType option:selected").val(),
            alertLevel=$("#alertLevel option:selected").val(),
            startTime=$(".startTime").val(),
            endTime=$(".endTime").val();
        // console.log(attkIP);
        // console.log(attkedIP);
        // console.log(attkType);
        // console.log(protocol);
        // console.log(alertLevel);
        // console.log(reqForm);
        // console.log(reqTo);
        // console.log(resForm);
        // console.log(resTo);
        // console.log(startTime);
        // console.log(endTime);
        // console.log(fastTime);
        quanju()
    });
    function quanju() {
      // 威胁事件列表
       function threatEvenList(pageNum) {
           Ajax(
               "/smarteye/api/search/alertEvent/search?startTime="+startTime+"&endTime="+endTime+"&fastTime="+fastTime+"&attkIP="+attkIP+"&attkType="+attkType+"&protocol="+protocol+"&alertLevel="+alertLevel+"&page="+pageNum+"&pageSize=10",
               "get",
               "json",
               "",
               false,
               function (result) {
                   console.log(result);
                   var arrResults = eval(result.results);
                   var tb = $("#threatEventList");
                   tb.html("");
                   var tableTh = '<tr class="tableTh"><th>最早攻击时间</th><th>最近攻击时间</th><th>攻击IP</th><th>攻击地区</th> <th>利用协议</th> <th>攻击类型</th> <th>威胁级别</th> <th>攻击次数</th><th>深度分析</th></tr>'
                   tb.append(tableTh);
                   $.each(arrResults, function (i) {
                       // 危险级别
                       var levell = "";
                       if (arrResults[i].level == 1) {
                           levell = "低级威胁"
                       } else if (arrResults[i].level == 2) {
                           levell = "中级威胁"
                       } else if (arrResults[i].level == 3) {
                           levell = "高级威胁"
                       };
                       // 攻击地区
                       var imgSrc = "";
                       if (arrResults[i].location == "") {
                           imgSrc = "images/flags/CN.png";
                       } else {
                           imgSrc = "image/flags/" + arrResults[i].location + ".png"
                       };
                       if(arrResults[i].country==""){
                           arrResults[i].country="中国"
                       }
                       // 利用协议
                       var protos="";
                       if(arrResults[i].protos.length>=3){
                           protos="<span>"+arrResults[i].protos[0]+"</span>" +
                               "<span>"+arrResults[i].protos[1]+"</span>" +
                               "<span>"+arrResults[i].protos[2]+"</span>";
                       }else if(arrResults[i].protos.length==2){
                           protos="<span>"+arrResults[i].protos[0]+"</span>" +
                               "<span>"+arrResults[i].protos[1]+"</span>"
                       }else if(arrResults[i].protos.length==1){
                           protos="<span>"+arrResults[i].protos[0]+"</span>"
                       }
                     // 攻击类型
                       var attTypes="";
                       if(arrResults[i].types.length>=3){
                           attTypes="<span style='background:#e3221f'>"+arrResults[i].types[0]+"</span>" +
                               "<span style='background:#f3d354'>"+arrResults[i].types[1]+"</span>" +
                               "<span style='background:#4AE13A'>"+arrResults[i].types[2]+"</span>";
                       }else if(arrResults[i].types.length==2) {
                           attTypes="<span style='background:#e3221f'>"+arrResults[i].types[0]+"</span>" +
                               "<span style='background:#f3d354'>"+arrResults[i].types[1]+"</span>"
                       }else if(arrResults[i].types.length==1) {
                           attTypes="<span style='background:#e3221f'>"+arrResults[i].types[0]+"</span>"
                       }
                       var tableCon = '<tr><td>' + arrResults[i].attkStartTime + '</td>' +
                           '<td>' + arrResults[i].attkEndTime + '</td>' +
                           '<td>' + arrResults[i].attkIP + '</td>' +
                           '<td class="tdImg"><img src="'+imgSrc+'" alt=""><span>' + arrResults[i].country + '</span></td>' +
                           '<td>'+protos+'</td>' +
                           '<td>'+attTypes+'</td>' +
                           '<td>' + levell + '</td>' +
                           '<td>' + arrResults[i].attkNum+ '</td>' +
                           '<td><button class="trace">攻击溯源</button></td></tr>';
                       tb.append(tableCon);
                   });
                   protosColor();

                   // 点击攻击溯源
                   $("#threatEventList").delegate("tr .trace","click",function () {
                       var thisTr=$(this).parents("tr");
                       var tableStartTime=thisTr.find("td").eq(0).html();
                       var tableEndTime=thisTr.find("td").eq(1).html();
                       var tableAttackIP=thisTr.find("td").eq(2).html();
                       var tableProtol=$("#protocol option:selected").val();
                       var tableattkType=$("#attakType option:selected").val();
                       var tableAttkCountry=thisTr.find("td").eq(3).find("span").html();
                       var tableAlertLevel=thisTr.find("td").eq(6).html();
                       var tableattkNum=thisTr.find("td").eq(7).html();
                       window.open("attackBack.html?startTime="+tableStartTime+"&endTime="+tableEndTime+"&attackIP="+tableAttackIP+"&protocol="+tableProtol+"&attkType="+tableattkType+"&alertLevel="+tableAlertLevel+"&attkNum="+tableattkNum+"&fastTime="+fastTime+"&attkCountry="+tableAttkCountry+"","_self")
                   })
                   if(arrResults.length<10){
                       for(var j=0;j<10-arrResults.length;j++){
                           var tableConn='<tr style="height: 38px;"><td></td>' +
                               '<td></td><td></td><td></td><td></td><td></td><td></td><td></td><td></td></tr>'
                           tb.append(tableConn)
                       }
                   };
                   var totalCount = result.count; // 总条数
                   var currentPage = result.curPage; // 当前页
                   var pageCount = result.pageCount;
                   var pageSize = 10;  // 每页条数
                   $(".pagetotal").html(pageCount);
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
                           }, onPageClicked: function (event, originaEvent, type, page) {
                               Ajax(
                                   "/smarteye/api/search/alertEvent/search?startTime="+startTime+"&endTime="+endTime+"&fastTime="+fastTime+"&attkIP="+attkIP+"&attkType="+attkType+"&protocol="+protocol+"&alertLevel="+alertLevel+"&page="+page+"&pageSize=10",
                                   "get",
                                   "json",
                                   "",
                                   false,
                                   function (result) {
                                       console.log(result);
                                       var arrResults = eval(result.results)
                                       tb.html("");
                                       var tableTh = '<tr class="tableTh"><th>最早攻击时间</th><th>最近攻击时间</th><th>攻击IP</th><th>攻击地区</th> <th>利用协议</th> <th>攻击类型</th> <th>威胁级别</th> <th>攻击次数</th><th>深度分析</th></tr>'
                                       tb.append(tableTh);
                                       $.each(arrResults, function (i) {
                                           // 危险级别
                                           var levell = "";
                                           if (arrResults[i].level == 1) {
                                               levell = "低级威胁"
                                           } else if (arrResults[i].level == 2) {
                                               levell = "中级威胁"
                                           } else if (arrResults[i].level == 3) {
                                               levell = "高级威胁"
                                           };
                                           // 攻击地区
                                           var imgSrc = "";
                                           if (arrResults[i].location == "") {
                                               imgSrc = "images/flags/CN.png";
                                           } else {
                                               imgSrc = "image/flags/" + arrResults[i].location + ".png"
                                           };
                                           if(arrResults[i].country==""){
                                               arrResults[i].country="中国"
                                           }
                                           // 利用协议
                                           var protos="";
                                           if(arrResults[i].protos.length>=3){
                                               protos="<span>"+arrResults[i].protos[0]+"</span>" +
                                                   "<span>"+arrResults[i].protos[1]+"</span>" +
                                                   "<span>"+arrResults[i].protos[2]+"</span>";
                                           }else if(arrResults[i].protos.length==2){
                                               protos="<span>"+arrResults[i].protos[0]+"</span>" +
                                                   "<span>"+arrResults[i].protos[1]+"</span>"
                                           }else if(arrResults[i].protos.length==1){
                                               protos="<span>"+arrResults[i].protos[0]+"</span>"
                                           }
                                           // 攻击类型
                                           var attTypes="";
                                           if(arrResults[i].types.length>=3){
                                               attTypes="<span style='background:#e3221f'>"+arrResults[i].types[0]+"</span>" +
                                                   "<span style='background:#f3d354'>"+arrResults[i].types[1]+"</span>" +
                                                   "<span style='background:#4AE13A'>"+arrResults[i].types[2]+"</span>";
                                           }else if(arrResults[i].types.length==2) {
                                               attTypes="<span style='background:#e3221f'>"+arrResults[i].types[0]+"</span>" +
                                                   "<span style='background:#f3d354'>"+arrResults[i].types[1]+"</span>"
                                           }else if(arrResults[i].types.length==1) {
                                               attTypes="<span style='background:#e3221f'>"+arrResults[i].types[0]+"</span>"
                                           }
                                           var tableCon = '<tr><td>' + arrResults[i].attkStartTime + '</td>' +
                                               '<td>' + arrResults[i].attkEndTime + '</td>' +
                                               '<td>' + arrResults[i].attkIP + '</td>' +
                                               '<td class="tdImg"><img src="'+imgSrc+'" alt=""><span>' + arrResults[i].country + '</span></td>' +
                                               '<td>'+protos+'</td>' +
                                               '<td>'+attTypes+'</td>' +
                                               '<td>' + levell + '</td>' +
                                               '<td>' + arrResults[i].attkNum+ '</td>' +
                                               '<td><button class="trace">攻击溯源</button></td></tr>';
                                           tb.append(tableCon);
                                           // 点击攻击溯源
                                           $("#threatEventList").delegate("tr .trace","click",function () {
                                               var thisTr=$(this).parents("tr");
                                               var tableStartTime=thisTr.find("td").eq(0).html();
                                               var tableEndTime=thisTr.find("td").eq(1).html();
                                               var tableAttackIP=thisTr.find("td").eq(2).html();
                                               var tableProtol=$("#protocol option:selected").val();
                                               var tableattkType=$("#attakType option:selected").val();
                                               var tableAttkCountry=thisTr.find("td").eq(3).find("span").html();
                                               var tableAlertLevel=thisTr.find("td").eq(6).html();
                                               var tableattkNum=thisTr.find("td").eq(7).html();
                                               window.open("attackBack.html?startTime="+tableStartTime+"&endTime="+tableEndTime+"&attackIP="+tableAttackIP+"&protocol="+tableProtol+"&attkType="+tableattkType+"&alertLevel="+tableAlertLevel+"&attkNum="+tableattkNum+"&fastTime="+fastTime+"&attkCountry="+tableAttkCountry+"","_self")
                                           })
                                       });
                                       // gongjileixing()
                                       protosColor()
                                   }
                               )
                           }
                       }
                       $("#yema").bootstrapPaginator(options)
                   }

               }
           );
       }
        threatEvenList(1)
        // 到第几页
        $("#assetsTopage").click(function () {
            var toPage=$(this).prev("span").find("input").val();
            // console.log(toPage);
            threatEvenList(toPage);

        });
        // 总数
        Ajax(
            "/smarteye/api/search/alertEvent/stats?startTime="+startTime+"&endTime="+endTime+"&fastTime="+fastTime+"",
            "get",
            "json",
            "",
            false,
            function (result) {
                // console.log(result);
                $("#total").html(result.total)
                $("#highAttkNum").html(result.highAttkNum)
                $("#attkIPNum").html(result.attkIPNum)
                $("#attackedIPNum").html(result.attackedIPNum)
                $("#attkTypeNum").html(result.attkTypeNum)
                $("#protoNum").html(result.protoNum)
                $("#attkCountryNum").html(result.attkCountryNum)
            }
        )
        // 威胁趋势图
        var threatX=[],threatY=[];
        function alertLog(interval){
            Ajax(
                "/smarteye/api/search/alertEvent/dateHist?field=reqTime&startTime="+startTime+"&endTime="+endTime+"&fastTime="+fastTime+"&interval="+interval+"",
                "get",
                "json",
                "",
                false,
                function (result) {
                    // console.log(result);
                    threatX=[];threatY=[]
                    $.each(result,function (i) {
                        threatX.push(result[i].key)
                        threatY.push(result[i].count)
                    });
                    alertEchart();
                }
            )
        };
        alertLog(2);
        function alertEchart() {
            var threatTrendEchart=echarts.init(document.getElementById("threatTrendEchart"));
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
                    data: threatX,
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
                        data: threatY
                    },

                ]
            }; // 威胁趋势图
            threatTrendEchart.setOption(option);
        };
        $("#threatTrendTime").change(function () {
            var interval=$("#threatTrendTime option:selected").val();
            alertLog(interval)
        });

        // 利用协议排名
        var protocolX=[],protocolY=[];
        function protocolPai(){
            Ajax(
                "/smarteye/api/search/alertEvent/facet?field=protocol&startTime="+startTime+"&endTime="+endTime+"&fastTime="+fastTime+"&topN=5&isasc=false",
                "get",
                "json",
                "",
                false,
                function (result) {
                    // console.log(result);
                    protocolX=[];protocolY=[]
                    $.each(result,function (i) {
                        protocolX.push(result[i].key)
                        protocolY.push(result[i].count)
                    });
                    protocolEchart();
                }
            )
        };
        protocolPai();
        function protocolEchart() {
            var ProNameEchart=echarts.init(document.getElementById("ProNameEchart"));
            var option2={
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '10%',
                    containLabel: true
                },
                xAxis : [
                    {
                        // type : 'category',
                        data:protocolX ,
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
                        name: '',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var colorList = [
                                        '#ff8463','#07b4f0','#b0d311','#ec4566','#ff8463','#ff8463'
                                    ];
                                    return colorList[params.dataIndex]
                                },
                                barBorderRadius:[3, 3, 0, 0]
                            }
                        },
                        data: protocolY,
                    }
                ]
            };// 利用协议图
            ProNameEchart.setOption(option2);
        };

        // 攻击IP排名
        var srcIPX=[],srcIPY=[];
        function srcIP(){
            Ajax(
                "/smarteye/api/search/alertEvent/facet?field=srcIP&startTime="+startTime+"&endTime="+endTime+"&fastTime="+fastTime+"&topN=5&isasc=false",
                "get",
                "json",
                "",
                false,
                function (result) {
                    // console.log(result);
                    srcIPX=[];srcIPY=[]
                    $.each(result,function (i) {
                        srcIPX.push(result[i].key)
                        srcIPY.push(result[i].count)
                    });
                    srcIPEchart();
                }
            )
        };
        srcIP();
        function srcIPEchart() {
            var attkIPEchart=echarts.init(document.getElementById("attkIPEchart"));
            var option2={
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '15%',
                    containLabel: true
                },
                xAxis : [
                    {
                        // type : 'category',
                        data:srcIPX ,
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
                        name: '',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var colorList = [
                                        '#ff8463','#07b4f0','#b0d311','#ec4566','#ff8463','#ff8463'
                                    ];
                                    return colorList[params.dataIndex]
                                },
                                barBorderRadius:[3, 3, 0, 0]
                            }
                        },
                        data:srcIPY,
                    }
                ]
            };//
            attkIPEchart.setOption(option2);
        };

        // 被攻击IP排名
        var dstIPX=[],dstIPY=[];
        function dstIP(){
            Ajax(
                "/smarteye/api/search/alertEvent/facet?field=dstIP&startTime="+startTime+"&endTime="+endTime+"&fastTime="+fastTime+"&topN=5&isasc=false",
                "get",
                "json",
                "",
                false,
                function (result) {
                    // console.log(result);
                    dstIPX=[];dstIPY=[]
                    $.each(result,function (i) {
                        dstIPX.push(result[i].key)
                        dstIPY.push(result[i].count)
                    });
                    dstIPEchart();
                }
            )
        };
        dstIP();
        function dstIPEchart() {
            var attkedIPEchart=echarts.init(document.getElementById("attkedIPEchart"));
            var option2={
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '18%',
                    containLabel: true
                },
                xAxis : [
                    {
                        // type : 'category',
                        data:dstIPX ,
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
                        name: '',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var colorList = [
                                        '#ff8463','#07b4f0','#b0d311','#ec4566','#ff8463','#ff8463'
                                    ];
                                    return colorList[params.dataIndex]
                                },
                                barBorderRadius:[3, 3, 0, 0]
                            }
                        },
                        data:dstIPY,
                    }
                ]
            };//
            attkedIPEchart.setOption(option2);
        };

        // 攻击类型排名
        var mainRuleTypeX=[],mainRuleTypeY=[];
        function mainRuleType(){
            Ajax(
                "/smarteye/api/search/alertEvent/facet?field=mainRuleType&startTime="+startTime+"&endTime="+endTime+"&fastTime="+fastTime+"&topN=5&isasc=false",
                "get",
                "json",
                "",
                false,
                function (result) {
                    // console.log(result);
                    mainRuleTypeX=[];mainRuleTypeY=[]
                    $.each(result,function (i) {
                        mainRuleTypeX.push(result[i].key)
                        mainRuleTypeY.push(result[i].count)
                    });
                    mainRuleTypeEchart();
                }
            )
        };
        mainRuleType();
        function mainRuleTypeEchart() {
            var attkTypeEchart=echarts.init(document.getElementById("attkTypeEchart"));
            var option2={
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '15%',
                    containLabel: true
                },
                xAxis : [
                    {
                        // type : 'category',
                        data:mainRuleTypeX ,
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
                        name: '',
                        type: 'bar',
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var colorList = [
                                        '#ff8463','#07b4f0','#b0d311','#ec4566','#ff8463','#ff8463'
                                    ];
                                    return colorList[params.dataIndex]
                                },
                                barBorderRadius:[3, 3, 0, 0]
                            }
                        },
                        data:mainRuleTypeY,
                    }
                ]
            };//
            attkTypeEchart.setOption(option2);
        };

        // 攻击国家排名
        var srcCountryX=[],srcCountryY=[];
        function srcCountry(){
            Ajax(
                "/smarteye/api/search/alertEvent/facet?field=srcCountry&startTime="+startTime+"&endTime="+endTime+"&fastTime=-1&topN=5&isasc=false",
                "get",
                "json",
                "",
                false,
                function (result) {
                    // console.log(result);
                    srcCountryX=[];srcCountryY=[]
                    $.each(result,function (i) {
                        if(result[i].key==""){
                            result[i].key="中国"
                        }
                        srcCountryX.push(result[i].key)
                        srcCountryY.push(result[i].count)
                    });
                    attkAreaEchart();
                }
            )
        };
        srcCountry();
        function attkAreaEchart() {
            var attkAreaEchart=echarts.init(document.getElementById("attkAreaEchart"));
            var option2={
                tooltip : {
                    trigger: 'axis',
                    axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                        type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '8%',
                    containLabel: true
                },
                xAxis : [
                    {
                        // type : 'category',
                        data:srcCountryX ,
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
                        name: '',
                        type: 'bar',
                        barWidth : 35,
                        itemStyle: {
                            normal: {
                                color: function(params) {
                                    var colorList = [
                                        '#ff8463','#07b4f0','#b0d311','#ec4566','#ff8463','#ff8463'
                                    ];
                                    return colorList[params.dataIndex]
                                },
                                barBorderRadius:[3, 3, 0, 0]
                            }
                        },
                        data:srcCountryY,
                    }
                ]
            };//
            attkAreaEchart.setOption(option2);
        };
    }
    quanju()
    // 攻击类型颜色
    // function gongjileixing() {
    //     var attkTypeColor=["#4ae13a","#ec4566","#0cd55c"];
    //     for (var i = 0; i < $("#threatEventList tr td span").length; i++) {
    //         for(var j=0;j<arrLeixingT.length;j++){
    //             if ($("#threatEventList tr td span").eq(i).html() == arrLeixingT[j]) {
    //                 $("#threatEventList tr td span").eq(i).css({
    //                     background: attkTypeColor[j%3]
    //                 })
    //             }
    //         }
    //     }
    // }
    // 利用协议颜色
    function protosColor() {
        var protos=["HTTP","SMTP","IMAP","POP3","TELNET","FTP","DNS"]
        var attkTypeColor=["#19ab3c","#e3221f","#626afb"];
        for (var i = 0; i < $("#threatEventList tr td span").length; i++) {
            for(var j=0;j<protos.length;j++){
                if ($("#threatEventList tr td span").eq(i).html() == protos[j]) {
                    $("#threatEventList tr td span").eq(i).css({
                        background: attkTypeColor[j%3]
                    })
                }
            }
        }
    }
})