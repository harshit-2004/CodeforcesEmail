$('a.editbutton').click(function(){
    if($('a.editbutton').html() == 'Edit'){
        $('input').removeAttr('disabled');
        $('a.editbutton').html('Save');
    }else{
        $('a.editbutton').html('Edit');
        $('input').attr('disabled','disabled');
        let name = $('#name').val();
        let email = $('#email').val();
        let password = $('#password').val();
        let avatar = $('#avatar').val();
        let id = $('a.editbutton').prop('id');
        console.log(avatar);
        if(validateEmail(email)&&validatePassword(password)){
            $.ajax({
                type:'post',
                url:'/users/profile_udpate',
                data:{
                    name:name,
                    email:email,
                    password:password,
                    avatar:avatar,
                    id:id
                },
                success:function(data){
                    
                }
            })
        }else{
            if(!validateEmail(email)){
                $('.name').append('<span class="">! Incorrect email id . Please write a valid email id .</span>')
            }else if(!validatePassword(password)){
                console.log("say hello t");
                $('.password').append('<span class="">! Incorrect password .Please write a valid Password .</span>')
            }
        }
    }
})

function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

function validatePassword(password) {
    return password.length >= 8;
  }

  const togglePassword = document.querySelector("#togglePassword");
  const password = document.querySelector("#password");

  togglePassword.addEventListener("click", function () {
      // toggle the type attribute
      const type = password.getAttribute("type") === "password" ? "text" : "password";
      password.setAttribute("type", type);
      
      // toggle the icon
      this.classList.toggle("bi-eye");
  });