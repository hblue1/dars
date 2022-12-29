$(document).ready(function(){
    var table = new Tabulator("#UserActivity", {
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
            {title:"사용자 이름", field:"user_id",width:200},
            {title:"훈련", field:"activity", hozAlign:"left", width:130},
            {title:"훈련 시간(초)", field:"activity_time",width:350},
        ],
    });
    $.ajax({
        type:"POST",
        url:"/system/getUserActivity",
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