/**
 * Created by dell on 2017/7/7.
 */
$(function () {

// 日历选择框
 $(".calendarXl>ul li").click(function () {
     var liHtml=$(this).html();
     $(".calendar>p").text(liHtml)
 })
    $(document).bind('click',function(){
        $('.calendarXl').css('display','none');
    });
    $('.calendar').bind('click',function(e){
        stopBubble(e);
        $(".calendarXl").show();
    })
    function stopBubble(e){
        if(e && e.stopPropagation){
            e.stopPropagation();  //w3c
        }else{
            window.event.cancelBubble=true; //IE
        }
    }

    // 左侧导航展开
    $(".nav>ul li").click(function () {
        $(this).find(".dianji").addClass("liClick");
        $(this).siblings().find(".dianji").removeClass("liClick");
        $(this).find(".navxl").slideToggle();
        $(this).siblings().find(".navxl").slideUp();
    });
    // $(".nav>ul li").hover(function () {
    //     $(this).find(".dianji").addClass("liClick");
    // },function () {
    //     $(this).find(".dianji").removeClass("liClick");
    // })
})
function Ajax(url, type, datatype, param,async, callbackSuccess, callbackErr) {
    $.ajax({
        url: url,
        type: type,
        dataType: datatype,
        data: param,
        async:async,
        contentType: "application/x-www-form-urlencoded;charset=UTF-8",
        // beforeSend: function () {
        //
        // },
        success: callbackSuccess,
        error: callbackErr,
    });
};
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var l = decodeURI(window.location.search);
    var r = l.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

