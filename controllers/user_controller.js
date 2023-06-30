const User = require('../models/user');

module.exports.signin = function(req,res){
    return res.render('signin',{
        title:"From User controler"
    });
}

module.exports.signup = function(req,res){
    return res.render('signup',{
        title:"From User controler"
    });
}

module.exports.signout= function(req,res){
    req.logout();
    if(err){
        log("Error in signout ",err);
        return next(err);
    }
    return res.redirect('/');
}

module.exports.createSession = function(req,res){
    console.log(req.body);
    return res.redirect('/');
}

module.exports.create = async function(req,res){
    try{
        const user = await User.findOne({email:req.body.email});
        if(user){
            console.log("user allready exist please sign in ");
            return res.redirect('back');
        }else{
            let newuser = await User.create(req.body);
            return res.redirect('/users/signin');
        }
    }catch(err){
        console.log("Error in creating User ",err);
    }
}