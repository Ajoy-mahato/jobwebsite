import React from 'react'
import LatestJobCard from './LatestJobCard';
import { useSelector } from 'react-redux';
import useGetAllJobs from '@/hooks/useGetAllJobs';


// let randomJobs=[1,2,3,4,5,6,7,8];
const LatestJob = () => {
  useGetAllJobs();
  const {allJobs}=useSelector(store=>store.job)
  return (
    <div className='max-w-6xl mx-auto my-20'>
      <h1 className='text-4xl font-bold'><span className='text-purple-600 '>Latest & Top </span>Job Opening</h1>
      <div className='grid grid-cols-3 gap-4 my-5'>
      {
        allJobs?.length ===0 ? <span>No job Available</span> : allJobs?.slice(0,6).map((job)=>< LatestJobCard key={job._id} job={job}/>)
      }
      </div>    
    </div>
  )
}

export default LatestJob
