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
            if (res.status !== 0) {
                return layui.layer.msg('获取用化信息失败')
            }
            touxiang(res.data)
        },
    });
}
// 判断头像
function touxiang(user) {
    var name = user.nickname || user.username
    $('#welcome').html(`欢迎 ${name}`)
    if (user.user_pic !== null) {
        $('.logo_two').hide()
        $('.layui-nav-img').attr('src', user.user_pic).show()
    } else {
        console.log(222);
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.logo_two').html(first)
        $('#welcome').show()
    }
}