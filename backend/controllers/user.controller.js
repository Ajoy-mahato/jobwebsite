import {User} from "../models/user.model.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import cloudinary from "../utils/cloudinary.js";
import getDataUri from "../utils/datauri.js";
import { profile } from "console";

export const register=async(req,res)=>{
    try{
     const {fullName,email,phoneNumber,password,role}=req.body;
     
     console.log(fullName,email,phoneNumber,password,role);
     
     if(!fullName || !email || !phoneNumber || !password || !role){
        return res.status(400).json({
            message:"something is missing",
            success:false
           
        });
     };

     const file=req.file;
     const fileUri=getDataUri(file);
     const cloudResponse=await cloudinary.uploader.upload(fileUri.content);   
     const user=await User.findOne({email});
     if(user){
        return res.status(400).json({
            message:'user already exist with this email',
            success:false
        })
     };
     const hashedPassword=await bcrypt.hash(password,10);
     await User.create({
        fullName,
        email,
        phoneNumber,
        password:hashedPassword,
        role,
        profile:{
          profilePhoto:cloudResponse.secure_url,
        }
     })
     return res.status(200).json({
      message:"Account created successfully",
      success:true
     });

    }catch(error){
        console.log(error);
    }
}

export const login=async (req,res)=>{
    try{
      const {email,password,role}=req.body;
      if(!email || !password || !role){
        return res.status(400).json({
            message:"somthing is missing",
            success:false
        })
      };
      let user= await User.findOne({email});
      if(!user){
        return res.status(400).json({
            message:"incorrect  email or password",
            success:false
        })
      }
      
      const isPasswordMatch=await bcrypt.compare(password,user.password);
      if(!isPasswordMatch){
        return res.status(400).json({
            message:"password was not matching",
            success:false
        })
      }

      if(role !==user.role){
        return res.status(400).json({
            message:'account does not exit this current role',
            success:success
        })
      };

      const tokenData={
        userId:user._id
      }

      const token= await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'})
      user={ 
        _id:user._id,
        fullName:user.fullName,
        email:user.email,
        phoneNumber:user.phoneNumber,
        role:user.role,
        profile:user.profile   
      }
      return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpsOnly:true,
        sameSite:'strict'}).json({
            message:`welcome back ${user.fullName}`,
            user,
            success:true
        })
    }catch(error){
      console.log(error)
    }
}

export const logOut=async (req,res)=>{
  try{
    return res.status(200).cookie("token","",{maxAge:0}).json({
      message:"logged out successfully",
      success:true
    })
  }catch(error){
    console.log(error);
  }
}

export const updateProfile=async (req,res)=>{
  try{
     const {fullName,email,phoneNumber,bio,skills}=req.body;
   
     const file=req.file;
    
    //  if(!fullName || !email || !phoneNumber || !bio || !role){
    //   return res.statusa(400).json({
    //     message:"something is missing",
    //     success:false
    //   })
    //  }

//cloudinary ayega idhar
const fileUri=getDataUri(file);
const cloudResponse=await cloudinary.uploader.upload(fileUri.content);
    let skillsArray;
    if(skills){

       skillsArray=skills.split(',')
    }
     const userId=req.id; //middleware authentication
     let user=await User.findById(userId);
     if(!user){
      return res.status(400).json({
        message:"user not found",
        success:false
      })
     }

     if(fullName) user.fullName=fullName
     if(email) user.email=email
     if(phoneNumber) user.phoneNumber=phoneNumber
     if(bio) user.profile.bio=bio
     if(skills) user.profile.skills=skillsArray

     //resume comes later here

     if(cloudResponse){
      user.profile.resume=cloudResponse.secure_url;//save the cloudinary uri
      user.profile.resumeOriginalName=file.originalname;//save the original file name
     }
     await user.save();

     user={
      _id:user._id,
      fullName:user.fullName,
      emaill:user.email,
      phoneNumber:user.phoneNumber,
      role:user.role,
      profile:user.profile
     }

     return res.status(200).json({
      message:"profile updated successfully",
      user,
      success:true
     })
  }catch(error){
    console.log(error)
  }
}