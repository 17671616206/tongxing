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
var vv;


/////////////////////////////////看了又看，，传6个商品的ID，一次返回6个商品
//console.log(a);
$.ajax({
    url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo2&a=seesee",
    type:"post",
    dataType:"json",
    data:{
        goods_ids:a
    },
    success:function(data) {
        //console.log(233333333333);
        for (var i = 0; i < data.length; i++) {
            console.log(data[i].imgs);
            var containn = $('<div class="accoutbo"><div class="accout_img1"><a href="../company/company.html?goods_id='+data[i].goods_id+'" style="display: inline-block;width: 100%;height: 100%"><img src="'+data[i].imgs+'" alt=""/></a></div><div class="accout_money1"><span>¥</span><span>'+data[i].price+'</span></div><div class="accout_text1">'+data[i].goods_name+'</div></div>');
            $(".accout_moreul>li").append(containn);
        }
    },
    error:function(data){
        console.log(data);
    }

});

//判断是不是积分商品，积分商城传值1，普通商品undefined
var goods_type;



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

    });


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
            index=accoutbo;
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
var meal=GetQueryString("meal");
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
        region:2,
        type:1
    },
    success:function(data) {
        //商品详情介绍部分
        if(data.intro_img){
            $(".accout_serv_img2").append('<image src="'+data.intro_img+'" stylr="width:100%;height:100%;"></image>')
        };
        if (meal & meal == "1") {
            //初始化是否收藏
            if (data.collection) {
                if (data.collection == "1") {
                    $(".collectimg").attr("src", "../images/soucang1@2x.png");
                } else {
                    $(".collectimg").attr("src", "../images/soucang2@2x.png");
                }
            }
            var t1 = data.goods_img[0];
            //console.log(t1);
            var pic1 = $(".accout_left_left_big");
            $(pic1).css({background: "url(" + t1 + ") no-repeat center", "background-size": "cover"});
            var picul = $(".accout_left_left_small_ul");
            $(".accout_left_left_small").append(picul);
            for (var i = 0; i < data.goods_img.length; i++) {
                var t2 = data.goods_img[i];
                var picli = $("<li></li>");
                $(picli).css({background: "url(" + t2 + ") no-repeat center", "background-size": "cover"});
                $(picul).append(picli);
            }
            ;


            //点击显示图片
            $(".accout_left_left_small_ul").delegate("li", "click", function () {
                var back = $(this).css('backgroundImage');
                //console.log(back)
                $(".accout_left_left_big").css({
                    "background": back + "no-repeat center",
                    "background-size": "cover",
                    height: "260px"
                })

            });


            //右边价格，信息开始
            $(".accout_left_right_name").text(data.goods_name);
            $(".accout_left_right_descrip").text(data.goods_intro);
            $(".pricename_price").eq(0).text("￥" + data.price);



//收藏商品
            var id = localStorage.getItem("user_id");
            //判断收藏还是取消收藏
            //console.log($(".collectimg").attr("src"));
            if ($(".collectimg").attr("src") == "../images/soucang2@2x.png") {
                var num = 1;
            } else if ($(".collectimg").attr("src") == "../images/soucang1@2x.png") {
                var num = 0;
            }
            ;
            $(".collect").on("click", function () {

                if ($(".collectimg").attr("src") == "../images/soucang2@2x.png") {
                    var num = 1;
                } else if ($(".collectimg").attr("src") == "../images/soucang1@2x.png") {
                    var num = 0;
                }
                ;
                //console.log(num);
                $.ajax({
                    url: "http://dz.tx178178.com/index.php?m=api&c=GoodsInfo1&a=goodsCollection",
                    type: "post",
                    dataType: "json",
                    data: {
                        user: id,
                        goods: goods_id,
                        type: 1,
                        num: num
                    },
                    success: function (data) {
                        console.log(10);
                        if (data.state = 1) {
                            console.log(20);
                            console.log(num);
                            if (num == 1) {
                                console.log(num);
                                console.log(30);
                                $(".collectimg").attr("src", "../images/soucang1@2x.png");
                            }
                            if (num == 0) {
                                console.log(num);
                                console.log(40);
                                $(".collectimg").attr("src", "../images/soucang2@2x.png");
                            }
                        }
                    },
                    error: function (data) {

                    }
                })
            });




//猜你喜欢部分
            var user_id = localStorage.getItem("user_id");
            if (user_id) {
                $.ajax({
                    url: "http://dz.tx178178.com/index.php?m=api&c=User&a=userLove",
                    type: "post",
                    dataType: "json",
                    data: {
                        id: user_id,
                        ids: goods_id
                    },
                    success: function (data) {

                    },
                    error: function (data) {

                    }
                });
            }


            var leftnum;
            $(".leftt").on("click", function () {
                leftnum = $(".accout_left_left_small_ul").css("margin-left");
                leftnum = leftnum.split("px")[0];
                //console.log(leftnum);
                leftnum = leftnum - 115;
                if (leftnum < -(data.goods_img.length * 115 - 470)) {
                    leftnum = -(data.goods_img.length * 115 - 480);
                }
                $(".accout_left_left_small_ul").css({"margin-left": leftnum + "px"});
            });
            $(".rightt").on("click", function () {
                leftnum = $(".accout_left_left_small_ul").css("margin-left");
                leftnum = leftnum.split("px")[0];
                //console.log(leftnum);
                leftnum = leftnum - 0;
                leftnum += 115;
                if (leftnum > 0) {
                    leftnum = 0;
                }
                $(".accout_left_left_small_ul").css({"margin-left": leftnum + "px"});
            });

            //购买
            $(".tobuy").on("click", function () {
                $.ajax({
                    url: "http://dz.tx178178.com/index.php?m=api&c=GoodsInfo1&a=placeAnOrder",
                    type: "post",
                    dataType: "json",
                    data: {
                        user_id: user_id,
                        goods_id: goods_id,
                        type: 0,
                        info: contain_id,
                        meal: contain_id,
                        spec_id: spec_id,
                        normal: 0,
                        address: addresss,
                        group: 1
                    },
                    success: function (data) {
                        console.log(data);
                        //生成订单后的操作

                    },
                    error: function (data) {
                        console.log(data);
                    }
                });
            });
        }else{
            var spec_id = data.spec_id;
            var normal = data.normal;
            //初始化是否收藏
            if (data.collection) {
                if (data.collection == "1") {
                    $(".collectimg").attr("src", "../images/soucang1@2x.png");
                } else {
                    $(".collectimg").attr("src", "../images/soucang2@2x.png");
                }
            }

            //$(".describe_score").html(data.score);
            //
            //$("#accout_serv_span").html(data.evaluate_num);
            //$("#all_e").html("全部评价（"+(data.evaluate_num<1000?data.evaluate_num:"1000+")+"）");
            //$("#img_e").html("晒图（"+(data.img_evaluate_num<1000?data.img_evaluate_num:"1000+")+"）");
            //$("#chase_e").html("追评（"+(data.chase_evaluate_num<1000?data.chase_evaluate_num:"1000+")+"）");

            var t1 = data.goods_img[0];
            //console.log(t1);
            var pic1 = $(".accout_left_left_big");
            $(pic1).css({background: "url(" + t1 + ") no-repeat center", "background-size": "cover"});
            var picul = $(".accout_left_left_small_ul");
            $(".accout_left_left_small").append(picul);
            for (var i = 0; i < data.goods_img.length; i++) {
                var t2 = data.goods_img[i];
                var picli = $("<li></li>");
                $(picli).css({background: "url(" + t2 + ") no-repeat center", "background-size": "cover"});
                $(picul).append(picli);
            }
            ;


            //点击显示图片
            $(".accout_left_left_small_ul").delegate("li", "click", function () {
                var back = $(this).css('backgroundImage');
                //console.log(back)
                $(".accout_left_left_big").css({
                    "background": back + "no-repeat center",
                    "background-size": "cover",
                    height: "260px"
                })

            });


            //右边价格，信息开始
            $(".accout_left_right_name").text(data.goods_name);
            $(".accout_left_right_descrip").text(data.goods_intro);
            $(".pricename_price").eq(0).text("￥" + data.price);
            //规格商品属性数量
            for (var i = 0; i < data.spec.length; i++) {
                //console.log(data.spec[i].name);
                var item = $('<div class="palce" style="margin-left: 10px;"><p class="place_name">' + data.spec[i].name + ':</p><ul class="placeholder"></ul></div>');
                $(".itembox").append(item);
                //每个规格里面的内容
                for (var j = 0; j < data.spec[i].list.length; j++) {
                    var li = $('<li>' + data.spec[i].list[j].name + '</li>');
                    $(".placeholder").eq(i).append(li);
                }
            }
            //选择规格以及商品价格计算
            var contain_id;
            $(".placeholder>li").on("click", function () {
                var contain_id;
                var pricee = data.price;
                pricee = Number(pricee);
                //console.log(pricee);
                if ($(this).hasClass("activee")) {
                    //console.log(2333);
                } else {
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
                                if (data.spec[i].list[j].name == $(".activee").eq(v).text()) {
                                    //console.log(data.spec[i].list[j].prices);
                                    var newp = Number(data.spec[i].list[j].prices);

                                    if (contain_id == undefined) {
                                        contain_id = (data.spec[i].list[j].id);
                                    } else {
                                        contain_id = (data.spec[i].list[j].id) + "," + contain_id;
                                    }
                                    vv = contain_id;
                                    console.log(contain_id);
                                    pricee = pricee + newp;
                                    var prices = pricee;
                                    //console.log(pricee);
                                    $(".total_price").text(pricee);
                                }
                            }

                        }

                    }
                }
                //价格计算完毕else
            });

            //推荐组合套餐部分
            for (var t = 0; t < data.meal.length; t++) {
                var contain = $('<div class="contains" style="width: 295px;height: 100%;"><p class="left itemname">' + data.meal[t].meal_names + '</p><p class="right">' + data.meal[t].meal_price + '</p></div>');
                $(".containsbox").append(contain);
            }

            //组合套餐点击效果
            $(".contains").on("click", function () {
                console.log($(this).children(".itemname").text());
                for (var o = 0; o < data.meal.length; o++) {
                    if ($(this).children(".itemname").text() == data.meal[o].meal_names) {
                        window.location.href = 'company.html?goods_id=' + data.meal[o].id + '&meal=1&group=2';
                    }
                }
            });

            //提交订单部分


