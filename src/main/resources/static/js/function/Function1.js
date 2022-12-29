var audioInfo = [];
var audioData = [];
var curruntIndex = 0;
var startTime;

$(document).ready(function(){
    getNoise();

    $.ajax({
        type:"POST",
        url:"/function/Function1/getAudioInfo",
        success: function(result)
        {
            $("#noise").attr("src",result[10].audio);
            $("#audio").attr("src",result[0].audio);
            $("#answer").text(result[0].context);
            for(var i = 1; i < 10; i++) {
                audioData[i] = result[i].audio;
                audioInfo[i] = result[i].context;
            }

            let now = new Date();   
            startTime = now;
        },
        beforeSend:function()
        {    
            $('.wrap-loading').removeClass('display-none');
        },
        complete:function()
        {
            $('.wrap-loading').addClass('display-none');
        }
    })
})

function getNoise() {
    const searchParams = new URLSearchParams(location.search);
    setNoise(searchParams.get('d'));
}

function setNoise(n) {
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
    var name = "audio";
    document.getElementById(name).play();
    document.getElementById(name).addEventListener("ended", function(){ document.getElementById("noise").pause() })
    document.getElementById("noise").play();
}

function pauseAudioFile() {
    var name = "audio";
    document.getElementById(name).pause();
    document.getElementById("noise").pause();
    document.getElementById(name).currentTime=0;
    document.getElementById("noise").currentTime=0;
}

function replayAudioFile() {
    pauseAudioFile();
    getNoise();
    playAudioFile();
}

function changeFile() {
    pauseAudioFile();
    if(curruntIndex >= audioInfo.length) {
        alert("모두 끝났습니다.")
        location.href="/home/FunctionSelect"
        return;
    }
    getNoise();
    curruntIndex += 1;
    $("#answer").text(audioInfo[curruntIndex]);
    $("#audio").attr("src",audioData[curruntIndex]);
}

// (공통) 내 정보 확인 팝업
window.addEventListener('click',(e) => {
    if(e.target.id == "user"){
        $(".pop").css("display","block");
        console.log("wtf")
        return 0;
    }

    if( $(".pop").css("display") == "block" &&
        e.target.parentNode.className != "pop" &&
        e.target.parentNode.className != "user" &&
        e.target.parentNode.className != "photo") {
        $(".pop").css("display","none");
    }
})

window.addEventListener('unload', function() {
    let now = new Date();
    let result = (now-startTime)/1000;
    navigator.sendBeacon("/function/Function1/UserActivity",result);
});