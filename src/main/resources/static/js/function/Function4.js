var index = [];
var key = [];
var curruntIndex = 0;

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
        }
    })
})

function getLevel() {
    const searchParams = new URLSearchParams(location.search);
    return searchParams.get('d');
}

function changeFile(parameter) {
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