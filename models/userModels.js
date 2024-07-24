const mongoose =  require("mongoose");

const userSchema = mongoose.Schema({
    userName:{
        type:String,
        required: [true,"PLease add the user name"]
    },
    email:{
        type:String,
        required: [true,"PLease add the user email address"],
        unique:[true,"Email has already been taken"]
    },
    password:{
        type:String,
        required: [true,"PLease add user password"]
    },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("User",userSchema);