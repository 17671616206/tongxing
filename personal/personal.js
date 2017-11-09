/**
 * Created by Administrator on 2017/10/24 0024.
 */
$(function() {
    //头部和尾部加载
    $("#header").load("../company/header.html");
    $("#banleft").load("../public/banleft.html");
    $("#footer").load("../company/footer.html");
});







function GetQueryString(names)
{
    var reg = new RegExp("(^|&)"+ names +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

var user_id=GetQueryString("user_id");
if(user_id==undefined){
    user_id=1
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




$.ajax({
    type:"post",
    url:"http://dz.tx178178.com/index.php?m=api&c=User&a=userPersonalInfo",
    dataType:"text",
    data:{user_id:user_id},
    success:function(data){
        var data = eval('(' + data + ')');//把字符串转化为数组
        //console.log(data);

        $(".col-md-push-1>span").text(data.username);
        $(".personal_img").attr('src',data.userimg);
        $(".col-sm-8").eq(2).html('<input type="text" name="area_name" class="form-control" value="'+data.username+'" /><span style="color: #999999;">*昵称填写须知：与淘宝业务或卖家品牌冲突的昵称，同兴将有可能收回</span>');
        $(".col-sm-8").eq(3).html('<input type="text" name="area_name" class="form-control" value="'+data.realname+'" />');

        //------------------------------------------------------------------------------------------
        if(data.sex==0){
            $(".col-sm-8").eq(4).html('<label class="radio-inline"><input type="checkbox" name="follow_task" value="1" />男</label><label class="radio-inline"><input type="checkbox" name="follow_task" value="0" />女</label>');
        }
        if(data.sex==1){
            $(".col-sm-8").eq(4).html('<label class="radio-inline"><input type="checkbox" checked="checked" name="follow_task" value="1" />男</label><label class="radio-inline"><input type="checkbox" name="follow_task" value="0" />女</label>');
        }
        if(data.sex==2){
            $(".col-sm-8").eq(4).html('<label class="radio-inline"><input type="checkbox" name="follow_task" value="1" />男</label><label class="radio-inline"><input type="checkbox" checked="checked" name="follow_task" value="0" />女</label>');
        }
        $(".radio-inline").eq(0).on("click",function(){
            $(".col-sm-8").eq(4).html('<label class="radio-inline"><input type="checkbox" checked="checked" name="follow_task" value="1" />男</label><label class="radio-inline"><input type="checkbox" name="follow_task" value="0" />女</label>');
        });
        $(".radio-inline").eq(1).on("click",function(){
            $(".col-sm-8").eq(4).html('<label class="radio-inline"><input type="checkbox" name="follow_task" value="1" />男</label><label class="radio-inline"><input type="checkbox" checked="checked" name="follow_task" value="0" />女</label>');
        })
        //console.log(data.birthday);
        var birthday=data.birthday.split(",");
        //console.log(birthday[0]);
        for (var i = 1960; i <= 2018; i++) {
            //var optionsyear=$('<option>'+i+'</option>');
            if(i==birthday[0]){
                var optionsyear=$('<option selected="selected">'+i+'</option>');
            }else{
                var optionsyear=$('<option>'+i+'</option>');
            }
            //console.log(options.html());
            $("#year").append(optionsyear);
        }
        for (var j = 1; j <= 12; j++) {
            //var optionsmonth=$('<option>'+j+'</option>');
            if(j==birthday[1]){
                var optionsmonth=$('<option selected="selected">'+j+'</option>');
            }else{
                var optionsmonth=$('<option>'+j+'</option>');
            }
            //console.log(options.html());
            $("#month").append(optionsmonth);
        }
        for (var k = 1; k <= 31; k++) {
            //var optionsday=$('<option>'+k+'</option>');
            if(k==birthday[2]){
                var optionsday=$('<option selected="selected">'+k+'</option>');
            }else{
                var optionsday=$('<option>'+k+'</option>');
            }
            //console.log(options.html());
            $("#day").append(optionsday);
        }



    },
    error:function(data){
        console.log("错误的"+data)
    }
});




//地址选择部分
//--------------------------------------------------------------------------

$.ajax({
    url:"http://dz.tx178178.com/index.php?m=api&c=User&a=regionChoice&id=1",
    type:"get",
    dataType:"json",
    data:{},
    success:function(data){
        for (var n = 0; n < data.length; n++) {
            var provideoption=$('<option>'+data[n].region_name+'</option>');
            $("#provide").append(provideoption);
        }

        $("#provide").on("change",function(){
            //console.log($("#provide>option:checked").text());
            for (var v = 0; v < data.length; v++) {
                if(data[v].region_name==$("#provide>option:checked").text()){
                    //console.log(data[v].region_id);
                    var id=data[v].region_id
                    //------------获取到地区ID

                    $.ajax({
                        url:"http://dz.tx178178.com/index.php?m=api&c=User&a=regionChoice&id="+id+"",
                        type:"get",
                        dataType:"json",
                        data:{},
                        success:function(data){

                            for (var m = 0; m < data.length; m++) {
                                var cityoption=$('<option>'+data[m].region_name+'</option>');
                                $("#city").append(cityoption);
                            }

                            $("#city").on("change",function(){
                                //console.log($("#provide>option:checked").text());
                                for (var s = 0; s < data.length; s++) {
                                    if(data[s].region_name==$("#city>option:checked").text()){
                                        //console.log(data[s].region_id);
                                        var id=data[s].region_id;
                                        //------------获取到地区ID
                                        $.ajax({
                                            url:"http://dz.tx178178.com/index.php?m=api&c=User&a=regionChoice&id="+id+"",
                                            type:"get",
                                            dataType:"json",
                                            data:{},
                                            success:function(data){

                                                for (var z = 0; z < data.length; z++) {
                                                    var cunoption=$('<option>'+data[z].region_name+'</option>');
                                                    $("#cun").append(cunoption);
                                                }


                                            },
                                            error:function(data){
                                                console.log("error"+data);
                                            }
                                        });
                                    }

                                }
                            })


                        },
                        error:function(data){
                            console.log("error"+data);
                        }
                    });


                }

            }
        })



    },
    error:function(data){
        console.log("error"+data);
    }
});






