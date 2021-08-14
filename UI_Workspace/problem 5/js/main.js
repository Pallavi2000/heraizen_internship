$(function(){
    $("#search").keyup(function(){
        searchStr = $("#search").val()
        if(searchStr.trim() != ""){
            showResult(searchStr);
        }
        
    })

    $("#idViewall").click(function(){
        $.ajax({
            url:"https://fms-mite.herokuapp.com/fms/",
            method:"GET",
            success:function(data){
                showTable(data);
                
            }
        })

    })

    

    function showResult(str){
        $.ajax({
            url:"https://fms-mite.herokuapp.com/fms/search/"+str,
            method:"GET",
            success:function(data){
                showTable(data);
                
            }
        })
    }

    $("#idBtnAdd").click(function(){
        name = $("#name").val();
        name = $("#name").val();
        name = $("#name").val();
        faculty = {"name":name,"qualification":qual,"deptId":dept,"active":true}
        $.ajax({
            url =
        })


    })


    function showTable(data){
        str = "<table class='table'>";
        str += "<tr><th>Name</th><th>Qualification</th><th>Dept</th><th>status</th></tr>";
        
        for(i=0;i<data.length;i++){
            str += "<tr>";
            str += "<td>"+data[i]["name"]+"</td>";
            str += "<td>"+data[i]["qualification"]+"</td>";
            str += "<td>"+data[i]["deptId"]+"</td>";
            str += "<td>"+data[i]["active"]+"</td>";
            str += "</tr>"
        }

        str += "</table>";
        $("#idtable").html(str)
    }
})
