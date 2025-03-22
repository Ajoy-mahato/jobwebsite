import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import {  useNavigate } from 'react-router-dom'

const Job = ({job}) => {
   const navigate=useNavigate();
   // const jobId="12dfgdbfgghnhnfnhg"
   const daysAgoFunction=(mongodbTime)=>{
      const createdAt=new Date(mongodbTime);
      const currentTime=new  Date();
      const timeDifference=currentTime-createdAt;
      return Math.floor(timeDifference/(1000*24*60*60));
   }
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100'>
        <div className='flex items-center justify-between '>
     <p className='text-sm text-gray-600'>{daysAgoFunction(job?.createdAt)===0 ?"Today":`${daysAgoFunction(job?.createdAt)} days ago`} </p>
     <Button variant="outline" className="rounded-full" size="icon" ><Bookmark/></Button>
     </div>
     <div className='flex items-center gap-2 my-2'>
       <Button variant="outline" clallName="p-6 " size="icon">
        <Avatar>
            <AvatarImage src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"/>
        </Avatar>
       </Button>
       <div>
        <h1>{job?.companyId?.name}</h1>
        <p>{job?.location}</p>
       </div>
     </div>

     <div>
        <h1 className='font-bold text-lg my-2'>{job?.title}</h1>
        <p className='text-sm text-gray-600 '> {job?.description} </p>
     </div>
     <div className='flex items-center  gap-2 mt-4'>
        <Badge className={"text-blue-700 font-bold"} variant="ghost">{job?.position} Position </Badge>
        <Badge className={"text-red-700 font-bold"} variant="ghost">{job?.jobType} </Badge>
        <Badge className={"text-purple-600 font-bold"} variant="ghost">{job?.salary}LPA</Badge>
     </div>
     <div className='flex items-center gap-4 mt-4'>
        <Button variant="outline" onClick={()=>navigate(`/description/${job?._id}`)}>Details</Button>
        <Button  className="bg-purple-600 ">Save For Later</Button>
     </div>
    </div>
  )
}

export default Job
