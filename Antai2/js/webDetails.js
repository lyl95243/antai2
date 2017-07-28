/**
 * Created by dell on 2017/7/13.
 */
$(function () {
    console.log(11111111111);

    $(".nav-tabs>ul li").click(function () {
        var index=$(this).index();
        $(this).addClass("liClick").siblings().removeClass();
        $(".tab-pane>ul li").eq(index).fadeIn().siblings().hide();
    })

    var esID=getQueryString("esID");
    var indexL=getQueryString("indexL");
    var type=getQueryString("type");

    //请求头 头部信息
    Ajax(
        "/smarteye/api/search/web/webDetails?esID="+esID+"&index="+indexL+"&type="+type+"",
        "get",
        "json",
        "",
        false,
        function (result) {
            // console.log(result);
            $(".webTable tr").eq(0).find("td:last-child").html(result.method);
            $(".webTable tr").eq(1).find("td:last-child").html(result.uri);
            $(".webTable tr").eq(2).find("td:last-child").html(result.version);
            $(".webTable tr").eq(3).find("td:last-child").html(result.status);
            var reqHeaders=eval(result.reqHeaders);
            var resHeaders=eval(result.resHeaders);
            $.each(reqHeaders,function (key) {
                var reqTable=$(".reqHeadTable");
                var reqTableCon="<tr><td>"+key+"</td><td>"+reqHeaders[key]+"</td></tr>";
                reqTable.append(reqTableCon);
            });
            $.each(resHeaders,function (key) {
                var resTable=$(".resTable");
                var resTableCon="<tr><td>"+key+"</td><td>"+resHeaders[key]+"</td></tr>";
                resTable.append(resTableCon);
            })
            var height=$(".container").height();
            $(".leftNav").height(height)
            $(".leftNavCon").height(height-3)
        }
    )
    // 请求体
    Ajax(
        "/smarteye/api/search/web/webReqBody?esID="+esID+"&index="+indexL+"&type="+type+"",
        "get",
        "json",
        "",
        false,
        function (result) {
            console.log(result);
            if(result.contentType==0){
                $(".reqBody").html(result.content)
            }else if(result.contentType==1){
                var divv=document.createElement("div");
                var aa=document.createElement("a")
                divv.innerHTML="请点击下载: ";
                aa.href=result.content;
                aa.innerHTML="下载请求体";
                aa.style="color:#fff;padding:5px;background:#008052;border-radius:3px;";
                divv.append(aa);
                $(".reqBody").append(divv)
            }

        }
    )
    // 相应体
    Ajax(
        "/smarteye/api/search/web/webResBody?esID="+esID+"&index="+indexL+"&type="+type+"",
        "get",
        "json",
        "",
        false,
        function (result) {
            console.log(result);
            if(result.contentType==0){
                var resultCon=result.content;
                var regex=/<style type=\"text\/css\">[\s\S]*?<\/style>/ig;
                var regexx=/<style>[\s\S]*?<\/style>/ig;
                var contentt=resultCon.replace(regex,"");
                var contenttt=contentt.replace(regexx,"");
                $(".resBody pre").text(contenttt);
                // console.log(contentt);
                $("#xiangyingyemian .textWrap").html(contenttt)
            }else if(result.contentType==1){
                $(".resBody pre").remove();
                var divv=document.createElement("div");
                var aa=document.createElement("a")
                divv.innerHTML="请点击下载: ";
                aa.href=result.content;
                aa.innerHTML="下载相应体";
                aa.style="color:#fff;padding:5px;background:#008052;border-radius:3px;"
                divv.append(aa);
                $(".resBody").append(divv)
            }

        }
    )

})