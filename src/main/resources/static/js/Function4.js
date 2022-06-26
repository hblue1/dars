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

function changeFile() {
    $("#context").text("");
    var data = {
        index : $("#search").val()
    }
    $.ajax({
        type:"POST",
        url:"/Function4/getAudioInfo",
        data:data,
        success: function(result)
        {
            var context = "";
            for(var i = 0; i < result.length; i++) {
                context += (i+1) + ". " + result[i].context + "<br>";
            }
            $("#context").append(context);
            getAudioFile(result);
        }
    })
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