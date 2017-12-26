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

    //上传图片点击事件
    $(".clickimg").click(function () {
        $("#upload").click(); //隐藏了input:file样式后，点击头像就可以本地上传
        $("#upload").on("change",function(){
            var objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
            if (objUrl) {
                $("#pic").attr("src", objUrl) ; //将图片路径存入src中，显示出图片
            }
        });
    });

    //上传图片点击事件
    $(".clickimg2").click(function () {
        $("#upload2").click(); //隐藏了input:file样式后，点击头像就可以本地上传
        $("#upload2").on("change",function(){
            var objUrl = getObjectURL(this.files[0]) ; //获取图片的路径，该路径不是图片在本地的路径
            if (objUrl) {
                $("#pic2").attr("src", objUrl) ; //将图片路径存入src中，显示出图片
            }
        });
    });


});

//建立一個可存取到該file的url
function getObjectURL(file) {
    var url = null ;
    if (window.createObjectURL!=undefined) { // basic
        url = window.createObjectURL(file) ;
    } else if (window.URL!=undefined) { // mozilla(firefox)
        url = window.URL.createObjectURL(file) ;
    } else if (window.webkitURL!=undefined) { // webkit or chrome
        url = window.webkitURL.createObjectURL(file) ;
    }
    return url ;
}

