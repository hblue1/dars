$(document).ready(function(){
    $('.sub-menu ul').hide();
    $(".sub-menu a").click(function () {
        $(this).parent(".sub-menu").children("ul").slideToggle("100");
        $(this).find(".right").toggleClass("fa-caret-up fa-caret-down");
    });
})

function Function1(){
    window.location.href="/function/Function1D";
}

function Function2(){
    window.location.href="/function/Function2D";
}

function Function3(){
    window.location.href="/function/Function3D";
}

function Function4(){
    window.location.href="/function/Function4D";
}

function Function5(){
    window.location.href="/function/Function5";
}