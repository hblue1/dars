$(document).ready(function(){
    
})

var checkShow = false;

function changeFile() {
    $("#speechContext").hide();
    $("#speechContext").text("");
    $("#questionContext").text("");
    if($("#speechCode").val() == "") {
        return 0;
    }
    var data = {
        speechcode : $("#speechCode").val()
    }
    $.ajax({
        type:"POST",
        url:"/Function2/getAudioInfo",
        data:data,
        success: function(result)
        {
            console.log(result.speechcontext);
            console.log(result.questioncontext);
            getAudioFile();
            $("#speechContext").append(result.speechcontext);
            var context = result.questioncontext + "<br>";
            $("#questionContext").append(context);
        }
    })
    .always(function(){
        $("#speechCode").val("");
    })
}

function getAudioFile() {
    $("#audio").attr("src","");
    var data = {
        speechcode : $("#speechCode").val()
    }
    $.ajax({
        type:"POST",
        url:"/Function2/getAudioFile",
        data:data,
        success:function(result)
        {
            $("#audio").attr("src",result);
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