$('#but-1').click(function(e){
    e.preventDefault();
    let user= $('#but-1').val();
    let CodingSites = $('.codingsites');
    var arr=[];
    for(let sites of CodingSites){
        if(sites.checked){
            arr.push(sites.name);
        }
    }
    // console.log(arr,user);
    $.ajax({
        type:'post',
        url:'/users/contestwebsite'+user,
        data:{
            list:arr
        },
        success:function(data){
            console.log(data);
        }
    })
})


$("#but-30").click(function(){
    var clickedbuttonlist  = [];
    var checkbox1 = document.getElementsByClassName('fixedname');
    for(var check of checkbox1){
        if(check.checked)
        {
            clickedbuttonlist.push(check.id);
            // console.log(check.id);
        }
    }
    $.ajax({
        url:'/users/fixnamedelete',
        method:'post',
        data:{list:clickedbuttonlist},
        success:function(data){
                console.log(data);
            for(let list of clickedbuttonlist){
                $(`#fix${list}`).remove();
            }
        }
    })
})

$("#but-31").click(function(){
    var clickedbuttonlist  = [];
    var checkbox1 = document.getElementsByClassName('variname');
    for(var check of checkbox1){
        if(check.checked)
        {
            clickedbuttonlist.push(check.id);
            // console.log(check.id);
        }
    }
    $.ajax({
        url:'/users/varinamedelete',
        method:'post',
        data:{list:clickedbuttonlist},
        success:function(data){
            console.log(data);
            for(let list of clickedbuttonlist){
                // console.log(list);
                $(`#var-${list}`).remove();
            }
        }
    })
})