//收藏商品
            var id = localStorage.getItem("user_id");
            //判断收藏还是取消收藏
            //console.log($(".collectimg").attr("src"));
            if ($(".collectimg").attr("src") == "../images/soucang2@2x.png") {
                var num = 1;
            } else if ($(".collectimg").attr("src") == "../images/soucang1@2x.png") {
                var num = 0;
            }
            ;
            $(".collect").on("click", function () {

                if ($(".collectimg").attr("src") == "../images/soucang2@2x.png") {
                    var num = 1;
                } else if ($(".collectimg").attr("src") == "../images/soucang1@2x.png") {
                    var num = 0;
                }
                ;
                //console.log(num);
                $.ajax({
                    url: "http://dz.tx178178.com/index.php?m=api&c=GoodsInfo1&a=goodsCollection",
                    type: "post",
                    dataType: "json",
                    data: {
                        user: id,
                        goods: goods_id,
                        type: 1,
                        num: num
                    },
                    success: function (data) {
                        console.log(10);
                        if (data.state = 1) {
                            console.log(20);
                            console.log(num);
                            if (num == 1) {
                                console.log(num);
                                console.log(30);
                                $(".collectimg").attr("src", "../images/soucang1@2x.png");
                            }
                            if (num == 0) {
                                console.log(num);
                                console.log(40);
                                $(".collectimg").attr("src", "../images/soucang2@2x.png");
                            }
                        }
                    },
                    error: function (data) {

                    }
                })
            });


            //地址选择模块
            var addid =1 /*204*/;
            var addresss;
            $.ajax({
                url: "http://dz.tx178178.com/index.php?m=api&c=User&a=regionChoice",
                type: "post",
                dataType: "json",
                data: {
                    id: addid
                },
                success: function (data) {
                    for (var i = 0; i < data.length; i++) {
                        var addd = $('<option>' + data[i].region_name + '</option>');
                        $("#address").append(addd);
                    }

                    $("#address").on("change", function () {
                        //console.log($("#address>option:checked").text());
                        for (var j = 0; j < data.length; j++) {
                            if ($("#address>option:checked").text() == data[j].region_name) {
                                var address = data[j].region_id;
                                //addresss = address;
                                //二级地区--------------------------------------------------------------------
                                //console.log(address);
                                //console.log(data[j].region_id);
                                $.ajax({
                                    url: "http://dz.tx178178.com/index.php?m=api&c=User&a=regionChoice",
                                    type: "post",
                                    dataType: "json",
                                    data: {
                                        id: address
                                    },
                                    success: function (data) {
                                        //console.log(data);
                                        for (var v = 0; v < data.length; v++) {
                                            //console.log(data.length);
                                            var adds = $('<option>' + data[v].region_name + '</option>');
                                            $("#addresss").append(adds);
                                        }

                                        $("#addresss").on("change", function () {
                                            //console.log($("#address>option:checked").text());
                                            for (var p = 0; p < data.length; p++) {
                                                if ($("#addresss>option:checked").text() == data[p].region_name) {
                                                    var address = data[p].region_id;
                                                    //addresss = address;
                                                    //console.log(address);
                                                    //三级地区--------------------------------------------------
                                                    $.ajax({
                                                        url: "http://dz.tx178178.com/index.php?m=api&c=User&a=regionChoice",
                                                        type: "post",
                                                        dataType: "json",
                                                        data: {
                                                            id: address
                                                        },
                                                        success: function (data) {
                                                            //console.log(data);
                                                            for (var m = 0; m < data.length; m++) {
                                                                //console.log(data.length);
                                                                var addss = $('<option>' + data[m].region_name + '</option>');
                                                                $("#addressss").append(addss);
                                                            }

                                                            $("#addressss").on("change", function () {
                                                                //console.log($("#address>option:checked").text());
                                                                for (var j = 0; j < data.length; j++) {
                                                                    if ($("#addressss>option:checked").text() == data[j].region_name) {
                                                                        var address = data[j].region_id;
                                                                        addresss = address;
                                                                        //console.log(addresss);

                                                                    }}})

                                                        }});
                                                }}})

                                    }});
                            }
                        }

                    });
                }
            });


