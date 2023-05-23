$("#add_task").submit(function(_event){
    alert("Data Inserted Successfully!");
})

$("#update_task").submit(function(event) {
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {};

    $.map(unindexed_array, function(n, _i){
        data[n['name']] = n['value']
    })

    console.log(data);

    var request = {
        "url":`http://localhost:3000/api/tasks/${data.id}`,
        "method": 'PUT',
        "data": data
    }

    $.ajax(request).done(function(){
        alert("Task Data Updated")
        location.replace("http://localhost:3000")
    })
})

if(window.location.pathname == "/") {
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function() {
        var id = $(this).attr("data-id")

        var request = {
            "url":`http://localhost:3000/api/tasks/${id}`,
            "method": 'DELETE'
        }

        if(confirm("Do you really wish to delete this task?")) {
            $.ajax(request).done(function(){
                alert("Task Deleted Sucessfully")
                location.reload();
            })
        }
    })
}

function getStarValue() {
    let starValue = document.getElementById('difficulty').value;
    let star = document.innerText = "&#11088;";
    if(starValue === '1') {
        return(star);
    } else if (starValue === '2') {
        return(star + star);
    } else if (starValue === '3') {
        return(star + star + star)
    } else if (starValue === '4') {
        return(star + star + star + star)
    } else if (starValue === '5') {
            return(star + star + star + star + star)
    }   else {
            return("N/A")
            }
    }
