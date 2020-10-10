$(function(){
  // 登录/注册切换功能
  $('#zhuce').on('click',function(){
      $('.register').hide()
      $('.enroll').show()
  })
  $('#denglu').on('click',function(){
      $('.enroll').hide()
      $('.register').show()
  })
  // 表单校验
   var form = layui.form
   var layer = layui.layer
   form.verify({
      //我们既支持上述函数式的方式，也支持下述数组的形式
      //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
      pass: [
        /^[\S]{6,12}$/
        ,'必须6—12位的火星文，不要写空格'
      ] ,
      username:[/^[a-zA-Z0-9_-]{4,16}$/,
      '用户名必须是4-16位，英文字母开头'] ,
      repetpassworld:function(valur){
          var passworld = $('.enroll [name=password]').val()
          console.log(passworld);
          if(passworld != valur){
              return layer.meg('两次输入不一致')
          }
          // alert('注册成功')
      }
    }); 
  //  用ajax完成用户注册请求 
  $('#form_reg').submit(function (e) { 
      e.preventDefault();
    $.ajax({
        type: "POST",
        url: "/api/reguser",
        data:{
          username:$('.enroll [name=username]').val(),
          password:$('.enroll [name=password]').val()
        },
        success: function (res) {
          console.log(res);
         if(res.status != 0 ){
             return layer.meg(res.message)
         }   
         alert('注册成功')
         $('#denglu').click()
        }
    });  
  });  
  // 用ajax完成用户登录请求
  $('#user').submit(function (e) { 
    e.preventDefault();
    $.ajax({
      type: "post",
      url: "/api/login",
      data: {
        username:$('.register [name=username]').val(),
        password:$('.register [name=password]').val()
      },
      success: function (res) {
        console.log(res);
        if(res.status != 0){
          return layer.msg(res.message)
        }
        //  localStorage.setItem(res.token)
         layer.msg(res.message)
         localStorage.setItem('token',res.token)
         location.href='/index.html'
      }
    }); 
  });
})
