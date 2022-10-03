$(document).ready(function(){
    $.ajax({
        type:"POST",
        url:"/user/Function1/getAudioInfo",
        success: function(result)
        {
            console.log(result);
            $("#noise").attr("src",result[10].audio);
            $("#audio1").attr("src",result[0].audio);
            $("#audio2").attr("src",result[1].audio);
            $("#audio3").attr("src",result[2].audio);
            $("#audio4").attr("src",result[3].audio);
            $("#audio5").attr("src",result[4].audio);
            $("#audio6").attr("src",result[5].audio);
            $("#audio7").attr("src",result[6].audio);
            $("#audio8").attr("src",result[7].audio);
            $("#audio9").attr("src",result[8].audio);
            $("#audio10").attr("src",result[9].audio);
            
            for(var i = 1; i < result.length; i++){
                var name = "speechContext" + i;
                document.getElementById(name).style.display = "none";
            }

            $("#speechContext1").append(result[0].context);
            $("#speechContext2").append(result[1].context);
            $("#speechContext3").append(result[2].context);
            $("#speechContext4").append(result[3].context);
            $("#speechContext5").append(result[4].context);
            $("#speechContext6").append(result[5].context);
            $("#speechContext7").append(result[6].context);
            $("#speechContext8").append(result[7].context);
            $("#speechContext9").append(result[8].context);
            $("#speechContext10").append(result[9].context);
        }
    })
})

var checkShow = false;
var audioInfo = [];
var audioData = [];
var curruntIndex = 0;

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

function playAudioFile(n) {
    var name = "audio"+n
    document.getElementById(name).play();
    document.getElementById(name).addEventListener("ended", function(){ document.getElementById("noise").pause() })
    document.getElementById("noise").play();
}

function pauseAudioFile(n) {
    var name = "audio"+n
    document.getElementById(name).pause();
    document.getElementById("noise").pause();
    document.getElementById(name).currentTime=0;
    document.getElementById("noise").currentTime=0;
}

function showContext(n) {
    var name = "speechContext"+n
    if(!checkShow) {
        document.getElementById(name).style.display = '';
        checkShow = true;
    }
    else {
        document.getElementById(name).style.display = 'none';
        checkShow = false;
    }
}