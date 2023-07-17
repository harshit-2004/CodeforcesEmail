const User = require('../models/user');

const fs = require('fs');

const path = require('path');

const Fixedtimeemail = require('../models/fixedtimeemail');

const Variabletimeemail = require('../models/timebeforecontest');

module.exports.signin = function(req,res){
    req.flash('success','Sign In Successfully');
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
    console.log("logged out successfully");
    req.logout(function(err){
        if(err){
            console.log("error in making value ",err);
            return next(err);
        }
        req.flash('success','Logged out Successfully');
        return res.redirect('/');
      });
}

module.exports.createSession = function(req,res){
    req.flash('success','Logged in Successfully');
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

module.exports.profile = function(req,res){
    return res.render('profile',{
        title:"From User controler"
    });
}

module.exports.profile_update = async function(req,res){
    try {
        let user = await User.findByIdAndUpdate(
          req.body.id,
          { name: req.body.name, email: req.body.email ,
            password:req.body.password
          }
        );
        user.save();
        req.flash('success', 'Profile Updated Successfully');
        if(req.xhr){
            return res.status(200).json({
                data:{
                    email:user.email
                },
                message:"Porfile Updated Successfully"
            });
        }
        req.flash('success', 'Profile Updated Successfully');
        return res.redirect('back');
      } catch (error) {
        console.error(error);
        req.flash('error', 'Error updating profile');
        return res.redirect('back');
      }
}

module.exports.setting = function(req,res){
    const fixedtime = Fixedtimeemail.findOne({user:req.params.id}); 
    return res.render('setting',{ 
        fixtime : fixedtime 
    });
}

module.exports.emailfixedtime = async function(req,res){

    console.log("giving the value of req.body ",req.params.id);
    try{
        let user = await User.findById(req.params.id);
        let fixedtime = await Fixedtimeemail.findOne({user:req.params.id}); 
        if(user&&!fixedtime){
            fixedtime = await Fixedtimeemail.create({
                user:req.params.id
            });
        }
        console.log(req.body.time);
        fixedtime.fixtime.push(req.body.time);
        fixedtime.save();
        return res.redirect('back');
    }catch(err){
        console.log("Error in making err ",err);
    }

}

module.exports.emailtime = async function(req,res){
    console.log("giving the value of req.body ",req.params.id);
    try{
        let user = await User.findById(req.params.id);
        let varitime = await Variabletimeemail.findOne({user:req.params.id}); 
        if(user&&!varitime){
            varitime = await Variabletimeemail.create({
                user:req.params.id
            });
        }
        console.log(req.body.time);
        varitime.time.push(req.body.time);
        varitime.save();
        return res.redirect('back');
    }catch(err){
        console.log("Error in making err ",err);
    }
}