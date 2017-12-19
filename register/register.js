$(function(){
//头部和尾部加载	
    $("#header").load("../home/header.html");
    $("#footer").load("../company/footer.html");

//分类点击效果
    $(".sort_compre li").click(function(){
		$(this).addClass("sort_color").siblings().removeClass("sort_color")
	})
	
//  获取url参数
    var url = window.location.search;
    var canshu=url.split("?")[1]
    var arr=canshu.split("=")
    jian=arr[0];
    zhi=decodeURI(arr[1]);
    var canshuarr={}
    if(jian=='goods_id'){
    	var at={
    		class_id:zhi
    	}
//  	$(".class_id").attr({"name":jian}) 
//		jian="class_id";
//  	canshuarr['class_id']=zhi
//  	$(".class_id").val(zhi) 
    }else if(jian=='text'){
    	var at={
    		text:zhi
    	}    	
//  	$(".class_id").attr({"name":jian})
//  	$(".class_id").val(zhi)
//		jian="text";
//  	canshuarr[jian]=zhi
    }else if(jian=='two_id'){
    	var at={
    		two_id:zhi
    	}     	
    }
    
    $.ajax({
    	type:"post",
    	url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo&a=goods_attribute",    	
  		dataType:"text",
  		data:{"class_id":zhi},
    	success:function(data){
    		var data = eval('('+data+')');
//1
			$("meta[name=keywords]").attr("content",data.class_seo.seo_keywords)
			$("meta[name=description]").attr("content",data.class_seo.seo_description)
			$("title").text(data.class_seo.seo_title)
    		var class_list=data.class_list

    		var html1='<li><span  index="'+class_list.class_id+'">'+class_list.class_name+'>&nbsp;</span></li>'+
    				  '<li><span  index="'+class_list.son.class_id+'">'+class_list.son.class_name+'>&nbsp;</span></li>'+
    				  '<li><span  index="'+class_list.son.son.class_id+'">'+class_list.son.son.class_name+'>&nbsp;</span></li>'   					    					
    		$(".register_header ul").append(html1)    		
//2
//			var attribute_list=data.attribute_list
//			if(attribute_list!=undefined){
//				for (var i=0;i<attribute_list.length;i++){
//						//$("#this_from div").append($("<input value='1'/>").attr("name","attribute[]"))								
//						var html3="";
//						for (var j=0;j<attribute_list[i].attribute_value.length;j++) {
//							html3=html3+'<li index="'+attribute_list[i].attribute_value[j].attribute_id+'">'+attribute_list[i].attribute_value[j].value+'</li>'				       
//						}				
//						var html2 = '<div class="register_nav_top">'+
//				                '<div class="register_nav_ser" id="'+attribute_list[i].attribute_name_id+'" >'+attribute_list[i].attribute_name+'</div>'+
//				                '<div class="ser_content">'+
//				                    '<ul class="ser_content_left">'+
//										html3+
//				                    '</ul>'+
//				                    '<div class="ser_content_right">更多<span class="glyphicon glyphicon-menu-down"></span></div>'+
//				                '</div>'+
//				            '</div>'
//				        $(".register_nav").append(html2) 				
//				}					
//			}    		
    		
    	}    	
    });    
    

//地址  设置默认地址
var address;
//序列化表单
$.ajax({
	type:"get",
	url:"http://dz.tx178178.com/index.php?m=api&c=Region&a=available_region",    	
	dataType:"text",
	success:function(data){
		var data = eval('('+data+')');
		for(i=0;i<data.length;i++){				
			var html = '<option index="'+data[i].region_id+'">'+data[i].region_name+'</option>'
			$(".sort_serve select").append(html)
		}
		address=data[0].region_id
		$("input[name=region]").val(address)   	
		canshuarr['region']=address	
//物品列表
    	var order = $("input[name=order]").val()
    	score_down(order)											
	}
})	
	
$(".sort_compre li").eq(0).click(function(){
	var a="a"	
	$("input[name=order]").val(a)
	score_down(a)	
})

var bb=true;
$(".sort_compre li").eq(1).click(function(){	
	if(bb==true){
		bb=false
		var a="score_down"
		$(this).find("span").css({
			"transform":"rotate(180deg)"
		})			
	}else{
		bb=true
		var a="score_up"
		$(this).find("span").css({
			"transform":"rotate(0deg)"
		})			
	}
	$("input[name=order]").val(a)
	score_down(a)
})

var cc=true;
$(".sort_compre li").eq(2).click(function(){
	if(cc==true){
		cc=false
		var a="time_down"
		$(this).find("span").css({
			"transform":"rotate(180deg)"
		})		
	}else{
		cc=true
		var a="time_up"
		$(this).find("span").css({
			"transform":"rotate(0deg)"
		})			
	}		
	$("input[name=order]").val(a)
	score_down(a)
})
var dd=true;
$(".sort_compre li").eq(3).click(function(){
	if(dd==true){
		dd=false
		var a="volume_down"
		$(this).find("span").css({
			"transform":"rotate(180deg)"
		})		
	}else{
		dd=true
		var a="volume_up"
		$(this).find("span").css({
			"transform":"rotate(0deg)"
		})			
	}	
	$("input[name=order]").val(a)
	score_down(a)
})
var ff=true;
$(".sort_compre li").eq(4).click(function(){
	if(ff==true){
		ff=false
		var a="price_down"
		$(this).find("span").css({
			"transform":"rotate(180deg)"
		})
	}else{
		ff=true
		var a="price_up"
		$(this).find("span").css({
			"transform":"rotate(0deg)"
		})		
	}		
	$("input[name=order]").val(a)
	score_down(a)
})	

//	选择地址
    $(".sort_serve select").on("change",function(){
    	var order = $("input[name=order]").val()
    	score_down(order)	
    })

//价格范围筛选
	$(".queren").click(function(){	
    	var order = $("input[name=order]").val()
    	score_down(order)					
	})
	
//左右箭头   
	var indexpage=1
    $(".pageright").click(function(){	
    	var maxpage=Number($(".span2").html())
    	indexpage++
    	if(indexpage>maxpage){
    		indexpage=maxpage
    	}
		bbb(indexpage)
	})   
    $(".pageleft").click(function(){
    	indexpage--
    	if(indexpage<1){
    		indexpage=1
    	}
		bbb(indexpage)		
    })          
})

