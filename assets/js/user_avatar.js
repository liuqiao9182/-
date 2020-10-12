$(function () {
  var layer = layui.layer
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }
  // 推荐不使用上传图片按钮，转而给上传按钮帮定点击事件，当换头按钮点击事件触发时，自动触发上传图片按钮，优化操作
  $image.cropper(options)
  $('#btnChooseImage').click(function () {
    // click代表立即执行
    $('#file').click()
  });
  // 给file绑定change函数，代表状态以改变就执行，这里不能绑定click函数，函数会延迟执行
  $('#file').on('change', function (e) {
    var firstfile = e.target.files
    console.log(e.target.files);
    if (firstfile.length === 0) {
      return "选照片"
    }
    var file = e.target.files[0]
    // // 创建对应地址
    var newImgURL = URL.createObjectURL(file)
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      // .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
  })
  // 给换头按钮绑定点击事件，在调用ajax上传数据，替换后台数据，在对页面进行重新渲染
   $('#btnUpload').on('click',function(){
    var dataURL = $image
    .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
    .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    $.ajax({
      type: "POST",
      url: "/my/update/avatar",
      data: {
        avatar:dataURL
      },
      success: function (res) {
        if(res.status !==0){
          return  layer.msg(res.message)
        }
        layer.msg(res.message)
        window.parent.userdata()
      }
    });
   })

})
