$(document).ready(function(){
    const searchParams = new URLSearchParams(location.search);

    setVolume(searchParams.get('d'));
    $.ajax({
        type:"POST",
        url:"/function/Function1/getAudioInfo",
        success: function(result)
        {
            // console.log(result);
            $("#noise").attr("src",result[10].audio);
            $("#audio").attr("src",result[0].audio);
            $("#answer").text(result[0].context);
            for(var i = 1; i < 10; i++) {
                audioData[i] = result[i].audio;
                audioInfo[i] = result[i].context;
            } 
            
            // for(var i = 1; i < result.length; i++){
            //     var name = "speechContext" + i;
            //     document.getElementById(name).style.display = "none";
            // }
        }
    })

    // const content = document.getElementsByClassName('content_wrap sub');
    // var n = 0;
    // var contentArr = '<div class="correct_wrap"' + ' name="no' + n +'">';
    // contentArr +=       '<div class="play flexac">'
    // +                       '<img src="/img/play.png" alt="재생하기">'
    // +                       '<p>재생하기</p>'
    // +                       '<audio controls id = "noise' + n + '" hidden = true>'
    // +                           '<source src="" type="audio/wav">'
    // +                       '</audio>'
    // +                   '</div>'
    // +                   '<nav class="footer_menu">'
    // +                       '<nav class="drop-down-menu flexac">'
    // +                           '<input type="checkbox" class="activate" id="accordion-2" name="accordion-2">'
    // +                           '<label for="accordion-2" class="menu-title flexac">'
    // +                           '<div class="wrap flexac"><img src="/img/chk.png" alt="확인하기"><span>들은문장 확인하기</span></div>'
    // +                           '<div class="correct flexac"><span>정답보기</span><img src="/img/look.svg" alt=">"></div></label>'
    // +                           '<div class="drop-down">'
    // +                           '<a href="#" ><img src="/img/play.png" alt="확인하기"><span name="answer' + n + '">테니스는 라켓 스포츠의 한 종류입니다.</span></a>'
    // +                           '</div>'
    // +                       '</nav>'
    // +                   '</nav>'
    // +                '</div>'
    // ;
    // content.append();
})

var checkShow = false;
var audioInfo = [];
var audioData = [];
var curruntIndex = 0;

function changeFile() {
    pauseAudioFile();
    curruntIndex += 1;
    $("#answer").text(audioInfo[curruntIndex]);
    $("#audio").attr("src",audioData[curruntIndex]);
}

function setVolume(n) {
    if(n == 1) {
        document.getElementById("noise").volume = 0;
    }
    else if(n == 2) {
        document.getElementById("noise").volume = 0.33;
    }
    else if(n == 3) {
        document.getElementById("noise").volume = 0.66;
    }
    else if(n == 4) {
        document.getElementById("noise").volume = 1;
    }
}

function playAudioFile() {
    var name = "audio"
    document.getElementById(name).play();
    document.getElementById(name).addEventListener("ended", function(){ document.getElementById("noise").pause() })
    document.getElementById("noise").play();
}

function pauseAudioFile() {
    var name = "audio"
    document.getElementById(name).pause();
    document.getElementById("noise").pause();
    document.getElementById(name).currentTime=0;
    document.getElementById("noise").currentTime=0;
}

// function showContext(n) {
//     var name = "speechContext"+n
//     if(!checkShow) {
//         document.getElementById(name).style.display = '';
//         checkShow = true;
//     }
//     else {
//         document.getElementById(name).style.display = 'none';
//         checkShow = false;
//     }
// }

