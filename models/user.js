const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    fixtime:[
        {
            type:Number,
            unique:true
        }
    ],
    variabletime:[
        {
            type:Number,
            unique:true
        },
    ],
    sites:[
        {
            type:String,
            unique:true
        }
    ]
},{
    timestamps:true
});

const User = mongoose.model('User',userSchema);

module.exports = User;