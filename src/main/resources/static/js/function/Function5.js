currentFile = 1;
var startTime;

$(document).ready(function(){
    loadFile();
})

function loadFile() {
    $("#quiz").empty();
    if(currentFile == 100) {
        alert("퀴즈가 끝났습니다!");
        location.href="/home/FunctionSelect";
        return 0;
    }
    data = {
        index : currentFile
    }
    $.ajax({
        type:"POST",
        url:"/function/Function5/loadFile",
        data: data,
        success: function(result)
        {
            drawBoard(result);
            setAudio(result);

            let now = new Date();   
            startTime = now;
            currentFile += 1;
        },
        beforeSend:function()
        {    
            $('.wrap-loading').removeClass('display-none');
        },
        complete:function()
        {
            $('.wrap-loading').addClass('display-none');
        }
    });
}

function drawBoard(result) {
    //보드를 그리기 위한 변수
    var np = getArray(result.nullpoint);
    var k = 0;
    var count = 0;
    var drawPuzzle = '<div class="qz_left" id = "board"><table class="qz_table">';

    //보드에 번호를 매길 변수
    var hrzt = result.horizontal.split('/');
    var vtc = result.vertical.split('/');
    var hrztArr = new Array(hrzt.length);
    for(let i = 0; i < hrzt.length; i++) {
        hrztArr[i] = getArray(hrzt[i]);
    }
    var vtcArr = new Array(vtc.length);
    for(let i = 0; i < vtc.length; i++) {
        vtcArr[i] = getArray(vtc[i]);
    }

    for(let i = 0; i < result.row; i++) {
        drawPuzzle += '<tr>'
        for(let j = 0; j < result.col; j++) {
            count++;
            drawPuzzle += '<td><div class="qz_wrap">';
            if( count == np[k]) {
                drawPuzzle += '<div class="box"></div>';
                k++;
            }
            else {
                drawPuzzle += '<input type = "text" class="qz" maxlength = "1" size = 1>';
                drawPuzzle += drawNumber(count,hrztArr,vtcArr);
            }
            drawPuzzle += '</div></td>';
        }
        drawPuzzle += '</tr>'
    }
    drawPuzzle += '</table></div>';
    $("#quiz").append(drawPuzzle);
}

function drawNumber(count,hrztArr,vtcArr) {
    var final = '';
    for(let i = 0; i < vtcArr.length; i++) {
        if (vtcArr[i][0] == count) {
            final = '<div class="qz_nb">' + vtcArr[i][1] + '</div>';
            break;
        }
    }
    for(let i = 0; i < hrztArr.length; i++) {
        if(final == "") {
            if (hrztArr[i][0] == count) {
                final = '<div class="qz_nb blue">' + hrztArr[i][1] + '</div>';
                break;
            }
        }
        else if (hrztArr[i][0] == count) {
            final += '<div class="qz_nb blue">' + hrztArr[i][1] + '</div>';
            break;
        }
    }

    return final;
}

function setAudio(result) {
    //문제 순번으로 정렬
    var key = Object.keys(result.audio).sort();
    //정답, 힌트1, 힌트2, 힌트3을 힌트1, 힌트2, 힌트3, 정답으로 변경
    var temp = [];
    var tempValue;
    for(let i = 0; i < key.length; i++) {
        if (key.length / 4 == 3) {
            if(i % 3 == 0) {
                tempValue = key[i];
            }
            else {
                temp.push(key[i]);
                if(i % 3 == 2) {
                    temp.push(tempValue);
                }
            }
        }
        else if(key.length / 4 == 4 || key.length / 4 == 5) {
            if(i % 4 == 0) {
                tempValue = key[i];
            }
            else {
                temp.push(key[i]);
                if(i % 4 == 3) {
                    temp.push(tempValue);
                }
            }
        }
    }
    key = temp;

    //테이블 그리기
    var soundBox = '<div class = "qz_right">' + '<table>';
    soundBox += '<tr><th scope="col"></th>'
    ////공백 | Level1 | Level2 | Level3 | 정답
    if(key.length/4 == 3) {
        for(let j = 0; j < 2; j++) {
            soundBox += '<th scope="col">Level ' + (j+1) + '</th>';
        }
    }
    else if(key.length/4 == 4 || key.length/4 == 5) {
        for(let j = 0; j < 3; j++) {
            soundBox += '<th scope="col">Level ' + (j+1) + '</th>';
        }
    }
    soundBox += '<th scope="col">정답</th></tr>';

    for(let i = 0; i < key.length; i++) {
        //N번힌트
        if(key.length/4 == 3) {
            if(i % 3 == 0) {
                soundBox += '<tr>'
                         +      '<td'
                if(((i/3)+1) == 1 || ((i/3)+1) == 4) {
                    soundBox += ' class="blue">'
                }
                else {
                    soundBox += '>'
                }
                soundBox += ((i/3)+1)
                         +     '번</br>힌트'
                         +      '</td>'
            }
        }
        else if(key.length/4 == 4 || key.length/4 == 5) {
            if(i % 4 == 0) {
                soundBox += '<tr>'
                         +      '<td'
                if(((i/4)+1) == 1 || ((i/4)+1) == key.length/4) {
                    soundBox += ' class="blue">'
                }
                else {
                    soundBox += '>'
                }
                soundBox += ((i/4)+1)
                         +     '번</br>힌트'
                         +      '</td>'
            }
        }

        // lv1힌트음원 | lv2힌트음원 | (lv3힌트음원) | 정답음원
        soundBox += '<td>'
                 +      '<a href="javascript:playAudioFile(' + i +')">'
                 +          '<img src="/img/function/play_1.png" alt="재생">'
                 +      '</a>'
                 +      '<audio controls id = "audio' + i + '" hidden = true>'
                 +          '<source src="' + result.audio[key[i]] + '" type="audio/wav">'
                 +      '</audio>'
                 +  '</td>';

        //줄바꿈
        if(key.length/4 == 3) {
            if(i % 3 == 2) {
                soundBox += '</tr>'
            }
        }
        else if(key.length/4 == 4 || key.length/4 == 5) {
            if(i % 4 == 3) {
                soundBox += '</tr>'
            }
        }
    }
    soundBox += '</table>' + '</div>';
    $("#quiz").append(soundBox);
}

function playAudioFile(n) {
    var name = "audio"+n
    document.getElementById(name).play();
}

function getArray(arr) {
    var str = arr.replace('[','');
    str = str.replace(']','');
    str = str.split(',');
    var final = new Array(str.length);
    for(let i = 0; i < str.length; i++) {
        final[i] = parseInt(str[i]);
    }

    return final;
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
    navigator.sendBeacon("/function/Function5/UserActivity",result);
});