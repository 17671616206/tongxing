/**
 * Created by Administrator on 2017/10/8 0008.
 */
$(function(){


    
//  获取url参数
    var url = window.location.search;
    var goods_id = url.split("=")[1]
    
//  无参数跳转
//  if(url==""){
//  	window.location="../home/content.html"
//  }
//	if(goods_id==""){
//		window.location="../home/content.html"
//	}  



//头部和尾部加载	
    $("#header").load("../company/header.html");
    $("#footer").load("../company/footer.html");

//分类点击效果
    $(".sort_compre li").click(function(){
		$(this).addClass("sort_color").siblings().removeClass("sort_color")
	})

//标签页
	$.ajax({
		type:"get",
        url:"http://api.tx178178.com/api/GoodsInfo/goodsClass",
        dataType:"text",//用json总是报错，同text把数据变成字符串
    	success:function(data){   	
    		console.log(data)
    		var data = eval('('+data+')');
    		var html=""
    		for (i=0;i<data.length;i++) {
//  			var html = '<a href="javascript:;">'+data[i][0].name+'>&nbsp;</a>'
    			var html = data[i][0].name+'>&nbsp;'
    			$(".register_header").append(html)
    		}	    						
    	}    	
	})
	
//服务分类	
	var morenum = 15;
	var len;
	var topdatalength;
	var topdata="";
	var alldatatop;
	$.ajax({
		type:"get",
        url:"http://api.tx178178.com/api/GoodsInfo/goodsTong",
        dataType:"text",//用json总是报错，同text把数据变成字符串
    	success:function(data){   		
    		alldatatop = eval('('+data+')');  
    		console.log(data)
			topdata =alldatatop.slice(0,morenum)
			topdatalength=alldatatop.length
			for (i=0;i<topdata.length;i++) {
    			var html = '<li>'+topdata[i]+'</li>'
    			$(".register_nav_top .ser_content_left").append(html)
    		}
//			$(".ser_content_left li").eq(0).addClass("ser_content_color")
    	}    	
	})
	
//	分类
	var morenum1 = 15;
	var len1;
	var bottomdatalength;
	var bottomdata="";
	var alldatabottom;
	$.ajax({
		type:"get",
        url:"http://api.tx178178.com/api/GoodsInfo/attributeName",
        dataType:"text",//用json总是报错，同text把数据变成字符串
    	success:function(data){
    		alldatabottom = eval('('+data+')');  
			bottomdata =alldatabottom.slice(0,morenum1)
			bottomdatalength=alldatabottom.length
			for (i=0;i<bottomdata.length;i++) {
    			var html = '<li>'+bottomdata[i].value+'</li>'
    			$(".register_nav_bottom .ser_content_left").append(html)
    		}   			
    	}    	
	})
	
//	物品
//	var data00;
	$.ajax({
		type:"post",
        url:"http://api.tx178178.com/api/GoodsInfo/goodsList",
        data:{"class_id":goods_id},
        dataType:"text",//用json总是报错，同text把数据变成字符串
    	success:function(data){  			
    		var data00 = eval('('+data+')');
    		console.log(data)
//  		总数据条数   		
    		$(".allnum").html(data00.rel.length*data00.pagecount)
    		$(".num").html(data00.rel.length)
			for (i=0;i<data00.rel.length;i++){
				//alert(data.rel[i].img);		
				var html = '<a href="../company/company.html?goods_id='+data00.rel[i].goods_id+'" class="product_box" id="'+data00.rel[i].region_id+'">'
	                +'<div class="product_img">'
	                    +'<img src="'+data00.rel[i].img+'" alt=""/>'
	                +'</div>'
	                +'<div class="product_bottom_box">'
	                    +'<div class="product_money">¥<span class="product_red">'+data00.rel[i].price+'</span>起</div>'
	                   +'<div class="product_cancel">'+data00.rel[i].goods_name+'</div>'
	                    +'<div>'
	                      +'<span class="product_grey">成交量</span>'
	                       +'<span class="product_blue">'+data00.rel[i].volume+'</span>'
	                    +'</div>'
	                +'</div>'
	            +'</a>'
            	$(".product").append(html)	
    		}			
			var count=data00.count
			var pagecount=data00.pagecount
			Page({
					num:10,	//页码数
					startnum:1,//指定页码
					elem:$('#page1'),		//指定的元素
					callback:function(n){	//回调函数
						console.log(n);
						$.ajax({
							type:"post",
							url:"http://api.tx178178.com/api/GoodsInfo/goodsList",
							data:{"page":n},
							async:true,
							dataType:"text",
							success:function(data){
								$(".product").html("")
								var data = eval('('+data+')');
								console.log(data)
							}
						});
				}				
			});	
    	}    	
	})	

	
//分类展开	
	$(".ser_content_left").delegate("li","click",function(){
		$(this).addClass("ser_content_color").siblings().removeClass("ser_content_color")
	})		
	$(".register_nav_top .ser_content_right").click(function(){
		var h = $(this).parent("register_nav_top").height()+"px"
		$(this).parent().siblings().css({"line-height":h})
		morenum=topdatalength		
		$(this).siblings("ul").empty()
		for (i=0;i<alldatatop.length;i++) {
			var html = '<li>'+alldatatop[i]+'</li>'
			$(this).siblings(".ser_content_left").append(html)
		}
	})
	$(".register_nav_bottom .ser_content_right").click(function(){
		var h = $(this).parent("register_nav_top").height()+"px"
		$(this).parent().siblings().css({"line-height":h})
		morenum1=bottomdatalength		
		$(this).siblings("ul").empty()
		for (i=0;i<alldatabottom.length;i++) {
			var html = '<li>'+alldatabottom[i].value+'</li>'
			$(this).siblings(".ser_content_left").append(html)
		}
	})
})


