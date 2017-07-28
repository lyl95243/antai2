/**
 * Created by dell on 2017/7/13.
 */
$(function () {
    var esID=getQueryString("esID");
    var index=getQueryString("indexL");
    var type=getQueryString("type");

    Ajax(
        "/smarteye/api/search/mail/mailDetails?esID="+esID+"&index="+index+"&type="+type+"",
        "get",
        "json",
        "",
        false,
        function (result) {
            console.log(result);
            $(".emailTable tr").eq(0).find("td:last-child").html(result.title);
            $(".emailTable tr").eq(1).find("td:last-child").html(result.date);
            var mailFrom='<span>'+result.mailFrom+'</span><span class="traceNew">跟踪通讯信息</span>'
            $(".emailTable tr").eq(2).find("td:last-child").html(mailFrom);
            var mailTo=eval(result.mailTo);  // 收件人
            $.each(mailTo,function(i){
                var mailDiv='<div><span>'+mailTo[i]+'</span>' +
                    '<span class="traceNew">跟踪通讯信息</span></div>'
                $(".emailTable tr").eq(3).find("td:last-child").html(mailDiv);
            })
            var mailCC=eval(result.mailCC);  // 抄送
            $.each(mailCC,function(i){
                var mailDiv='<div><span>'+mailCC[i]+'</span>' +
                    '<span class="traceNew">跟踪通讯信息</span></div>'
                $(".emailTable tr").eq(4).find("td:last-child").html(mailDiv);
            })
            var attachments=eval(result.attachments);  //附件
            $(".emailTable tr").eq(5).find("td:last-child span").html(attachments.length);
            if(attachments.length!=0){
                $(".emailTable tr").eq(5).find("td:last-child a").html("("+attachments[0].fname+"、"+attachments[1].fname+")等");
                $.each(attachments,function(i){
                    var attachmentsLiCon='<li><span style="margin-right: 10px">'+attachments[i].fname+'</span>' +
                        '<a href="/smarteye/api/search/file/download?path='+attachments[i].path+'&fname='+attachments[i].fname+'" style="color: green">下载</a></li>';
                    $("#attchments>ul").append(attachmentsLiCon)
                })
            }
            var content=eval(result.content);
            var mailContent2=return2Br(content.mailContent);
            var mailContent3=return3Br(mailContent2);
            var mailContent=returnBr(mailContent3);
            if(content.type=="text"){
                $(".rightConM").html(mailContent)
            }else if(content.type=="html"){
                $(".rightConM").html(content.mailContent)
            }
            function returnBr(str) {
                return str.replace(/\n/g,"<br/><br/>");
            }
            function return2Br(str) {
                return str.replace(/\</g,"&lt");
            }
            function return3Br(str) {
                return str.replace(/\>/g,"&gt");
            }
            var height=$(".container").height();
            $(".leftNav").height(height)
            $(".leftNavCon").height(height-3)
        }
    )
    $(".emailTable .traceNew").click(function () {
        var mailAd=$(this).prev("span").html();
        console.log(mailAd);
        window.open("emailTrace.html?mail="+mailAd+"","_self")
    });

})