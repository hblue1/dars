$(document).ready(function(){
    var table = new Tabulator("#FileInfo", {
        maxHeight: "100%",
        layout:"fitDataTable",
        tooltips:true,
        addRowPos:"top",
        history:true,
        pagination:"local",
        paginationSize:20,
        initialSort:[
            {column:"file_path",dir: "asc"}
        ],
        columns:[
            {title:"파일 이름", field:"name",width:200},
            {title:"파일 확장자", field:"extension", hozAlign:"left", width:130},
            {title:"파일 경로", field:"file_path",width:350},
            {title:"파일 생성일", field:"date_created",width:250},
            {title:"파일 변경일", field:"date_modified",width:250}
        ],
    });
    $.ajax({
        type:"POST",
        url:"/system/getFileInfo",
        success:function(result)
        {
            table.setData(result);
        }
    })
})

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