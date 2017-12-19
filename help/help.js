/**
 * Created by Administrator on 2017/9/27 0027.
 */
$(function(){
    //头部和尾部加载
    $("#header").load("../home/header.html");
    $("#footer").load("../company/footer.html");

    //内容切换
    //$("#li1").click(function(){
    //    $(".home_section").css({"display":"block"});
    //    $(".message,.culture,.vision,.business,.settled_banner,.join,.question").css({"display":"none"});
    //    $("#li1").css({"color":"#0396ff"});
    //    $("#li2,#li3,#li4,#li5,#li6,#li7,#li8,#li9,#li10").css({"color":"#333"});
    //});
    //$("#li2").click(function(){
    //    $(".home_section,.message,.vision,.business,.settled_banner,.join,.question").css({"display":"none"});
    //    $(".culture").css({"display":"block"});
    //    $("#li2").css({"color":"#0396ff"});
    //    $("#li1,#li3,#li4,#li5,#li6,#li7,#li8,#li9,#li10").css({"color":"#333"});
    //});
    //$("#li3").click(function(){
    //    $(".home_section,.culture,.message,.business,.settled_banner,.join,.question").css({"display":"none"});
    //    $(".vision").css({"display":"block"});
    //    $("#li3").css({"color":"#0396ff"});
    //    $("#li1,#li2,#li4,#li5,#li6,#li7,#li8,#li9,#li10").css({"color":"#333"});
    //});
    //$("#li4").click(function(){
    //    $(".home_section,.culture,.vision,.business,.settled_banner,.join,.question").css({"display":"none"});
    //    $(".message").css({"display":"block"});
    //    $("#li4").css({"color":"#0396ff"});
    //    $("#li1,#li2,#li3,#li5,#li6,#li7,#li8,#li9,#li10").css({"color":"#333"});
    //});
    //$("#li5").click(function(){
    //    $(".home_section,.culture,.vision,.message,.settled_banner,.join,.question").css({"display":"none"});
    //    $(".business").css({"display":"block"});
    //    $("#li5").css({"color":"#0396ff"});
    //    $("#li1,#li2,#li3,#li4,#li6,#li7,#li8,#li9,#li10").css({"color":"#333"});
    //});
    ////$("#li6").click(function(){
    ////    $(".home_section,.culture,.vision,.business,.settled_banner,.join,.question").css({"display":"none"});
    ////    $(".message").css({"display":"block"});
    ////    $("#li6").css({"color":"#0396ff"});
    ////    $("#li1,#li2,#li3,#li4,#li5,#li7,#li8,#li9,#li10").css({"color":"#333"});
    ////});
    //$("#li7").click(function(){
    //    $(".home_section,.culture,.vision,.message,.business,.settled_banner,.join").css({"display":"none"});
    //    $(".question").css({"display":"block"});
    //    $("#li7").css({"color":"#0396ff"});
    //    $("#li1,#li2,#li3,#li4,#li5,#li6,#li8,#li9,#li10").css({"color":"#333"});
    //});
    //$("#li9").click(function(){
    //    $(".home_section,.culture,.vision,.business,.message,.settled_banner,.question").css({"display":"none"});
    //    $(".join").css({"display":"block"});
    //    $("#li9").css({"color":"#0396ff"});
    //    $("#li1,#li2,#li3,#li4,#li5,#li6,#li7,#li8,#li10").css({"color":"#333"});
    //});
    //$("#li10").click(function(){
    //    $(".home_section,.culture,.vision,.business,.message,.join,.question").css({"display":"none"});
    //    $(".settled_banner").css({"display":"block"});
    //    $("#li10").css({"color":"#0396ff"});
    //    $("#li1,#li2,#li3,#li4,#li5,#li6,#li7,#li8,#li9").css({"color":"#333"});
    //})

});


$("body").ready(function(){
    //console.log($(".home_banner_we").eq(0).html());
    //生成标题部分
    $.ajax({
        url:"http://dz.tx178178.com/index.php?m=api&c=Help&a=help_type",
        type:"get",
        dataType:"json",
        data:{},
        success:function(data){
            //console.log(data);
            for (var i = 0; i < data[0].length; i++) {
                var li=$('<li>'+data[0][i].title+'</li>');
                $(".home_banner_we").eq(0).append(li);
            };
            for (var j = 0; j < data[1].length; j++) {
                var li=$('<li>'+data[1][j].title+'</li>');
                $(".home_banner_we").eq(1).append(li);
            };
            for (var k = 0; k < data[2].length; k++) {
                var li=$('<li>'+data[2][k].title+'</li>');
                $(".home_banner_we").eq(2).append(li);
            };
            //for (var n = 0; n < data[3].length; n++) {
            //    var li=$('<li>'+data[3][n].title+'</li>');
            //    $(".home_banner_we").eq(3).append(li);
            //};


            var artiid;
            //生成点击事件
            $(".home_banner_we>li").on("click",function(){
                //console.log($(this).text());
                for (var v = 0; v < data.length; v++) {
                    for (var z = 0; z < data[v].length; z++) {
                        if(data[v][z].title==$(this).text()){
                            //console.log(data[v][z].id);
                            artiid=data[v][z].id;

                            //生成文章部分

                            $.ajax({
                                url:"http://dz.tx178178.com/index.php?m=api&c=Help&a=help_content",
                                type:"get",
                                dataType:"json",
                                data:{
                                    id:artiid
                                },
                                success:function(data){
                                    $(".home_section").html(data);

                                },
                                error:function(data){

                                }
                            });
                        }

                    }

                }

            })



        },
        error:function(data){

        }
    });


    //默认进入内容
    var url=window.location.search;
    url=url.split("=")[1];
    if(url){
        url=url;
    }else{
        url=1
    }
    $.ajax({
        url:"http://dz.tx178178.com/index.php?m=api&c=Help&a=help_content",
        type:"get",
        dataType:"json",
        data:{
            id:url
        },
        success:function(data){
            $(".home_section").html(data);

        },
        error:function(data){

        }
    });

})