/**
 * Created by Administrator on 2017/9/27 0027.
 */
//var goodid="3,3,3,3,3,3";
//localStorage.setItem("goodid",goodid);
//console.log(localStorage.getItem("goodid"));
    if(localStorage.getItem("goodid")==null){
        var goodid="3,3,3,3,3,3";
        localStorage.setItem("goodid",goodid);
    }
    var a=localStorage.getItem("goodid");

    //a=a.split(",");
//a.pop();
//a.unshift("5");
//    console.log(a);
$.ajax({
    url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo1&a=Youlike",
    type:"post",
    dataType:"json",
    data:{
        goods_id:a
    },
    success:function(data) {
        //console.log(2333);
        for (var i = 0; i < data.length; i++) {
            var containn = $('<div class="accoutbo"><div class="accout_img1"><a href="../company/company.html?goods_id='+data[i].goods_id+'" style="display: inline-block;width: 100%;height: 100%"><img src="'+data[i].goods_img+'" alt=""/></a></div><div class="accout_money1"><span>¥</span><span>'+data[i].price+'</span></div><div class="accout_text1">'+data[i].goods_name+'</div></div>');
            $(".accout_moreul>li").append(containn);
        }
    },
    error:function(data){
        console.log(data);
    },

});






$(function(){
	$(".class_ul li").click(function(){
		$(this).addClass("class_blue").siblings().removeClass("class_blue");
		$(".comment_list").html("");
		switch($(this).attr('id')){
			case 'all_e':
				evaluate_ajax("http://api.tx178178.com/api/GoodsInfo1/evaluate");
			  break;
			case 'img_e':
				evaluate_ajax("http://api.tx178178.com/api/GoodsInfo1/img_evaluate");
			  break;
			case 'chase_e':
				evaluate_ajax("http://api.tx178178.com/api/GoodsInfo1/chase_evaluate");
			  break;
			default:
		}
		
	})
	
	
    //头部和尾部加载
    $("#header").load("../home/header.html");
    $("#footer").load("footer.html");

    $("#intro").click(function(){
        $("#info").addClass("accout_serv");
        $("#info").removeClass("accout_should_can");
        $("#intro").addClass("accout_should_can");
        $("#intro").removeClass("accout_serv");
        $(".accout_serv_img").css({"display":"none"});
        $(".comment").css({"display":"block"});
        $(".pagewrap_a").css({"display":"block"});
    });
    $("#info").click(function(){
        $("#info").addClass("accout_should_can");
        $("#info").removeClass("accout_serv");
        $("#intro").addClass("accout_serv");
        $("#intro").removeClass("accout_should_can");
        $(".accout_serv_img").css({"display":"block"});
        $(".comment").css({"display":"none"});
        $(".pagewrap_a").css({"display":"none"});
    });

//    看了又看轮播效果
    var index=0;
    var accoutbo = 2/*Math.round(($(".accoutbo").length)/2)-1*/;
    //var accoutbo = Math.floor(($(".accoutbo").length)/2);
    //console.log(accoutbo)
    function fu(suo){
        $(".accout_moreul").animate({"top":"-"+index*299+"px"},300);
    }
    $(".prev").click(function(){
        index = index-1;
        if(index<0){
            index=accoutbo
            $(".accout_moreul").animate({"top":"0"},300);
        }
        fu(index);
    });
    $(".next").click(function(){
        index = index+1;
        if(index>accoutbo){
            index=0;
            $(".accout_moreul").animate({"top":"0"},300);
        }
        fu(index);
    });
});



//购买模块


function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

var goods_id=GetQueryString("goods_id");
//存看了又看
if(goods_id){
    a= a.split(",");
    a.pop();
    a.unshift(goods_id);
    localStorage.setItem("goodid",a);
}

var region=localStorage.getItem("region_id");





