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


    if(user_id==undefined){
        //window.location.href ='../login/marketlogin.html';
    }


//首页个人信息部分
    $.ajax({
        type:"post",
        url:"http://dz.tx178178.com/index.php?m=api&c=User&a=userCenterHomeOne",
        dataType:"text",
        data:{user_id:user_id},
        success:function(data){
            var data = eval('(' + data + ')');//把字符串转化为数组
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

},1200)