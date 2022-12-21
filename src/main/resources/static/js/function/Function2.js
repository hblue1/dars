var speechcontext = [];
var answer = [];
var saudioData = [];
var qaudioData = [];
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
            // console.log(result);
            $("#answer").text(result[0].answer);
            $("#saudio").attr("src",result[0].saudio);
            $("#qaudio").attr("src",result[0].qaudio);
            for(var i = 0; i < result.length; i++) {
                speechcontext[i] = result[i].speechcontext + '\n' + result[i].questioncontext;
                answer[i] = result[i].answer;
                saudioData[i] = result[i].saudio;
                qaudioData[i] = result[i].qaudio;
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
    var name = "saudio";
    document.getElementById(name).play();
    document.getElementById(name).addEventListener("ended", function(){ document.getElementById("qaudio").play(); });
}

function pauseAudioFile() {
    var name = "saudio";
    var name2 = "qaudio";
    document.getElementById(name).pause();
    document.getElementById(name).currentTime=0;
    document.getElementById(name2).pause();
    document.getElementById(name2).currentTime=0;
}

function replayAudioFile() {
    pauseAudioFile();
    playAudioFile();
}

function showContext() {
    if(!checkShow) {
        $("#speechcontext").text(speechcontext[curruntIndex]);
        checkShow = true;
    }
    else {
        $("#speechContext").text("재생하기");
        checkShow = false;
    }
}

function changeFile() {
    pauseAudioFile();
    curruntIndex += 1;
    
    $("#answer").text(answer[curruntIndex]);
    $("#saudio").attr("src",saudioData[curruntIndex]);
    $("#qaudio").attr("src",qaudioData[curruntIndex]);
}