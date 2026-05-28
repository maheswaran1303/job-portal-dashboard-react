import React, { useContext, useEffect, useState } from 'react'
import TextField from "@mui/material/TextField";
import { chennaiJobs } from '../Data/chennaiJobs';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Button from "@mui/material/Button";

import { UserDetailsContext } from '../App';
import { Outlet , Link } from 'react-router-dom';

const Dashboard = () => {


      // let [error , setError] = useState("")

      // let [isLoading , setIsLoading] = useState(true)

      // let {user , setUser} = useContext(UserDetailsContext)

      // let [recentJob , setRecentJob] = useState([])

      // let [saveJob , setSaveJob] = useState("")

      // let [jobCount , setJobCount] = useState()

  // useEffect(()=>{
  //   let getData = JSON.parse(localStorage.getItem("jobData")) || []
  //   setRecentJob(getData)
  // },[])

  // useEffect(()=>{
  //   let getData = JSON.parse(localStorage.getItem(`jobData_${user.id}`)) || []
  //   if(getData){
  //     setRecentJob(getData)
  //   }
  // },[])

      // useEffect(()=>{

      //   if(user){

      //     let getData = JSON.parse(
      //       localStorage.getItem(`jobData_${user.id}`)
      //     ) || []

      //     setRecentJob(getData)

      //   }

      // },[user])

  // useEffect(()=>{
  //   let getSaveJob = JSON.parse(localStorage.getItem("storedJob")) || []
  //   if(getSaveJob){
  //     setSaveJob(getSaveJob)
  //   }
  // },[])

  // useEffect(()=>{
  //   let getSaveJob = JSON.parse(localStorage.getItem(`storedJob_${user.id}`)) || []
  //   if(getSaveJob){
  //     setSaveJob(getSaveJob)
  //   }
  // },[])

      // useEffect(()=>{
        
      //   if(user){

      //     let getSaveJob = JSON.parse(
      //       localStorage.getItem(`storedJob_${user.id}`)
      //     ) || []

      //     setSaveJob(getSaveJob)
      //   }

      // },[user])

      // useEffect(()=>{
      //   fetch("https://remotive.com/api/remote-jobs")
      //   .then((response)=>{
      //     if(response.ok){
      //       return response.json()
      //     }
      //     else{
      //       throw new Error("Failed to fetch")
      //     }
      //   })
      //   .then((data)=>{
      //     setJobCount(data.jobs)     
      //     // console.log(data.jobs);
      //   })
      //   .catch((error)=>{
      //     setError(error.message)
      //   })
      //   .finally(()=>{
      //     setIsLoading(false)
      //   })
      // },[])    

  return (
    // <div className='dashboard'>

    //   <div >
    //     {error && <>{error}</>}
    //     {isLoading && <>Loading Count...</>}
    //   </div>
      
    //     <div className='dashUserName'>
    //       {user ?
    //         (<h3>{`Welcome ${user.name}`}</h3>  ) : (
    //           <h2>Hai....</h2>
    //         )
    //       }
    //     </div>

    //     <div className='dashJobCount'>
    //       {jobCount && <h5>{`Job Count : ${jobCount.length}`}</h5>}
    //     </div>

    //     <div>
    //       {saveJob && <h5>Saved Job : {saveJob.length}</h5>}
    //     </div>

    //     <div className='dashRecentJob'>
    //       <h5>{`Applied : ${recentJob.length}`}</h5>
    //       <h5>Recently Applied Jobs</h5>
    //       {
    //         recentJob.map((list,index)=>(
    //           <ul key={index}>
    //             <li>{list.role}</li>
    //             <li>{list.company}</li>
    //             <li>{list.appliedData}</li>
    //           </ul>
    //         ))
    //       }
    //     </div>
    <div className='navbar'>
        <div className='dashNavigate'>
          <Link to={"jobList"}>Job Apply</Link>
          <Link to={"jobs"}>Saved Jobs</Link>
          <Link to={"profile"}>Profile</Link>
          <Link to={"/dashboard"}>Dashboard</Link>
        </div>
        
        <div className="content">
          <Outlet/>
        </div>
    </div>
  )
}

export default Dashboard