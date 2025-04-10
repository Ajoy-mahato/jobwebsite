import React, { useEffect } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "../../redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

// const randomJobs=[1,2,4,5,6,7]
const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(()=>{
      return ()=>{
          dispatch(setSearchedQuery(""));
      }
  },[])
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-20">
        <h1 className="font-bold text-xl my-10">
          Search result ({allJobs.length})
        </h1>
        <div className="grid grid-cols-3 gap-4">
          {/* {
                randomJobs.map((item,index)=>{
                    return <Job/>
                })
            } */}

          {allJobs?.length === 0 ? (
            <span>No job Available</span>
          ) : (
            allJobs
              ?.slice(0, 6)
              .map((job) => <Job key={job._id} job={job} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Browse;
