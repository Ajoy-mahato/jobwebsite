import React, { useEffect, useState } from "react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import axios from "axios";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "../../utils/constant.js";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleJob } from "../../redux/jobSlice.js";
import { toast } from "sonner";

const JobDescription = () => {
  const {singleJob}=useSelector(store=>store.job);
 
const {user}=useSelector(store=>store.auth)
  const isInitiallyApplied= singleJob?.application.some(application=>application.applicant===user?._id) || false;
  const [isApplied,setIsApplied]=useState(isInitiallyApplied);
  const paarams=useParams();
const jobId=paarams.id;

const dispatch=useDispatch();
const applyJobHandler=async()=>{
  try{
    setIsApplied(true)
    const updateSingleJob={...singleJob,application:[...singleJob.application,{applicant:user?._id}]}
    dispatch(setSingleJob(updateSingleJob))
const res=await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`,{withCredentials:true})

if(res.data.success){
  toast.success(res.data.message)
}
  }catch(error){
    console.log(error);
    toast.error(error.response.data.message)
    
  }
}
  useEffect(()=>{
    const fetchSingleJob=async ()=>{
     try{
      const res=await axios(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true})

      if(res.data.success){

        dispatch(setSingleJob(res.data.job))
        setIsApplied(res.data.job.application.some(application=>application===user?._id))
      }
     }catch(error){
      console.log(error)
     }
    }
    fetchSingleJob();
  },[jobId,dispatch,user?._id])
  return (
    <div className="max-w-6xl mx-auto my-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">{singleJob?.title}</h1>
          <div>
            <Badge className="text-blue-700 font-bold" variant="ghost">
              {singleJob?.position}position{" "}
            </Badge>
            <Badge className={"text-red-600 font-bold"} variant="ghost">
              {singleJob?.jobType}
            </Badge>
            <Badge className={"text-indigo-600 font-bold"} variant="Ghost">
             {singleJob?.salary}LPA
            </Badge>
          </div>
        </div>
        <Button
        onClick={isApplied?null : applyJobHandler}
          disable={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
        >
          {isApplied ? "Already Applied" : "Applied Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium  py-4">
      Job Description
      </h1>
      <div>
        <h1 className="font-bold my-1">
          Role:
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.title}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:
          <span className="pl-4 font-normal text-gray-800"> {singleJob?.location}</span>
        </h1>
        <h1 className="font-bold my-1">
          Description:
          <span className="pl-4 font-normal text-gray-800">
           {singleJob?.description}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:
          <span className="pl-4 font-normal text-gray-800">{singleJob?.experience} years</span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:<span className="pl-4 font-normal text-gray-800">{singleJob?.salary}LPA</span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:
          <span className="pl-4 font-normal text-gray-800">{singleJob?.application?.length}</span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:
          <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt.split("T")[0]}</span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