$.ajax({
    url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo1&a=goodsInfo",
    type:"post",
    dataType:"json",
    data:{
        goods_id:goods_id,
        region:2
    },
    success:function(data) {

        //初始化是否收藏
        if(data.collection){
        if(data.collection=="1"){
            $(".collectimg").attr("src","../images/soucang1@2x.png");
        }else{
            $(".collectimg").attr("src","../images/soucang2@2x.png");
        }}

        //$(".describe_score").html(data.score);
        //
        //$("#accout_serv_span").html(data.evaluate_num);
        //$("#all_e").html("全部评价（"+(data.evaluate_num<1000?data.evaluate_num:"1000+")+"）");
        //$("#img_e").html("晒图（"+(data.img_evaluate_num<1000?data.img_evaluate_num:"1000+")+"）");
        //$("#chase_e").html("追评（"+(data.chase_evaluate_num<1000?data.chase_evaluate_num:"1000+")+"）");
        
        var t1=data.goods_img[0];
        console.log(t1);
        var pic1=$(".accout_left_left_big");
        $(pic1).css({background:"url("+t1+") no-repeat center","background-size":"cover"});
        var picul=$(".accout_left_left_small_ul");
        $(".accout_left_left_small").append(picul);
        for(var i=0;i<data.goods_img.length;i++){
            var t2=data.goods_img[i];
            var picli=$("<li></li>");
            $(picli).css({background:"url("+t2+") no-repeat center","background-size":"cover"});
            $(picul).append(picli);
        };


        //点击显示图片
        $(".accout_left_left_small_ul").delegate("li", "click", function() {
            var back = $(this).css('backgroundImage');
            //console.log(back)
            $(".accout_left_left_big").css({ "background": back + "no-repeat center", "background-size": "cover",height:"260px" })

        })


        //右边价格，信息开始
        $(".accout_left_right_name").text(data.goods_name);
        $(".accout_left_right_descrip").text(data.goods_intro);
        $(".pricename_price").eq(0).text("￥"+data.price);
        //规格商品属性数量
        for (var i = 0; i < data.spec.length; i++) {
            //console.log(data.spec[i].name);
            var item=$('<div class="palce"><p class="place_name">'+data.spec[i].name+':</p><ul class="placeholder"></ul></div>');
            $(".itembox").append(item);
            //每个规格里面的内容
            for (var j = 0; j < data.spec[i].list.length; j++) {
                var li=$('<li>'+data.spec[i].list[j].name+'</li>');
                $(".placeholder").eq(i).append(li);
            }
        }
        //选择规格以及商品价格计算
        $(".placeholder>li").on("click",function(){
            var pricee=data.price;
            pricee=Number(pricee);
            //console.log(pricee);
            if($(this).hasClass("activee")){
                //console.log(2333);
            }else{
            $(this).addClass("activee");
            $(this).siblings().removeClass("activee");
            //计算价格
            //console.log($(".placeholder").length);
                for (var v = 0; v < $(".activee").length; v++) {
                    //console.log(24);
                    for (var i = 0; i < data.spec.length; i++) {
                        for (var j = 0; j < data.spec[i].list.length; j++) {
                            //console.log("asd");
                            //console.log(data.spec[i].list[j].name);
                            //console.log($(".activee").eq(v).text());
                            if(data.spec[i].list[j].name==$(".activee").eq(v).text()){
                                //console.log(data.spec[i].list[j].prices);
                                var newp=Number(data.spec[i].list[j].prices);
                                pricee=pricee+newp;
                                //console.log(pricee);
                                $(".total_price").text(pricee);
                            }
                        }

                    }

                }
           }
            //价格计算完毕else
        });


//收藏商品
        var id=localStorage.getItem("user_id");
         //判断收藏还是取消收藏
        //console.log($(".collectimg").attr("src"));
        if($(".collectimg").attr("src")=="../images/soucang2@2x.png"){
            var num=1;
        }else if($(".collectimg").attr("src")=="../images/soucang1@2x.png"){
            var num=0;
        };
        $(".collect").on("click",function(){

            if($(".collectimg").attr("src")=="../images/soucang2@2x.png"){
                var num=1;
            }else if($(".collectimg").attr("src")=="../images/soucang1@2x.png"){
                var num=0;
            };
            console.log(num);
            $.ajax({
                url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo1&a=goodsCollection",
                type:"post",
                dataType:"json",
                data:{
                    user:id,
                    goods:goods_id,
                    type:1,
                    num:num
                },
                success:function(data){
                    console.log(10);
                    if(data.state=1){
                        console.log(20);
                        console.log(num);
                        if(num==1){
                            console.log(num);
                            console.log(30);
                            $(".collectimg").attr("src","../images/soucang1@2x.png");
                        }
                        if(num==0){
                            console.log(num);
                            console.log(40);
                            $(".collectimg").attr("src","../images/soucang2@2x.png");
                        }
                    }
                },
                error:function(data){

                }
            })
        });

//猜你喜欢部分
        var user_id=localStorage.getItem("user_id");
        if(user_id){
            $.ajax({
                url:"http://dz.tx178178.com/index.php?m=api&c=User&a=userLove",
                type:"post",
                dataType:"json",
                data:{
                    id:user_id,
                    ids:goods_id
                },
                success:function(data) {

                },
                error:function(data){

                }
            });
        }


        ////遍历地址信息
        ////console.log(data.price[0].region_name);
        //for(var j= 0;j<data.price.length;j++) {
        //    var address = $('<button class="dress">' + data.price[j].region_name + '</button>');
        //    $(".placeholder").append(address);
        ////};地址便利完成
        //    //购买时长选择
        //};

        //转化spec字符串
        //alert();
        //var price=data.price;
        //var addindex;
        //$(".placeholder").delegate("button","click", function () {
        //
        //    $(".accout_middle_time .accout_middle_time_box").html("");
        //    addindex = $(this).index();
        //    var price1 = price[addindex];
        //    price1.spec = eval('(' + price1.spec + ')');
        //    var danjia=price1.spec.option[0].price;
        //    $(".pricename_price").html(danjia);



            //$(".pricename_price").html(price1)
        //    var spec = price[addindex].spec;
        //    var option=spec.option;
        //    for(i=0;i<option.length;i++){
        //        $(".accout_middle_time .accout_middle_time_box").append($('<div class="time_two">' + option[i].value + '</div>'));
        //
        //    }
        //});
        //
        //
        //$(".accout_middle_time_box").delegate("div","click", function () {
        //    var index = $(this).index();
        //   var danjia = price[addindex].spec.option[index].price;
        //   $(".pricename_price").html(danjia);

            //添加样式
        //    $(this).addClass("time_one");
        //    $(this).siblings().addClass("time_two");
        //    $(this).siblings().removeClass("time_one");
        //    $(this).removeClass("time_two");
        //
        //});



        //地区选择点击事件
        //$(".place_place").click(function(){
        //    $(".placeholder").slideToggle();
        //});
        //$(".placeholder>button").click(function(){
        //    $(".place_place").val($(this).text());
        //    $(".placeholder").hide();
        //});

        //失去焦点消失
        //$(".place_place").blur(function(){
        //    setTimeout(hidden(),2000);
        //});
        //function hidden(){
        //    $(".placeholder").slideToggle();
        //};

        //购买数量
        $(".buyadd").click(function(){
            console.log($(".buynum").text());
            var num=parseInt($(".buynum1").text());
            //console.log(num);
            num+=1;
            //console.log(num);
            $(".buynum1").html(num);
        });
        $(".remove").click(function(){
            //console.log($(".buynum").text());
            var num=parseInt($(".buynum1").text());
            //console.log(num);
            num--;
            if(num<=1){
                num=1;
            }
            //console.log(num);
            $(".buynum1").html(num);
        });


        var leftnum;
        $(".leftt").on("click",function(){
            leftnum=$(".accout_left_left_small_ul").css("margin-left");
            leftnum=leftnum.split("px")[0];
            console.log(leftnum);
            leftnum=leftnum-115;
            if(leftnum<-(data.goods_img.length*115-470)){
                leftnum=-(data.goods_img.length*115-480);
            }
            $(".accout_left_left_small_ul").css({"margin-left":leftnum+"px"});
        })
        $(".rightt").on("click",function(){
            leftnum=$(".accout_left_left_small_ul").css("margin-left");
            leftnum=leftnum.split("px")[0];
            console.log(leftnum);
            leftnum=leftnum-0;
            leftnum+=115;
            if(leftnum>0){
                leftnum=0;
            }
            $(".accout_left_left_small_ul").css({"margin-left":leftnum+"px"});
        })


    },
    error:function(data){
        console.log("错误的"+data);
    }
});


    //$(".leftt").on("click",function(){
    //    console.log(20);
    //    var leftnum=$(".accout_left_left_small_ul").attr("margin-left");
    //    console.log(leftnum);
    //    //leftnum=leftnum-200;
    //    //$(".accout_left_left_small_ul").css({margin-left:leftnum+px});
    //})



        //可能需要模块