//箭头函数
function bbb(indexpage){
		var all_page =$(".span2").html() 
		var order = $("input[name=order]").val()
		var minprice=$(".minprice").val()
		var maxprice=$(".maxprice").val()
		var address=$(".sort_serve select").find('option:selected').attr('index');		
    	$(".span1").html(indexpage)
    	var all_page =$(".span2").html()
    if(jian=='goods_id'){
    	var n=0
	    var arra={
	    	page:n,
			region:address,
			class_id:zhi,
			min_price:minprice,
			max_price:maxprice,
			order:order	
		}   	   	
    }else if(jian=='text'){
    	var arra={
    		page:n,
			region:address,
			text:zhi,
			min_price:minprice,
			max_price:maxprice,
			order:order	
		}  
    }else if(jian=='two_id'){
    	var arra={
    		page:n,
			region:address,
			two_id:zhi,
			min_price:minprice,
			max_price:maxprice,
			order:order	
		}     	
    }    	    	
    	
			Page({
				num:all_page,	//页码数
				startnum:indexpage,//指定页码
				elem:$('#page1'),		//指定的元素
				callback:function(n){//回调函数
				arra.page=n	
				$(".span1").html(n)	
				var order = $("input[name=order]").val()
				var minprice=$(".minprice").val()
				var maxprice=$(".maxprice").val()
				var address=$(".sort_serve select").find('option:selected').attr('index');
					$(".product").html("")
					$.ajax({
						type:"post",
						url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo&a=goods_list&page",
						data:{
							page:n,
							region:address,
							class_id:zhi,
							min_price:minprice,
							max_price:maxprice,
							order:order	
						},
						async:true,
						dataType:"text",
						success:function(data){								
							var data = eval('('+data+')');
							console.log(data)
				//			页码总数
							var all_page =data.all_page
							console.log(all_page)
				//			产品列表
							var goods_list=data.goods_list
						
							for_good_list(goods_list);	

						}
					});
			}				
		});	
    	   	
		$.ajax({
			type:"post",
			url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo&a=goods_list",    	
			dataType:"text",
			data:{
				page:indexpage,
				region:address,
				class_id:zhi,
				min_price:minprice,
				max_price:maxprice,
				order:order	
			},
			success:function(data){
				var data = eval('('+data+')');
				console.log(data)
				//			产品列表
				var goods_list=data.goods_list
				
				for_good_list(goods_list);	
			}
		})	
}

