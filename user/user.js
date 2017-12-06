/**
 * Created by Administrator on 2017/10/7 0007.
 */
$(function(){
    //头部和尾部加载
    $("#header").load("../home/header.html");
    $("#banleft").load("../public/banleft.html");
    $("#footer").load("../company/footer.html");
    //var data = [
    //    {id:'1',money:'485',text:'注销银行基本账户',num:'85421'},
    //    {id:'2',money:'485',text:'注销银行基本账户',num:'85421'},
    //    {id:'3',money:'485',text:'注销银行基本账户',num:'85421'},
    //    {id:'4',money:'485',text:'注销银行基本账户',num:'85421'},
    //    {id:'5',money:'485',text:'注销银行基本账户',num:'85421'},
    //    {id:'6',money:'485',text:'注销银行基本账户',num:'85421'},
    //    {id:'7',money:'485',text:'注销银行基本账户',num:'85421'},
    //    {id:'8',money:'485',text:'注销银行基本账户',num:'85421'},
    //]
    //$("product_box").click(function(){
    //    console.log(111)
    //})

    //for(var i=0;i<data.length;i++){
    //    for(var j = 0;j<9;j++){
    //        var product = $('<div class="product_box"></div>');
    //        $(product).html('<div class="product_img"><img src="" alt=""/></div><div class="product_bottom_box"><div class="product_money">¥' +
    //        '<span class="product_red">'+data[i].money+'</span>起</div><div class="product_cancel">'+data[i].text+'</div><div>' +
    //        '<span class="product_grey">成交量</span><span class="product_blue">'+data[i].num+'笔</span></div></div>')
    //    }
    //}
});






var user_id=localStorage.getItem("user_id");

//判断是否有登录，
var id=localStorage.getItem("id");
if(id==undefined){
    //window.location.href ='../login/login.html';
}else{

    //登陆成功后打开页面

function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

//var user_id=GetQueryString("user_id");
//var user_id=id;


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
        $(".list_text1").text(data.orderall);
        $(".list_text2").text(data.waitpay);
        $(".list_text3").text(data.paying);
        $(".list_text4").text(data.finished);
        $(".yue_right>span").eq(1).text("￥"+data.least);
        $(".yue_right>span").eq(3).text(data.point+"分");
        $(".yue_right>span").eq(5).text(data.coupons+"张");
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




//首页我的订单部分
$.ajax({
    type:"post",
    url:"http://dz.tx178178.com/index.php?m=api&c=User&a=userCenterHomeTwo",
    dataType:"text",
    data:{user_id:user_id},
    success:function(data){
        var data = eval('(' + data + ')');//把字符串转化为数组
        for (var j = 0; j < data.length; j++) {
            //console.log(j);
            var time=data[j].ordertime;
            var order=data[j].ordernum;
            var orderli=$('<li class="order_info_li"><div class="info_title"><div class="left"><span>下单时间：'+time+'</span><span class="info_title2">订单编号：'+order+'</span></div><a class="right" href="javascript:void(0);">查看详情</a></div><ul class="info_tabel"><li><img class="info_tabel_img" src="../images/zhongshang.png" alt=""/><div class="info_tabel_text"><div><a href="javascript:void(0);">'+data[j].goodsname+'</a></div><div>'+data[j].goodsinfo+'</div></div></li><li>'+data[j].place+'</li><li>代付款</li><li>订单总价：<span style="color: #ff6161;">¥'+data[j].price+'</span></li><li><div href="" class="tabel_info1">立即付款</div><div href="" class="tabel_info2">取消订单</div></li></ul></li>');
            $(".order_info").append(orderli);
        }

    },
    error:function(data){
        console.log("错误的"+data)
    }
});





//首页我的收藏部分
var region=1
$.ajax({
    type:"post",
    url:"http://dz.tx178178.com/index.php?m=api&c=User&a=userCenterHomeThree",
    dataType:"text",
    data:{
        user_id:user_id,
        region:region
    },
    success:function(data){
        var data = eval('(' + data + ')');//把字符串转化为数组
        var product=$(".product").eq(0);
        for (var k = 0; k < data.length; k++) {
            var imgg=data[k].goodsimg;
            imgg=eval('(' + imgg + ')');
            imgg=imgg[0];
            var contains=$('<div class="product_box"><a href="../company/company.html?goods_id='+data[k].goodsid+'" style="display: inline-block;width: 100%;height: 100%"><div class="product_img"><img src="'+imgg+'" alt=""/></div><div class="product_bottom_box"><div class="product_money">¥<span class="product_red">'+data[k].price+'</span>起</div><div class="product_cancel">'+data[k].goodsname+'</div><div><span class="product_grey">成交量</span><span class="product_blue">'+data[k].solled+'笔</span></div></div></a></div>');
            $(product).append(contains);

        }
    },
    error:function(data){
        console.log("错误的"+data)
    }
});

}



//猜你喜欢部分
$.ajax({
    url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo1&a=advertisement",
    type:"post",
    dataType:"json",
    data:{ },
    success:function(data) {
        console.log(data.advertisement1.length);
        var box=$("#product2");
        for (var i = 0; i < data.advertisement1.length; i++) {
            console.log(i);
            var goods=$('<div class="product_box"><a href="../company/company.html?goods_id='+data.advertisement1[i].goods_id+'"><div class="product_img"><img src="'+data.advertisement1[i].goods_img+'" alt=""/></div><div class="product_bottom_box"><div class="product_money">¥<span class="product_red">'+data.advertisement1[i].goods_price+'</span>起</div><div class="product_cancel">'+data.advertisement1[i].goods_name+'</div></div></a></div>');
            $(box).append(goods)
        }


    },
    error:function(data){

    }
})