$.ajax({
    url:"http://dz.tx178178.com/index.php?m=api&c=Search&a=HeatSearch",
    type:"post",
    dataType:"text",
    data:{
        num:7
    },
    success:function(data) {
        var data = eval('(' + data + ')');

        var ul2=$('.accout_should_ul');
        for(var i=0;i<data.length;i++){
            var tshould=data[i].imgs;
            var tid=data[i].goods_id;
            var li=$('<li><a href="company.html?goods_id='+tid+'"" style="display: inline-block;width: 100%;height: 100%"><div><img style="height:100px;width:120px" src="'+tshould+'" alt=""/></div><div class="accout_should_tax">'+data[i].goods_name+'</div><div class="accout_should_money">'+data[i].price+'</div></a></li>');
            $(ul2).append(li);
        }
    },
    error:function(data){
        console.log("错误的"+data)
    }
});

        //热门推荐部分
$.ajax({
    url:"http://dz.tx178178.com/index.php?m=api&c=Search&a=HeatSearch",
    type:"post",
    dataType:"json",
    data:{
        num:10
    },
    success:function(data) {
        var diva=$('.recom_content');
        for(var i= 0;i<data.length;i++){
            var t=data[i].imgs;
            var id=data[i].goods_id;
            var divb=$('<div class="recom_banner"><a href="company.html?goods_id='+id+'"" style="display: inline-block;width: 100%;height: 100%"><div class="recom_banner_img"><img src="'+t+'" alt=""/></div><div class="recom_banner_apply">'+data[i].goods_name+'</div><div class="recom_banner_money">'+data[i].price+'</div></a></div>');
            $('.recom_content').append(divb);
        }
    },
    error:function(data){
        console.log("错误的"+data)
    }
});


