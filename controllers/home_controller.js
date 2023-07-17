const Codeforces = require('../models/Contests');

module.exports.home = async function(req,res){
    let contestlist = await Codeforces.find({});
    return res.render('home',{
        title:"CodeforcesEmail",
        contestlist: contestlist
    });
}