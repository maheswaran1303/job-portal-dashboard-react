import React, { useContext, useEffect, useState } from 'react'
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import { UserDetailsContext } from '../App';

const Saved_Jobs_Page = () => {

  let [saveJob , setSaveJob] = useState([])

  let {user , setUser} = useContext(UserDetailsContext)

  useEffect(()=>{
    if(user){
      let job = JSON.parse(localStorage.getItem(`storedJob_${user.id}`)) || []
        setSaveJob(job)
        console.log(user.id);
    }   
  },[user])

  let handleRemove = (currentJob) =>{

    let storedJob = JSON.parse(localStorage.getItem(`storedJob_${user.id}`)) || []

    let updateJob = storedJob.filter((list)=>(
      list.id !== currentJob
    ))

    localStorage.setItem(`storedJob_${user.id}` , JSON.stringify(updateJob)) 

    setSaveJob(updateJob)

  }

  return (
    <div className='savedJobs'>
      <div>
        {
          saveJob.map((list)=>(
            <ul key={list.id}>
              <li className='title'>{`Title : ${list.title}`}</li>
              <li className='company'>{`Company : ${list.company}`}</li>
              <li>{`Salary : ${list.salary}`}</li>
              <li>{`Type : ${list.type}`}</li>
              <li dangerouslySetInnerHTML={{ __html: list.description.replace(/<img[^>]*>/g,"")}}></li>
              <Button variant="contained" type="submit" onClick={() => handleRemove(list.id)} size="small">Remove Job</Button>
            </ul>
          ))
        }
      </div>
    </div>
  )
}

export default Saved_Jobs_Page