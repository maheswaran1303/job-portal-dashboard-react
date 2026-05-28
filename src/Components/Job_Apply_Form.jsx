import React, { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import toast from "react-hot-toast";

import { UserDetailsContext } from '../App';

let schema = yup.object().shape({
  name: yup.string().required("Must be fill name"),

  email: yup.string().required("Email must be fill").matches(/^[a-z0-9]+@[a-z]{2,5}\.[a-z]{2,4}$/ , "Invalid Email"),   

  phone: yup.string().required("Phone Number must be fill").matches(/^[0-9]+$/ , "Phone Number only numbers ") ,

  batch: yup.string().required("Batch must be fill"),

  course: yup.string().required("Must be fill"),

  resume: yup.mixed().required("Resume required")
  .test(
    "fileType",
    "Only PDF allowed",
    (value) => {
      return value && value[0]?.type === "application/pdf"
    })
});

const Job_Apply_Form = () => {

    let {role , company} = useParams()

    let {user , setUser} = useContext(UserDetailsContext)

    let navigate = useNavigate()

  let {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset
  } = useForm({ resolver: yupResolver(schema) });


  // let dataHandle = (data) => {
  //   toast.success("Job Applied Successfully ✅");

  //   let appliedJobs = JSON.parse(localStorage.getItem("jobData")) || [] 

  //   let newJob = {
  //       role : role , 
  //       company : company , 
  //       appliedData : new Date().toLocaleDateString()
  //   }

  //   let addData = [...appliedJobs ,newJob] 

  //   localStorage.setItem("jobData" , JSON.stringify(addData))
   
  //   console.log(data);
    
  //   reset()
  // };

   let dataHandle = (data) => {
    toast.success("Job Applied Successfully ✅");

    let appliedJobs = JSON.parse(localStorage.getItem(`jobData_${user.id}`)) || [] 

    let newJob = {
        role : role , 
        company : company , 
        appliedData : new Date().toLocaleDateString()
    }

    let addData = [...appliedJobs ,newJob] 

    localStorage.setItem(`jobData_${user.id}` , JSON.stringify(addData))
   
    console.log(data);
    
    reset()
  };

  return (
    <div className="jobApplyForm">
      <div>
        <form action="" onSubmit={handleSubmit(dataHandle)}>
          <div>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              {...register("name")}
            />
            <p>{errors.name?.message}</p>
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Email"
              defaultValue={user ? user.email : ""}
              variant="outlined"
              {...register("email")}
            />
            <p>{errors.email?.message}</p>
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Phone Number"
              variant="outlined"
              {...register("phone")}
            />
            <p>{errors.phone?.message}</p>
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="Job Role"
              defaultValue={role}
              variant="outlined"
              {...register("role")}
            />
            <p>{errors.role?.message}</p>
          </div>
          <div>
            <InputLabel id="demo-simple-select-label">Batch</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              control={control}
              defaultValue=""
              {...register("batch")}
            >
              <MenuItem value={"2024"}>2024</MenuItem>
              <MenuItem value={"2025"}>2025</MenuItem>
              <MenuItem value={"2026"}>2026</MenuItem>
            </Select>
            <p>{errors.batch?.message}</p>
          </div>
          <div>
            <InputLabel id="demo-simple-select-label">Course</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              control={control}
              defaultValue=""
              {...register("course")}
            >
              <MenuItem value="MCA">MCA</MenuItem>
              <MenuItem value={"MSC"}>MSC</MenuItem>
              <MenuItem value={"BE"}>BE</MenuItem>
              <MenuItem value={"B.TECH"}>B.TECH</MenuItem>
              <MenuItem value={"BSC"}>BSC</MenuItem>
              <MenuItem value={"BCA"}>BCA</MenuItem>
            </Select>
            <p>{errors.course?.message}</p>
          </div>
          <div>
            <InputLabel id="demo-simple-select-label">Resume</InputLabel>
            <input type="file" {...register("resume")} />
            <p>{errors.resume?.message}</p>
          </div>
          <div>
            <Button variant="contained" type="submit">
              Apply
            </Button>
            <Button variant="contained" type="submit" onClick={()=>navigate('/dashboard/jobList')}>
              Back
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Job_Apply_Form;
