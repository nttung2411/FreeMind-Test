$(document).ready(function () {
    $.validator.addMethod('regexName', function (value) {
        return /^([\p{Lu}]|([\p{Lu}][\p{Ll}]{1,8}))(\s([\p{Lu}]|[\p{Lu}][\p{Ll}]{1,10})){0,5}$/u.test(value);
    });

    $.validator.addMethod('regexPhone', function (value) {
        return /^[0-9]{10,11}/u.test(value);
    });


    $("#registerForm").validate({
        rules:{
            name: {
                required: true,
                maxlength: 50,
                regexName: true
            },
            phone: {
                required: true,
                regexPhone: true,
            },
            email: {
                required: true,
                email: true
            }
        },
        messages:{
            name: {
                required: "Vui lòng nhập tên",
                maxlength: "Độ dài tối đa 50",
                regexName: "Tên không đúng định dạng"
            },
            phone: {
                required: "Vui lòng nhập số điện thoại",
                regexPhone: "SĐT không đúng định dạng"
            },
            email: {
                required: "Vui lòng nhập email",
                email: "Email không đúng định dạng"
            }
        }
        }
    )

    $("#fileImage").change(function () {
        let image = $('#fileImage').val().split('\\').pop()
        $('#nameFile').text(image)
    })

    $("#submit").click(function () {
        let image = $('#fileImage').val().split('\\').pop()
        if($("#registerForm").valid()) {
            if(image.match(/\.(jpg|jpeg|png)$/)) {
                let newCV = {
                    name: $('#name').val(),
                    phone: $('#phone').val(),
                    position: $('#position').val(),
                    experience: $('#experience').val(),
                    fileImage: image,
                    email: $('#email').val()
                };

                console.log(newCV);
                $.ajax({
                    type: 'POST',
                    url: 'https://freemind-test.netlify.app/.netlify/functions/test',
                    dataType: "JSON",
                    data: JSON.stringify(newCV),
                    success: function (data) {
                        $("#registerForm").trigger("reset");
                        $("#nameFile").text('');
                        alert("Chúc mừng bạn đã gửi CV thành công")
                    },
                    error: function () {
                        alert("Đã có một số lỗi xảy ra")
                    }
                })
            } else {
                $("#p1").text("Vui lòng chọn file ảnh")
            }
        }
    })
})
