/**
 * Created by dell on 2017/7/18.
 */
$(function () {
    $(".nav-tabs ul li").click(function () {
        var index=$(this).index();
        $(this).addClass("liClick").siblings().removeClass();
        $(".tab-pane>ul>li").eq(index).fadeIn().siblings().hide()
    })



})