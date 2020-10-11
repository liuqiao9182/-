$(function(){
    var form = layui.form
    var layer = layui.layer
    form.verify({
       nickname:function(value){
         if(value.length>6){
           return '昵称长度不超过6位'
         }
       }
      });
    //   初始化个人信息  
    people()   
    function people(){
      $.ajax({
          type: "GET",
          url: "/my/userinfo",
          success: function (res) {
            console.log(res);  
            if(res.status !== 0){
              return layer.msg('获取用户信息失败')
            }
            form.val('formuserinfo', res.data);
          }
      });
  }  
  // 表单的重置功能
  $('#btnreset').on('click',function(ev){
   ev.preventDefault()
   people() 
  })
  // 发起数据提交
  $('.layui-form').submit(function (e) { 
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/userinfo",
      data: $(this).serialize(),
      success: function (res) {
        if(res.status !== 0){
          return layer.msg(res.message)
        }
          window.parent.userdata()
          // window.parent.userdata()
      }
    });
  });
})

