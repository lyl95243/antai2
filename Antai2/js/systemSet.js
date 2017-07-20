/**
 * Created by dell on 2017/7/18.
 */
$(function () {
    $(".nav-tabs ul li").click(function () {
        var index=$(this).index();
        $(this).addClass("liClick").siblings().removeClass();
        $(".tab-pane>ul>li").eq(index).fadeIn().siblings().hide()
    })
    $(".active>a").css({
        background:"#013d85"
    })

    // 接口信息表格
    Ajax(
        "/smarteye/api/system/systemSetting/systemInterfaceList?page=1&pageSize=10",
        "get",
        "json",
        "",
        false,
        function (result) {
            console.log(result);
            var arrResult=eval(result.results);
            var tb=$("#systemTab");
            var tableTh='<tr><th>名称</th><th>地址</th><th>掩码</th><th>状态</th><th>操作</th></tr>'
            tb.append(tableTh);
            $.each(arrResult,function (i) {
                var tableCon='<tr><td>'+arrResult[i].name+'</td>' +
                    '<td>'+arrResult[i].address+'</td>' +
                    '<td>'+arrResult[i].netmask+'</td>' +
                    '<td>'+arrResult[i].status+'</td>' +
                    '<td><button class="edit">编辑</button></td></tr>'
                tb.append(tableCon);
                if(arrResult[i].status=="up"){
                    // $(".inter div").eq(arrResult[i].row-1).find("img").eq(arrResult[i].column-1).attr("src","image/portSetUp.png");
                    $(".inter>div").eq(arrResult[i].row-1).find("span").eq(arrResult[i].column-1).addClass("interUp");
                }else if(arrResult[i].status=="down"){
                    // $(".inter div").eq(arrResult[i].row-1).find("img").eq(arrResult[i].column-1).attr("src","image/portSetDown.png");
                    $(".inter>div").eq(arrResult[i].row-1).find("span").eq(arrResult[i].column-1).addClass("interDown");
                }
            });
            $("#systemTab tr").click(function () {
                $(this).addClass("trClick").siblings().removeClass()
                var index=$(this).index()-1;
                var row=arrResult[index].row-1;  //行
                var column=arrResult[index].column-1;
                $(".inter>div span").removeClass("interUpLight interDownLight");
                if($(".inter div").eq(row).find("span").eq(column).hasClass("interUp")){
                    $(".inter div").eq(row).find("span").eq(column).addClass("interUpLight");
                }else if($(".inter div").eq(row).find("span").eq(column).hasClass("interDown")){
                    $(".inter div").eq(row).find("span").eq(column).addClass("interDownLight");
                }

            });
            var totalCount=result.count;
            var currentPage=result.curPage;
            var pageCount=result.pageCount;
            var pageSize=10;
            $(".pagetotal").html(pageCount);
            if(pageCount>=1){
                var options={
                    bootstrapMajorVersion:2,
                    currentPage:currentPage,
                    totalPages:pageCount,
                    numebrOfPages:5,
                    itemTexts:function (type,page,current) {
                        switch(type){
                            case "first":
                                return "&lt;&lt;";
                            case "prev":
                                return "&lt;";
                            case "next":
                                return "&gt;";
                            case "last":
                                return "&gt;&gt;";
                            case "page":
                                return page;
                        }
                    },onPageClicked:function (event,originaEvent,type,page) {
                        Ajax(
                            "/smarteye/api/system/systemSetting/systemInterfaceList?page="+page+"&pageSize=10",
                            "get",
                            "json",
                            "",
                            false,
                            function (result) {
                                var arrResult=eval(result.results);
                                tb.html("");
                                var tableTh='<tr><th>名称</th><th>地址</th><th>掩码</th><th>状态</th><th>操作</th></tr>'
                                tb.append(tableTh);
                                $.each(arrResult,function (i) {
                                    var tableCon='<tr><td>'+arrResult[i].name+'</td>' +
                                        '<td>'+arrResult[i].address+'</td>' +
                                        '<td>'+arrResult[i].netmask+'</td>' +
                                        '<td>'+arrResult[i].status+'</td>' +
                                        '<td><button class="edit">编辑</button></td></tr>'
                                    tb.append(tableCon);
                                    if(arrResult[i].status=="up"){
                                        // $(".inter div").eq(arrResult[i].row-1).find("img").eq(arrResult[i].column-1).attr("src","image/portSetUp.png");
                                        $(".inter>div").eq(arrResult[i].row-1).find("span").eq(arrResult[i].column-1).addClass("interUp");
                                    }else if(arrResult[i].status=="down"){
                                        // $(".inter div").eq(arrResult[i].row-1).find("img").eq(arrResult[i].column-1).attr("src","image/portSetDown.png");
                                        $(".inter>div").eq(arrResult[i].row-1).find("span").eq(arrResult[i].column-1).addClass("interDown");
                                    }
                                });
                                $("#systemTab tr").click(function () {
                                    $(this).addClass("trClick").siblings().removeClass()
                                    var index=$(this).index()-1;
                                    var row=arrResult[index].row-1;  //行
                                    var column=arrResult[index].column-1;
                                    $(".inter>div span").removeClass("interUpLight interDownLight");
                                    if($(".inter div").eq(row).find("span").eq(column).hasClass("interUp")){
                                        $(".inter div").eq(row).find("span").eq(column).addClass("interUpLight");
                                    }else if($(".inter div").eq(row).find("span").eq(column).hasClass("interDown")){
                                        $(".inter div").eq(row).find("span").eq(column).addClass("interDownLight");
                                    }
                                });
                            }
                        )
                    }
                }
                $("#yema").bootstrapPaginator(options)
            }
        }
    );

    // 关机
    $(".guanji").click(function () {
        Ajax(
            "/smarteye/api/system/systemSetting/shutdown",
            "get",
            "json",
            "",
            false,
            function (result) {
                if(result.status==0){
                    alert("关机成功")
                }else {
                    alert("关机失败")
                }
            }
        )
    })
    // 重新启动
    $(".chongqi").click(function () {
        Ajax(
            "/smarteye/api/system/systemSetting/reboot",
            "get",
            "json",
            "",
            false,
            function (result) {
                if(result.status==0){
                    alert("重新启动成功")
                }else {
                    alert("重新启动失败")
                }
            }
        )
    })

})