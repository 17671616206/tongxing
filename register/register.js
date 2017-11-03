$(function(){
//头部和尾部加载	
    $("#header").load("../company/header.html");
    $("#footer").load("../company/footer.html");

//分类点击效果
    $(".sort_compre li").click(function(){
		$(this).addClass("sort_color").siblings().removeClass("sort_color")
	})

	

//  获取url参数
    var url = window.location.search;
    var goods_id = url.split("=")[1];
    
    
    $("input[name=class_id]").val(goods_id)
    
//var seach;
$(".register_nav").delegate("li","click",function(){
	console.log("1")
	$(this).addClass("ser_content_color").siblings().removeClass("ser_content_color")
	var attribute =$(this).attr("index")
	var index = $(this).parents(".register_nav_top").index()
	var id = $(this).parents(".ser_content").siblings(".register_nav_ser").attr("id")
	//console.log(id)
	$("#attribute_id"+id).remove();
	$("#attribute_div").append("<input name='attribute[]' id='attribute_id"+id+"' value='"+attribute+"'>");
	//$("#this_from div input").eq(index).val(attribute)
	var form = $("#this_from").serialize()
	var order = $(".sort_color").attr("index")
	$.ajax({
		type:"post",
		url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo&a=goods_list",
		async:true,
		data:form,
		dataType:"text",
		success:function(data){
			var data = eval('('+data+')');	
			//			页码总数
			var all_page =data.all_page

			$(".span2").html(all_page)
			
			
			var goods_list=data.goods_list
			console.log(goods_list)
			for_good_list(goods_list);
			    Page({
						num:all_page,	//页码数
						
						elem:$('#page1'),		//指定的元素
						callback:function(n){	//回调函数
													var minprice=$(".minprice").val()
						var maxprice=$(".maxprice").val()
						var form = $("#this_from").serialize()
							console.log(n);
							$(".product").html("")
							$.ajax({
								type:"post",
								url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo&a=goods_list&page",
								data:{
									"page":n,
									 region:2,
									 "class_id":goods_id,
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
    	
			
			
		}
	});
})



var addressid;
	//地址
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
			addressid=data[2].region_id
			$("input[name=region]").val(addressid)
			console.log(addressid)
			
		}
	})	
	
//	选择地址
    $(".sort_serve select").on("change",function(){
    	
    	addressid=$('select').find('option:selected').attr('index');
    	$("input[name=region]").val(addressid)
    	var order = $(".sort_color").attr("index")
		var minprice=$(".minprice").val()
		var maxprice=$(".maxprice").val()
		var form = $("#this_from").serialize()
    	$.ajax({
			type:"post",
			url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo&a=goods_list",    	
			dataType:"text",
			data:form,
			success:function(data){
				var data = eval('('+data+')');
	//			页码总数
				var all_page =data.all_page
				console.log(all_page)
	//			产品列表
				var goods_list=data.goods_list
				
				for_good_list(goods_list);	
				    Page({
						num:all_page,	//页码数
						startnum:1,//指定页码
						elem:$('#page1'),		//指定的元素
						callback:function(n){	//回调函数
						var minprice=$(".minprice").val()
						var maxprice=$(".maxprice").val()
						var form = $("#this_from").serialize()
							console.log(n);
							$(".product").html("")
							$.ajax({
								type:"post",
								url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo&a=goods_list&page",
								data:{
									"page":n,
									 region:2,
									 "class_id":goods_id,
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
				
				
			}
		})
    	
    })

    $.ajax({
    	type:"post",
    	url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo&a=goods_attribute",    	
  		dataType:"text",
  		data:{"class_id":goods_id},
    	success:function(data){
    		var data = eval('('+data+')');
    		console.log(data)
//1
			$("meta[name=keywords]").attr("content",data.class_seo.seo_keywords)
			$("meta[name=description]").attr("content",data.class_seo.seo_description)
			$("title").text(data.class_seo.seo_title)
    		var class_list=data.class_list

    		var html1='<li><a href="javascript:;" index="'+class_list.class_id+'">'+class_list.class_name+'>&nbsp;</a></li>'+
    				  '<li><a href="javascript:;" index="'+class_list.son.class_id+'">'+class_list.son.class_name+'>&nbsp;</a></li>'+
    				  '<li><a href="javascript:;" index="'+class_list.son.son.class_id+'">'+class_list.son.son.class_name+'>&nbsp;</a></li>'   					    					
    		$(".register_header ul").append(html1)
//2
			var attribute_list=data.attribute_list
			console.log(attribute_list)
			for (var i=0;i<attribute_list.length;i++){
					//$("#this_from div").append($("<input value='1'/>").attr("name","attribute[]"))
				
				
					var html3="";
					for (var j=0;j<attribute_list[i].attribute_value.length;j++) {
						html3=html3+'<li index="'+attribute_list[i].attribute_value[j].attribute_id+'">'+attribute_list[i].attribute_value[j].value+'</li>'
				       
					}
				
					var html2 = '<div class="register_nav_top">'+
			                '<div class="register_nav_ser" id="'+attribute_list[i].attribute_name_id+'" >'+attribute_list[i].attribute_name+'</div>'+
			                '<div class="ser_content">'+
			                    '<ul class="ser_content_left">'+
									html3+
			                    '</ul>'+
			                    '<div class="ser_content_right">更多<span class="glyphicon glyphicon-menu-down"></span></div>'+
			                '</div>'+
			            '</div>'
			        $(".register_nav").append(html2) 
				
			}		
    	}
    	
    });


$(".sort_compre li").eq(0).click(function(){
	var a="a"
	$("input[name=order]").val(a)
	score_down(a)
	
})

$(".sort_compre li").eq(1).click(function(){
	var a="score_down"
	$("input[name=order]").val(a)
	score_down(a)
})
$(".sort_compre li").eq(2).click(function(){
	var a="time_down"
	$("input[name=order]").val(a)
	score_down(a)
})
$(".sort_compre li").eq(3).click(function(){
	var a="volume_down"
	$("input[name=order]").val(a)
	score_down(a)
})

$(".sort_compre li").eq(4).click(function(){
	var a="price_down"
	$("input[name=order]").val(a)
	score_down(a)
})


//价格范围筛选
$(".queren").click(function(){


	
	var order = $(".sort_color").attr("index")
	var minprice=$(".minprice").val()
	var maxprice=$(".maxprice").val()
	$("input[name=min_price]").val(minprice)
	$("input[name=max_price]").val(maxprice)
	$("input[name=region]").val(addressid)
	var form = $("#this_from").serialize()
	console.log(form)
		$.ajax({
			type:"post",
			url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo&a=goods_list",    	
			dataType:"text",
			data:form,
			success:function(data){
				
				var data = eval('('+data+')');
//			页码总数
			var all_page =data.all_page
			$(".span2").html(all_page)				
				
				var goods_list=data.goods_list
				console.log(goods_list)
				for_good_list(goods_list);
				var all_page =data.all_page
						Page({
						num:all_page,	//页码数
						startnum:1,//指定页码
						elem:$('#page1'),		//指定的元素
						callback:function(n){	//回调函数
						var minprice=$(".minprice").val()
						var maxprice=$(".maxprice").val()
						var form = $("#this_from").serialize()
							console.log(n);
							$(".product").html("")
							$.ajax({
								type:"post",
								url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo&a=goods_list&page",
								data:{
									"page":n,
									 region:2,
									 "class_id":goods_id,
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
				
				
				
				
				
				
			}
		})
})
function price(a){
	var form = $("#this_from").serialize()
	$.ajax({
			type:"post",
			url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo&a=goods_list",    	
			dataType:"text",
			data:form,
			success:function(data){
				var data = eval('('+data+')');
				var goods_list=data.goods_list
				console.log(goods_list)
				for_good_list(goods_list);				
			}
		})
	
}



//排序
function score_down(a){
	var form = $("#this_from").serialize()
	var order = $(".sort_color").attr("index")
		    $.ajax({
			type:"post",
			url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo&a=goods_list",    	
			dataType:"text",
			data:form,
			success:function(data){
				var data = eval('('+data+')');
				var goods_list=data.goods_list
				for_good_list(goods_list);
				var all_page=data.all_page
					Page({
						num:all_page,	//页码数
						startnum:1,//指定页码
						elem:$('#page1'),		//指定的元素
						callback:function(n){	//回调函数
						var minprice=$(".minprice").val()
						var maxprice=$(".maxprice").val()
						var form = $("#this_from").serialize()
							console.log(n);
							$(".product").html("")
							$.ajax({
								type:"post",
								url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo&a=goods_list&page",
								data:{
									"page":n,
									 region:2,
									 "class_id":goods_id,
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
			}
		})
}


//物品列表   
    $.ajax({
		type:"post",
		url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo&a=goods_list",    	
		dataType:"text",
		data:{
			class_id:goods_id,
//			定位地址
			region:2
		},
		success:function(data){
			var data = eval('('+data+')');

//			页码总数
			var all_page =data.all_page
			$(".span2").html(all_page)
			console.log(all_page)
//			产品列表
			var goods_list=data.goods_list
			
			for_good_list(goods_list);	
			    Page({
					num:all_page,	//页码数
					startnum:1,//指定页码
					elem:$('#page1'),		//指定的元素
					callback:function(n){//回调函数
					    var minprice=$(".minprice").val()
						var maxprice=$(".maxprice").val()	
						var form = $("#this_from").serialize()
						var order = $(".sort_color").attr("index")
						$(".span1").html(n)
						console.log(n);
						$(".product").html("")
						$.ajax({
							type:"post",
							url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo&a=goods_list",
							data:{
								page:n,
								region:2,
								class_id:goods_id,
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
			
			
		}
	})
    
//左右箭头   
	var indexpage=1
    $(".pageright").click(function(){
    	var order = $(".sort_color").attr("index")
	    var minprice=$(".minprice").val()
		var maxprice=$(".maxprice").val()
    	
    	var maxpage=Number($(".span2").html())
    	indexpage++
    	if(indexpage>maxpage){
    		indexpage=maxpage
    	}
    	$(".span1").html(indexpage)
    				var all_page =$(".span2").html()
    	
    	    	Page({
						num:all_page,	//页码数
						startnum:indexpage,//指定页码
						elem:$('#page1'),		//指定的元素
						callback:function(n){	//回调函数
													var minprice=$(".minprice").val()
						var maxprice=$(".maxprice").val()
						var form = $("#this_from").serialize()
							console.log(n);
							$(".product").html("")
							$.ajax({
								type:"post",
								url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo&a=goods_list&page",
								data:{
									"page":n,
									 region:2,
									 "class_id":goods_id,
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
    	
//  	var form = $("#this_from").serialize()
		$.ajax({
			type:"post",
			url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo&a=goods_list",    	
			dataType:"text",
			data:{
									"page":indexpage,
									 region:2,
									 "class_id":goods_id,
									 min_price:minprice,
									max_price:maxprice,
									order:order
			},
			success:function(data){
				
				var data = eval('('+data+')');
				console.log(data)
				//			产品列表
				var goods_list=data.goods_list		
				console.log(goods_list)
				for_good_list(goods_list);	
			}
		})
    })
    $(".pageleft").click(function(){
    	var form = $("#this_from").serialize()
    	var order = $(".sort_color").attr("index")
    	var minprice=$(".minprice").val()
		var maxprice=$(".maxprice").val()
    	var maxpage=Number($(".span2").html())
    	indexpage--
    	if(indexpage<1){
    		indexpage=1
    	}
    	$(".span1").html(indexpage)
    	var form = $("#this_from").serialize()
    	var all_page =$(".span2").html()
    				Page({
						num:all_page,	//页码数
						startnum:indexpage,//指定页码
						elem:$('#page1'),		//指定的元素
						callback:function(n){	//回调函数
													var minprice=$(".minprice").val()
						var maxprice=$(".maxprice").val()
						var form = $("#this_from").serialize()
							console.log(n);
							$(".product").html("")
							$.ajax({
								type:"post",
								url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo&a=goods_list&page",
								data:{
									"page":n,
									 region:2,
									 "class_id":goods_id,
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
					region:2,
					class_id:goods_id,
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
    })
})





$(".register_nav").delegate(".ser_content_left li","click",function(){
	console.log("1")
//	$(this).addClass("sort_color").siblings().removeClass("sort_color")
})

$(".sort_compre li").click(function(){
	$(this).addClass("sort_color").siblings().removeClass("sort_color")
})


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

