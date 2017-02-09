/* global $*/
/* global tinyMCE*/

var caseData,editmode = 0;

// new Date().getTime() to prevent browser caching of AJAX Result
function retreiveCaseData() {
    $.getJSON('/getCaseList?_=' + new Date().getTime(), function(data) {
        caseData = data;
    })
}

function submitEditData(event) {
    var caseString = tinyMCE.activeEditor.getContent(),
        data;
    if (caseString == "") {
        $("#loginError").show();
    }
    
    else {
        $("#myModal").modal('hide');
        if (editmode > 0) {
             data = {
                "caseId": caseData[editmode-1].caseId,
                "caseText": caseString
            };
            caseData[editmode - 1] = data;
            updateData(data,2,editmode - 1);

        } 
        else {
            data = {
                "caseId": Math.floor(100 + Math.random() * 900),
                "caseText": caseString
            };

        caseData.push(data);
        updateData(data,1,-1);
        }
    }
}



function updateData(data, flag,index) {

    var actualData = {
        "caseData": data,
        "flag": flag,
        "index": index
    }

    $.ajax({
        method: "POST",
        contentType: "application/json; charset=utf-8",
        url: '/updateCaseList?_=' + new Date().getTime(),
        data: JSON.stringify(actualData),
        success: function(result) {
            window.console.log(result);
            viewTable();
        },

    }).error(function(e)

        {
            console.log(e);
        });
}





function viewTable() {

    $("#myTable tbody").empty();

    for (var i = 0; i < caseData.length; i++) {
        var tableRow = "<tr><td>" + caseData[i].caseId + "</td><td>" + caseData[i].caseText + "</td><td><a id=edit" + (i + 1) +
            " href=\"#\" class=\"btn btn-primary btn-xs\"><span class=\"glyphicon glyphicon-pencil\"></span></a></td>" +
            "<td><a id=delete" + (i + 1) + " href=\"#\" class=\"btn btn-danger btn-xs\"><span class=\"glyphicon glyphicon-remove\"></span></a></td>" + "</tr>";
        $("#myTable tbody:last").append(tableRow);

    }

}


function editOrDelete(event) {

    var trigger = findATagElement(event.target);

    if (trigger) { 

        if (trigger.id.search("edit") >= 0) {
            editmode = trigger.id[4];
            $("#myModal").modal('show');
            tinyMCE.activeEditor.setContent(caseData[editmode - 1].caseText);
        } 
        else if (trigger.id.search("delete") >= 0) {
            caseData.splice((trigger.id[6] - 1), 1);
            viewTable();
            updateData(caseData[trigger.id[6] - 1], 3,trigger.id[6] - 1);
        }
    }
}


function findATagElement(el) {
    while (el.parentNode) {
        if (el.tagName === "A")
            return el;
        el = el.parentNode;
    }
    return null;
}


// Root code called on page load
$(function() {
    //fetch userList from REST API
    retreiveCaseData();
    
    //Attach all necessary Event handlers
    $("#myTable").on('click', editOrDelete);

    $("#cancelButton").click(function(event) {
        tinyMCE.activeEditor.setContent("");
        $("#loginError").hide();
    });

    $('.alert .close').click(function(event) {
        $(this).parent().hide();
    });

    $("#createCaseButton").click(function(event){
        tinyMCE.activeEditor.setContent("");
        editmode=0;
    });
    
    $("#submitButton").on("click", submitEditData);
    
    $("#viewButton").on("click", viewTable);

});
