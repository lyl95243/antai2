/**
 * Created by dell on 2017/7/17.
 */
$(function () {
    $(".nav-tabs ul li").click(function () {
        var index = $(this).index();
        $(this).addClass("liClick").siblings().removeClass();
        $(".tab-pane>ul>li").eq(index).fadeIn().siblings().hide()
    });

    $(".assetAddTitle>span,#addQuxiao").click(function () {
        $("#assetAdd").fadeOut()
    })
    $(".assetEditTitle>span,#editQuxiao").click(function () {
        $("#assetEdit").fadeOut()
    })
    $(".assetScanAddTitle>span,#scanAddQuxiao").click(function () {
        $("#assetScanAdd").fadeOut()
    })
    $(".assetScanEditTitle>span,#scanEditQuxiao").click(function () {
        $("#assetScanEdit").fadeOut()
    })
    // 资产列表
    var pagenumber = 1;

    function manList(pagenum) {
        Ajax(
            "/smarteye/api/search/assetsManage/assetsList?ip=&owner=&live=&type=&dep=&status=&page=" + pagenum + "&pageSize=10",
            "get",
            "json",
            "",
            false,
            function (result) {
                console.log(result);
                var arrResult = eval(result.results);
                var tb = $("#assetsTable");
                tb.html("");
                var tableTh = '<tr><th>IP</th><th>MAC</th><th>存活状态</th><th>类型</th><th>所有者</th><th>所属部门</th><th>状态</th><th>发起攻击数</th><th>被攻击数</th><th>DNS查询</th><th>流量</th><th>操作</th></tr>'
                tb.append(tableTh);
                $.each(arrResult, function (i) {
                    var live = "";
                    if (arrResult[i].live == true) {
                        live = "在线"
                    } else {
                        live = "不在线"
                    }
                    ;
                    var status = "";
                    if (arrResult[i].status == 0) {
                        status = "未确认"
                    } else if (arrResult[i].status == 1) {
                        status = "已确认"
                    }
                    ;
                    var tableCon = '<tr><td>' + arrResult[i].ip + '</td>' +
                        '<td>' + arrResult[i].mac + '</td>' +
                        '<td>' + live + '</td>' +
                        '<td>' + arrResult[i].type + '</td>' +
                        '<td>' + arrResult[i].owner + '</td>' +
                        '<td>' + arrResult[i].dep + '</td>' +
                        '<td>' + status + '</td>' +
                        '<td>' + arrResult[i].attkNum + '</td>' +
                        '<td>' + arrResult[i].attackedNum + '</td>' +
                        '<td>' + arrResult[i].dnsNum + '</td>' +
                        '<td>' + arrResult[i].streamSize + '</td>' +
                        '<td><button class="edit editMan">编辑</button><button class="edit delMan">删除</button><button class="affirm">确认</button></td></tr>'
                    tb.append(tableCon);
                });
                var totalCount = result.count;
                var currentPage = result.curPage;
                var pageCount = result.pageCount;
                var pageSize = 10;
                $(".pagetotal").html(pageCount);
                if (pageCount >= 1) {
                    var options = {
                        bootstrapMajorVersion: 2,
                        currentPage: currentPage,
                        totalPages: pageCount,
                        numberOfPages: 5,
                        itemTexts: function (type, page, current) {
                            switch (type) {
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
                        }, onPageClicked: function (event, originaEvent, type, page) {
                            pagenumber = page
                            Ajax(
                                "/smarteye/api/search/assetsManage/assetsList?ip=&owner=&live=&type=&dep=&status=&page=" + page + "&pageSize=10",
                                "get",
                                "json",
                                "",
                                false,
                                function (result) {
                                    console.log(result);
                                    var arrResult = eval(result.results);
                                    tb.html("");
                                    var tableTh = '<tr><th>IP</th><th>MAC</th><th>存活状态</th><th>类型</th><th>所有者</th><th>所属部门</th><th>状态</th><th>发起攻击数</th><th>被攻击数</th><th>DNS查询</th><th>流量</th><th>操作</th></tr>'
                                    tb.append(tableTh);
                                    $.each(arrResult, function (i) {
                                        var live = "";
                                        if (arrResult[i].live == true) {
                                            live = "在线"
                                        } else {
                                            live = "不在线"
                                        }
                                        ;
                                        var status = "";
                                        if (arrResult[i].status == 0) {
                                            status = "未确认"
                                        } else if (arrResult[i].status == 1) {
                                            status = "已确认"
                                        }
                                        var tableCon = '<tr><td>' + arrResult[i].ip + '</td>' +
                                            '<td>' + arrResult[i].mac + '</td>' +
                                            '<td>' + live + '</td>' +
                                            '<td>' + arrResult[i].type + '</td>' +
                                            '<td>' + arrResult[i].owner + '</td>' +
                                            '<td>' + arrResult[i].dep + '</td>' +
                                            '<td>' + status + '</td>' +
                                            '<td>' + arrResult[i].attkNum + '</td>' +
                                            '<td>' + arrResult[i].attackedNum + '</td>' +
                                            '<td>' + arrResult[i].dnsNum + '</td>' +
                                            '<td>' + arrResult[i].streamSize + '</td>' +
                                            '<td><button class="edit editMan">编辑</button><button class="edit delMan">删除</button><button class="affirm">确认</button></td></tr>'
                                        tb.append(tableCon);
                                    });
                                    queren();
                                    confirmBtn()
                                }
                            )
                        }
                    }
                    $("#yema").bootstrapPaginator(options)
                }
            }
        )
    }

    manList(pagenumber);
    // 到第几页
    $("#assetsTopage").click(function () {
        var toPage = $(this).prev("span").find("input").val();
        // console.log(toPage);
        manList(toPage);
        confirmBtn();
        queren();
    })
    // 判断添加资产弹窗中IP MAC地址是否合法
    var addIPReg = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/; // IP地址验证
    var addMACReg = /[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}:[A-F\d]{2}/i; // MAC地址验证
    $("#addMan,#addView").click(function () {
        $("#assetAdd").fadeIn()
        $("#assetAdd input,#assetIndent input").val("");
    });
    // 添加资产
    function addMan() {
        var addIP = $("#addIP input");
        var addMAC = $("#addMAC input");
        var addTYPE = $("#addType input").val();
        var addOWNER = $("#addOwner input").val();
        var addDEP = $("#addDep input").val();
        if (addIP.val() == "") {
            alert("IP地址不能为空")
        } else if (addIPReg.test(addIP.val())) {
            if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
                if (addMACReg.test(addMAC.val()) || addMAC.val() == "") {
                    var addIp = $("#addIP input").val(),
                        addMac = $("#addMAC input").val(),
                        addLive = $("#addLive>select option:selected").text(),
                        addType = $("#addType input").val(),
                        addOwner = $("#addOwner input").val(),
                        addDep = $("#addDep input").val(),
                        addStatus = $("#addStatus>select option:selected").text();
                    var addLivee, addStatuss;
                    if (addLive == "在线") {
                        addLivee = true
                    } else if (addLive == "不在线") {
                        addLivee = false
                    }
                    ;
                    if (addStatus == "确认" || addStatus == "已确认") {
                        addStatuss = 1
                    } else if (addStatus == "未确认") {
                        addStatuss = 0
                    }
                    Ajax(
                        "/smarteye/api/search/assetsManage/addAssets?ip=" + addIp + "&mac=" + addMac + "&live=" + addLivee + "&type=" + addType + "&owner=" + addOwner + "&dep=" + addDep + "&status=" + addStatuss + "",
                        "post",
                        "json",
                        "",
                        false,
                        function (result) {
                            console.log(result);
                            if (result.status == 0) {
                                alert("添加成功");
                            } else {
                                alert("添加失败")
                            }
                            $('#assetAdd').fadeOut();
                            manList(pagenumber)
                            confirmBtn()
                            queren()
                        }
                    )
                } else {
                    alert("MAC地址格式不正确")
                }
            } else {
                alert("IP地址格式不正确")
            }
        } else {
            alert("IP地址格式不正确")
        }

    };
    $("#addAffirm").click(function () {
        addMan()
    });
    // 编辑资产
    var oldIp, oldMac, oldLive, oldLivee, oldType, oldDep, oldOwner, oldStatus, oldStatuss;
    $("#assetsTable").delegate("tr .editMan", "click", function () {
        $("#assetEdit").fadeIn();
        var editTd = $(this).parents("tr").find("td");
        oldIp = editTd.eq(0).html(),
            oldMac = editTd.eq(1).html(),
            oldLive = editTd.eq(2).html(),
            oldType = editTd.eq(3).html(),
            oldOwner = editTd.eq(4).html(),
            oldDep = editTd.eq(5).html(),
            oldStatus = editTd.eq(6).html();
        if (oldLive == "在线") {
            oldLivee = true
        } else if (oldLive == "不在线") {
            oldLivee = false
        }
        if (oldStatus == "未确认") {
            oldStatuss = 0
        } else if (oldStatus == "已确认") {
            oldStatuss = 1
        }
        $("#editIp input").val(oldIp);
        $("#editMac input").val(oldMac);
        for (var i = 0; i < $("#editLive>select option").length; i++) {
            $("#editLive>select option")[i].removeAttribute("selected");
            $("#editStatus>select option")[i].removeAttribute("selected");
        }
        $("#editLive>select option[value='" + oldLive + "']").attr("selected", true);
        $("#editType input").val(oldType);
        $("#editDep input").val(oldDep);
        $("#editOwner input").val(oldOwner);
        $("#editStatus>select option[value='" + oldStatus + "']").attr("selected", true);
    })

    function editMan() {
        var editIp = $("#editIp input");
        var editMac = $("#editMac input");
        if (editIp.val() == "") {
            alert("IP地址不能为空")
        } else if (addIPReg.test(editIp.val())) {
            if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
                if (addMACReg.test(editMac.val()) || editMac.val() == "") {
                    if (addIPReg.test(editIp.val()) && RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
                        var newIp = $("#editIp input").val(),
                            newMac = $("#editMac input").val(),
                            newLive,
                            newType = $("#editType input").val(),
                            newDep = $("#editDep input").val(),
                            newOwner = $("#editOwner input").val(),
                            newStatus;
                        if ($("#editLive>select option:selected").text() == "在线") {
                            newLive = true
                        } else if ($("#editLive>select option:selected").text() == "不在线") {
                            newLive = false
                        } else {
                            newLive = true
                        }
                        if ($("#editStatus>select option:selected").text() == "未确认") {
                            newStatus = 0
                        } else if ($("#editStatus>select option:selected").text() == "确认") {
                            newStatus = 1
                        } else {
                            newStatus = 0
                        }
                        Ajax(
                            "/smarteye/api/search/assetsManage/updateAssets?oldIp=" + oldIp + "&oldMac=" + oldMac + "&oldLive=" + oldLivee + "&oldType=" + oldType + "&oldOwner=" + oldOwner + "&oldDep=" + oldDep + "&oldStatus=" + oldStatuss + "&newIp=" + newIp + "&newMac=" + newMac + "&newLive=" + newLive + "&newType=" + newType + "&newOwner=" + newOwner + "&newDep=" + newDep + "&newStatus=" + newStatus + "",
                            "post",
                            "json",
                            "",
                            false,
                            function (result) {
                                console.log(result);
                                if (result.status == 0) {
                                    alert("修改成功")
                                } else {
                                    alert("修改失败")
                                }
                                $("#assetEdit").fadeOut()
                                manList(pagenumber)
                                confirmBtn()
                                queren()
                            }
                        )
                    }
                    ;
                } else {
                    alert("MAC地址格式不正确")
                }
            } else {
                alert("IP地址格式不正确")
            }
        } else {
            alert("IP地址格式不正确")
        }

    };
    $("#editAffirm").click(function () {
        editMan()
    })

    // 删除资产
    $("#assetsTable").delegate("tr .delMan", "click", function () {
        var td = $(this).parents("tr").find("td");
        var editIp = td.eq(0).html(),
            editMac = td.eq(1).html(),
            editLive,
            editType = td.eq(3).html(),
            editDep = td.eq(5).html(),
            editOwner = td.eq(4).html(),
            editStatus;
        if (td.eq(2).html() == "在线") {
            editLive = true
        } else if (td.eq(2).html() == "不在线") {
            editLive = false
        }
        if (td.eq(6).html() == "未确认") {
            editStatus = 0
        } else if (td.eq(6).html() == "已确认") {
            editStatus = 1
        }
        ;
        if (confirm('确定要删除吗？')) {
            Ajax(
                "/smarteye/api/search/assetsManage/delAssets?ip=" + editIp + "&mac=" + editMac + "&live=" + editLive + "&type=" + editType + "&owner=" + editOwner + "&dep=" + editDep + "&status=" + editStatus + "",
                "post",
                "json",
                "",
                false,
                function (result) {
                    console.log(result);
                    if (result.status == 0) {
                        alert("删除成功")
                    } else {
                        alert("删除失败")
                    }
                    manList(pagenumber)
                    confirmBtn()
                    queren()
                }
            )
        } else {

        }
    });
    // 确认按钮
    function confirmBtn() {
        $(".affirm").click(function () {
            var querr = $(this);
            var quer = $(this).parents("td").prev("td");
            var editTd = $(this).parents("tr").find("td");
            oldIp = editTd.eq(0).html(),
                oldMac = editTd.eq(1).html(),
                oldLive = editTd.eq(2).html(),
                oldType = editTd.eq(3).html(),
                oldOwner = editTd.eq(4).html(),
                oldDep = editTd.eq(5).html(),
                oldStatus = editTd.eq(6).html();
            if (oldLive == "在线") {
                oldLivee = true
            } else if (oldLive == "不在线") {
                oldLivee = false
            }
            Ajax(
                "/smarteye/api/search/assetsManage/updateAssets?oldIp=" + oldIp + "&oldMac=" + oldMac + "&oldLive=" + oldLivee + "&oldType=" + oldType + "&oldOwner=" + oldOwner + "&oldDep=" + oldDep + "&oldStatus=0&newIp=" + oldIp + "&newMac=" + oldMac + "&newLive=" + oldLivee + "&newType=" + oldType + "&newOwner=" + oldOwner + "&newDep=" + oldDep + "&newStatus=1",
                "post",
                "json",
                "",
                false,
                function (result) {
                    console.log(result);
                    if (result.status == 0) {
                        quer.html("已确认");
                        querr.attr("disabled", "true").css({
                            "cursor": "default",
                            background: "transparent",
                            color: "#b0d311"
                        });
                    } else {

                    }

                }
            )
        })
    };
    confirmBtn()
    // 确认样式
    function queren() {
        var btn = $(".assetsTab tr");
        for (var i = 0; i < btn.length; i++) {
            if ($(".assetsTab tr").eq(i).find("td:last-child").prev("td").html() == "已确认") {
                $(".assetsTab tr").eq(i).find("td:last-child").find("button:last-child").attr("disabled", "true").css({
                    "cursor": "default",
                    border: '1px solid #b0d311',
                    color: '#b0d311',
                    background: 'transparent',
                });
            }
        }
    }

    queren();
    // 查找
    $(".search").click(function () {
        var ip, owner, type, dep, live = "", status = "";
        if ($("#ip").val() == $("#ip").attr("placeholder")) {
            ip = ""
        } else {
            ip = $("#ip").val()
        }
        ;
        if ($("#owner").val() == $("#owner").attr("placeholder")) {
            owner = ""
        } else {
            owner = $("#owner").val()
        }
        ;
        if ($("#type").val() == $("#type").attr("placeholder")) {
            type = ""
        } else {
            type = $("#type").val()
        }
        ;
        if ($("#dep").val() == $("#dep").attr("placeholder")) {
            dep = ""
        } else {
            dep = $("#dep").val()
        }
        ;
        if ($("#live option:selected").text() == "在线") {
            live = true
        } else if ($("#live option:selected").text() == "不在线") {
            live = false
        }
        ;
        if ($("#status option:selected").text() == "已确认") {
            status = 1
        } else if ($("#status option:selected").text() == "未确认") {
            status = 0
        }
        ;
        Ajax(
            "/smarteye/api/search/assetsManage/assetsList?ip=" + ip + "&owner=" + owner + "&live=" + live + "&type=" + type + "&dep=" + dep + "&status=" + status + "&page=1&pageSize=10",
            "get",
            "json",
            "",
            false,
            function (result) {
                console.log(result);
                var arrResult = eval(result.results);
                var tb = $("#assetsTable");
                tb.html("");
                var tableTh = '<tr><th>IP</th><th>MAC</th><th>存活状态</th><th>类型</th><th>所有者</th><th>所属部门</th><th>状态</th><th>操作</th></tr>'
                tb.append(tableTh);
                $.each(arrResult, function (i) {
                    var live = "";
                    if (arrResult[i].live == true) {
                        live = "在线"
                    } else {
                        live = "不在线"
                    }
                    ;
                    var status = "";
                    if (arrResult[i].status == 0) {
                        status = "未确认"
                    } else if (arrResult[i].status == 1) {
                        status = "已确认"
                    }
                    var tableCon = '<tr><td>' + arrResult[i].ip + '</td>' +
                        '<td>' + arrResult[i].mac + '</td>' +
                        '<td>' + live + '</td>' +
                        '<td>' + arrResult[i].type + '</td>' +
                        '<td>' + arrResult[i].owner + '</td>' +
                        '<td>' + arrResult[i].dep + '</td>' +
                        '<td>' + status + '</td>' +
                        '<td><button class="edit editMan">编辑</button><button class="edit delMan">删除</button><button class="affirm">确认</button></td></tr>'
                    tb.append(tableCon);
                });
                confirmBtn()
                queren()
                var totalCount = result.count;
                var currentPage = result.curPage;
                var pageCount = result.pageCount;
                var pageSize = 10;
                $(".pagez span").html(pageCount);
                if (pageCount >= 1) {
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
                                    return "&lt;";
                                case "next":
                                    return "&gt;";
                                case "last":
                                    return "&gt;&gt";
                                case "page":
                                    return page;
                            }
                        }, onPageClicked: function (event, originaEvent, type, page) {
                            var type = $("#type").val();
                            Ajax(
                                "/smarteye/api/search/devProperty/devPropertyList?ip=" + ip + "&owner=" + owner + "&live=" + live + "&type=" + type + "&dep=" + dep + "&status=" + status + "&page=" + page + "&pageSize=10",
                                "get",
                                "json",
                                "",
                                false,
                                function (result) {
                                    // console.log(result);
                                    var arrResult = eval(result.results);
                                    tb.html("");
                                    var tableTh = '<tr><th>IP</th><th>MAC</th><th>存活状态</th><th>类型</th><th>所有者</th><th>所属部门</th><th>状态</th><th>操作</th></tr>'
                                    tb.append(tableTh);
                                    $.each(arrResult, function (i) {
                                        var live = "";
                                        if (arrResult[i].live == true) {
                                            live = "在线"
                                        } else {
                                            live = "不在线"
                                        }
                                        ;
                                        var status = "";
                                        if (arrResult[i].status == 0) {
                                            status = "未确认"
                                        } else if (arrResult[i].status == 1) {
                                            status = "已确认"
                                        }
                                        var tableCon = '<tr><td>' + arrResult[i].ip + '</td>' +
                                            '<td>' + arrResult[i].mac + '</td>' +
                                            '<td>' + live + '</td>' +
                                            '<td>' + arrResult[i].type + '</td>' +
                                            '<td>' + arrResult[i].owner + '</td>' +
                                            '<td>' + arrResult[i].dep + '</td>' +
                                            '<td>' + status + '</td>' +
                                            '<td><button class="edit editMan">编辑</button><button class="edit delMan">删除</button><button class="affirm">确认</button></td></tr>'
                                        tb.append(tableCon);
                                    })
                                    confirmBtn()
                                    queren()
                                }
                            )
                        }
                    }
                    $("#yema").bootstrapPaginator(options)
                }
            }
        )
    });

    // 自动识别资产列表
    var pageNum = 1;
    var scanTableTrTdStart = [], scanTableTrTdEnd = [];

    function scanManList(pagenum) {
        Ajax(
            "/smarteye/api/search/assetsManage/assetsScanList?enable=&startIP=&endIP=&startPort=&endPort=&type=&dep=&status=&page=" + pagenum + "&pageSize=10",
            "get",
            "json",
            "",
            false,
            function (result) {
                console.log(result);
                scanTableTrTdStart = [];
                scanTableTrTdEnd = [];
                var arrResult = eval(result.results);
                var tb = $("#scanManTab");
                tb.html("");
                var tableTh = '<tr><th>状态</th><th>起始IP</th><th>终止IP</th><th>资产类型</th><th>所属部门</th><th>操作</th></tr>'
                tb.append(tableTh);
                $.each(arrResult, function (i) {
                    scanTableTrTdStart.push(arrResult[i].IPStart);
                    scanTableTrTdEnd.push(arrResult[i].IPEnd);
                    var tableCon = '<tr><td class="qiyong"><span title="启用" class=""></span></td>' +
                        '<td>' + arrResult[i].IPStart + '</td>' +
                        '<td>' + arrResult[i].IPEnd + '</td>' +
                        '<td>' + arrResult[i].type + '</td>' +
                        '<Td>' + arrResult[i].dep + '</Td>' +
                        '<td><i class="fa fa-edit scanEdit" style="font-size: 18px;cursor:pointer" title="修改"></i> <i class="fa fa-remove scanDel" style="font-size: 18px;cursor:pointer" title="删除"></i> <span title="启用" class="qiyongSpan"></span> <span title="停用" class="tingyongSpan"></span></td></tr>'
                    tb.append(tableCon);
                    if (arrResult[i].enabled == true) {
                        $("#scanManTab").find("tr").eq(i + 1).find(".qiyong span").addClass("qiyongT")
                    } else if (arrResult[i].enabled == false) {
                        $("#scanManTab").find("tr").eq(i + 1).find(".qiyong span").addClass("qiyongB")
                    }
                });
                qiting();
                qitingqiehuan();
                var height = $(".rightC").height();
                $(".leftNav").height(height)
                var totalCount = result.count;
                var currentPage = result.curPage;
                var pageCount = result.pageCount;
                var pageSize = 10;
                $(".pageScantotal").html(pageCount)
                if (pageCount >= 1) {
                    var options = {
                        bootstrapMajorVersion: 2,
                        currentPage: currentPage,
                        totalPages: pageCount,
                        numberOfPages: 5,
                        itemTexts: function (type, page, current) {
                            switch (type) {
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
                        }, onPageClicked: function (event, originaEvent, type, page) {
                            pageNum = page;
                            scanTableTrTdStart = [];
                            scanTableTrTdEnd = [];
                            Ajax(
                                "/smarteye/api/search/assetsManage/assetsScanList?enable=&startIP=&endIP=&startPort=&endPort=&type=&dep=&status=&page=" + page + "&pageSize=10",
                                "get",
                                "json",
                                "",
                                false,
                                function (result) {
                                    var arrResult = eval(result.results);
                                    tb.html("");
                                    var tableTh = '<tr><th>状态</th><th>起始IP</th><th>终止IP</th><th>资产类型</th><th>所属部门</th><th>操作</th></tr>'
                                    tb.append(tableTh);
                                    $.each(arrResult, function (i) {
                                        scanTableTrTdStart.push(arrResult[i].IPStart);
                                        scanTableTrTdEnd.push(arrResult[i].IPEnd);
                                        var tableCon = '<tr><td class="qiyong"><span title="启用" class=""></span></td>' +
                                            '<td>' + arrResult[i].IPStart + '</td>' +
                                            '<td>' + arrResult[i].IPEnd + '</td>' +
                                            '<td>' + arrResult[i].type + '</td>' +
                                            '<Td>' + arrResult[i].dep + '</Td>' +
                                            '<td><i class="fa fa-edit scanEdit" data-toggle="modal" data-target="#assetEditIndent" style="font-size: 18px;cursor:pointer" title="修改"></i> <i class="fa fa-remove scanDel" style="font-size: 18px;cursor:pointer" title="删除"></i> <span title="启用" class="qiyongSpan"></span> <span title="停用" class="tingyongSpan"></span></td></tr>'
                                        tb.append(tableCon);
                                        if (arrResult[i].enabled == true) {
                                            $("#scanManTab").find("tr").eq(i + 1).find(".qiyong span").addClass("qiyongT")
                                        } else if (arrResult[i].enabled == false) {
                                            $("#scanManTab").find("tr").eq(i + 1).find(".qiyong span").addClass("qiyongB")
                                        }
                                    })
                                    qiting()
                                    qitingqiehuan()
                                }
                            )
                        }
                    };
                    $("#yemaa").bootstrapPaginator(options)
                }
            }
        )
    };
    scanManList(pageNum);
    // 到第几页
    $("#assetsScanTopage").click(function () {
        var toPage = $(this).prev("span").find("input").val();
        // console.log(toPage);
        scanManList(toPage);
        qitingqiehuan();
        qiting();
    });
    // 自动识别添加资产
    $("#scanAdd").click(function () {
        $("#assetScanAdd").fadeIn()
        $("#assetScanAdd input").val("");
    });
    var ipNum = 0;
    // IP地址转换成数字
    function ipToNumber(ip) {
        if (ip == "") {
            return ipNum;
        }
        var aNum = ip.split(".");
        if (aNum.length != 4) {
            return ipNum;
        }
        ipNum += parseInt(aNum[0]) << 24;
        ipNum += parseInt(aNum[1]) << 16;
        ipNum += parseInt(aNum[2]) << 8;
        ipNum += parseInt(aNum[3]) << 0;
        ipNum = ipNum >>> 0;
        return ipNum;
    };
    ipToNumber("1.1.1.1")

    // 自动识别 添加资产
    function scanAdd() {
        // 判断自动识别资产弹窗中IP 端口是否合法
        var startIP = $("#startIP input").val();
        var endIP = $("#endIP input").val();
        var scanType = $("#scanType input").val();
        var scanDep = $("#scanDep input").val();
        ipNum = 0;
        ipToNumber(startIP);
        var startIpNum = ipNum;
        ipNum = 0;
        ipToNumber(endIP);
        var endIpNum = ipNum;

        function scanAddMan() {
            var q = true;
            for (var i = 0; i < scanTableTrTdEnd.length; i++) {
                ipNum = 0;
                ipToNumber(scanTableTrTdEnd[i])
                var end = ipNum;

                ipNum = 0;
                ipToNumber(scanTableTrTdStart[i])
                var start = ipNum;
                if (!(startIpNum > end || start > endIpNum)) {
                    alert("添加失败:添加IP地址范围与已添加列表中IP地址范围重叠")
                    q = false;
                    break;
                } else {
                    q = true;
                }
            }
            if (q) {
                Ajax(
                    "/smarteye/api/search/assetsManage/addAssetsScan?enable=true&startIP=" + startIP + "&endIP=" + endIP + "&startPort=&endPort=&type=" + scanType + "&dep=" + scanDep + "&status=",
                    "post",
                    "json",
                    "",
                    false,
                    function (result) {
                        console.log(result);
                        if (result.status == 0) {
                            alert("添加成功")
                            $("#assetScanAdd").fadeOut()
                        } else {
                            // alert("添加失败")
                        }
                        scanManList(pageNum);
                        qiting();
                        qitingqiehuan()
                    }
                )
            }
        }

        if (startIP == "") {
            alert("起始IP地址不能为空")
        } else if (addIPReg.test(startIP)) {
            if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
                if (endIP == "") {
                    alert("终止IP地址不能为空")
                } else if (addIPReg.test(endIP)) {
                    if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
                        if (startIpNum > endIpNum) {
                            alert("起始IP地址大于终止IP地址")
                        } else {
                            var port = /^(\d)+$/g;  // 端口验证
                            if (port.test(endPort) && parseInt(endPort) <= 65535 && parseInt(endPort) >= 0) {
                                if (parseInt(startPort) > parseInt(endPort)) {
                                    alert("起始端口大于终止端口")
                                } else {
                                    scanAddMan()
                                }
                            }
                        }
                    } else {
                        alert("终止IP地址格式不正确")
                    }
                } else {
                    alert("终止IP地址格式不正确")
                }
            } else {
                alert("起始IP地址格式不正确")
            }
        } else {
            alert("起始IP地址格式不正确")
        }
    }

    $("#scanAddAffirm").click(function () {
        console.log(2);
        scanAdd()
    });
    // 自动识别 编辑资产
    function scanEditMan() {
        // 判断自动识别资产弹窗中IP 端口是否合法
        var startIP = $("#startIPP input").val();
        var endIP = $("#endIPP input").val();
        var startPort = "";
        var endPort = "";
        ipNum = 0;
        ipToNumber(startIP);
        var startIpNum = ipNum; //填入的IP
        ipNum = 0;
        ipToNumber(endIP);
        var endIpNum = ipNum;

        function scanUpdate() {
            scanTableTrTdStart.splice(trIndex - 1, 1);
            scanTableTrTdEnd.splice(trIndex - 1, 1);
            if (scanTableTrTdStart.length == 0) {
                var f = true
            }
            for (var i = 0; i < scanTableTrTdEnd.length; i++) {
                ipNum = 0;
                ipToNumber(scanTableTrTdEnd[i])
                var end = ipNum;

                ipNum = 0;
                ipToNumber(scanTableTrTdStart[i])
                var start = ipNum;
                if (!(startIpNum > end || start > endIpNum)) {
                    alert("修改失败:IP地址范围与已添加列表中IP地址范围重叠");
                    var f = false;
                    break;
                } else {

                    f = true;
                }
            }
            if (f) {
                Ajax(
                    "/smarteye/api/search/assetsManage/updateAssetsScan?oldEnable=" + oldEnablee + "&oldStartIP=" + oldStartIp + "&oldEndIP=" + oldEndIp + "&oldStartPort=" + oldStartPort + "&oldEndPort=" + oldEndPort + "&oldType=" + oldScanType + "&oldDep=" + oldScanDep + "&oldStatus=&newEnable=" + oldEnablee + "&newStartIP=" + newStartIP + "&newEndIP=" + newEndIP + "&newStartPort=" + newStartPort + "&newEndPort=" + newEndPort + "&newType=" + scanType + "&newDep=" + scanDep + "&newStatus=",
                    "post",
                    "json",
                    "",
                    false,
                    function (result) {
                        console.log(result);
                        if (result.status == 0) {
                            alert("修改成功")
                            $("#assetScanEdit").fadeOut();
                        } else {
                            // alert("修改失败")
                        }
                        scanManList(pageNum);
                        qiting()
                        qitingqiehuan()
                    }
                )
            }
        }

        if (startIP == "") {
            alert("起始IP地址不能为空")
        } else if (addIPReg.test(startIP)) {
            if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
                if (endIP == "") {
                    alert("终止IP地址不能为空")
                } else if (addIPReg.test(endIP)) {
                    if (RegExp.$1 < 256 && RegExp.$2 < 256 && RegExp.$3 < 256 && RegExp.$4 < 256) {
                        if (startIpNum > endIpNum) {
                            alert("起始IP地址大于终止IP地址")
                        } else {
                            var newStartIP = $("#startIPP input").val(),
                                newEndIP = $("#endIPP input").val(),
                                newStartPort = "",
                                newEndPort ="",
                                scanType = $("#scanTypee input").val(),
                                scanDep = $("#scanDepp input").val();
                            scanUpdate()
                        }
                    } else {
                        alert("终止IP地址格式不正确")
                    }
                } else {
                    alert("终止IP地址格式不正确")
                }
            } else {
                alert("起始IP地址格式不正确")
            }
        } else {
            alert("起始IP地址格式不正确")
        }

    }

    $("#scanEditAffirm").click(function () {
        scanEditMan()
    });
    var trIndex;
    var oldEnable, oldEnablee, oldStartIp, oldEndIp, oldStartPort, oldEndPort, oldScanType, oldScanDep;
    $("#scanManTab").delegate("tr .scanEdit", "click", function () {
        trIndex = $(this).parents("tr").index();
        console.log(trIndex);
        $("#assetScanEdit").fadeIn()
        var scanTd = $(this).parents("tr").find("td");
        oldEnable = scanTd.eq(0).find("span"),
            oldStartIp = scanTd.eq(1).html(),
            oldEndIp = scanTd.eq(2).html(),
            oldStartPort = "",
            oldEndPort = "",
            oldScanType = scanTd.eq(3).html(),
            oldScanDep = scanTd.eq(4).html();
        if (oldEnable.hasClass("qiyongT")) {
            oldEnablee = true
        } else if (oldEnable.hasClass("qiyongB")) {
            oldEnablee = false
        }
        $("#startIPP input").val(oldStartIp);
        $("#endIPP input").val(oldEndIp);
        $("#startPortt input").val(oldStartPort);
        $("#endPortt input").val(oldEndPort);
        $("#scanTypee input").val(oldScanType);
        $("#scanDepp input").val(oldScanDep);
    })

    // 自动识别 删除资产
    $("#scanManTab").delegate("tr .scanDel", "click", function () {
        var scanTd = $(this).parents("tr").find("td");
        var enabled = scanTd.eq(0).find("span"), Enablee,
            startIp = scanTd.eq(1).html(),
            endIp = scanTd.eq(2).html(),
            startPort = "",
            endPort = "",
            type = scanTd.eq(3).html(),
            dep = scanTd.eq(4).html();
        if (enabled.hasClass("qiyongT")) {
            Enablee = true
        } else if (enabled.hasClass("qiyongB")) {
            Enablee = false
        }
        ;
        if (confirm("确定删除吗？")) {
            Ajax(
                "/smarteye/api/search/assetsManage/delAssetsScan?enable=" + Enablee + "&startIP=" + startIp + "&endIP=" + endIp + "&startPort=" + startPort + "&endPort=" + endPort + "&type=" + type + "&dep=" + dep + "&status=",
                "post",
                "json",
                "",
                false,
                function (result) {
                    console.log(result);
                    if (result.status == 0) {
                        alert("删除成功")
                    } else {
                        alert("删除失败")
                    }
                    ;
                    scanManList(pageNum);
                    qiting()
                    qitingqiehuan()
                }
            )
        }

    })
    qitingqiehuan()

})

