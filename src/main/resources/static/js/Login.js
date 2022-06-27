$(document).ready(function(){
    alert("로그인 화면입니다.");
})

function login() {
    var data = {
        id : $("#id").val(),
        password : $("#password").val()
    }
    // console.log(data);
    $.ajax
    ({
        type: "POST",
        url: "/login",
        data: data,
        success: function(result)
        {
            if(result)
            {
                alert("로그인 성공");
                window.location.replace("/FunctionSelect");
            }
            else
            {
                alert("로그인 정보를 확인해주세요.")
            }
        }
    });
}