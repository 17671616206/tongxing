/**
 * Created by Administrator on 2017/10/8 0008.
 */
$(function(){
    //头部和尾部加载
    $("#header").load("../home/header.html");
    $("#footer").load("../company/footer.html");
});


//接受ID
function GetQueryString(name)
{
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

var article_id=GetQueryString("article_id");
//console.log(article_id);


$.ajax({
    type:"post",
    url:"http://dz.tx178178.com/index.php?m=api&c=ArticleColumn&a=article",
    dataType:"text",
    data:{article_id:article_id},
    success:function(data) {
        var data = eval('(' + data + ')');//把字符串转化为数组
        //console.log(article_id);
        for(var i=0;i<data.length;i++){
            for(var j=0;j<data[i].list.length;j++){
                if(data[i].list[j].article_id==article_id){
                    console.log(article_id);
                    var title=data[i].list[j].article_title;
                    var text=data[i].list[j].article_text;
                    var time=data[i].list[j].release_time;
                    var amount=data[i].list[j].amount;
                    var img=data[i].list[j].img;


                    var form=$(".forma");
                    //$(form).html("");
                    $(form).html('<div class="forma_title">'+title+'</div><div class="forma_time">发布时间：'+time+'&nbsp;14:40:40&nbsp;阅读次数：'+amount+'次&nbsp;&nbsp;分享有奖:<img src="../images/kongjian.png"><img src="../images/weixin.png"><img src="../images/weibo.png" ></div><div class=""><img class="center-block" src="'+img+'" style="margin-top:15px;margin-bottom:15px;display:inline-block;width:100%;height:100%;max-width:800px;margin-left:50%;transform:translateX(-50%)" ></div><div class="forma_content2">'+text+'</div>');
                }
            }
        }


    },
    error:function(data){
        console.log(data);
    }
});