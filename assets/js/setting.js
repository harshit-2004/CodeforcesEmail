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
            data:arr
        },
        success:function(data){
            console.log(data);
        }
    })
})