//////////////////购买下单购买下单购买下单购买下单////////////////////////////////////////////购买下单
            $(".tobuy").on("click", function () {
                //console.log(spec_id);
                //console.log(contain_id);
                //console.log(vv);
                contain_id = vv;
                //console.log(info);
                //console.log(2333);
                //console.log($(".palce").length);
                //console.log($(".activee").length);
                if ($(".palce").length == $(".activee").length) {
                    //console.log(20);
                    //var info;
                    //for (var u = 0; u < $(".activee").length; u++) {
                    //    info+=$(".activee")[u]+"-";
                    //}
                    //console.log(info);
                    //var price=prices;

                    var user_id = localStorage.getItem("user_id");
                    //console.log(user_id);
                    //console.log(goods_id);
                    console.log(contain_id);
                    console.log(spec_id);
                    console.log(addresss);
                    $.ajax({
                        url: "http://dz.tx178178.com/index.php?m=api&c=GoodsInfo1&a=placeAnOrder",
                        type: "post",
                        dataType: "json",
                        data: {
                            user_id: user_id,
                            goods_id: goods_id,
                            type: 0,
                            info: contain_id,
                            meal: contain_id,
                            spec_id: spec_id,
                            normal: 0,
                            address: addresss,
                            group: 1
                        },
                        success: function (data) {
                            console.log(data);
                            if(data!=="0"){
                                //console.log(2333);
                                window.location.href='../pay/pay.html?order_id='+data+'';
                            }
                        },
                        error: function (data) {
                            console.log(data);
                        }
                    });

                }

            });


