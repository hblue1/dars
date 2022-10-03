$(document).ready(function(){
    
})

var checkShow = false;

function selectFile(select) {
    var cook = ["선택해주세요","J100","J200","J300","J400","J500"];
    var traditional_culture = ["선택해주세요","K100","K200","K300","K400","K500"];
    var sports = ["선택해주세요","L100","L200","L300","L400","L500"];
    var world_feast = ["선택해주세요","M100","M200","M300","M400","M500"];
    var proverb = ["선택해주세요","N100","N200","N300","N400","N500"];
    var region = ["선택해주세요","O100","O200","O300","O400","O500"];
    var world_heritage = ["선택해주세요","P100","P200","P300","P400","P500"];
    var country = ["선택해주세요","Q100","Q200","Q300","Q400","Q500"];
    var health = ["선택해주세요","R100","R200","R300","R400","R500"];
    var Character = ["선택해주세요","S100","S200","S300","S400","S500"];
    var etc = ["선택해주세요","T100","T200","T300","T400","T500"];

    var target = document.getElementById("speechCode");

    if(select.value == "cook") var code = cook;
    else if(select.value == "traditional_culture") var code = traditional_culture;
    else if(select.value == "sports") var code = sports;
    else if(select.value == "world_feast") var code = world_feast;
    else if(select.value == "proverb") var code = proverb;
    else if(select.value == "region") var code = region;
    else if(select.value == "world_heritage") var code = world_heritage;
    else if(select.value == "country") var code = country;
    else if(select.value == "health") var code = health;
    else if(select.value == "Character") var code = Character;
    else if(select.value == "etc") var code = etc;

    target.options.length = 0;

    for(var i in code)
    {
        var opt = document.createElement("option");
        opt.value = code[i];
        opt.innerHTML = code[i];
        target.appendChild(opt);
    }
}

function changeFile() {
    $("#speechContext").hide();
    $("#speechContext").text("");
    $("#questionContext").text("");
    if($("#speechCode").val() == "선택해주세요") {
        return 0;
    }
    var data = {
        speechcode : $("#speechCode").val()
    }
    $.ajax({
        type:"POST",
        url:"/action/Function3/getAudioInfo",
        data:data,
        success: function(result)
        {
            getAudioFile();
            $("#speechContext").append(result[0].speechcontext);
            var context = "";
            for(var i = 0; i < result.length; i++) {
                context += (i+1) + ". " + result[i].questioncontext + "<br>";
            }
            $("#questionContext").append(context);
        }
    })
}

function getAudioFile() {
    $("#audio").attr("src","");
    var data = {
        speechcode : $("#speechCode").val()
    }
    $.ajax({
        type:"POST",
        url:"/action/Function3/getAudioFile",
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