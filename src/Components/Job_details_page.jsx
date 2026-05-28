import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import { UserDetailsContext } from '../App';
import { useContext } from 'react';

const Job_details_page = () => {

  // let {id} = useParams()

  let location = useLocation()

  let job = location.state

  let navigate = useNavigate()

  const cleanDescription = job.description.replace(/<img[^>]*>/g,"");

  let [isDisabled , setIsDisabled] = useState(false)

  let [storageJob , setStorageJob] = useState([])

  let {user , setUser} = useContext(UserDetailsContext)

  // let handleSave = () =>{

  //    let values = {
  //     id : job.id ,
  //     title : job.title , 
  //     company : job.company , 
  //     location : job.location , 
  //     salary : job.salary , 
  //     type : job.type , 
  //     description : job.description
  //   }

  //   let newValues = [...storageJob , values]

  //   localStorage.setItem("storedJob" , JSON.stringify(newValues))

  //   setIsDisabled(true)

  //   toast.success("Job Saved Successfully ✅");
  // }
  
   let handleSave = () =>{

     let values = {
      id : job.id ,
      title : job.title , 
      company : job.company , 
      location : job.location , 
      salary : job.salary , 
      type : job.type , 
      description : job.description
    }

    let newValues = [...storageJob , values]

    localStorage.setItem(`storedJob_${user.id}` , JSON.stringify(newValues))

    setIsDisabled(true)

    toast.success("Job Saved Successfully ✅");
  }

  useEffect(()=>{
    if(user){
      let savedJob = JSON.parse(localStorage.getItem(`storedJob_${user.id}`)) || []
      setStorageJob(savedJob)
      
      let isSaved = savedJob.some((list)=>(
        list.id === job.id
      ))
  
      setIsDisabled(isSaved)
    }

  },[job.id , user])
  
  return (
    <div className='jobDetails'>
      <div>
        <p className='title'>{`Role: ${job.title}`}</p>
        <p className='company'>{`Company : ${job.company}`}</p>
        {/* <img src="job.companyLogo" alt="" /> */}
        <p>{`Location : ${job.location}`}</p>
        <p>{`Salary : ${job.salary}`}</p>
        <p>{`Type : ${job.type}`}</p>
        <p>Descripyion : </p> 
        <p dangerouslySetInnerHTML={{ __html: cleanDescription}}></p>
        <Button variant="contained" type="submit" onClick={()=>{navigate('/dashboard/jobList')}} size="small">Back</Button>
        <Button variant="contained" type="submit" onClick={()=>{navigate(`/jobApply/${job.title}/${job.company}`)}} size="small">Aplly JOb</Button>
        <Button variant="contained" type="submit" onClick={handleSave} disabled={isDisabled} size="small">{isDisabled ? "Saved" : "Save Job"}</Button>
      </div>
    </div>
  )
}

export default Job_details_page