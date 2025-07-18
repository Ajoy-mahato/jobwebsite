import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Button } from "../ui/button";
import { data, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "../../../utils/constant.js";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../../../redux/authSlice.js";

const Signup = () => {
  const { user } = useSelector((store) => store.auth);
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file:"",
  });

  const {loading}=useSelector(store=>store.auth)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };


  const submitHandler=async(e)=>{
    e.preventDefault();
    // const {fullName,email,phoneNumber,password,role,file}=input;
    
 const formData=new FormData();
 formData.append("fullName",input.fullName)
 formData.append("email",input.email)
 formData.append("phoneNumber",input.phoneNumber)
 formData.append("password",input.password)
 formData.append("role",input.role)
 
 if(input.file){
   formData.append("file",input.file)
   
 }
   

    try {
      dispatch(setLoading(true))
      const res = await axios.post(`${USER_API_END_POINT}/register`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        },
        withCredentials:true
      });

      // const res= await fetch(`${USER_API_END_POINT}/register`,{
      //   method:"POST",
      //   headers:{
      //     "Content-Type":"application/json"
      //   },
      //   body:JSON.stringify({
      //     fullName,email,phoneNumber,password,role,file
      //   })
      // })

      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
     
    }catch(error){
      
      console.log(error);
      toast.error(error.response.data.message);
    }finally{
      dispatch(setLoading(false))
    } 
  }
  useEffect(()=>{
    if(user){
      navigate("/")
    }
  })
  return (
    <>
      <div>
        <Navbar />
        <div className="flex items-center justify-center max-w-7xl mx-auto">
          <form
            onSubmit={submitHandler} method="POST"
            className="w-1/2 border border-gray-400 rounded-md p-4 my-10"
          >
            <h1 className="font-bold text-xl mb-5">sign up</h1>
            <div>
              <Label>Full Name</Label>
              <Input
                type="text"
                name="fullName"
                value={input.fullName}
                onChange={changeEventHandler}
                placeholder="enter your name"
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                placeholder="enter your email address"
              />
            </div>
            <div>
              <Label>phone number</Label>
              <Input
                type="text"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                placeholder="99999999"
              />
            </div>
            <div>
              <Label>password</Label>
              <Input
                type="password"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
                placeholder=" Enter password"
              />
            </div>
            <div className="flex items-center justify-between mt-5">
              <RadioGroup
                defaultValue="comfortable"
                className="flex items-center gap-4 my-5"
              >
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="student"
                    checked={input.role==="student"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r1">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="radio"
                    name="role"
                    value="recruiter"
                    checked={input.role==="recruiter"}
                    onChange={changeEventHandler}
                    className="cursor-pointer"
                  />
                  <Label htmlFor="r2">Recruiter</Label>
                </div>
              </RadioGroup>
              <div className="flex items-center gap-2">
                <Label>Profile</Label>
                <Input
                  accept="image/*"
                  type="file"
                  
                  onChange={changeFileHandler}
                  className="cursor-pointer"
                />
              </div>
            </div>
            {loading ? (
            <Button className="w-full my-4">
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              please wait
            </Button>
          ) : (
            <Button type="submit" className="w-full  my-4">
              signup
            </Button>
          )}
            <span className="text-sm">
              Already have an Account ?{" "}
              <Link to="/login" className="text-blue-600 text-sm">
                Login
              </Link>
            </span>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
