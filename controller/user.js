const bcrypted = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer');
const fs=require('fs');
const User = require("../models/user")
const _auth = require("../middleware/authorization");

const _user = {}

_user.signUp = async(req, res) =>{
    const {name, mobileNumber, email, address, password, role} = req.body;
    const image = req.file;
    try{
        if(!name || !mobileNumber || !email || !address || !password){
           return res.status(401).json({error: "All Fields are required"})
        }
        const userExist = await User.findOne({email: email});
        if(userExist){
          return res.status(401).json ({error: "User Already exist"});
        }
        OTP = Math.floor(1000 + Math.random() * 9000)
        const user =  {name, mobileNumber, email, address, password, role, image: image?.path, OTP}
        const userDetails = await User.create(user);
        const mailTransporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
              user: 'shivamsharma8902@gmail.com',
              pass: 'dkuq rsah xcyo qmeu'
          }
      });

      
       
      const mailDetails = {
          from: 'shivamsharma8902@gmail.com',
          to: user.email,
          subject: 'Test mail',
          text: `your otp is ${OTP}`
      };
       
      mailTransporter.sendMail(mailDetails, function(err, data) {
          if(err) {
              console.log('Error Occurs');
              return res.status(201).json(err)
          } else {
              return res.status(201).json({message: 'Email sent successfully', _id: userDetails._id});
          }
      });
    }catch (error) {
        res.send(error);
      }};


//Verify OTP
_user.verification = async(req, res) =>{
  const {OTP} = req.body;
  const otp = await User.findOne({OTP: OTP})
  if(otp){
    otp.verified = true;
    await otp.save()
    return res.status(201).json({message:"You has been successfully registered"})
  }else{
    return res.status(401).json({message:"Your OTP is incorrect, Please enter valid OTP"});
  }
}


//Resend OTP
_user.resend = async(req, res) =>{
  const _id = req.params.id
  const userExist = await User.findOne({_id: _id})
  if(userExist){
  OTP = Math.floor(1000 + Math.random() * 9000)
  const mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shivamsharma8902@gmail.com',
        pass: 'dkuq rsah xcyo qmeu'
    }
});

const mailDetails = {
    from: 'shivamsharma8902@gmail.com',
    to: userExist.email,
    subject: 'Test mail',
    text: `your otp is ${OTP}`
};

mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
        console.log('Error Occurs');
        return res.status(201).json(err)
    } else {
      userExist.OTP = OTP
      userExist.save()
        return res.status(201).json({message: 'Email resend successfully'});
    }
});
}}

// User Sign in
_user.singIn = async (req, response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  console.log(user)
  if (user) {
    console.log("user", user);
    const result = await bcrypted.compare(password, user.password);
    console.log(result)
    if (result) {
      const token = jwt.sign(
        { email: user.email, id: user._id },
        "secret_key",
        { expiresIn: "2h" }
      );
      return response
        .status(200)
        .json({ email: user.email, id: user._id, token: token });
    } else {
      return response.status(200).json("Invalid credentials");
    }
  } else {
    return response.status(400).json({ message: "User not registered" });
  }
  };


// Logout
_user.logout = (req, res) => {
    res.clearCookie('token').json({message: "User Logout Successfully"});
  };

   // delete method

   _user.deleteById = async (req, res, next) => {
    try {
      const deleted = await User.deleteOne({ _id: req.params.id });
      if (!deleted) {
        return res.status(201).json({ message: "user not found" });
      }
      res.status(201).json(deleted);
    } catch (error) {
      res.send;
    }
  };


   // Put Method

_user.updateWithId = async (req, response) => {
_id = req.id
try {
  const user=await  User.findById({_id: _id});
  if(user){
    const oldPath=user.image
    const result=await User.findByIdAndUpdate({_id: _id},{image:req.file.path})
   if(result){
    fs.unlinkSync(oldPath)
    return response.send({message:"updated"})
  }else{
    return response.send({message:"error accured"})
  }      
  }
} catch (error) {
  return response.send(error);
}
};

module.exports = _user