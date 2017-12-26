/**
 * Created by Administrator on 2017/10/8 0008.
 */
$(function(){
    //头部和尾部加载
    $("#header").load("../home/header.html");
    $("#footer").load("../home/footer.html");
});

$("body").ready(function(){


function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

var pages=GetQueryString("pages");
var user_id=localStorage.getItem("user_id");
if(pages==undefined){
    pages=1
}






    //点击切换
    var type=0;
    get(user_id,type,pages);
    $(".Coupon_b>ul>li>a").on("click",function(){
        $(".Coupon_clist").html("");
        $(this).parents().addClass("active");
        $(this).parents().siblings().removeClass("active");
        if($(this).text()=="代金券"){
            //console.log($(this).text());
            type=0;
        }else{
            //console.log($(this).text());
            type=1;
        }
        get(user_id,type,pages);
        //优惠券


    });
    function get(user_id,type,pages){
        $.ajax({
            url:"http://dz.tx178178.com/index.php?m=api&c=Coupon&a=couponList",
            type:"post",
            dataType:"json",
            data:{
                id:user_id,
                type:type,
                pages:pages,
                num:15
            },
            success:function(data) {
                $(".pagenums").html("");
                for(var k=1;k<=data.num;k++){
                    var pagesli=$('<li><a href="Coupon.html?type='+type+'&pages='+k+'">'+k+'</a> </li>');
                    $(".pagenums").append(pagesli);
                };
                //获取pages
                $(".pagenums>li").on("click",function(){
                    pages=$(this).val();
                });
                //var pagesmore=$()
                if($(".pagenums").length>7){
                    $(".pagenums").append('<li>......</li>');
                };


                $(".pagetext>span").text(data.num);
                if(pages==1){
                    pages=1;
                }else {
                    pages--;
                    $(".prev").eq(1).html('<a href="Coupon.html?type='+type+'&pages='+pages+'">上一页</a>');
                }
                if(pages==data.num){
                    pages=data.num;
                }else {
                    pages+=1;
                    $(".next").eq(1).html('<a href="Coupon.html?type='+type+'&pages='+pages+'">下一页</a>');
                }



                if (data !== '0') {
                //console.log(data.list);
                var a = data.list.length;
                //console.log(a);
                for (var i = 0; i < a; i++) {
                    var leasts=(data.list[i].surplus)/(data.list[i].num)*100;
                    //console.log(leasts);
                    var price=data.list[i].price.split("￥")[1];
                    var obj = $('<li><div class="left Coupon_clistL"><div class="Coupon_cLcon"><p><!--￥--><strong style="white-space:nowrap">'+data.list[i].price+'</strong>  <span>满'+data.list[i].conditions+'可用</span></p><p class="Coupon_cLcon_p2">'+data.list[i].name+'</p><div class="hengxian"><div class="hengxian2" style="width: '+leasts+'%"></div></div><p class="Coupon_cLcon_p3">已抢'+leasts+'%</p></div></div><div class="left Coupon_clistM"><image src='+data.list[i].img+' style="display:inline-block;width:100%;height:100%;"></image></div><div class="right Coupon_clistR"></div></li>');
                    $(".Coupon_clist").append(obj);

                }
            }
            },
            error:function(data){
                console.log(data);
            }
        });
    }
});




