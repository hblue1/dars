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
    var sports = ["선택해주세요","A01","A02","A03","A04","A05","A06","A07","A08","A09","A10",
                  "A11","A12","A13","A14","A15","A16","A17","A18","A19","A20","A21","A22"];
    var weather = ["선택해주세요","B01","B02","B03","B04","B05","B06","B07","B08","B09","B10",
                   "B11","B12","B13","B14","B15","B16","B17","B18","B19","B20"];
    var food = ["선택해주세요","C01","C02","C03","C04","C05","C06","C07","C08","C09","C10",
                "C11","C12","C13","C14","C15","C16","C17","C18","C19","C20","C21","C22","C23","C24","C25","C26","C27","C28"];
    var health = ["선택해주세요","D01","D02","D03","D04","D05","D06","D07","D08","D09","D10","D11","D12","D13","D14","D15","D16","D17","D18","D19","D20","D21","D22","D23"];
    var Character = ["선택해주세요","E01","E02","E03","E04","E05","E06","E07","E08","E09","E10","E11","E12","E13","E14","E15","E16","E17","E18","E19","E20","E21","E22","E23","E24"];
    var travel = ["선택해주세요","F01","F02","F03","F04","F05","F06","F07","F08","F09","F10","F11","F12","F13","F14","F15","F16","F17","F18","F19","F20","F21","F22","F23","F24","F25","F26","F27"];
    var traditional_culture = ["선택해주세요","G01","G02","G03","G04","G05","G06","G07","G08","G09","G10","G11","G12","G13","G14"];
    var FAF = ["선택해주세요","H01","H02","H03","H04","H05","H06","H07","H08","H09","H10","H11","H12","H13","H14","H15","H16","H17","H18","H19","H20","H21"];
    var etc = ["선택해주세요","I01","I02","I03","I04","I05","I06","I07","I08","I09","I10",
            "I11","I12","I13","I14","I15","I16","I17","I18","I19","I20",
            "I21","I22","I23","I24","I25","I2","I27","I28","I29","I30",
            "I31","I32","I33","I34","I35","I36","I37","I38","I39","I40",
            "I41","I42","I43","I44","I45","I46","I47","I48","I49","I50",
            "I51","I2","I53","I54","I55","I56","I57","I58","I59","I60",
            "I61","I62","I63","I64","I65","I66","I67","I68","I69","I70",
            "I71","I72","I73","I74","I75","I76","I77","I78","I79","I80","I81"];

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
        index : $("#num").val() + "0"
    }
    $.ajax({
        type:"POST",
        url:"/Function4/getAudioInfo",
        data:data,
        success: function(result)
        {
            getAudioFile(result);
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

function getAudioFile(x) {
    var filename = new Array();
    for(var i = 0; i < x.length; i++)
    {
        filename.push(x[i].filename+".wav");
    }
    var data = {
        data : JSON.stringify(filename).replace(/\"/gi, "")
    };
    console.log(data);
    $.ajax({
        type:"POST",
        url:"/Function4/getAudioFile",
        data:data,
        success:function(result)
        {
            $("#audio").attr("src",result[0]);
        }
    })
}