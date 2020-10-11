// 因为每次通过jquery运行 ajax的get/post请求时，都会优先执行ajaxPrefilter这个函数，这个函数会获取，ajax的相关配置对象，档次函数调用完毕后，才会执行真正的get/post请求
$.ajaxPrefilter(function(options){
    options.url = 'http://ajax.frontend.itheima.net'+options.url
    // 全局统一设置端头，为token 
   if(options.url.indexOf('/my/') !== -1){
       options.headers={
        Authorization:localStorage.getItem('token')||""
       }
   }
//    全局统一挂在complete函数
 // 防止用户直接访问index页面，利用ajax每次访问时都会有
        // compelet属性的返回值
    options.complete = function(res){
        if(res.responseJSON.status ==1 && res.responseJSON.message=="身份认证失败！"){
            // 清空浏览器的localStorage
        localStorage.removeItem('token')
        // 强制跳转login页面
        location.href = "./login.html"    
        }
    }
})