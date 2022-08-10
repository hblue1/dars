$(document).ready(function(){
    $.ajax({
        type:"POST",
        url:"/Function1/getAudioInfo",
        success: function(result)
        {
            console.log(result);
            for(var i = 0; i < result.length; i++)
            {
                audioInfo[i] = result[i].context;
            }
            getAudioFile(result);
            $("#speechContext").append(result.speechcontext);
        }
    })
})

var checkShow = false;
var audioInfo = [];
var audioData = [];
var curruntIndex = 0;

function changeFile() {
    $("#speechContext").hide();
    $("#speechContext").text("");
    $("#audio").attr("src","");

    curruntIndex += 1;
    $("#speechContext").append(audioInfo[curruntIndex]);
    $("#audio").attr("src",audioData[curruntIndex]);
}

function getAudioFile(filename) {
    var data = {
        speechcode : filename
    }
    $.ajax({
        type:"POST",
        url:"/Function1/getAudioFile",
        data:data,
        success:function(result)
        {
            for(var i = 0; i < result.length; i++)
            {
                audioData[i] = result[i];
            }
            $("#audio").attr("src",result[0]);
        }
    })
}

function showContext() {
    if(!checkShow) {
        $("#speechContext").show();
    }
    else {
        $("#speechContext").hide();
    }
}

function playAudioFile() {
    $('#audio').get(0).load();
    $('#audio').get(0).play();
}