//猜你喜欢部分
            var user_id = localStorage.getItem("user_id");
            if (user_id) {
                $.ajax({
                    url: "http://dz.tx178178.com/index.php?m=api&c=User&a=userLove",
                    type: "post",
                    dataType: "json",
                    data: {
                        id: user_id,
                        ids: goods_id
                    },
                    success: function (data) {

                    },
                    error: function (data) {

                    }
                });
            }


            var leftnum;
            $(".leftt").on("click", function () {
                leftnum = $(".accout_left_left_small_ul").css("margin-left");
                leftnum = leftnum.split("px")[0];
                //console.log(leftnum);
                leftnum = leftnum - 115;
                if (leftnum < -(data.goods_img.length * 115 - 470)) {
                    leftnum = -(data.goods_img.length * 115 - 480);
                }
                $(".accout_left_left_small_ul").css({"margin-left": leftnum + "px"});
            });
            $(".rightt").on("click", function () {
                leftnum = $(".accout_left_left_small_ul").css("margin-left");
                leftnum = leftnum.split("px")[0];
                //console.log(leftnum);
                leftnum = leftnum - 0;
                leftnum += 115;
                if (leftnum > 0) {
                    leftnum = 0;
                }
                $(".accout_left_left_small_ul").css({"margin-left": leftnum + "px"});
            })

        }
    },
    error:function(data){
        console.log("错误的"+data);
    }
});




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
    //url:"http://dz.tx178178.com/index.php?m=api&c=Search&a=HeatSearch",
    url:"http://dz.tx178178.com/index.php?m=api&c=Search&a=HeatSearch",
    type:"post",
    dataType:"json",
    data:{
        num:10,
        region:2
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
//evaluate_ajax("http://dz.tx178178.com/index.php?m=api&c=GoodsInfo1&a=evaluate");
evaluate_ajax("http://dz.tx178178.com/index.php?m=api&c=GoodsInfo1&a=goodsComment");




if(goods_type==undefined){
    //1积分商品 0普通商品
    goods_type=1
}

//meal=0组合套餐
var meal=GetQueryString("meal");
var type=GetQueryString("type");
var group=GetQueryString("group");
if(meal){
    meal=meal;
}else{
    meal=0;
}
if(type){
    type=type;
}else{
    type=0;
}
if(group){
    group=group;
}else{
    group=1;
}




//评论模块
//console.log(goods_id);
//console.log(type);
//console.log(meal);
function evaluate_ajax(url){
    $.ajax({
        url:url,
        type:"post",
        dataType:"json",
        data:{
            id:goods_id,
            type:0,
            meal:0
        },
        success:function(data) {
            //console.log(data)
            //console.log(data.list.length);


            var voiul=$('.comment_list');

            if(data.list){
                for(var i=0;i<data.list.length;i++){
                    //var vip=data[i].vip;
                    //if(vip==0){
                    //    vip="普通会员";
                    //    //$('.one_vip').removeClass("one_vip");
                    //}else{
                    //    vip=+vip+"级VIP会员"
                    //};


                    var voili=$('<li class="clearfix comment_list_one"><div class="one_img"></div><div class="one_banner"><div class="one_name">'+data.list[i].name+'</div><div class="one_vip"></div><ul class="one_star"></ul><p class="one_text">'+data.list[i].usertext+'</p><ul class="one_list_img"><!--<li></li>--></ul><div class="one_list_foot">'+data.list[i].time+'&nbsp;13:55</div><!--管理员回复地方--></div></li>');
                    $(voiul).append(voili);


                    for(var k=0;k<data.list[i].img.length;k++){
                        var img=data.list[i].img[k];
                        var goodspic=$('<li></li>');
                        var img_list=$('.one_list_img').eq(i);
                        $(img_list).append(goodspic);
                        $(goodspic).css({background: "url("+img+") no-repeat center"});
                    };

                    /*客户回复模块插入回复列表*/
                    //var userpic=data.list[i].user_img;
                    //$('.one_img').css({background: "url("+userpic+") no-repeat center","background-size":"cover" });


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


                    if(data.list[i].reply_list){
                        var replay=$('.one_banner').eq(i);
                        for(var j=0;j<data.list[i].reply_list.length;j++){
                            var replayvoi=$('<div class="one_list_foot-repeat"><span>'+data.list[i].reply_list[j].name+'</span><p>'+data.list[i].reply_list[j].reply_content+'</p></div>');
                            $(replay).append(replayvoi);
                        };}}}


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
                                }
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


//猜你喜欢部分   报错
//看了又看部分   报错
