$(document).ready(function(){
    alert("test");
    alert("test2");
    alert("test3");
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
    var health = ["대상포진","식중독","쯔쯔가무시병","침술1","침술2","칼로리제한","1"];
    var etc = ["나트륨","부부젤라","영양소","초콜릿","커피"];
    var country = ["뉴질랜드","태국","프랑스","필리핀","호주"];
    var world_heritage = ["만리장성","아크로폴리스","에펠탑","폼페이","피라미드"];
    var world_feast = ["나담","리우카니발","베네치아카니발","삿포로눈잔치","송크란"];
    var proverb = ["개 핥은 죽사발 같다","낮말은 새가 듣고 밤말은 쥐가 듣는다","도랑치고 가재잡는다","등잔밑이 어둡다","세사람만 우겨대면 없는 호랑이도 만들어낸다."];
    var sports = ["골프1","골프2","농구","배구","야구1","야구2","축구"];
    var food = ["김치","만두","스시","카레","피자"];
    var Character = ["신사임당","윤동주1","윤동주2","테레사수녀","퇴계이황","헬렌켈러"];
    var traditional_culture = ["강강술래","다도","정월대보름","추수감사절","칠석"];
    var region = ["독도","방갈로르","알래스카","제주도","페트라"];
    var target = document.getElementById("title");

    if(select.value == "health") var title = health;
    else if(select.value == "etc") var title = etc;
    else if(select.value == "country") var title = country;
    else if(select.value == "world_heritage") var title = world_heritage;
    else if(select.value == "world_feast") var title = world_feast;
    else if(select.value == "proverb") var title = proverb;
    else if(select.value == "sports") var title = sports;
    else if(select.value == "food") var title = food;
    else if(select.value == "Character") var title = Character;
    else if(select.value == "traditional_culture") var title = traditional_culture;
    else if(select.value == "region") var title = region;

    target.options.length = 0;

    for(var i in title)
    {
        var opt = document.createElement("option");
        opt.value = title[i];
        opt.innerHTML = title[i];
        target.appendChild(opt);
    }
}

function getAudioFile() {
    var data = {
        topic : $("#topic").val(),
        title : $("#title").val()
    }
    console.log(data);
    $.ajax({
        type:"POST",
        url:"/Function3/getAudioFile",
        data:data,
        success:function(result)
        {
            $("#audio").attr("src",result);
        }
    })
}