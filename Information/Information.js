/**
 * Created by Administrator on 2017/10/8 0008.
 */
$(function(){
    //加载header和footer
    $("#header").load("../home/header.html");
    $("#footer").load("../home/footer.html");
});

//新闻资讯开始

$.ajax({
    type:"post",
    url:"http://dz.tx178178.com/index.php?m=api&c=ArticleColumn&a=article",
    dataType:"text",
    data:{},
    success:function(data) {
        var data = eval('(' + data + ')');//把字符串转化为数组
        for(var i=0;i<data.length;i++){
            var ul=$(".Information_conH>ul");
            var listname=data[i].column_name;
            console.log(listname);
            var li=$('<li>'+listname+'</li>');
            $(ul).append(li);
        }
        $(".Information_conH>ul>li").eq(0).addClass("active");
        //文章标题部分结束
        $(".Information_conH>ul>li").on("click",function(){
            $(".Information_conH>ul>li").removeClass("active");
            $(this).addClass("active");
            //标题样式更换结束
            //资讯模块开始
            var name=$(this).text();
            //console.log(name);
            var listul=$(".Information_conCAlist");
            $(listul).html("");/*清空资讯列表内容*/
            for(var h=0;h<data.length;h++){
                if(data[h].column_name==name){
                    //console.log(name);
                    for(var k=0;k<data[h].list.length;k++){
                        //data[h].list[k]下资讯的具体信息
                        var title=data[h].list[k].article_title;
                        var text=data[h].list[k].article_text;
                        var time=data[h].list[k].release_time;
                        var amount=data[h].list[k].amount;
                        var img=data[h].list[k].img;
                        var article_id=data[h].list[k].article_id;
                        var listli=$('<li class="clearfix"><a href="../zixun/zixun.html?article_id='+article_id+'"><div class="left Information_conCAlistL"> <img src="'+img+'" alt="" style="display:inline-block;width:100%;height:100%" /> </div></a><div class="right Information_conCAlistR"><a href="../zixun/zixun.html"><p class="Information_title"><!--营改税：为经济发展增添强劲动力-->'+title+'</p></a><a href="../zixun/zixun.html?article_id='+article_id+'"><div class="Information_content"><!--在营改增试点之前，我国增值税和营业税并存，导致水质复杂，重复征税问题突出，制约了服务业发展和制造业转型升级-->'+text+'</div></a><div class="container_Econtips"><div class="left container_Econdate"><span></span><!--2017.10.10-->'+time+'</div><div class="left container_Econread"><span></span><!--85462-->'+amount+'</div></div></div></li>');
                        $(listul).append(listli);


                    }
                }


            }
        })



    },
    error:function(data){
        console.log(data);
    }
    });

//新闻资讯结束