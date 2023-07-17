const mongoose = require('mongoose');

const variableTimeSchema = new mongoose.Schema({
    time:[
        {
        type:String,
        required:true
    }
],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
}, {
    timestamps: true
});

const VariableTime = mongoose.model('VariableTime', variableTimeSchema);

module.exports = VariableTime;