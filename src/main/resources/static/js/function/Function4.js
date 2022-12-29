var index = [];
var key = [];
var curruntIndex = 0;
var startTime;

$(document).ready(function(){
    data = {
        level : getLevel()
    };
    
    $.ajax({
        type:"POST",
        url:"/function/Function4/getFirstInfo",
        data:data,
        success: function(result)
        {
            for(let i = 0; i < result.length; i++) {
                index.push(result[i].index);
            }
            changeFile(index[curruntIndex]);

            let now = new Date();   
            startTime = now;
        }
    })
})

function getLevel() {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('d');
}

function changeFile(parameter) {
    pauseAudioFile();
    if(curruntIndex >= index.length) {
        alert("모두 끝났습니다.");
        location.href="/home/FunctionSelect";
        return;
    }
    data = {
        index : parameter
    }
    $.ajax({
        type:"POST",
        url:"/function/Function4/getAudioInfo",
        data:data,
        success: function(result)
        {
            $("#audio").attr("src",result[0]);
            var contextArray = [];
            for(let i = 1; i < result.length; i++) {
                contextArray.push(result[i]);
                key.push(result[i]);
            }
            shuffleAndPrint(contextArray);
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
}

function shuffleAndPrint(array) {
    array.sort(() => Math.random() - 0.5);
    var content ='';
    for(let i = 0; i < array.length; i++) {
        content
        += '<li>'
        +       '<input type="text" name="" id="context' + (i+1) +'" value="" class="plus_page_input" min = "1" max = "' + array.length +'"'
        +       'maxlength="1">'
        +       '<a href = "javascript:inputFocus(' + i +')"'
        +       'class="text_context">'
        +       array[i]
        +       '</a>'
        +  '</li>'
        ;
    }
    $("#content").append(content);
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

function inputFocus(n) {
    var name = "context"+(n+1);
    document.getElementById(name).focus();
}

function showAnswer() {
    var answer = "";
    for(let i = 0; i < key.length; i++) {
        answer += (i+1)+". " + key[i]+"\n";
    }
    alert(answer);
    curruntIndex++;
    $("#content").empty();
    key.length = 0;
    changeFile(index[curruntIndex]);
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
    navigator.sendBeacon("/function/Function4/UserActivity",result);
});