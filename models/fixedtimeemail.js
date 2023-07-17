const mongoose = require('mongoose');

const fixedTimeEmailSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    fixtime:[
        {
            type:String,
            unique:true
        }
    ]
},{
    timestamps:true
});

fixedTimeEmail = mongoose.model('fixedTimeEmail',fixedTimeEmailSchema);

module.exports = fixedTimeEmail;