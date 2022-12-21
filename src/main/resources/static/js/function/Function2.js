var speechcontext = [];
var questioncontext = [];
var answer = [];
var audioData = [];
var checkShow = false;
var curruntIndex = 0;

$(document).ready(function(){
    data = {
        level : getLevel()
    };
    
    $.ajax({
        type:"POST",
        url:"/function/Function2/getAudioInfo",
        data:data,
        success: function(result)
        {
            console.log(result);
            $("#speechcontext").text(result[0].speechcontext);
            $("#questioncontext").text(result[0].questioncontext);
            $("#answer").text(result[0].answer);
            $("#audio").attr("src",result[0].audio);
            for(var i = 1; i < 10; i++) {
                speechcontext[i] = result[i].speechcontext;
                questioncontext[i] = result[i].questioncontext;
                answer[i] = result[i].answer;
                audioData[i] = result[i].audio;
            }
        }
    })
})
////////////////////////////////////////////////////////////
// function changeFile() {
//     $("#speechContext").hide();
//     $("#speechContext").text("");
//     $("#questionContext").text("");
//     if($("#speechCode").val() == "") {
//         return 0;
//     }
//     var data = {
//         speechcode : $("#speechCode").val()
//     }
//     $.ajax({
//         type:"POST",
//         url:"/function/Function2/getAudioInfo",
//         data:data,
//         success: function(result)
//         {
//             console.log(result.speechcontext);
//             console.log(result.questioncontext);
//             getAudioFile();
//             $("#speechContext").append(result.speechcontext);
//             var context = result.questioncontext + "<br>";
//             $("#questionContext").append(context);
//         }
//     })
//     .always(function(){
//         $("#speechCode").val("");
//     })
// }

// function getAudioFile() {
//     $("#audio").attr("src","");
//     var data = {
//         speechcode : $("#speechCode").val()
//     }
//     $.ajax({
//         type:"POST",
//         url:"/function/Function2/getAudioFile",
//         data:data,
//         success:function(result)
//         {
//             $("#audio").attr("src",result);
//         }
//     })
// }
////////////////////////////////////////////////////////////

function getLevel() {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('d');
}

function playAudioFile() {
    var name = "audio";
    document.getElementById(name).play();
}

function pauseAudioFile() {
    var name = "audio";
    document.getElementById(name).pause();
    document.getElementById(name).currentTime=0;
}

function replayAudioFile() {
    pauseAudioFile();
    playAudioFile();
}

function showContext() {
    if(!checkShow) {
        $("#speechContext").show();
    }
    else {
        $("#speechContext").hide();
    }
}

function changeFile() {
    pauseAudioFile();
    curruntIndex += 1;
    $("#speechcontext").text(speechcontext[speechcontext]);
    $("#questioncontext").text(questioncontext[questioncontext]);
    $("#answer").text(answer[curruntIndex]);
    $("#audio").attr("src",audioData[curruntIndex]);
}