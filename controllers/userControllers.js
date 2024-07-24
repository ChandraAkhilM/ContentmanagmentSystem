const asyncHandler= require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModels");
const jwt = require("jsonwebtoken");
const { use } = require("react");
//@desc Register the user
//@rote POST /api/users/register
//@access public

const registerUser = asyncHandler(async (req, res) => {
    const {userName,email,password}= req.body;
    if(!userName||!email||!password){
        res.status(400);
        throw new Error("All fields are mandatore");
    };
    const userAvailable= await User.findOne({email});
    if(userAvailable){
        res.status(400);
        throw new Error("user email already used");
    }
    //Hash Password
    const hasedPassword = await bcrypt.hash(password,10);
    console.log("Hashed Password",hasedPassword);
    const user = await User.create({
        userName,
        email,
        password:hasedPassword,
    });
    console.log(`User created ${user}`);
    if(user){
        res.status(201).json({_id: user.id, email: user.email});
    } else{
        res.status(400);
        throw new Error("user data is not valid");
    }
    res.json({message:"Register the user"});
});

//@desc Login the user
//@rote POST /api/users/login
//@access public

const loginUser= asyncHandler(async (req, res) => {
    const {email, password} =req.body;
    if(!email||!password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const user =await User.findOne({email});
    if(user && (await bcrypt.compare(password,user.password))){
        const accessToken = jwt.sign({
            user:{
                username: user.username,
                email: user.email,
                id: user.id,
            },
        }, process.env.ACCESS_TOKEN_SECERT, {expiresIn:"15m"}   );
        res.status(200).json({accessToken});    
    }else{
        res.status(401);
        throw new Error("email or password is not valid");
    }
});


//@desc current user information
//@rote get /api/users/current
//@access private
const currentUser= asyncHandler(async (req, res) => {
    res.json(req.user);
});
module.exports = {registerUser,loginUser,currentUser};



