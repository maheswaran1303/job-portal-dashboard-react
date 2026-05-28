import React, { useEffect, useState } from 'react'
import { UserDetailsContext } from '../App'
import { useContext } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import Button from "@mui/material/Button";
import { useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

const Profile_Page = () => {

  let navigate = useNavigate()

  let {user , setUser} = useContext(UserDetailsContext)

  let [userInfo , setUserInfo] = useState([])

  let [applyJob , setApplyJob] = useState([])

  let [saveJob , setSaveJob] = useState([])

  useEffect(()=>{
    if(user){
      let getProfileData = JSON.parse(localStorage.getItem(`profileData_${user.id}`))
      setUserInfo(getProfileData)
    }
  },[user])

  let handleEdit = () =>{
    navigate("/editProfile")
    // console.log(userInfo);
  }

  let handleAdd = () =>{
    navigate("/editProfile")
  }

  useEffect(()=>{
    if(user){
      let jobStore = JSON.parse(localStorage.getItem(`storedJob_${user.id}`)) || []
      setSaveJob(jobStore)
    }
  },[user])

  useEffect(()=>{
    if(user){
      let jobDatas = JSON.parse(localStorage.getItem(`jobData_${user.id}`)) || []
      setApplyJob(jobDatas)
    }
  },[user])

  let handleLogout = () =>{
    localStorage.removeItem("data")
    setUser(null)
  }

  return (
    <div className='profilePage'>
      <div className='userInfoCard'>
        <h4>User Info Card</h4>
        {user && <p>{`Name : ${user.name}`}</p>}
        {user && <p>{`Email : ${user.email}`}</p>}
        {
          !userInfo ? (
            <div>
              <h5>Add Your Other Details</h5>
              <Button variant="contained" type="submit" onClick={handleAdd} size="small"><AddIcon /></Button> 
            </div>
          ) : (
            <div>
              {userInfo && <p>{`Collage Name : ${userInfo.collageName}`}</p>}
              {userInfo && <p>{`Phone Number : ${userInfo.phone}`}</p>}
              {userInfo && <p>{`Location : ${userInfo.location}`}</p>}
              {userInfo && <p>{`Skills : ${userInfo.skills}`}</p>}
            </div>
          )
        }
      </div>

      <div>
        <h4>Stats Cards</h4>
        {/* {saveJob && <h5>{saveJob.length}</h5>} */}
        <h5>{saveJob ? `Save Job : ${saveJob.length}` : "0"}</h5>
        <h5>{applyJob ? `Apply Job : ${applyJob.length}` : "0"}</h5>
        <h5>Applied Job List </h5><br/>
        {
          applyJob.map((list,index)=>(
            <ul key={index}>
              <li>{`Company : ${list.company}`}</li>
              <li>{`Role : ${list.role}`}</li>
              <li>{`Apply Date : ${list.appliedData}`}</li>
            </ul>
          ))
        }
      </div>

      <div className='editProfile'>
        <Button variant="contained" type="submit" onClick={handleEdit} size="small"><EditIcon/></Button>
        <h5>Edit Profile</h5><br />
        <Button variant="contained" type="submit" onClick={handleLogout} size="small"><LogoutIcon/></Button>
        <h5>Logout</h5>
      </div>
      
    </div>
  )
}

export default Profile_Page