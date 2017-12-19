//轮播开始
$(function(){

  //加载header和footer
  $("#header").load("header.html");
  $("#footer").load("footer.html");

    //$("#loginbtn").click(function(){
    //    alert("1");
    //})

  //轮播开始 
    var n =0;
    change(n);
    //点击按钮
    $(".carouse>li").on("click",function(){
        change($(this).index());
    });
    //开启定时器
    var Timer = null;
    Timer = setInterval(rightchange,2000);
    function rightchange(){
        n++;
        n=n%$(".bannerimg").find("div").length;
        change(n);
    };
    function change(n){
        $(".bannerimg").find("div").eq(n).show().siblings("div").hide();
        $(".carouse").find("li").eq(n).addClass('active').siblings().removeClass("active");
    };
    $(".menu").on("mouseover",function(){
        clearTimeout(Timer);
    });
    $(".menu").on("mouseout",function(){
       Timer = setInterval(rightchange,2000);
    });

    var index = 0;
    // 左右按钮,广告轮播
    function fu(suoyin){
      $(".conlistblo2").animate({"left":"-"+index*595+"px"},300);
    }
    function fum(suoyin){
      $(".conlistblo").animate({"left":"-"+index*595+"px"},300);
    }

    //banner轮播部分
    $(".prevj").click(function(){
      index = index-1;
      if(index<0){
        index=2;
        $(".bannerimg").show();
      }
      change(index);
    });
    $(".nextj").click(function(){
      index = index+1;
      if(index>2){
        index=0;
        $(".bannerimg").show();
      }
        change(index);
    });
    //中间广告轮播
    $(".prev").click(function(){
        index = index-1;
        if(index<0){
            index=3;
            $(".conlistblo2").animate({"left":"0"},300);
        }
        fu(index);
    });
    $(".next").click(function(){
        index = index+1;
        if(index>3){
            index=0;
            $(".conlistblo2").animate({"left":"0"},300);
        }
        fu(index);
    });
    $(".prevm").click(function(){
        index = index-1;
        if(index<0){
            index=3;
            $(".conlistblo").animate({"left":"0"},300);
        }
        fum(index);
    });
    $(".nextm").click(function(){
        index = index+1;
        if(index>3){
            index=0;
            $(".conlistblo").animate({"left":"0"},300);
        }
        fum(index);
    });


    //menu
    //var data = [
    //        {"id":1,
    //         "tips":"企业服务",
    //         "right":[{"title":"开办公司","keyword":"高效率 高品质 高性价比"},
    //                    {"title":"开办公司","keyword":"高效率 高品质 高性价比"},
    //                    {"title":"开办公司","keyword":"高效率 高品质 高性价比"}],
    //         "content":[
    //            { "oid":1,
    //              "title":"注册公司",
    //              "contenta":["注册公司","注册相关","公司变更","公司注销","注销相关","其他"]
    //              },
    //            { "oid":2,
    //              "title":"公司财税",
    //              "contenta":["税务咨询","代理记账","税务服务","审计报告","财务顾问","税收筹划"]
    //              },
    //            { "oid":3,
    //              "title":"商标注册",
    //              "contenta":["商标咨询","基础服务","国际申请","商标案件","著作权","其他业务","版权服务"]},
    //            { "oid":4,
    //              "title":"人工翻译",
    //              "contenta":["证书翻译","账单翻译","身份证翻译","证明翻译","户口本翻译","驾驶证翻译","合同协议翻译","简历翻译","新闻翻译","标书翻译","论文翻译","报告翻译"]},
    //            { "oid":5,
    //              "title":"专利申请",
    //              "contenta":["专利服务"]},
    //            { "oid":6,
    //              "title":"政策扶持",
    //              "contenta":["双创项目","孵化器"]},
    //             { "oid":7,
    //                "title":"场地选址",
    //                "contenta":["场地服务"]},
    //             { "oid":8,
    //                "title":"特色服务",
    //                "contenta":["开办公司","开办公司","开办公司"]}
    //           ]},
    //           {"id":2,
    //         "tips":"金融服务",
    //         "right":[{"title":"开办公司","keyword":"高效率 高品质 高性价比"},
    //                    {"title":"开办公司","keyword":"高效率 高品质 高性价比"},
    //                    {"title":"开办公司","keyword":"高效率 高品质 高性价比"}],
    //         "content":[
    //            { "oid":1,
    //              "title":"金融资讯",
    //              "contenta":["特色咨询"]
    //              },
    //            { "oid":2,
    //              "title":"贷款服务",
    //              "contenta":["提前收款","同兴微贷","员工贷","信用贷","抵押贷"]
    //              },
    //            { "oid":3,
    //              "title":"理财服务",
    //              "contenta":["同兴理财宝","短期理财","定期理财"]},
    //             { "oid":4,
    //                 "title":"主题基金",
    //                 "contenta":["环保基金","智能基金","股票基金","指数基金","债券基金","货币基金"]},
    //             { "oid":5,
    //              "title":"极速贷",
    //              "contenta":["快速借款"]},
    //            { "oid":6,
    //              "title":"保险服务",
    //              "contenta":["全家福","人身保险","人寿保险"]},
    //            { "oid":7,
    //              "title":"私募基金",
    //              "contenta":["同兴基金"]},
    //             { "oid":8,
    //                 "title":"保理服务",
    //                 "contenta":["企业保理"]}
    //         ]},
    //           {"id":3,
    //         "tips":"法律服务",
    //         "right":[{"title":"开办公司","keyword":"高效率 高品质 高性价比"},
    //                    {"title":"开办公司","keyword":"高效率 高品质 高性价比"},
    //                    {"title":"开办公司","keyword":"高效率 高品质 高性价比"}],
    //         "content":[
    //            { "oid":1,
    //              "title":"法律咨询",
    //              "contenta":["律师服务"]
    //              },
    //            { "oid":2,
    //              "title":"股权事物",
    //              "contenta":["股权咨询","合伙协议","股权激励","股权代持","股权转让","增资扩股"]
    //              },
    //            { "oid":3,
    //              "title":"劳动人事",
    //              "contenta":["人事制度","劳动合同","保密协议","竞业限制","培训协议","解除协议"]},
    //            { "oid":4,
    //              "title":"企业经营",
    //              "contenta":["法律顾问","经营咨询","合同审拟","公司章程","合作协议"]},
    //            { "oid":5,
    //              "title":"债权债务",
    //              "contenta":["欠款催收","律师函","借款合同","保证合同","还款计划","起诉书"]}
    //           ]},
    //           {"id":4,
    //         "tips":"营销文案",
    //         "right":[{"title":"开办公司","keyword":"高效率 高品质 高性价比"},
    //                    {"title":"开办公司","keyword":"高效率 高品质 高性价比"},
    //                    {"title":"开办公司","keyword":"高效率 高品质 高性价比"}],
    //         "content":[
    //            { "oid":1,
    //              "title":"电商推广",
    //              "contenta":["主场热门活动服务","电商大促","网店店运营","店铺视觉","霸屏营销"]
    //              },
    //            { "oid":2,
    //              "title":"网络推广",
    //              "contenta":["品牌／产品推广","提升口碑","微信推广","微博推广","文案撰写","SEO"]
    //              },
    //             { "oid":3,
    //                 "title":"会议会展",
    //                 "contenta":["公关活动","活动执行","场景地推","商户拓展","广告投放","会议展览","创意祝福","策划"]
    //             }
    //           ]},
    //           {"id":5,
    //         "tips":"开发服务",
    //         "right":[{"title":"开办公司","keyword":"高效率 高品质 高性价比"},
    //                    {"title":"开办公司","keyword":"高效率 高品质 高性价比"},
    //                    {"title":"开办公司","keyword":"高效率 高品质 高性价比"}],
    //         "content":[
    //            { "oid":1,
    //              "title":"软件开发",
    //              "contenta":["程序开发","软件美工","插件开发","软件汉化","脚本制作"]
    //              }
    //         ]}
    //];
    //banner-menu-right初始影藏
    $(".banner-menu-right").hide();



    $.ajax({
        type:"post",
        url:"http://dz.tx178178.com/index.php?m=api&c=goods&a=goods",
        dataType:"text",//用json总是报错，同text把数据变成字符串
        data:{},
        success:function(data){
            var data = eval('('+data+')');//把字符串转化为数组
            //console.log(data);
            for(var i=0;i<data.length;i++){
                var aBanner = $('<div class="banner-left-content"></div>');
                $(aBanner).html('<span class="leftone"></span>'+'<p class="banner-left-tel">'+data[i].title+'</p>'+'<span class="spantwo"></span>');
                var oDiv = $('<div></div>');
                var oul = $('<ul class="clearfix"></ul>');
                for(var j=0;j<data[i].contenta.length;j++){
                    var aLi = $('<li>'+data[i].contenta[j].title+'</li>');
                    $(oul).append(aLi);
                };
                $(oDiv).append($(oul));
                $(aBanner).append($(oDiv));

                //添加三级菜单右侧广告
                var oul1 = $("<ul></ul>");
                for(var k=0;k<data[i].adverti.length;k++){
                    var t=data[i].adverti[k].image;
                    //console.log(data[i].adverti[k].image);
                    var ali1 = $('<li style="background:url('+t+') no-repeat;background-size:cover;">\
                        <a style="display: inline-block;background-size:contain;width:100%;height:100%" href="'+data[i].adverti[k].image+'">\
                            <p>'+data[i].adverti[k].describe+'</p>\
                            <div></div>\
                            </a>\
                        </li>');
                    $(oul1).append(ali1);

                $(".banner-menu-left").append(aBanner);

                };

            };
            //添加鼠标事件
            for(var h=0;h<$(".banner-left-content>div").length;h++){
                $(".banner-left-content>div").eq(h).attr("indexa",h);
            }
            $(".banner-left-content>div").on("mouseover",function(){
                $(".banner-left-content>div").removeClass('banner-left-contenta');
                $(this).addClass("banner-left-contenta").siblings();
                //$(".banner-menu-right")显示
                $(".banner-menu-right").show();
                //清空右侧div内容
                var m = $(this).attr("indexa");
                $(".banner-menu_a").html("");
                $(".banner-menu_c").html("");


                //创建三级菜单弹出页面
                for(var j=0;j<data[m].contenta.length;j++){
                    var oDiv = $('<div class="left banner-menu_b"></div>');
                    var op = $('<p>\
                       <span></span>'
                    +data[m].contenta[j].title+
                    '</p>');
                    var oul = $("<ul></ul>");
                    //生成li标签
                    for(var i=0;i<data[m].contenta[j].contenta.length;i++){
                        //if(i<3){
    //ajax传值跳转
                            var id=data[m].contenta[j].contenta[i].oid;
                            var ali = $('<li>\
                            <a href="../register/register.html?goods_id='+id+'">'
                                +data[m].contenta[j].contenta[i].title+
                                '</a>\
                            </li>');
                            $(oul).append(ali);
                        //};


                    };
                    $(oDiv).append(op);
                    $(oDiv).append(oul);
                    $(".banner-menu_a").append($(oDiv));
                    $(".banner-menu_c").append($(oul1));
                }
            });
            $(".banner-left-content>div").on("mouseout",function(){
                $(".banner-menu-right").hide();
                $(".banner-left-content>div").removeClass('banner-left-contenta');
            });
            $(".banner-menu-right").on("mouseover",function(){
                $(".banner-menu-right").show();
            })
            $(".banner-menu-right").on("mouseout",function(){
                $(".banner-menu-right").hide();
                $(".banner-left-content>div").removeClass('banner-left-contenta');
            })
        },
        error:function(data){
            console.log("错误的"+data)
        }
    });




    //轮播图部分
    $.ajax({
        type:"get",
        //url:"http://api.tx178178.com/api/AdvertiList/AdvertiList1",
        url:"http://dz.tx178178.com/index.php?m=api&c=AdvertiList&a=AdvertiList1",
        dataType:"text",
        data:{},
        success:function(data){
            var data = eval('('+data+')');//把字符串转化为数组
            //console.log(data);
            for(var i= 0;i<3;i++){
                var t=data[i].image;
                //console.log(t);
                var url=data[i].url;
                var zepto=$('<div><a href="'+url+'" style="display:inline-block;width: 100%;height: 100%"><img src="'+t+'" alt="" style="display:inline-block;width: 100%;height: 100%"/></a></div>');
                var zeptoul=$('.bannerimg');
                $(zeptoul).append(zepto);
            }

        },
        error:function(data){
            console.log("错误的"+data)
        }
    });
    //热门推荐部分
    $.ajax({
        type:"post",
        url:"http://dz.tx178178.com/index.php?m=api&c=AdvertiList&a=AdvertiList2",
        dataType:"text",
        data:{},
        success:function(data){
            var data = eval('('+data+')');//把字符串转化为数组
            for(var i= 0;i<data.length;i++){
                var ullist=$('.hotarea_list');/*获取ullist*/
                //console.log(ullist);
                var t=data[i].image;
                var url=data[i].url;
                //console.log(t);
                var li= $('<li class="hotarea_listimg"><a href="'+url+'"><img style="height: 146px;width:300px" src="'+t+'"/></a></li>');
                $(ullist).append(li);
            }
        },
        error:function(data){
            console.log("错误的"+data)
        }
    });
    //开办公司广告
    $.ajax({
        type:"post",
        url:"http://dz.tx178178.com/index.php?m=api&c=AdvertiList&a=AdvertiList3",
        dataType:"text",
        data:{},
        success:function(data){
            var data = eval('('+data+')');//把字符串转化为数组
                for(var j=0;j<(data[0].length);j++){
                    var t=data[0][j].image;
                    var url=data[0][j].url;/*第i个对象的url*/
                    var info=data[0][j].describe;
                    var infoleft=info;
                    var inforight=info;
                    var ul1= $('.conlistblo');
                    var li=$('<li><div class="conlist_header"><p class="left">开办公司<span>STAR A COMPANY</span></p>  <a class="right" href="'+url+'">更多<span></span></a></div><a style="display: inline-block;width:100%;height:100%" href="'+t+'"><div class="conlist_con" style="background-image:url('+t+');"></div></a></li>');
                    $(ul1).append(li);
                };
                for(var k=data[1].length-1;k>=0;k--){
                    var t=data[1][k].image;
                    var url=data[1][k].url;/*第i个对象的url*/
                    //var info=data[0][j].describe;
                    //var infoleft=info[0];
                    //var inforight=info[1];
                    var ul2= $('.conlistblo2');
                    var li=$('<li><div class="conlist_header"><p class="left">开办公司<span>STAR A COMPANY</span></p>  <a class="right" href="'+url+'">更多<span></span></a></div><div class="conlist_con" style="background-image:url('+t+');"><a style="display: inline-block;width:100%;height:100%" href="'+t+'"><div class="conlist_con" style="background-image:url('+t+');"></div></a></li>');
                    $(ul2).append(li);
                }

        },
        error:function(data){
            console.log("错误的"+data)
        }
    });


    //服务伙伴
    $.ajax({
        type:"post",
        url:"http://dz.tx178178.com/index.php?m=api&c=AdvertiList&a=AdvertiList4",
        dataType:"text",
        data:{},
        success:function(data) {
            var data = eval('(' + data + ')');//把字符串转化为数组
            //console.log(data.length);
            var url=data[0].url;
            var t=data[0].image;
            //console.log(t);
            //console.log(url);
            var Bleft=$('.container_Bleft');
            Bleft.html('<a href="'+url+'" style="display:inline-block;width: 100%;height: 100%"><img src="'+t+'" alt="" style="display:inline-block;width: 100%;height: 100%"/></a>');
            for(var i=1;i<data.length-1;i++){
                var url=data[i].url;
                var t=data[i].image;
                var ul=$('.container_Bright');
                var li=$('<li><a href="'+url+'" style="display:inline-block;width: 100%;height: 100%"><img src="'+t+'" alt="" style="display:inline-block;width: 100%;height: 100%"/></a></li>');
                $(ul).append(li);
            };
            //console.log(data[data.length-1]);
            var url=data[data.length-1].url;
            var t=data[data.length-1].image;
            //console.log(t);
            //console.log(url);
            var end=$('<li class="morepro"><a href="'+url+'" style="display:inline-block;width:167px;height:101px"><img src="'+t+'" alt="" style="display:inline-block;width: 100%;height: 100%"/></a></li>');
            var end2=$('<li style="background-color:white;"><a href="'+url+'" style="color:#353526;display:inline-block;text-align:center;width:167px;height:101px;display:inline-block;line-height:100px">更多品牌服务商&nbsp;>></a><li>');
            $(ul).append(end);
            $(ul).append(end2);
        },
        error:function(data){
            console.log("错误的"+data)
        }
    });


    //开办公司

    $.ajax({
        type:"post",
        url:"http://dz.tx178178.com/index.php?m=api&c=AdvertiList&a=AdvertiList5",
        dataType:"text",
        data:{},
        success:function(data){
            var data = eval('(' + data + ')');//把字符串转化为数组
            for(var i=0;i<data.length;i++){
                //console.log(i);
                if(i<(data.length)/2){
                    var ul=$('.container_Cheader');
                    var url=data[i].url;
                    var t=data[i].image;
                    var li=$('<li class="hoveryg"><div class="container_Cheader_top"><p>开办公司</p></div><div class="container_Cheader_con"><h5><a href="'+url+'">公司注册</a></h5><p><a href="'+url+'">更多优惠等着你</a></p><img src="'+t+'" height="68" width="101" alt="" /></div></li>');
                    $(ul).append(li);
                }else{
                    var ul=$('.container_Cbottom');
                    var url=data[i].url;
                    //console.log(url);
                    var t=data[i].image;
                    var li=$('<li class="hoveryg"><div class="container_Cheader_con"><h5><a href="'+url+'">公司注册</a></h5><p><a href="'+url+'">更多优惠等着你</a></p><img src="'+t+'" height="68" width="101" alt="" /></div></li>');
                    $(ul).append(li);
                }
            };
        },
        error:function(data){
            console.log("错误的"+data)
        }
    });

    //广告
    $.ajax({
        type:"post",
        url:"http://dz.tx178178.com/index.php?m=api&c=AdvertiList&a=AdvertiList6",
        dataType:"text",
        data:{},
        success:function(data){
            var data = eval('(' + data + ')');//把字符串转化为数组
            var img=$('.Advertisement');
            var url=data[1].url;
            var t=data[1].image;
            //console.log(t);
            img.html('<a href="'+url+'" style="display:inline-block;width: 100%;height: 100%"><img src="'+t+'"/></a>');
            //img2
            var img2=$('.Advertisementb');
            var url2=data[2].url;
            var t2=data[2].image;
            //console.log(t2);
            img2.html('<a href="'+url2+'" style="display:inline-block;width:1200px;overflow:hidden;height: 100%"><img style="display:inline-block;width: 1200px;height: 100%" src="'+t2+'"/></a>');
            $(img2).css({display:"block","text-align":"center"/*margin:"auto"*/});
        },
        error:function(data){
            console.log("错误的"+data);
        }
    });


    //6个商品位置
    $.ajax({
        url:"http://dz.tx178178.com/index.php?m=api&c=AdvertiList&a=AdvertiList10",
        type:"get",
        dataType:"json",
        data:{},
        success:function(data){
        	console.log(data)
            //生成一级标题
            for (var i = 0; i < data[0].length; i++) {
                //console.log(data[0][i]);
                $(".title1_name").eq(i).text(data[0][i]);
            }
            //二级标题部分
            for (var j = 0; j < data[1].length; j++) {
                //console.log(data[1][j][0].class_img);
                //二级标题背景图部分
                $(".ad_li_2").eq(j).css("background", "url("+data[1][j][0].class_img+") no-repeat bottom;");

                for (var v = 0; v < data[1][j].length; v++) {
                    var a=$('<a href="../register/register.html?two_id='+data[1][j][v].class_id+'">'+data[1][j][v].name+'</a>');
                    $(".ad_li_2").eq(j).append(a);

                }
            }
            //三级标题标题部分
            //分6个商品模块遍历
            var col=["#00A79D","#FFCC00","#0098DB","#EC3237","#60BCE1","#428CCB"];
            for (var m = 0; m < data[2].length; m++) {
                //每个模块里面6个小模块
                for (var z = 0; z < data[2][m].length; z++) {
                    //每个小模块里面的p标签更改名称,加上转跳链接
                    $(".hoveryg>p").eq(6*m+z).html('<a style="text-decoration: none;color:'+col[m]+'" href="../register/register.html?goods_id='+data[2][m][z].class_id+'">'+data[2][m][z].name+'</a>');
                    //生成每个小标题下面的广告位
                    if(data[2][m][z].linnkurl){
                    if(data[2][m][z].linnkurl.length==1){
                        $(".link").html('<a href="'+data[2][m][z].linnkurl[0].href+'" style="display: inline-block;text-decoration: none;color:#626262">'+data[2][m][z].linnkurl[0].name+'</a>')
                    }else{
                        $(".link").html('<a href="'+data[2][m][z].linnkurl[0].href+'" style="display: inline-block;text-decoration: none;color:#626262">'+data[2][m][z].linnkurl[0].name+'</a> &nbsp;&nbsp;| <a href="'+data[2][m][z].linnkurl[1].href+'" style="display: inline-block;text-decoration: none;color:#626262">'+data[2][m][z].linnkurl[1].name+'</a>')
                    }

                }
                }
            }
            //更改商品模块标题背景色
            for (var s = 0; s < col.length; s++) {
                $(".container_Dtop").eq(s).css("background-color",""+col[s]+"");
            }

            //$(".ad_li_2>a").on("click",function(){
            //    console.log($(this).text());
            //})




        },
        error:function(data){

        }
    })





//开办公司1
//    $.ajax({
//        type:"post",
//        url:"http://dz.tx178178.com/index.php?m=api&c=AdvertiList&a=AdvertiList7",
//        dataType:"text",
//        data:{},
//        success:function(data){
//            var data = eval('(' + data + ')');//把字符串转化为数组
//           //console.log(data.length);
//            var li1=$('.kszc').eq(0);
//            var url1=data[0].url;
//            var t1=data[0].image;
//            $(li1).css({background: "url("+t1+") no-repeat center","background-size":"cover" });
//            $(li1).html('<a style="display: inline-block;width:100%;height:100%" href="'+url1+'">');
//            //li2
//            var li2=$('.container_Dconlistb').eq(0);
//            var url2=data[1].url;
//            var t2=data[1].image;
//            $(li2).html('<a style="display: inline-block;width:100%;height:100%" href="'+url2+'"><a/>');
//            $(li2).css({background: "url("+t2+") no-repeat center","background-size":"cover" });
//            //li3--6
//            for(var i=2;i<6;i++){
//                var url=data[i].url;
//                var t=data[i].image;
//                var ul=$('.container_Dconlistcl').eq(0);
//                var li=$('<li class="container_Dconlistcla hoveryg"><a style="display: inline-block;width:100%;height:100%" href="'+url+'"></li>');
//                $(li).css({"background":"url("+t+") no-repeat center","background-size":"cover"});
//                $(ul).append(li);
//            };
//
//            //li-end
//            var liend=$('.container_Dconlistd').eq(0);
//            var url7=data[6].url;
//            var t7=data[6].image;
//            var url8=data[7].url;
//            var t8=data[7].image;
//            $(liend).html('<div class="hoveryg"><a href="'+url7+'"><img src="'+t7+'"/></a></div><div class="hoveryg"><a href="'+url8+'"><img src="'+t8+'" /></a></div>');
//        },
//        error:function(data){
//            console.log("错误的"+data)
//        }
//    });
//开办公司2
//    $.ajax({
//        type:"post",
//        url:"http://dz.tx178178.com/index.php?m=api&c=AdvertiList&a=AdvertiList8",
//        dataType:"text",
//        data:{},
//        success:function(data){
//            var data = eval('(' + data + ')');//把字符串转化为数组
//           //console.log(data.length);
//            var li1=$('.kszc').eq(1);
//            var url1=data[0].url;
//            var t1=data[0].image;
//            $(li1).css({background: "url("+t1+") no-repeat center","background-size":"cover" });
//            $(li1).html('<a style="display: inline-block;width:100%;height:100%" href="'+url1+'">');
//            //li2
//            var li2=$('.container_Dconlistb').eq(1);
//            var url2=data[1].url;
//            var t2=data[1].image;
//            $(li2).html('<a style="display: inline-block;width:100%;height:100%" href=""><!--<h3>股份有限公司注册</h3><p>高效办理，快速注册</p><p>￥1652</p>--><a/>');
//            $(li2).css({background: "url("+t2+") no-repeat center","background-size":"cover" });
//            //li3--6
//            for(var i=2;i<6;i++){
//                var url=data[i].url;
//                var t=data[i].image;
//                var ul=$('.container_Dconlistcl').eq(1);
//                var li=$('<li class="container_Dconlistcla hoveryg"><a style="display: inline-block;width:100%;height:100%" href="'+url+'"></li>');
//                $(li).css({"background":"url("+t+") no-repeat center","background-size":"cover"});
//                $(ul).append(li);
//            };
//
//            //li-end
//            var liend=$('.container_Dconlistd').eq(1);
//            var url7=data[6].url;
//            var t7=data[6].image;
//            var url8=data[7].url;
//            var t8=data[7].image;
//            $(liend).html('<div class="hoveryg"><a href="'+url7+'"><img src="'+t7+'"/></a></div><div class="hoveryg"><a href="'+url8+'"><img src="'+t8+'" /></a></div>');
//        },
//        error:function(data){
//            console.log("错误的"+data)
//        }
//    });
////开办公司3
//    $.ajax({
//        type:"post",
//        url:"http://dz.tx178178.com/index.php?m=api&c=AdvertiList&a=AdvertiList9",
//        dataType:"text",
//        data:{},
//        success:function(data){
//            var data = eval('(' + data + ')');//把字符串转化为数组
//            //console.log(data);
//            var li1=$('.kszc').eq(2);
//            var url1=data[0].url;
//            var t1=data[0].image;
//            $(li1).css({background: "url("+t1+") no-repeat center","background-size":"cover" });
//            $(li1).html('<a style="display: inline-block;width:100%;height:100%" href="'+url1+'">');
//            //li2
//            var li2=$('.container_Dconlistb').eq(2);
//            var url2=data[1].url;
//            var t2=data[1].image;
//            $(li2).html('<a style="display: inline-block;width:100%;height:100%" href="'+url2+'"><a/>');
//            $(li2).css({background: "url("+t2+") no-repeat center","background-size":"cover" });
//            //li3--6
//            for(var i=2;i<6;i++){
//                var url=data[i].url;
//                var t=data[i].image;
//                var ul=$('.container_Dconlistcl').eq(2);
//                var li=$('<li class="container_Dconlistcla hoveryg"><a style="display: inline-block;width:100%;height:100%" href="'+url+'"></li>');
//                $(li).css({"background":"url("+t+") no-repeat center","background-size":"cover"});
//                $(ul).append(li);
//            };
//
//            //li-end
//            var liend=$('.container_Dconlistd').eq(2);
//            var url7=data[6].url;
//            var t7=data[6].image;
//            var url8=data[7].url;
//            var t8=data[7].image;
//            $(liend).html('<div class="hoveryg"><a href="'+url7+'"><img src="'+t7+'"/></a></div><div class="hoveryg"><a href="'+url8+'"><img src="'+t8+'" /></a></div>');
//        },
//        error:function(data){
//            console.log("错误的"+data)
//        }
//    });
//
////开办公司4
//    $.ajax({
//        type:"post",
//        url:"http://dz.tx178178.com/index.php?m=api&c=AdvertiList&a=AdvertiList10",
//        dataType:"text",
//        data:{},
//        success:function(data){
//            var data = eval('(' + data + ')');//把字符串转化为数组
//           //console.log(data.length);
//            var li1=$('.kszc').eq(3);
//            var url1=data[0].url;
//            var t1=data[0].image;
//            $(li1).css({background: "url("+t1+") no-repeat center","background-size":"cover" });
//            $(li1).html('<a style="display: inline-block;width:100%;height:100%" href="'+url1+'">');
//            //li2
//            var li2=$('.container_Dconlistb').eq(3);
//            var url2=data[1].url;
//            var t2=data[1].image;
//            $(li2).html('<a style="display: inline-block;width:100%;height:100%" href=""><!--<h3>股份有限公司注册</h3><p>高效办理，快速注册</p><p>￥1652</p>--><a/>');
//            $(li2).css({background: "url("+t2+") no-repeat center","background-size":"cover" });
//            //li3--6
//            for(var i=2;i<6;i++){
//                var url=data[i].url;
//                var t=data[i].image;
//                var ul=$('.container_Dconlistcl').eq(3);
//                var li=$('<li class="container_Dconlistcla hoveryg"><a style="display: inline-block;width:100%;height:100%" href="'+url+'"></li>');
//                $(li).css({"background":"url("+t+") no-repeat center","background-size":"cover"});
//                $(ul).append(li);
//            };
//
//            //li-end
//            var liend=$('.container_Dconlistd').eq(3);
//            var url7=data[6].url;
//            var t7=data[6].image;
//            var url8=data[7].url;
//            var t8=data[7].image;
//            $(liend).html('<div class="hoveryg"><a href="'+url7+'"><img src="'+t7+'"/></a></div><div class="hoveryg"><a href="'+url8+'"><img src="'+t8+'" /></a></div>');
//        },
//        error:function(data){
//            console.log("错误的"+data)
//        }
//    });
//    //开办公司5
//    $.ajax({
//        type:"post",
//        url:"http://dz.tx178178.com/index.php?m=api&c=AdvertiList&a=AdvertiList11",
//        dataType:"text",
//        data:{},
//        success:function(data){
//            var data = eval('(' + data + ')');//把字符串转化为数组
//            //console.log(data.length);
//            var li1=$('.kszc').eq(4);
//            var url1=data[0].url;
//            var t1=data[0].image;
//            $(li1).css({background: "url("+t1+") no-repeat center","background-size":"cover" });
//            $(li1).html('<a style="display: inline-block;width:100%;height:100%" href="'+url1+'">');
//            //li2
//            var li2=$('.container_Dconlistb').eq(4);
//            var url2=data[1].url;
//            var t2=data[1].image;
//            $(li2).html('<a style="display: inline-block;width:100%;height:100%" href=""><!--<h3>股份有限公司注册</h3><p>高效办理，快速注册</p><p>￥1652</p>--><a/>');
//            $(li2).css({background: "url("+t2+") no-repeat center","background-size":"cover" });
//            //li3--6
//            for(var i=2;i<6;i++){
//                var url=data[i].url;
//                var t=data[i].image;
//                var ul=$('.container_Dconlistcl').eq(4);
//                var li=$('<li class="container_Dconlistcla hoveryg"><a style="display: inline-block;width:100%;height:100%" href="'+url+'"></li>');
//                $(li).css({"background":"url("+t+") no-repeat center","background-size":"cover"});
//                $(ul).append(li);
//            };
//
//            //li-end
//            var liend=$('.container_Dconlistd').eq(4);
//            var url7=data[6].url;
//            var t7=data[6].image;
//            var url8=data[7].url;
//            var t8=data[7].image;
//            $(liend).html('<div class="hoveryg"><a href="'+url7+'"><img src="'+t7+'"/></a></div><div class="hoveryg"><a href="'+url8+'"><img src="'+t8+'" /></a></div>');
//        },
//        error:function(data){
//            console.log("错误的"+data)
//        }
//    });
//    //开办公司6
//    $.ajax({
//        type:"post",
//        url:"http://dz.tx178178.com/index.php?m=api&c=AdvertiList&a=AdvertiList12",
//        dataType:"text",
//        data:{},
//        success:function(data){
//            var data = eval('(' + data + ')');//把字符串转化为数组
//            //console.log(data);
//            var li1=$('.kszc').eq(5);
//            var url1=data[0].url;
//            var t1=data[0].image;
//            $(li1).css({background: "url("+t1+") no-repeat center","background-size":"cover" });
//            $(li1).html('<a style="display: inline-block;width:100%;height:100%" href="'+url1+'">');
//            //li2
//            var li2=$('.container_Dconlistb').eq(5);
//            var url2=data[1].url;
//            var t2=data[1].image;
//            $(li2).html('<a style="display: inline-block;width:100%;height:100%" href="'+url2+'"><a/>');
//            $(li2).css({background: "url("+t2+") no-repeat center","background-size":"cover" });
//            //li3--6
//            for(var i=2;i<6;i++){
//                var url=data[i].url;
//                var t=data[i].image;
//                //console.log(data[1].image);
//                var ul=$(".container_Dconlistcl").eq(5);
//                var li=$('<li class="container_Dconlistcla hoveryg"><a style="display: inline-block;width:100%;height:100%" href="'+url+'"></li>');
//                $(li).css({"background":"url("+t+") no-repeat center","background-size":"cover"});
//                $(ul).append(li);
//            };
//            //li-end
//            var liend=$('.container_Dconlistd').eq(5);
//            var url7=data[6].url;
//            var t7=data[6].image;
//            var url8=data[7].url;
//            var t8=data[7].image;
//            $(liend).html('<div class="hoveryg"><a href="'+url7+'"><img src="'+t7+'"/></a></div><div class="hoveryg"><a href="'+url8+'"><img src="'+t8+'" /></a></div>');
//        },
//        error:function(data){
//            console.log("错误的"+data)
//        }
//    });
    //资讯部分
    $.ajax({
        type:"post",
        url:"http://dz.tx178178.com/index.php?m=api&c=ArticleColumn&a=article",
        dataType:"text",
        data:{},
        success:function(data){
            var data = eval('(' + data + ')');//把字符串转化为数组

            //console.log(data);
            //分类名
            for(var i=0;i<data.length;i++){
                //console.log(data[i].column_name);
                if(data[i].column_name=="同兴资讯"||data[i].column_name=="同兴政策"){
                var titleli=$('<li>'+data[i].column_name+'</li>');
                //console.log(titleli)
                $('.tabbtn').append(titleli);
                    $(".tabbtn>li").eq(0).addClass("active");
                };
                //创建文章种类结束

                //文章种类列表点击效果
                var titlename="同兴资讯";
                wz(titlename);
                $(".tabbtn>li").on("click",function(){
                    $(".tabbtn>li").removeClass("active");
                    $(this).addClass("active");

                    var titlename=$(this).text();

                    //console.log(titlename);
                    wz(titlename);
                });
                //标题样式更换结束
                //文章种类下的文章详细列表
                function wz(titlename){
                    //console.log(data[i].column_name);
                    for(var n=0;n<data.length;n++){
                        //console.log(data.length);
                        //console.log(data[n]);
                    if(data[n].column_name==titlename){

                         /*column_name一直报错*/

                         //console.log(titlename);

                         if(data[n].list[0]!==undefined){
                             var name=data[n].list[0].article_title;
                             var t=data[n].list[0].img;
                             var article_id=data[n].list[0].article_id;
                             $('.container_Econ_left').html('');
                             $('.container_Econ_left').html('<a style="display:inline-block;width: 100%;height: 100%" href="../zixun/zixun.html?article_id='+article_id+'"><div>'+name+'</div></a>');
                             $('.container_Econ_left').css({"background":"url("+t+") no-repeat center","background-size":"cover"});


                             var ul=$('.container_Econ_right');/*右边模块*/

                             for(var j=0;j<3;j++){
                                 if(data[n].list[j]!==undefined){
                                     var names=data[n].list[j].article_title;
                                     var t=data[n].list[j].img;
                                     var pname=data[n].list[j].article_text;
                                     var time=data[n].list[j].release_time;
                                     var view=data[n].list[j].amount;
                                     var li=$('<li><div style="background:url('+t+') no-repeat center;background-size:cover;" class="container_Econ_rightimg"><a style="display:inline-block;width: 100%;height: 100%" href="../zixun/zixun.html?article_id='+article_id+'"></a></div><div style="height:18px;overflow:hidden">'+names+'</div><div class="xiandiv"></div><p><a href="../zixun/zixun.html?article_id='+article_id+'">'+pname+'</a></p><div class="container_Econtips"><div class="left container_Econdate"><span></span>'+time+'</div><div class="left container_Econread"><span></span>'+view+'</div></div></li>');
                                     $(ul).html("");
                                     $(ul).append(li);
                                 }

                             }

                         }
                     }
                    }
                    //调用结束

                }
                //封装结束

            }
        },
        error:function(data){
            console.log("错误的"+data)
        }
    });


//


    //左侧定位btn
    //获取屏幕宽度
    var wWidth = window.innerWidth;
    // console.log(wWidth);
    //fixedleft的初始定位距离
    var oleft = (wWidth-1340)/2;
    //console.log(oleft);
    $(".fixedleft").css({"position":"fixed","left":oleft,"top":"100px"}).hide();
    //返回顶部
    $(".goback").on("click",function(){
        $("body,html").animate({scrollTop:"0px"},1000);
    });
    $(window).scroll(function(){
        if($("body,html").scrollTop()>=600){
            $(".fixedleft").fadeIn();
        }else{
            $(".fixedleft").fadeOut();
        }
        //console.log($(".scrollA").eq(4).height());
        var AA = $("body,html").scrollTop()+220;
        for(var i=0;i<$(".scrollA").length-1;i++){
            if(AA>=$(".scrollA").eq(i).offset().top&&AA<=$(".scrollA").eq(i+1).offset().top){
                $(".fixedleft>ul>li").eq(i).addClass("active").siblings().removeClass('active');
            }else if(AA>$(".scrollA").eq(5).offset().top){
                $(".fixedleft>ul>li").eq(5).addClass("active").siblings().removeClass('active');
            }
        }

    });
   
    for(var i=0;i<$(".scrollA").length;i++){
        $(".fixedleft>ul>li").eq(i).attr("indexa",i);
        $(".fixedleft>ul>li").eq(i).on("click",function(){
            //获取对应区域高度
            var scrollATop = $(".scrollA").eq($(this).attr("indexa")).offset().top-100;
            $("body,html").animate({scrollTop:scrollATop},500);
          
        });


    }
    $(".backTop").on("click",function(){
        $("body,html").animate({scrollTop:"0px"},1000);
    });

    //政府质询切换tab
    $(".tabbtn>li").on("click",function(){
      zfzxTab($(this).index())
    })
    function zfzxTab(m){
      $(".container_Econ").hide();
      $(".tabbtn>li").removeClass("active");
      $(".container_Econ").eq(m).show();
      $(".tabbtn>li").eq(m).addClass("active");
    }






    //热门城市数据
    var hotCity = ["全国","北京市","北京市","北京市","北京市","北京市","北京市","北京市","北京市","北京市"];
    // var allCity = [ 
    //         {"name":"ABCDE",
    //          "city":[
    //                     {"Type":"A","citys":["北京市","北京市","北京市","北京市","北京市"]},
    //                     {"Type":"B","citys":["北京市","北京市","北京市","北京市","北京市"]},
    //                     {"Type":"C","citys":["北京市","北京市","北京市","北京市","北京市"]},
    //                     {"Type":"D","citys":["北京市","北京市","北京市","北京市","北京市"]},
    //                     {"Type":"E","citys":["北京市","北京市","北京市","北京市","北京市"]}
    //                 ]
    //         },
    //         {"name":"FGHJ",
    //          "city":[
    //                     {"Type":"A","citys":["北京市","北京市","北京市","北京市","北京市"]},
    //                     {"Type":"B","citys":["北京市","北京市","北京市","北京市","北京市"]},
    //                     {"Type":"C","citys":["北京市","北京市","北京市","北京市","北京市"]},
    //                     {"Type":"D","citys":["北京市","北京市","北京市","北京市","北京市"]},
    //                     {"Type":"E","citys":["北京市","北京市","北京市","北京市","北京市"]}
    //                 ]
    //         },
    //         {"name":"KLMNP",
    //          "city":[
    //                     {"Type":"A","citys":["北京市","北京市","北京市","北京市","北京市"]},
    //                     {"Type":"B","citys":["北京市","北京市","北京市","北京市","北京市"]},
    //                     {"Type":"C","citys":["北京市","北京市","北京市","北京市","北京市"]},
    //                     {"Type":"D","citys":["北京市","北京市","北京市","北京市","北京市"]},
    //                     {"Type":"E","citys":["北京市","北京市","北京市","北京市","北京市"]}
    //                 ]
    //         },
    //         {"name":"QRSTW",
    //          "city":[
    //                     {"Type":"A","citys":["北京市","北京市","北京市","北京市","北京市"]},
    //                     {"Type":"B","citys":["北京市","北京市","北京市","北京市","北京市"]},
    //                     {"Type":"C","citys":["北京市","北京市","北京市","北京市","北京市"]},
    //                     {"Type":"D","citys":["北京市","北京市","北京市","北京市","北京市"]},
    //                     {"Type":"E","citys":["北京市","北京市","北京市","北京市","北京市"]}
    //                 ]
    //         },
    //         {"name":"XYZ",
    //          "city":[
    //                     {"Type":"A","citys":["北京市","北京市","北京市","北京市","北京市"]},
    //                     {"Type":"B","citys":["北京市","北京市","北京市","北京市","北京市"]},
    //                     {"Type":"C","citys":["北京市","北京市","北京市","北京市","北京市"]},
    //                     {"Type":"D","citys":["北京市","北京市","北京市","北京市","北京市"]},
    //                     {"Type":"E","citys":["北京市","北京市","北京市","北京市","北京市"]}
    //                 ]
    //         }
    // ];
    



    //全部城市
    // aCity(0);
    // function aCity(n){
    //     $(".allCity_content").html("");
    //     for(var i=0; i<allCity[n].city.length;i++){
    //         for( var j=0;j<allCity[n].city.length;j++){
    //             // console.log(allCity[n].city[j]);
                
    //         }
    //     }
    // }

    //热门城市
    for(var i=0;i<hotCity.length;i++){
        var aLi = $('<li>\
                    <a href="">'
                    +hotCity[i]+
                    '</a>\
                </li>');
        $(".address>ul").append(aLi);
    };
    $(".allCity_head>li").on("mouseover",function(){
        $(".allCity_head>li").removeClass('active');
        $(this).addClass('active');
    })

    $("#bottomli1").click(function(){
        $(".vipblock1").css({"display":"block"});
        $(".vipblock2").css({"display":"none"});
        $(".vipblock3").css({"display":"none"});
    })
    $("#bottomli2").click(function(){
        $(".vipblock1").css({"display":"none"});
        $(".vipblock2").css({"display":"block"});
        $(".vipblock3").css({"display":"none"});
    })
    $("#bottomli3").click(function(){
        $(".vipblock1").css({"display":"none"});
        $(".vipblock2").css({"display":"none"});
        $(".vipblock3").css({"display":"block"});
    })

})




