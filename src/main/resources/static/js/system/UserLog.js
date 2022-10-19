$(document).ready(function(){
    var table = new Tabulator("#UserLog", {
        maxHeight: "100%",
        layout:"fitDataTable",
        tooltips:true,
        addRowPos:"top",
        history:true,
        pagination:"local",
        paginationSize:21,
        initialSort:[
            {column:"access_time",dir: "desc"}
        ],
        columns:[
            {title:"사용자 ID", field:"access_id",width:200},
            {title:"접속 시간", field:"access_time", hozAlign:"right", align:"left",width:200},
            {title:"접속 IP", field:"access_ip",width:150},
            {title:"사용자 권한", field:"access_role",width:350}
        ],
    });
    $.ajax({
        type:"POST",
        url:"/system/getUserLog",
        success:function(result)
        {
            table.setData(result);
        }
    })
})