//evaluate_ajax("http://api.tx178178.com/api/GoodsInfo1/evaluate");
evaluate_ajax("http://dz.tx178178.com/index.php?m=api&c=GoodsInfo1&a=evaluate");


//服务详情
//$.ajax({
//    url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo1&a=goodsInfo",
//    type:"post",
//    dataType:"text",
//    data:{
//        goods_id:goods_id
//    },
//    success:function(data) {
//        var data = eval('(' + data + ')');
//        //console.log(data.volume);
//        $(".accout_serv_img").html(data.info);
//        //console.log(data.info);
//
//    },
//    error:function(data){
//        console.log("错误的"+data)
//    }
//});

//评论模块
function evaluate_ajax(url){
	$.ajax({
	    url:url,
	    type:"post",
	    dataType:"text",
	    data:{
	        goods_id:goods_id
	    },
	    success:function(data) {
	        var data = eval('(' + data + ')');
	        //console.log(data)
	        
	        
	        
	        
	        
	        
	        var voiul=$('.comment_list');
            if(data.list!=undefined){


	            for(var i=0;i<data.list.length;i++){
	            var vip=data.list[i].vip;
	            if(vip==0){
	                vip="普通会员";
	                //$('.one_vip').removeClass("one_vip");
	            }else{
	                vip=+vip+"级VIP会员"
	            };
	
	
	            var voili=$('<li class="clearfix comment_list_one"><div class="one_img"></div><div class="one_banner"><div class="one_name">'+data.list[i].user_name+'</div><div class="one_vip">'+vip+'</div><ul class="one_star"></ul><p class="one_text">'+data.list[i].evaluate+'</p><ul class="one_list_img"><!--<li></li>--></ul><div class="one_list_foot">'+data.list[i].time+'&nbsp;13:55</div><!--管理员回复地方--></div></li>');
	            $(voiul).append(voili);
	
	
	            for(var k=0;k<data.list[i].img.length;k++){
	                var img=data.list[i].img[k];
	                var goodspic=$('<li></li>');
	                var img_list=$('.one_list_img').eq(i);
	                $(img_list).append(goodspic);
	                $(goodspic).css({background: "url("+img+") no-repeat center"});
	            };
	
	            /*客户回复模块插入回复列表*/
	            var userpic=data.list[i].user_img;
	            $('.one_img').css({background: "url("+userpic+") no-repeat center","background-size":"cover" });
	
	
	            /*客户评分模块开始*/
	            var starul=$('.one_star').eq(i);
	            var score=Math.floor(data.list[i].score);
	            for(var k=0;k<score;k++){
	                var starli=$('<li></li>');
	                $(starul).append(starli);
	            };
	            if(score<data.list[i].score){
	                var starli=$('<li id="one_star_harf"></li>');
	                $(starul).append(starli);
	            };
	            $('.one_star>li').css({background: "url(../images/dianliangxing.png) no-repeat center","background-size":"cover" });
	            $('#one_star_harf').css({background: "url(../images/huisexing.png) no-repeat center","background-size":"cover" });
	            /*客户评分模块*/
	
	
	            var replay=$('.one_banner').eq(i);
	            for(var j=0;j<data.list[i].reply_list.length;j++){
	                var replayvoi=$('<div class="one_list_foot-repeat"><span>'+data.list[i].reply_list[j].name+'</span><p>'+data.list[i].reply_list[j].reply_content+'</p></div>');
	                $(replay).append(replayvoi);
	            };
	        }
            }
	        //翻页按钮
			var all_page=data.all_page;
			Page({
				num:all_page,			//页码数				
				elem:$('#page1'),		//指定的元素
				callback:function(n){	//回调函数
					$.ajax({
						type:"post",
						url:url,
						async:true,
						dataType:"text",
						data:{
							goods_id:goods_id,
	        				page:n
						},
						success:function(data){	
							$(".comment_list").html("");
							console.log(n);
							var data = eval('(' + data + ')');
							console.log(data);
							
							var voiul=$('.comment_list');
	        for(var i=0;i<data.list.length;i++){
	            var vip=data.list[i].vip;
	            if(vip==0){
	                vip="普通会员";
	                //$('.one_vip').removeClass("one_vip");
	            }else{
	                vip=+vip+"级VIP会员"
	            };
	
	
	            var voili=$('<li class="clearfix comment_list_one"><div class="one_img"></div><div class="one_banner"><div class="one_name">'+data.list[i].user_name+'</div><div class="one_vip">'+vip+'</div><ul class="one_star"></ul><p class="one_text">'+data.list[i].evaluate+'</p><ul class="one_list_img"><!--<li></li>--></ul><div class="one_list_foot">'+data.list[i].time+'&nbsp;13:55</div><!--管理员回复地方--></div></li>');
	            $(voiul).append(voili);
	
	
	            for(var k=0;k<data.list[i].img.length;k++){
	                var img=data.list[i].img[k];
	                var goodspic=$('<li></li>');
	                var img_list=$('.one_list_img').eq(i);
	                $(img_list).append(goodspic);
	                $(goodspic).css({background: "url("+img+") no-repeat center"});
	            };
	
	            /*客户回复模块插入回复列表*/
	            var userpic=data.list[i].user_img;
	            $('.one_img').css({background: "url("+userpic+") no-repeat center","background-size":"cover" });
	
	
	            /*客户评分模块开始*/
	            var starul=$('.one_star').eq(i);
	            var score=Math.floor(data.list[i].score);
	            for(var k=0;k<score;k++){
	                var starli=$('<li></li>');
	                $(starul).append(starli);
	            };
	            if(score<data.list[i].score){
	                var starli=$('<li id="one_star_harf"></li>');
	                $(starul).append(starli);
	            };
	            $('.one_star>li').css({background: "url(../images/dianliangxing.png) no-repeat center","background-size":"cover" });
	            $('#one_star_harf').css({background: "url(../images/huisexing.png) no-repeat center","background-size":"cover" });
	            /*客户评分模块*/
	
	
	            var replay=$('.one_banner').eq(i);
	            for(var j=0;j<data.list[i].reply_list.length;j++){
	                var replayvoi=$('<div class="one_list_foot-repeat"><span>'+data.list[i].reply_list[j].name+'</span><p>'+data.list[i].reply_list[j].reply_content+'</p></div>');
	                $(replay).append(replayvoi);
	            };
	        }
	
							
						}
					});
				}
			});
	
	    },
	    error:function(data){
	        console.log("错误的"+data)
	    }
	});
}

//localstorage


//猜你喜欢部分   报错237
//看了又看部分   报错17
