$(function(){
    var form = layui.form
    form.verify({
        pass: [
          /^[\S]{6,12}$/
          ,'密码必须6到12位，且不能出现空格'
        ] ,
        
      });
    //   初始化个人信息
    people()      
})
 function people(){
     $.ajax({
         type: "GET",
         url: "/my/userinfo",
         success: function (res) {
           console.log(res);  
         }
     });
 }