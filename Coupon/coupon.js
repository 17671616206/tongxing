/**
 * Created by Administrator on 2017/10/8 0008.
 */
$(function(){
    //头部和尾部加载
    $("#header").load("../home/header.html");
    $("#footer").load("../home/footer.html");
});

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

var type=GetQueryString("type");
var pages=GetQueryString("pages");
if(type==undefined){
    type=0
}
if(pages==undefined){
    pages=1
}


$.ajax({
   url:"http://dz.tx178178.com/index.php?m=api&c=Coupon&a=CouponObtain",
    type:"post",
    dataType:"text",
    data:{
        type:type,
        pages:pages
    },
    success:function(data){
        var data = eval('(' + data + ')');
        //console.log(1);
        var titleul=$(".Coupon_b>ul");
        $(titleul).html("");
        for(var i=1;i<=data.coupon_type.length;i++){
            var titleli=$('<li><a href="Coupon.html?type='+i+'" style="display: inline-block;width: 100%;height: 100%">'+data.coupon_type[i-1]+'</a></li>');
            $(titleul).append(titleli);
        }
        var indexs=type-1;
        $(".Coupon_b>ul>li").eq(indexs).addClass("active");

        $(".Coupon_b>ul>li").on("click",function(){
            $(this).addClass("active").siblings().removeClass("active");
        });

        //获取type
        console.log($(".active").text());
        for (var i = 0; i < data.coupon_type.length; i++) {
            if( ("ABCDE"+data.coupon_type[i])==$(".active").text())
                //console.log(i);
                type=i;
        }



//---------------------------------------------------------
        var couponul=$(".Coupon_clist");
        for(var j=0;j<data.list.length;j++){
            if(data.list[j].used_cuurent==0){
                var leave=0;
            }else{
                var leave=Math.ceil((data.list[j].used_cuurent)/(data.list[j].coupon_num)*100);
            }

            var t=data.list[j].img;
            //if(type==0||type==0){
            //    var quota=data.list[j].quota;
            //}else{
                var quota=data.list[j].coupon_info;
            //    console.log(quota);
            //}
            var couponli=$('<li><a style="display: inline-block;width:384px;height: 190px;color: white" href="javascript:;"><div class="left Coupon_clistL"><div class="Coupon_cLcon"><p><strong>'+quota+'</strong><span>    &nbsp; &nbsp;满'+data.list[j].conditions+'可用</span></p><p class="Coupon_cLcon_p2">'+data.list[j].coupon_name+'</p><div class="hengxian"><div class="hengxian2"></div></div><p class="Coupon_cLcon_p3">已抢'+leave+'%</p></div></div><div class="left Coupon_clistM"></div><div class="right Coupon_clistR"></div></a></li>');
        $(couponul).append(couponli);
            //---------------------------------
            $(".Coupon_clistM").eq(j).css({"background":"url("+t+") no-repeat center","background-size":"center"});
            $(".hengxian2").eq(j).css({"width":+leave+"px"});
            $(couponli).eq(j).index(j);
            //-----------------------------------------------

            if(pages==1){
               pages=1;
               }else {
                pages--;
                $(".prev").eq(1).html('<a href="Coupon.html?type='+type+'&pages='+pages+'">上一页</a>');
            }

            if(pages==data.total_class){
                pages=data.total_class;
            }else {
                pages+=1;
                $(".next").eq(1).html('<a href="Coupon.html?type='+type+'&pages='+pages+'">下一页</a>');
            }

    };

        for(var k=1;k<=data.total_class;k++){
            var pagesli=$('<li><a href="Coupon.html?type='+type+'&pages='+k+'">'+k+'</a> </li>');
            $(".pagenums").append(pagesli);
        };

        //获取pages

        $(".pagenums>li").on("click",function(){
            pages=$(this).val();
        })


        //var pagesmore=$()
        if($(".pagenums").length>7){
            $(".pagenums").append('<li>......</li>');
        };
        $(".pagetext>span").text(data.total_class);



        //领取优惠券
        $(".Coupon_clist>li>a").on("click",function(){
                $.ajax({
                    url:"http://dz.tx178178.com/index.php?m=api&c=Coupon&a=CouponObtain",
                    type:"post",
                    dataType:"text",
                    data:{
                        type:type,
                        pages:pages,
                        id:id
                    },
                    success:function(data){
                        var data = eval('(' + data + ')');
                        console.log(type);
                        console.log(pages);

                    },
                    error:function(data){
                        console.log(data);
                    }
                });
        })
//---------------------------------------------------------


    },
    error:function(data){
        console.log(data);
    }
});
