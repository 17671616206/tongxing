/**
 * Created by Administrator on 2017/10/7 0007.
 */
$(function(){
    //头部和尾部加载
    $("#header").load("../company/header.html");
    $("#banleft").load("../public/banleft.html");
    $("#footer").load("../company/footer.html");
    var data = [
        {id:'1',money:'485',text:'注销银行基本账户',num:'85421'},
        {id:'2',money:'485',text:'注销银行基本账户',num:'85421'},
        {id:'3',money:'485',text:'注销银行基本账户',num:'85421'},
        {id:'4',money:'485',text:'注销银行基本账户',num:'85421'},
        {id:'5',money:'485',text:'注销银行基本账户',num:'85421'},
        {id:'6',money:'485',text:'注销银行基本账户',num:'85421'},
        {id:'7',money:'485',text:'注销银行基本账户',num:'85421'},
        {id:'8',money:'485',text:'注销银行基本账户',num:'85421'},
    ]
    $("product_box").click(function(){
        console.log(111)
    })

    //for(var i=0;i<data.length;i++){
    //    for(var j = 0;j<9;j++){
    //        var product = $('<div class="product_box"></div>');
    //        $(product).html('<div class="product_img"><img src="" alt=""/></div><div class="product_bottom_box"><div class="product_money">¥' +
    //        '<span class="product_red">'+data[i].money+'</span>起</div><div class="product_cancel">'+data[i].text+'</div><div>' +
    //        '<span class="product_grey">成交量</span><span class="product_blue">'+data[i].num+'笔</span></div></div>')
    //    }
    //}
})