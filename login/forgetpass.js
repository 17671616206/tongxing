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


$("body").ready(function(){

    //判断是否填完
    var tim=setInterval(function(){
            if($(".user_input").val().length=='11'){
                $("#getcode").css({"background-color":"#0396FF"});
                $("#getcode").css({"color":"white"});
                $("#getcode").attr('disabled',false);
            }else{
                $("#getcode").css({"background-color":"#EEEEEE"});
                $("#getcode").css({"color":"#999999"});
                $("#getcode").attr('disabled',true);
            }
    },500);
    $("#getcode").on("click",function(){
        clearInterval(tim);
        var phone=$("#user").val();
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
                            $("#getcode").attr('disabled',true);
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
        })
    })

});

