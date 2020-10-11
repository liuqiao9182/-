$(function () {
    // 调用ajax，请求数据
    userdata()
    // 实现退出功能

    $('#out').on('click', function () {
        console.log("ok");
        layer.confirm('是否退出', { icon: 3, title: '提示' }, function (index) {
            // 点击退出
            localStorage.removeItem('token')
            location.href = "../login.html"
            layer.close(index);
        });
    })
})
//  渲染函数
function userdata() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取用化信息失败')
            }
            touxiang(res.data)
        },
        // 防止用户直接访问index页面，利用ajax每次访问时都会有
        // compelet属性的返回值
        complete:function(res){
            console.log(res);
            if(res.responseJSON.status ==1 && res.responseJSON.message=="身份认证失败！"){
                // 清空浏览器的localStorage
            localStorage.removeItem('token')
            // 强制跳转login页面
            location.href = "./login.html"    
            }
        }
    });
}
// 判断头像
function touxiang(user) {
    var name = user.nickname || user.username
    $('#welcome').html(`欢迎${name}`)
    if (user.user_pic !== null) {
        $('#welcome').hide()
        $('.layui-nav-img').attr('src', user.user_pic).show()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('#welcome').html(first).show()
    }
}