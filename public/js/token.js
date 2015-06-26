$(document).ready(function () {
  //修改密码
  $('#reset-password-form').submit(function (e) {
    e.preventDefault();
    var token = $('#reset-password-token').val();
    var formData = $(this).serializeArray();
    $.ajax({
      type: "PUT",
      beforeSend: function (request) {
        request.setRequestHeader("access-token", token);
        request.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      },
      url: "/api/v1/users/reset-password",
      contentType: "application/json",
      data: formData,
      success: function (msg) {
        console.log('成功---->   ' + JSON.stringify(msg));
      },
      error: function (msg) {
        console.log('失败---->   ' + msg.responseText);
      }
    });
    return false;
  });
  //找回密码
  $('#find-password-form').submit(function (e) {
    e.preventDefault();
    var token = $('#find-password-token').val();
    var formData = $(this).serializeArray();
    $.ajax({
      type: "PUT",
      beforeSend: function (request) {
        request.setRequestHeader("access-token", token);
        request.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
      },
      url: "/api/v1/users/find-password",
      contentType: "application/json",
      data: formData,
      success: function (msg) {
        console.log('成功---->   ' + JSON.stringify(msg));
      },
      error: function (msg) {
        console.log('失败---->   ' + msg.responseText);
      }
    });
    return false;
  });
});