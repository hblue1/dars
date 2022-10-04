$(document).ready(function(){
    loadFile();
})

function loadFile() {
    $("#quiz").empty();
    var data;
    if( $("#index").val() == "") {
        data = {index : 1}
    }
    else {
        data = {index : $("#index").val()}
    }
    $.ajax({
        type:"POST",
        url:"/function/Function5/loadFile",
        data: data,
        success: function(result)
        {
            drawBoard(result);
            setAudio(result);
        }
    });
}

function drawBoard(result) {
    //보드를 그리기 위한 변수
    var np = getArray(result.nullpoint);
    var k = 0;
    var count = 0;
    var drawPuzzle = '<div class = "board">';

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
        for(let j = 0; j < result.col; j++) {
            count++;
            if( count == np[k]) {
                drawPuzzle += '<input type = "text" maxlength = "1" size = 1 readonly = "true" style = "background-color : gray">';
                k++;
            }
            else {
                drawPuzzle += '<input type = "text" maxlength = "1" size = 1';
                drawPuzzle += drawNumber(count,hrztArr,vtcArr);
                drawPuzzle += '>';
            }
        }
        drawPuzzle += '<br>';
    }
    drawPuzzle += '</div>';
    $("#quiz").append(drawPuzzle);
}

function drawNumber(count,hrztArr,vtcArr) {
    var final = "";
    for(let i = 0; i < vtcArr.length; i++) {
        if (vtcArr[i][0] == count) {
            final = ' style = "background-image:url(/img/function5/blue' + vtcArr[i][1] + '.png)';
            break;
        }
    }
    for(let i = 0; i < hrztArr.length; i++) {
        if(final == "") {
            if (hrztArr[i][0] == count) {
                final = ' style = "background-image:url(/img/function5/red' + hrztArr[i][1] + '.png)';
                break;
            }
        }
        else if (hrztArr[i][0] == count) {
            final += ', url(/img/function5/red' + hrztArr[i][1] + '.png);';
            break;
        }
    }
    final += '"';
    return final;
}

function setAudio(result) {
    var key = Object.keys(result.audio).sort();
    
    var soundBox = '<div class = "soundBox">' + '<table border : 1px solid>';
    soundBox += '<tr>' + '<th>' + '정답' + '</th>' + '<th>' + 'Level1' + '</th>' + '<th>' + 'Level2' + '</th>' + '<th>' + 'Level3' + '</th>' +'</tr>';
    for(let i = 0; i < key.length; i++) {
        if(i % 4 == 0) {
            soundBox += '<tr>'
        }
        soundBox += '<td>'
                 + '<img src = "/img/start.png" height="50" width="50" onclick = "javascript:playAudioFile(' + i + ')">'
                 + '<audio controls id = "audio' + i + '" hidden = true>'
                 + '<source src="' + result.audio[key[i]] + '" type="audio/wav">'
                 + '</audio>'
                 + '</td>';
        if(i % 4 == 3) {
            soundBox += '</tr>'
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