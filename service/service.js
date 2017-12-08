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
    url:"http://dz.tx178178.com/index.php?m=api&c=User&a=userOrderAddress",
    dataType:"text",
    data:{user_id:user_id},
    success:function(data){
        var data = eval('(' + data + ')');//把字符串转化为数组

        $(".service_di").text("已保存了"+data.length+"条地址，还能保存"+(20-data.length)+"条");
        for (var i = 0; i < data.length; i++) {
            var list=$('<tr class="yg5_tr2"><td>'+data[i].contacts+'</td><td>'+data[i].region_str+'</td><td>'+data[i].address+'</td><td>'+data[i].zip_code+'</td><td>'+data[i].phone+'</td><td><a href="" class="btn btn-sm btn-info">修改</a><a href="" class="btn btn-sm btn-danger">删除</a></td></tr>');
            $(".yg5_tabel>tbody").append(list);
        }


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
        console.log(334);
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

var regions;

//地址选择部分
//--------------------------------------------------------------------------
var id0,id1,id2;
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
                    var id0=data[v].region_id
                    //------------获取到地区ID

                    $.ajax({
                        url:"http://dz.tx178178.com/index.php?m=api&c=User&a=regionChoice&id="+id0+"",
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
                                        var id1=data[s].region_id;
                                        //------------获取到地区ID
                                        $.ajax({
                                            url:"http://dz.tx178178.com/index.php?m=api&c=User&a=regionChoice&id="+id1+"",
                                            type:"get",
                                            dataType:"json",
                                            data:{},
                                            success:function(data){

                                                for (var z = 0; z < data.length; z++) {
                                                    var cunoption=$('<option>'+data[z].region_name+'</option>');
                                                    $("#cun").append(cunoption);
                                                }

                                                $("#cun").on("change",function(){
                                                    //console.log($("#provide>option:checked").text());
                                                    for (var s = 0; s < data.length; s++) {
                                                        if(data[s].region_name==$("#cun>option:checked").text()){
                                                            //console.log(data[s].region_id);
                                                            var id2=data[s].region_id;
                                                            //------------获取到地区ID
                                                            //console.log(id0+","+id1+","+id2);

                                                            regions=id0+","+id1+","+id2;
                                                            console.log(regions);
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


                }

            }
        })



    },
    error:function(data){
        console.log("error"+data);
    }
});


$("body").ready(function(){
    $(".btn").on("click",function(){
        var user_id=$(".came_right>div").val();
        var region=regions;
        var addresss=$(".addresss").val();
        var zip_code=$(".zip_code").val();
        var names=$(".name").val();
        var phones=$(".phone").val();
        var fixed_num=$(".tel0").val()+"-"+$(".tel1").val()+"-"+$(".tel2").val();
        if($(".checked").checked){
            //console.log(2.3);
            var state=1;
        }else{
            //console.log(555);
            var state=0;
        }


        console.log(111);



        $.ajax({
            type:"get",
            url:"http://dz.tx178178.com/index.php?m=api&c=User&a=fixedNumEdit",
            dataType:"text",
            data:{
                user_id:user_id,
                region:region,
                addresss:addresss,
                zip_code:zip_code,
                names:names,
                phones:phones,
                fixed_num:fixed_num,
                state:state
            },
            success:function(data){
                var data = eval('(' + data + ')');//把字符串转化为数组

                if(data==1){
                    location.reload();
                }
            },
            error:function(data){
                console.log("错误的"+data)
            }
        });









    });
});
