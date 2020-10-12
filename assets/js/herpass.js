$(function(){
    var form  = layui.form
     var layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            ,'密码必须6到12位，且不能出现空格'
          ] ,
        repassworld:function(value){
            if(value !== $('#oldpass').val()){
               return '两次密码输入不一致'
            }
        } ,
        lastpass:function(use){
            if( use !== $('#newpassworld').val()){
               return '两次密码输入不一致'
            }
        } 
       });
    //    运用ajax更改密码
    // $('.layui-form').submit(function (e) { 
    //     e.preventDefault();
    //     $.ajax({
    //         type: "POST",
    //         url: "/my/updatepwd",
    //         data: $(this).serialize(),
    //         success: function (res) {
    //           if(res.status !== 0){
    //               return  layui.layer.msg('更改密码失败')
    //           } 
    //           console.log('更改密码成功');
    //           layui.layer.msg('更改密码成功')
    //         //   $('.layui-form')[0].reset() 
    //         }
    //     });
    // });

    $('.layui-form').on('submit',function(e){
        e.preventDefault();
        $.ajax({
            type: "POST",
            url: "/my/updatepwd",
            data: $(this).serialize(),
            success: function (res) {
              if(res.status !== 0){
                  return  layui.layer.msg('更改密码失败')
              } 
              console.log('更改密码成功');
              layui.layer.msg('更改密码成功')
              $('.layui-form')[0].reset() 
            }
        });
    })
})