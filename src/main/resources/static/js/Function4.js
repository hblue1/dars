$(document).ready(function(){
})

// $(window).on("beforeunload",function(){
//     $.ajax({
//         type: "POST",
//         url: "/Function4/disconnectSFTP",
//         success: function() {
            
//         }
//     })
// });
function selectFile(select) {
    var sports = ["선택해주세요","A010","A020","A030","A040","A050","A060","A070","A080","A090","A100",
                  "A110","A120","A130","A140","A150","A160","A170","A180","A190","A200","A210","A220"];
    var weather = ["선택해주세요","B010","B020","B030","B040","B050","B060","B070","B080","B090","B100",
                   "B110","B120","B130","B140","B150","B160","B170","B180","B190","B200"];
    var food = ["선택해주세요","C010","C020","C030","C040","C050","C060","C070","C080","C090","C100",
                "C110","C120","C130","C140","C150","C160","C170","C180","C190","C200","C210","C220","C230","C240","C250","C260","C270","C280"];
    var health = ["선택해주세요","D010","D020","D030","D040","D050","D060","D070","D080","D090","D100",
                "D110","D120","D130","D140","D150","D160","D170","D180","D190","D200","D210","D220","D230"];
    var Character = ["선택해주세요","E010","E020","E030","E040","E050","E060","E070","E080","E090","E100",
                "E110","E120","E130","E140","E150","E160","E170","E180","E190","E200","E210","E220","E230","E240"];
    var travel = ["선택해주세요","F010","F020","F030","F040","F041","F050","F060","F07","F080","F090","F100",
                "F110","F120","F130","F140","F150","F160","F170","F180","F190","F200","F210","F220","F230","F240","F250","F260","F270"];
    var traditional_culture = ["선택해주세요","G010","G020","G030","G040","G050","G060","G070","G080","G090","G100","G110","G120","G130","G140"];
    var FAF = ["선택해주세요","H010","H020","H030","H040","H050","H060","H070","H080","H090","H100",
                "H110","H120","H130","H140","H150","H160","H170","H180","H190","H200","H210"];
    var etc = ["선택해주세요","I010","I020","I030","I040","I050","I060","I070","I080","I090","I100",
            "I110","I120","I130","I140","I150","I160","I170","I180","I190","I200",
            "I210","I220","I230","I240","I250","I260","I270","I280","I290","I300",
            "I310","I320","I330","I340","I350","I360","I370","I390","I400",
            "I450","I460","I470","I480","I490","I500",
            "I510","I520","I530","I540","I550","I560","I570","I580","I590","I600",
            "I610","I620","I630","I640","I650","I660","I670","I680","I690","I700",
            "I710","I720","I730","I740","I750","I760","I770","I780","I790","I800","I810","I820","I820","I830"];

    var target = document.getElementById("num");

    if(select.value == "sports") var num = sports;
    else if(select.value == "weather") var num = weather;
    else if(select.value == "food") var num = food;
    else if(select.value == "health") var num = health;
    else if(select.value == "Character") var num = Character;
    else if(select.value == "travel") var num = travel;
    else if(select.value == "traditional_culture") var num = traditional_culture;
    else if(select.value == "FAF") var num = FAF;
    else if(select.value == "etc") var num = etc;

    target.options.length = 0;

    for(var i in num)
    {
        var opt = document.createElement("option");
        opt.value = num[i];
        opt.innerHTML = num[i];
        target.appendChild(opt);
    }
}

function changeFile() {
    $("#context").text("");
    if($("#num").val() == "선택해주세요") {
        return 0;
    }
    var data = {
        index : $("#num").val()
    }
    $.ajax({
        type:"POST",
        url:"/Function4/getAudioInfo",
        data:data,
        success: function(result)
        {
            getAudioFile();
            shuffle(result);
            var context = "";
            for(var i = 0; i < result.length; i++) {
                context += (i+1) + ". " + result[i].context + "<br>";
            }
            $("#context").append(context);
        }
    })
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function getAudioFile() {
    var data = {
        index : $("#num").val()
    }
    $.ajax({
        type:"POST",
        url:"/Function4/getAudioFile",
        data:data,
        success:function(result)
        {
            $("#audio").attr("src",result);
        }
    })
}

function playAudioFile() {
    var audio = document.getElementById("audio");
    audio.play();
}