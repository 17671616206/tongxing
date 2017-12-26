/**
 * Created by Administrator on 2017/10/27 0027.
 */
$(function(){
    //头部和尾部加载
    $("#header").load("../home/header.html");
    $("#footer").load("../company/footer.html");

});

var user_id=localStorage.getItem("user_id");
$("body").ready(function(){

    var order_ids=window.location.search.split("=")[1];
    console.log(order_ids);
    if(order_ids){
        $.ajax({
            url:"http://dz.tx178178.com/index.php?m=api&c=GoodsInfo1&a=orderInfo",
            type:"post",
            dataType:"json",
            data:{
                user_id:user_id,
                order:order_ids
            },
            success:function(data){
                console.log(data);
                if(data!=="0"){
                    //console.log(2333);
                    //window.location.href='../pay/pay.html?order_id='+data+'';

                }
            }
        });
    }
});