import React, { useEffect, useState } from "react";
import { chennaiJobs } from "../Data/chennaiJobs";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom" 
import toast from "react-hot-toast";
import { UserDetailsContext } from "../App";
import { useContext } from "react";

const Job_List_Page = () => {

  let [jobs, setJobs] = useState([]);

  let [error, setError] = useState("");

  let [isLoading, setIsLoading] = useState(true);

  let [searchInput, setSearchInput] = useState("");

  let [filterData, setFilterData] = useState([]);

  let [filterSection, setFilterSection] = useState({
    location: "",
    jobType: "",
  });

  let navigate = useNavigate()

  let {user , setUser} = useContext(UserDetailsContext)

  // useEffect(()=>{
  //   setJobs(chennaiJobs)
  // },[])

  useEffect(() => {
    fetch("https://remotive.com/api/remote-jobs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Fail to fetch");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        let abiJobs = data.jobs.map((job) => ({
          id: job.id,
          title: job.title,
          company: job.company_name,
          campanyLogo: job.company_logo,
          location: job.candidate_required_location,
          salary: job.salary,
          type: job.job_type,
          description : job.description
        }));

        setJobs([...chennaiJobs, ...abiJobs]);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    let filtered = jobs.filter((list) => {
      let search =
        list.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        list.company.toLowerCase().includes(searchInput.toLowerCase());
      let locationMatch = list.location
        .toLowerCase()
        .includes(filterSection.location.toLowerCase());
      let jobMatch = list.type
        .toLowerCase()
        .includes(filterSection.jobType.toLowerCase());
      return search && locationMatch && jobMatch;
    });
    setFilterData(filtered);
  }, [searchInput, jobs, filterSection]);

  // let handleSaveJob = (job) =>{
  //   let jobs = job

  //   let existingJobs = JSON.parse(localStorage.getItem("storedJob")) || []

  //   let updatedJobs = [...existingJobs , job]
    
  //   localStorage.setItem("storedJob" , JSON.stringify(updatedJobs))

  //   toast.success("Job Saved Successfully ✅");
  // }

  let handleSaveJob = (job) =>{
    let jobs = job

    let existingJobs = JSON.parse(localStorage.getItem(`storedJob_${user.id}`)) || []

    let updatedJobs = [...existingJobs , job]

    let exists = existingJobs.some((list)=>(
      list.id === job.id
    ))

    if(exists){
      toast.error("Alredy Saved")
      return
    }
    
    localStorage.setItem(`storedJob_${user.id}` , JSON.stringify(updatedJobs))

    toast.success("Job Saved Successfully ✅");

  }

  let handleJobDetails = (list) =>{
    navigate(`/jobDetails/${list.id}` , {
      state : list
    })
  }



  return (
    <div className="jobList">
      <h3>Job List</h3>

      <div className="jobListSearch">
        <TextField
          id="outlined-basic"
          label="Search"
          variant="outlined"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <p>{filterData.length === 0 && "No Jobs Your Search"}</p>

      <div className="jobListFilters">

        <div>
          <InputLabel id="demo-simple-select-label">Location</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterSection.location}
            name="location"
            onChange={(e) =>
              setFilterSection({
                ...filterSection,
                [e.target.name]: e.target.value,
              })
            }
          >
            <MenuItem value={"chennai"}>Chennai</MenuItem>
            <MenuItem value={"USA"}>USA</MenuItem>
            <MenuItem value={"America"}>America</MenuItem>
          </Select>
        </div>

        <div>
          <InputLabel id="demo-simple-select-label">Job Type</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={filterSection.jobType} 
            name="jobType"
            onChange={(e) =>
              setFilterSection({
                ...filterSection,
                [e.target.name]: e.target.value,
              })
            }
          >
            <MenuItem value={"Part_Time"}>Part Time</MenuItem>
            <MenuItem value={"Full_Time"}>Full Time</MenuItem>
            <MenuItem value={"freelance"}>Freelance</MenuItem>
            <MenuItem value={"Internship"}>Internship</MenuItem>
          </Select>
        </div>

      </div>

      <div>
        {isLoading && <p>{"Job Loading..."}</p>}
        {error && <p>{error}</p>}
      </div>

      <div className="jobListRender">
        {filterData.map((list) => (
          <ul key={list.id}>
            <li>{`Role : ${list.title}`}</li>
            <li>{`Company : ${list.company}`}</li>
            {/* <li><img src={list.campanyLogo} alt={list.company}  width="120"  onError={(e) => {e.target.src = "/default-company.png";}}/></li> */}
            <li>{`Location 📍 : ${list.location}`}</li>
            <li>{`Salary 💰 : ${list.salary || "Not disclosed"}`}</li>
            <li>{`Type 🕒 : ${list.type}`}</li>
            {/* <li dangerouslySetInnerHTML={{ __html: list.description}}></li> */}
            {/* <Button variant="contained" type="submit" onClick={()=>{handleJobDetails(list.id)}} size="small">Job Details</Button> */}
            <Button variant="contained" type="submit" onClick={()=>{handleJobDetails(list)}} size="small">Job Details</Button>
            <Button variant="contained" type="submit" onClick={()=>{handleSaveJob(list)}} size="small"><BookmarkBorderIcon/></Button>
          </ul>
        ))}
      </div>
      {/* <p>{user.id}</p> */}
    </div>
  );
};

export default Job_List_Page;

// https://remotive.com/api/remote-jobs
