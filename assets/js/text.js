$(function(){
    var layer = layui.layer
    $.ajax({
        type: "GET",
        url: "/my/article/cates",
        success: function (res) {
            console.log(res);
            if(res.status !== 0){
                return  layer.msg(res.message)
            }
           var list =  template('list',res)
           $('tbody').html(list)
        }
    });
})