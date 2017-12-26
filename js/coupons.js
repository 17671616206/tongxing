/**
 * Created by Administrator on 2017/11/1 0001.
 */
$(function() {
    //头部和尾部加载
    $("#header").load("../home/header.html");
    $("#banleft").load("../public/banleft.html");
    $("#footer").load("../company/footer.html");
    $(".coupons_lista>li").click(function(){
        $(this).addClass('couactive').siblings().removeClass("couactive");
        $(".Coupon_clist").eq($(this).index()).show().siblings("ul").hide();
    })
});

var user_id=localStorage.getItem("user_id");

//首页个人信息部分
$.ajax({
    type:"post",
    url:"http://dz.tx178178.com/index.php?m=api&c=User&a=userCenterHomeOne",
    dataType:"json",
    data:{user_id:user_id},
    success:function(data){
        console.log(data);
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