var speechcontext = [];
var questioncontext = [];
var answer = [];
var audioData = [];
var questionArray;
var checkShow = false;
var curruntIndex = 0;
var startIndex = 0;
var startTime;

$(document).ready(function(){
    data = {
        category : getCategory()
    };
    
    $.ajax({
        type:"POST",
        url:"/function/Function3/getAudioInfo",
        data:data,
        success: function(result)
        {
            for(var i = 0; i < result.length; i++) {
                speechcontext[i] = result[i].speechcontext;
                questioncontext[i] = result[i].questioncontext;
                answer[i] = result[i].answer;
                audioData[i] = result[i].audio;
            }
            getQuestionArray();

            $("#speechcontext").text(result[0].speechcontext);
            $("#answer").text(result[0].answer);
            $("#audio").attr("src",result[0].audio);
            setQuestionContext();

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

function getCategory() {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('d');
}

function getQuestionArray() {
    var count = 1;
    var qArr = [];
    for(var i = 0; i < speechcontext.length; i++) {
        if (speechcontext[i] == speechcontext[i+1]) {
            count++;
        }
        else if ((speechcontext[i] != speechcontext[i+1]) || (i+1 == result.length)){
            qArr.push(count);
            count = 1;
        }
    }

    questionArray = qArr;
}

function setQuestionContext() {
    var context = "<div class='bottom_box' id = 'qc'>";
    for(var i = startIndex; i < startIndex+questionArray[curruntIndex]; i++) {
        context
        += "<ul>"
        +       "<li>?</li>"
        +       "<li>" + questioncontext[i] +"</li>"
        +  "</ul>"
        ;
    }
    context += "</div>";
    $("#questioncontext").append(context);
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
        $("#speechcontext").show();
        checkShow = true;
    }
    else {
        $("#speechcontext").hide();
        checkShow = false;
    }
}

function changeFile() {
    pauseAudioFile();
    curruntIndex += 1;
    if(curruntIndex >= questionArray.length) {
        alert("모두 끝났습니다.");
        location.href="/home/FunctionSelect";
        return;
    }
    startIndex += questionArray[curruntIndex];
    // console.log(startIndex);

    $("#speechcontext").text(speechcontext[startIndex+1]);
    $("#answer").text(answer[startIndex+1]);
    $("#audio").attr("src",audioData[startIndex+1]);
    $("#qc").remove();
    setQuestionContext();

    playAudioFile();
    checkShow = true;
    showContext();
}

// (공통) 내 정보 확인 팝업
window.addEventListener('click',(e) => {
    if(e.target.id == "user"){
        $(".pop").css("display","block");
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
    navigator.sendBeacon("/function/Function3/UserActivity",result);
});