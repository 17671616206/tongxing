/**
 * Created by Administrator on 2017/10/7 0007.
 */
$(function(){
    $(".mail").click(function(){
        $(".phone").css({"display":"block"});
        $(".mail").css({"display":"none"});
        $(".phone2").css({"display":"block"});
        $(".mail2").css({"display":"none"});
        $("#rebtn").css({"display":"none"});
        $("#mabtn").css({"display":"block"});
    });
    $(".phone").click(function(){
        $(".mail").css({"display":"block"});
        $(".phone").css({"display":"none"});
        $(".mail2").css({"display":"block"});
        $(".phone2").css({"display":"none"});
        $("#rebtn").css({"display":"block"});
        $("#mabtn").css({"display":"none"});
    });
    $("#login").click(function(){
        $("#login").removeClass("register");
        $("#login").addClass("login");
        $("#register").addClass("register");
        $("#register").removeClass("login");
        $(".content").css({"display":"block"});
        $(".content2").css({"display":"none"});
    });
    $("#register").click(function(){
        $("#login").addClass("register");
        $("#login").removeClass("login");
        $("#register").removeClass("register");
        $("#register").addClass("login");
        $(".content").css({"display":"none"});
        $(".content2").css({"display":"block"});
    });

    //    表单验证
    var oTel = document.getElementById("tel");
    var oMail = document.getElementById("mail");
    var reg1 = /a/;
    var str = "greena";
    var reg2 = /^1[3,4,5,7,8]{1}[0-9]{9}$/;
    $("#rebtn").click(function(){
        if(isNaN(oTel.value) == true){
            alert("电话号码不是数字！");
        }else if(oTel.value.length != 11){
            alert("电话号码必须是11位！")
        }else if(reg2.test(oTel.value) == false){
            alert("电话号码不正确")
        }
    });
    $("#mabtn").click(function(){
        if(oMail.value==""){
            alert("邮箱为空");
        }else if(oMail.value.indexOf("@")==-1 || oMail.value.indexOf(".")==-1){
            alert("Email或者必须包含符号@和.");
        }
    });

});


//console.log(Request.UserHostAddress.ToString());



function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

var url=GetQueryString("url");
console.log(url);
if(url==undefined){
    url="../home/content.html";
}

var username,password/*,ip*/,href;
href=url;

$("body").ready(function(){
    //登录模块
    $(".user_input").eq(0).on("blur",function(){
        console.log($(this).val());
        username=$(this).val();
    });
    $(".user_input").eq(1).on("blur",function(){
        console.log($(this).val());
        password=$(this).val();
    });
    //ip=returnCitySN["cip"]+','+returnCitySN["cname"];
    //获取到name和passsword
    $("#loginbtn").on("click",function(){
        console.log(username+"+"+password+"+"+/*ip+"+"+*/href);
        var ids=$(".user_input").val();
        //console.log(ids+"2333");
        localStorage.setItem("id",ids);
        //var id=localStorage.getItem("id");
        //console.log(id+"33333");
        $.ajax({
            type:"get",
            url:"http://dz.tx178178.com/index.php?m=api&c=User&a=login",
            dataType:"json",
            data:{
                //ip:ip,
                username:username,
                password:password,
                href:href
            },
            success:function(data){
                //var data = eval('(' + data + ')');//把字符串转化为数组
                console.log(data.state);
                if(data.state!==1){
                    $(".centers").text("对不起,没有这个账号!");
                }else{
                    $(".centers").text("");
                    console.log(data.info);

                    var salt_value=data.salt_value;
                    console.log(salt_value);
                    var ids=$(".user_input").val();
                    localStorage.setItem("salt_value",salt_value);
                    localStorage.setItem("id",ids);

                    window.location.href =''+href+'';

                }



            },
            error:function(data){
                console.log("错误的"+data)
            }
        });

    });


    //注册模块

    $("#tel").on("blur",function(){
        console.log($(this).val());
        phone=$(this).val();
    })
    $("#password").on("blur",function(){
        console.log($(this).val());
        passwd=$(this).val();
    });
    $("#code").on("blur",function(){
        console.log($(this).val());
        code=$(this).val();
    });
    var invitee=GetQueryString("user_id");
    if(invitee){
        invite=invitee;
        $("#invite").val(invitee);
    }

    $("#invite").on("blur",function(){
        console.log($(this).val());
        invite=$(this).val();
    });
    //ip=returnCitySN["cip"]+','+returnCitySN["cname"];
    //获取到name和passsword
    $("#getcode").on("click",function(){
        //$("#getcode").css({disable:true});
        $("#getcode").attr('disabled',true);
        $.ajax({
            type:"post",
            url:"http://dz.tx178178.com/index.php?m=api&c=Regist&a=messAges",
            dataType:"text",
            data:{
                phone:phone
            },
            success:function(data){
                var data = eval('(' + data + ')');//把字符串转化为数组
                if(data.state==1){
                    //alert(123);
                    $(".joininfo").text(data.info);
                    //$("#getcode").val(data.info);
                    var times=60;
                    $.extend({
                        time:function(){
                            $("#getcode").val(times+"秒后重发送");
                            times=times-1;
                            if(times==0){
                                $("#getcode").val("获取验证码");
                                clearInterval(settime);
                                $("#getcode").attr('disabled',false);
                            }
                        }
                    })
                    var settime=setInterval("$.time()",1000)


                }else{
                    alert(data.info);
                }

            },
            error:function(data){
                console.log("错误的"+data)
            }
        });
    })


    $("#rebtn").on("click",function(){
        console.log(username+"+"+password+"+"+/*ip+"+"+*/href);
        $.ajax({
            type:"post",
            url:"http://dz.tx178178.com/index.php?m=api&c=User&a=register",
            dataType:"text",
            data:{
                phone:phone,
                passwd:passwd,
                invite:invite,
                code:code
            },
            success:function(data){
                var data = eval('(' + data + ')');//把字符串转化为数组
                console.log(data);
                if(data.state!==1){
                    $(".joininfo").text(data.info);
                }else{
                    console.log(data.info);
                    //注册成功事件


                    window.location.href ='login.html';

                }



            },
            error:function(data){
                console.log("错误的"+data)
            }
        });

    });





})