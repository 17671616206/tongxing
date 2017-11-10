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

var username,password,ip;

$("body").ready(function(){
    $(".user_input").eq(0).on("blur",function(){
        console.log($(this).val());
        username=$(this).val();
    })
    $(".user_input").eq(1).on("blur",function(){
        console.log($(this).val());
        password=$(this).val();
    });
    ip=returnCitySN["cip"]+','+returnCitySN["cname"];
    //获取到name和passsword
    $("#loginbtn").on("click",function(){
        console.log(username+"+"+password);
        $.ajax({
            type:"post",
            url:"http://dz.tx178178.com/index.php?m=api&c=User&a=login&username=123&password=123456&ip=127.0.0.1",
            dataType:"text",
            data:{
                ip:ip,
                username:username,
                password:password
            },
            success:function(data){
                var data = eval('(' + data + ')');//把字符串转化为数组
                console.log(data);
                if(data.state!==1){
                    $(".centers").text("对不起,没有这个账号!");
                }else{
                    console.log(data.info);
                    window.location.href ='../home/content.html'

                }



            },
            error:function(data){
                console.log("错误的"+data)
            }
        });

    });
})