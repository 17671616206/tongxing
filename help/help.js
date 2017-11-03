/**
 * Created by Administrator on 2017/9/27 0027.
 */
$(function(){
    //头部和尾部加载
    $("#header").load("../company/header.html");
    $("#footer").load("../company/footer.html");

    //内容切换
    $("#li1").click(function(){
        $(".home_section").css({"display":"block"});
        $(".message,.culture,.vision,.business,.settled_banner,.join,.question").css({"display":"none"});
        $("#li1").css({"color":"#0396ff"});
        $("#li2,#li3,#li4,#li5,#li6,#li7,#li8,#li9,#li10").css({"color":"#333"});
    });
    $("#li2").click(function(){
        $(".home_section,.message,.vision,.business,.settled_banner,.join,.question").css({"display":"none"});
        $(".culture").css({"display":"block"});
        $("#li2").css({"color":"#0396ff"});
        $("#li1,#li3,#li4,#li5,#li6,#li7,#li8,#li9,#li10").css({"color":"#333"});
    });
    $("#li3").click(function(){
        $(".home_section,.culture,.message,.business,.settled_banner,.join,.question").css({"display":"none"});
        $(".vision").css({"display":"block"});
        $("#li3").css({"color":"#0396ff"});
        $("#li1,#li2,#li4,#li5,#li6,#li7,#li8,#li9,#li10").css({"color":"#333"});
    });
    $("#li4").click(function(){
        $(".home_section,.culture,.vision,.business,.settled_banner,.join,.question").css({"display":"none"});
        $(".message").css({"display":"block"});
        $("#li4").css({"color":"#0396ff"});
        $("#li1,#li2,#li3,#li5,#li6,#li7,#li8,#li9,#li10").css({"color":"#333"});
    });
    $("#li5").click(function(){
        $(".home_section,.culture,.vision,.message,.settled_banner,.join,.question").css({"display":"none"});
        $(".business").css({"display":"block"});
        $("#li5").css({"color":"#0396ff"});
        $("#li1,#li2,#li3,#li4,#li6,#li7,#li8,#li9,#li10").css({"color":"#333"});
    });
    //$("#li6").click(function(){
    //    $(".home_section,.culture,.vision,.business,.settled_banner,.join,.question").css({"display":"none"});
    //    $(".message").css({"display":"block"});
    //    $("#li6").css({"color":"#0396ff"});
    //    $("#li1,#li2,#li3,#li4,#li5,#li7,#li8,#li9,#li10").css({"color":"#333"});
    //});
    $("#li7").click(function(){
        $(".home_section,.culture,.vision,.message,.business,.settled_banner,.join").css({"display":"none"});
        $(".question").css({"display":"block"});
        $("#li7").css({"color":"#0396ff"});
        $("#li1,#li2,#li3,#li4,#li5,#li6,#li8,#li9,#li10").css({"color":"#333"});
    });
    $("#li9").click(function(){
        $(".home_section,.culture,.vision,.business,.message,.settled_banner,.question").css({"display":"none"});
        $(".join").css({"display":"block"});
        $("#li9").css({"color":"#0396ff"});
        $("#li1,#li2,#li3,#li4,#li5,#li6,#li7,#li8,#li10").css({"color":"#333"});
    });
    $("#li10").click(function(){
        $(".home_section,.culture,.vision,.business,.message,.join,.question").css({"display":"none"});
        $(".settled_banner").css({"display":"block"});
        $("#li10").css({"color":"#0396ff"});
        $("#li1,#li2,#li3,#li4,#li5,#li6,#li7,#li8,#li9").css({"color":"#333"});
    })

})