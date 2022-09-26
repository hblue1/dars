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
        url:"/Function5/loadFile",
        data: data,
        success: function(result)
        {
            drawBoard(result);
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
            final = ' style = "background-image:url(img/function5/blue' + vtcArr[i][1] + '.png)';
            break;
        }
    }
    for(let i = 0; i < hrztArr.length; i++) {
        if(final == "") {
            if (hrztArr[i][0] == count) {
                final = ' style = "background-image:url(img/function5/red' + hrztArr[i][1] + '.png)';
                break;
            }
        }
        else if (hrztArr[i][0] == count) {
            final += ', url(img/function5/red' + hrztArr[i][1] + '.png);';
            break;
        }
    }
    final += '"';
    return final;
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