function for_good_list(goods_list){
	var html = "";
	for (i=0;i<goods_list.length;i++){
				//alert(data.rel[i].img);		
				 html = html+'<a href="../company/company.html?goods_id='+goods_list[i].goods_id+'" class="product_box" id="'+goods_list[i].goods_id+'">'
	                +'<div class="product_img">'
	                    +'<img src="'+goods_list[i].goods_img+'" alt=""/>'
	                +'</div>'
	                +'<div class="product_bottom_box">'
	                    +'<div class="product_money">¥<span class="product_red">'+goods_list[i].goods_price+'</span>起</div>'
	                   +'<div class="product_cancel">'+goods_list[i].goods_name+'</div>'
	                    +'<div>'
	                      +'<span class="product_grey">成交量</span>'
	                       +'<span class="product_blue">'+goods_list[i].goods_volume+'</span>'
	                    +'</div>'
	                +'</div>'
	            +'</a>'
            	
    		}
	$(".product").html(html)
}


//排序
function score_down(order){
	var minprice=$(".minprice").val()
	var maxprice=$(".maxprice").val()
	var address=$(".sort_serve select").find("option:selected").attr("index")
    if(jian=='goods_id'){
    	var n=0
	    var arra={
	    	page:n,
			region:address,
			class_id:zhi,
			min_price:minprice,
			max_price:maxprice,
			order:order	
		}   	   	
    }else if(jian=='text'){
    	var arra={
    		page:n,
			region:address,
			text:zhi,
			min_price:minprice,
			max_price:maxprice,
			order:order	
		}  
    }else if(jian=='two_id'){
    	var arra={
    		page:n,
			region:address,
			two_id:zhi,
			min_price:minprice,
			max_price:maxprice,
			order:order	
		}     	
    }
    
	$.ajax({
		type:"post",
		url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo&a=goods_list",    	
		dataType:"text",
		data:arra,
		success:function(data){
			var data = eval('('+data+')');
			console.log(data)
			if(data==null){
				$(".span1").html("0")
				$(".pageleft").unbind("click");
			}else{
				$(".span1").html("1")
			}
			var goods_list=data.goods_list
			for_good_list(goods_list);
			var all_page=data.all_page
			$(".span2").html(all_page)
			Page({
				num:all_page,	//页码数
				startnum:1,//指定页码
				elem:$('#page1'),		//指定的元素
				callback:function(n){	//回调函数
				arra.page=n
				$(".span1").html(n)	
				var minprice=$(".minprice").val()
				var maxprice=$(".maxprice").val()
				var address=$(".sort_serve select").find("option:selected").attr("index")
					$(".product").html("")
					$.ajax({
						type:"post",
						url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo&a=goods_list",
						data:arra,
						async:true,
						dataType:"text",
						success:function(data){								
							var data = eval('('+data+')');
							console.log(data)
				//			页码总数
							var all_page =data.all_page
							console.log(all_page)
				//			产品列表
							var goods_list=data.goods_list
						
							for_good_list(goods_list);	

						}
					});
			}				
			});	
		}
	})
}


