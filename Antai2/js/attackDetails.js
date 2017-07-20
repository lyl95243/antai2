/**
 * Created by dell on 2017/7/13.
 */
$(function () {
    // 偏移时间增减
    var inputValue = $(".fanwei input").val();
    console.log(inputValue);
    $('.fanwei input').bind('input propertychange', function () {
        inputValue = $(".fanwei input").val()
        // console.log(inputValue);
    });
    $(".caretx").click(function () {
        inputValue++
        $(".fanwei input").val(inputValue)
    })
    $(".carets").click(function () {
        inputValue--
        if (inputValue <= 0) {
            inputValue = 0
        }
        $(".fanwei input").val(inputValue)
    })



})