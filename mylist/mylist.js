/**
 * Created by Administrator on 2017/10/24 0024.
 */

$(function() {
    //头部和尾部加载
    $("#header").load("../home/header.html");
    $("#banleft").load("../public/banleft.html");
    $("#footer").load("../company/footer.html");
});

var user_id=localStorage.getItem("user_id");



setTimeout(function(){
    function GetQueryString(names)
    {
        var reg = new RegExp("(^|&)"+ names +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }

    var user_id=localStorage.getItem("user_id");
    var panging=GetQueryString("panging");
    if(user_id==undefined){
        //window.location.href ='../login/marketlogin.html';
    }
    if(panging==undefined){
        panging=1
    }


//首页个人信息部分
    $.ajax({
        type:"post",
        url:"http://dz.tx178178.com/index.php?m=api&c=User&a=userCenterHomeOne",
        dataType:"json",
        data:{user_id:user_id},
        success:function(data){
            //console.log(data.userimg);
            $(".user_camera>a").html('<img src="'+data.userimg+'" class="picter">');
            $(".came_right>div").eq(0).text(data.username);
            if(data.vip==0){
                $(".came_text").text("Vo 普通会员");
            }else{
                $(".came_text").text(data.vip+"级会员");
            }
            var num=data.infolist+"%";
            $(".progress-bar").css({width:num});
            $(".came_num").eq(0).text(num);
            var a=data.safe;
            a=eval('(' + a + ')');
            $(".came_self").html("").append("<span>账户安全：</span>");
            if(a.phone!==undefined){
                $(".came_self").append('<img src="../images/shouji1.png">')
            }
            if(a.wechat_openid!==undefined){
                $(".came_self").append('<img src="../images/ymima1.png">')
            }
            if(a.email!==undefined){
                $(".came_self").append('<img src="../images/youxiang1.png">')
            }

        },
        error:function(data){
            console.log("错误的"+data)
        }
    });

//----------------------------个人信息结束



    $.ajax({
        type:"post",
        url:"http://dz.tx178178.com/index.php?m=api&c=User&a=orderCenter",
        dataType:"json",
        data:{
            user_id:user_id,
            panging:panging
        },
        success:function(data){
            if(data!==0){
                for (var i = 0; i < data.length; i++) {
                    if(data[i].status=="未付款"){
                        //var goodsimg = eval('(' + data[i].goodsimg + ')');
                        var t=data[i].goodsimg;
                        var list=$('<div class="col-md-12 list_wai2"><ul class="col-md-12 list_wai list_content1"><li class="col-md-4">'+data[i].ordertime+'&nbsp;&nbsp;订单号：<span style="color:#333;">'+data[i].ordernum+'</span></li><li class="col-md-2">'+data[i].goodsname+'</li></ul><ul class="col-md-12 list_content"><li class="col-md-4"><div class="list_content_imgz"><img class="list_content_img" src="'+t+'" alt=""/></div><div class="list_content_text"><span>'+data[i].goodsinfo+'</span></div></li><li class="col-md-2">×1</li><li class="col-md-1">'+data[i].address_name+'</li><li class="col-md-1">'+data[i].goods_num+'元</li><li class="col-md-2">'+data[i].status+'</li><li class="col-md-2 button"><a href="" class="btn btn-sm btn-danger">付款</a></li></ul></div>');
                    }else{
                        var list=$('<div class="col-md-12 list_wai2"><ul class="col-md-12 list_wai list_content1"><li class="col-md-4">'+data[i].ordertime+'&nbsp;&nbsp;订单号：<span style="color:#333;">'+data[i].ordernum+'</span></li><li class="col-md-2">'+data[i].goodsname+'</li></ul><ul class="col-md-12 list_content"><li class="col-md-4"><div class="list_content_imgz"><img class="list_content_img" src="'+t+'" alt=""/></div><div class="list_content_text"><span>'+data[i].goodsinfo+'</span></div></li><li class="col-md-2">×1</li><li class="col-md-1">'+data[i].address_name+'</li><li class="col-md-1">'+data[i].goods_num+'元</li><li class="col-md-2">'+data[i].status+'</li><li class="col-md-2 button"><a href="" class="btn btn-sm btn-danger">评价</a><a href="" class="btn btn-sm btn-info">晒单</a></li></ul></div>');
                        $(".list_wai1").append(list);
                        //console.log(2);
                    }
                    $(".list_wai1").append(list);
                }
            }else{
                var list=$('<div class="col-md-12 list_wai2"><ul class="col-md-12 list_wai list_content1"><li class="col-md-4">您还没有下过订单<span style="color:#333;"></span></li><li class="col-md-2"></li></ul></div>');
                $(".list_wai1").append(list);
            }


        },
        error:function(data){
            console.log("错误的"+data)
        }
    });


//导航栏点击切换效果
    $("body").ready(function(){
        //console.log(1);
        $(".nav-tabs>li").on("click",function(){
            $(this).addClass("active").siblings().removeClass("active");
            //console.log($(this).text());
            $(".list_wai1").html("");
            if($(this).text()=="待付款"){
                console.log($(this).text());
                panging=1;
                cut(panging);
            }
            if($(this).text()=="已付款"){
                console.log($(this).text());
                panging=2;
                cut(panging);
            }
            if($(this).text()=="已完成"){
                console.log($(this).text());
                panging=3;
                cut(panging);
            }
            if($(this).text()=="已退货"){
                console.log($(this).text());
                panging=4;
                cut(panging);
            }

        });


    });




    function cut(panging){
        $.ajax({
            type:"post",
            url:"http://dz.tx178178.com/index.php?m=api&c=User&a=orderCenter",
            dataType:"json",
            data:{
                user_id:user_id,
                panging:panging
            },
            success:function(data){
                if(data!==0){
                for (var i = 0; i < data.length; i++) {
                    var t=data[i].goodsimg;
                    if(data[i].status=="未付款"){
                        var list=$('<div class="col-md-12 list_wai2"><ul class="col-md-12 list_wai list_content1"><li class="col-md-4">'+data[i].ordertime+'&nbsp;&nbsp;订单号：<span style="color:#333;">'+data[i].ordernum+'</span></li><li class="col-md-2">'+data[i].goodsname+'</li></ul><ul class="col-md-12 list_content"><li class="col-md-4"><div class="list_content_imgz"><img class="list_content_img" src="'+t+'" alt=""/></div><div class="list_content_text"><span>'+data[i].goodsinfo+'</span></div></li><li class="col-md-2">×1</li><li class="col-md-1">'+data[i].address_name+'</li><li class="col-md-1">'+data[i].goods_num+'元</li><li class="col-md-2">'+data[i].status+'</li><li class="col-md-2 button"><a href="" class="btn btn-sm btn-danger">付款</a></li></ul></div>');
                    }else{
                        if(data[i].status=="已退款"){
                            var list=$('<div class="col-md-12 list_wai2"><ul class="col-md-12 list_wai list_content1"><li class="col-md-4">'+data[i].ordertime+'&nbsp;&nbsp;订单号：<span style="color:#333;">'+data[i].ordernum+'</span></li><li class="col-md-2">'+data[i].goodsname+'</li></ul><ul class="col-md-12 list_content"><li class="col-md-4"><div class="list_content_imgz"><img class="list_content_img" src="'+t+'" alt=""/></div><div class="list_content_text"><span>'+data[i].goodsinfo+'</span></div></li><li class="col-md-2">×1</li><li class="col-md-1">'+data[i].address_name+'</li><li class="col-md-1">'+data[i].goods_num+'元</li><li class="col-md-2">'+data[i].status+'</li><!--<li class="col-md-2 button"><a href="" class="btn btn-sm btn-danger">评价</a><a href="" class="btn btn-sm btn-info">晒单</a></li>--></ul></div>');
                            $(".list_wai1").append(list);
                        }else{
                            var list=$('<div class="col-md-12 list_wai2"><ul class="col-md-12 list_wai list_content1"><li class="col-md-4">'+data[i].ordertime+'&nbsp;&nbsp;订单号：<span style="color:#333;">'+data[i].ordernum+'</span></li><li class="col-md-2">'+data[i].goodsname+'</li></ul><ul class="col-md-12 list_content"><li class="col-md-4"><div class="list_content_imgz"><img class="list_content_img" src="'+t+'" alt=""/></div><div class="list_content_text"><span>'+data[i].goodsinfo+'</span></div></li><li class="col-md-2">×1</li><li class="col-md-1">'+data[i].address_name+'</li><li class="col-md-1">'+data[i].goods_num+'元</li><li class="col-md-2">'+data[i].status+'</li><li class="col-md-2 button"><a href="" class="btn btn-sm btn-danger">评价</a><a href="" class="btn btn-sm btn-info">晒单</a></li></ul></div>');
                            $(".list_wai1").append(list);
                        }}

                    $(".list_wai1").append(list);
                }
                }else{
                    var list=$('<div class="col-md-12 list_wai2"><ul class="col-md-12 list_wai list_content1"><li class="col-md-4">您还没有下过订单<span style="color:#333;"></span></li><li class="col-md-2"></li></ul></div>');
                    $(".list_wai1").append(list);
                }

            },
            error:function(data){
                console.log("错误的"+data)
            }
        });
    }
},400)