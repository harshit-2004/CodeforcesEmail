const User = require('../models/user');

const fs = require('fs');

const path = require('path');

const config = require('../config/config');

const Fixedtimeemail = require('../models/fixedtimeemail');

const Variabletimeemail = require('../models/timebeforecontest');
const { log } = require('console');

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

module.exports.setting = async function(req,res){

    const fixedtime = await Fixedtimeemail.findOne({user:req.params.id}); 
    const variable = await Variabletimeemail.findOne({user:req.params.id});
    // console.log(fixedtime);
    // console.log(variable);
    if(fixedtime==null&&variable==null){
        return res.render('setting',{
            fixedtime : [],
            variabletime : []
            }
        );
    }else if(fixedtime==null){
        return res.render('setting',{
            fixedtime : [],
            variabletime : variable.time
        })
    }else if(variable==null){
        return res.render('setting',{
            fixedtime : fixedtime.fixtime,
            variabletime : []
        })
    }else{
        return res.render('setting',{
            fixedtime : fixedtime.fixtime,
            variabletime : variable.time
            }
        );
    }
}

module.exports.emailfixedtime = async function(req,res){

    console.log("giving the value of req.body ",req.params.id);
    try{
        let user = await User.findById(req.params.id);
        let fixedtime = await Fixedtimeemail.findOne({user:req.params.id}); 
        if(user&&!fixedtime){
            config.fixTimeM = 1;
            fixedtime = await Fixedtimeemail.create({
                user:req.params.id
            });
        }
        if(!fixedtime.fixtime.includes(req.body.time)){
            fixedtime.fixtime.push(req.body.time);
            fixedtime.save();
        }
        return res.redirect('back');
    }catch(err){
        console.log("Error in making err ",err);
    }

}

module.exports.emailtime = async function(req,res){
    console.log("giving the value of req.body ",req.params.id);
    try{
        let hours = req.body.hours;
        let min = req.body.minutes;
        if(hours=='0'&&min=='0'){
            req.flash("Please fill valid data");
            return res.redirect('back');
        }
        let varitime = await Variabletimeemail.findOne({user:req.params.id}); 
        if(!varitime){
            config.varTimeM = 1;
            varitime = await Variabletimeemail.create({
                user:req.params.id
            });
        }
        if(hours.length==1){
            hours='0'+hours;
        }
        if(min.length==1){
            min='0'+min;
        }
        let time = hours+":"+min;
        if(!varitime.time.includes(time)){
            varitime.time.push(time);
            varitime.save();
        }
        return res.redirect('back');
    }catch(err){
        console.log("Error in making err ",err);
    }
}

module.exports.contestwebsite = async function (req, res) {
    // console.log("hello hii in contestwebsite",req.body.data);
    try {
        let user = await User.findById(req.params.id).exec();
        for (let sit of user.sites) {
            let element = req.body.list.find((site) => site === sit);
            if (!element) {
                user.sites.pull(sit);
            }
        }
        for (let sit of req.body.list) {
            let element = user.sites.includes(sit);
            if (!element) {
                user.sites.push(sit);
            }
        }
        user.save();
        req.flash("Preference updated ");
        return res.status(200).json({
            data: "Successfully updated Preference",
        });
    } catch (err) {
        console.log("Error in making err ", err);
    }
};


module.exports.fixtimedelete = async function(req,res){
    try{
        let fixeddata = req.body.list[0].substr(3,24);
        let user = await Fixedtimeemail.findOne({user:fixeddata});
        // console.log(fixeddata);
        for(var air of req.body.list){
            let dataitem = air.substr(28,5);
            user.fixtime.pull(dataitem);
            // console.log(dataitem);
        }
        user.save();
        return res.status(200).json({
            data:"Succesfully Deleted  Items"
        })
    }catch(err){
        console.log("error in getting value ",err);
    }
}

module.exports.varinamedelete = async function(req,res){
    // console.log(req.body.list);
    try{
        let varidata = req.body.list[0].substr(3,24);
        // console.log(varidata);
        let user = await Variabletimeemail.findOne({user:varidata});
        for(var air of req.body.list){
            let dataitem = air.substr(28,5);
            user.time.pull(dataitem);
            // console.log("getting dataitem ",dataitem);
        }
        user.save();
        // console.log(req.body.list);
        return res.status(200).json({
            data:"Succesfully Deleted  Items"
        })
    }catch(err){
        console.log(err);
    }
}