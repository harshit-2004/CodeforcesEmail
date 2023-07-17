const mongoose = require('mongoose');

const contestSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    start_time:{
        type:String,
        required:true
    },
    duration:{
        type:Number,
        required:true
    },
    site:{
        type:String,
        required:true
    },
    in_24_hours:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
}, {
    timestamps: true
});

const Contests = mongoose.model('Contests', contestSchema);

module.exports = Contests;