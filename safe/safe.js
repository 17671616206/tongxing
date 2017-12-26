/**
 * Created by Administrator on 2017/10/24 0024.
 */
$(function() {
    //头部和尾部加载
    $("#header").load("../home/header.html");
    $("#banleft").load("../public/banleft.html");
    $("#footer").load("../company/footer.html");
});



    function GetQueryString(names)
    {
        var reg = new RegExp("(^|&)"+ names +"=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if(r!=null)return  unescape(r[2]); return null;
    }

var user_id=localStorage.getItem("user_id");
if(user_id==undefined){
    //window.location.href ='../login/marketlogin.html';
}


    $.ajax({
        type:"post",
        url:"http://dz.tx178178.com/index.php?m=api&c=User&a=userAccount",
        dataType:"json",
        data:{user_id:user_id},
        success:function(data){
            $(".logoid").text(data.name);
            $(".email").text(data.email);
            $(".phone").text(data.phone);

        },
        error:function(data){
            console.log("错误的"+data)
        }
    });




//首页个人信息部分
$.ajax({
    type:"post",
    url:"http://dz.tx178178.com/index.php?m=api&c=User&a=userCenterHomeOne",
    dataType:"json",
    data:{user_id:user_id},
    success:function(data){
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

id=user_id;
$("body").ready(function(){
    //邮箱修改
    $(".changeemail").on("click",function(){
        console.log(123);
        var a=$(".email").text();
        console.log(a);
        $(".emailbox").html('<input class="emailinput" style="width:166px;display:inline-block" type="text" placeholder="'+a+'"/>');
        $(".emailbox").append($('<button class="emailchange" style="display: inline-block;width:40px;margin-left: 20px">确定</button>'));

        $(".emailchange").on("click",function(){
            var email=$(".emailinput").val();
            $.ajax({
                type:"post",
                url:"http://dz.tx178178.com/index.php?m=api&c=User&a=accountEdit",
                dataType:"text",
                data:{
                    id:user_id,
                    email:email
                },
                success:function(data){
                    var data = eval('(' + data + ')');//把字符串转化为数组

                    window.location.reload();
                },
                error:function(data){
                    console.log("错误的"+data)
                }
            });
        })


    });
    //绑定手机修改
    $(".changephone").on("click",function(){
        var b=$(".phone").text();
        console.log(b);
        $(".phone").html('<input style="width:145px;display:inline-block" type="text" placeholder="'+b+'"/>');
        $(".phone").append($('<button class="phonechange" style="display: inline-block;width:40px;margin-left: 20px">确定</button>'));

        $(".phonechange").on("click",function(){
            var phone=$(".emailinput").val();
            $.ajax({
                type:"post",
                url:"http://dz.tx178178.com/index.php?m=api&c=User&a=accountEdit",
                dataType:"json",
                data:{
                    id:user_id,
                    phone:phone
                },
                success:function(data){
                    //var data = eval('(' + data + ')');//把字符串转化为数组
                    window.location.reload();

                },
                error:function(data){
                    console.log("错误的"+data)
                }
            });
        })



    });

    //修改密码
    $(".changesec").on("click",function(){
        //console.log(203);
        $("#sec").css("visibility","visible");
        $(".change").on("click",function(){
            var oldsec=$(".oldsec").val();
            var id=localStorage.getItem("id");
            var newsec=$(".newsec").val();
            var newsecs=$(".newsecs").val();
            //console.log(oldsec);
            //console.log(newsec);
            //console.log(newsecs);
            if(newsec!==newsecs){
                $(".changeinfo").text("新密码不一致");
            }else{
            $(".changeinfo").text("");
            $.ajax({
                url:"http://dz.tx178178.com/index.php?m=api&c=User&a=PwdEdit",
                type:"post",
                dataType:"json",
                data:{
                    name:id,
                    used:oldsec,
                    pwdone:newsec,
                    pwdtwo:newsecs
                },
                success:function(data){
                    $(".changeinfo").text("修改成功！");

                },
                error:function(data){

                }
            })
        }


        })

    })



});
