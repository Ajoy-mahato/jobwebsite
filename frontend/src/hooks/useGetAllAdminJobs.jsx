import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setAllAdminJob } from '../../redux/jobSlice.js'
import { JOB_API_END_POINT } from '../../utils/constant.js'

const useGetAllAdminJobs = () => {
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchAllAdminJobs=async()=>{
            try{
          const res=await axios.get(`${JOB_API_END_POINT}/getAdminJobs`,{withCredentials:true})
          if(res.data.success){
               dispatch(setAllAdminJob(res.data.jobs))
          }
            }catch(error){
                console.log(error)
            }
        }
        fetchAllAdminJobs();
    },[])

}

export default useGetAllAdminJobs;