function qiting() {
    for (var i = 0; i < $("#scanManTab tr").length; i++) {
        if ($("#scanManTab tr").eq(i).find(".qiyong span").hasClass("qiyongB")) {
            $("#scanManTab tr").eq(i).find(".qiyong span").attr("title", "停用")
            $(".qiyongB").parents("tr").find(".tingyongSpan").addClass("qitingyong").css({cursor: "default"})
        } else {
            $("#scanManTab tr").eq(i).find(".qiyongSpan").addClass("qitingyong").css({cursor: "default"})
        }
    }
}
function qitingqiehuan() {
    $(".tingyongSpan").click(function () {
        $(this).parents("tr").find(".qiyong span").removeClass().addClass("qiyongB").attr("title", "停用");
        $(this).prev("span").removeClass("qitingyong").css({cursor: "pointer"})
        $(this).addClass("qitingyong").css({cursor: "default"});
        var scanTd = $(this).parents("tr").find("td");
        var oldEnable, oldStartIp, oldEndIp, oldStartPort, oldEndPort, oldScanType, oldScanDep;
        oldEnable = scanTd.eq(0).find("span"),
            oldStartIp = scanTd.eq(1).html(),
            oldEndIp = scanTd.eq(2).html(),
            oldStartPort = scanTd.eq(3).html(),
            oldEndPort = scanTd.eq(4).html(),
            oldScanType = scanTd.eq(5).html(),
            oldScanDep = scanTd.eq(6).html();
        Ajax(
            "/smarteye/api/search/assetsManage/updateAssetsScan?oldEnable=true&oldStartIP=" + oldStartIp + "&oldEndIP=" + oldEndIp + "&oldStartPort=" + oldStartPort + "&oldEndPort=" + oldEndPort + "&oldType=" + oldScanType + "&oldDep=" + oldScanDep + "&oldStatus=&newEnable=false&newStartIP=" + oldStartIp + "&newEndIP=" + oldEndIp + "&newStartPort=" + oldStartPort + "&newEndPort=" + oldEndPort + "&newType=" + oldScanType + "&newDep=" + oldScanDep + "&newStatus=",
            "post",
            "json",
            "",
            false,
            function (result) {
                console.log(result);

            }
        )
    })
    $(".qiyongSpan").click(function () {
        $(this).parents("tr").find(".qiyong span").removeClass().addClass("qiyongT").attr("title", "启用");
        $(this).next("span").removeClass("qitingyong").css({cursor: "pointer"})
        $(this).addClass("qitingyong").css({cursor: "default"});
        var scanTd = $(this).parents("tr").find("td");
        var oldEnable, oldStartIp, oldEndIp, oldStartPort, oldEndPort, oldScanType, oldScanDep;
        oldEnable = scanTd.eq(0).find("span"),
            oldStartIp = scanTd.eq(1).html(),
            oldEndIp = scanTd.eq(2).html(),
            oldStartPort = scanTd.eq(3).html(),
            oldEndPort = scanTd.eq(4).html(),
            oldScanType = scanTd.eq(5).html(),
            oldScanDep = scanTd.eq(6).html();
        Ajax(
            "/smarteye/api/search/assetsManage/updateAssetsScan?oldEnable=false&oldStartIP=" + oldStartIp + "&oldEndIP=" + oldEndIp + "&oldStartPort=" + oldStartPort + "&oldEndPort=" + oldEndPort + "&oldType=" + oldScanType + "&oldDep=" + oldScanDep + "&oldStatus=&newEnable=true&newStartIP=" + oldStartIp + "&newEndIP=" + oldEndIp + "&newStartPort=" + oldStartPort + "&newEndPort=" + oldEndPort + "&newType=" + oldScanType + "&newDep=" + oldScanDep + "&newStatus=",
            "post",
            "json",
            "",
            false,
            function (result) {
                console.log(result);

            }
        )
    })
}



