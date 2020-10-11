// 因为每次通过jquery运行 ajax的get/post请求时，都会优先执行ajaxPrefilter这个函数，这个函数会获取，ajax的相关配置对象，档次函数调用完毕后，才会执行真正的get/post请求
$.ajaxPrefilter(function(options){
    options.url = 'http://ajax.frontend.itheima.net'+options.url 
   if(options.url.indexOf('/my/') !== -1){
       options.header={
        Authorization:localStorage.getItem('token')||""
       }
   }
})