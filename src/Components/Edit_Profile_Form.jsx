import React, { useContext, useEffect, useState } from 'react'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from 'react-router-dom';
import { UserDetailsContext } from '../App';

const Edit_Profile_Form = () => {

    let navigate = useNavigate()

    let [editProfileData , setEditProfileData] = useState({
        collageName : "" ,
        phone : "" , 
        location : "" , 
        skills : ""
    })

    let {user , setUser} = useContext(UserDetailsContext)

    let handleProfileData = (e) =>{
        e.preventDefault()
        let values = editProfileData
        localStorage.setItem(`profileData_${user.id}` , JSON.stringify(values))
        setEditProfileData({
            collageName : "" ,
            phone : "" , 
            location : "" , 
            skills : ""    
        })
        navigate("/dashboard/profile")
    }

    useEffect(()=>{
        if(user){
            let storeData = JSON.parse(localStorage.getItem(`profileData_${user.id}`)) 
            if(storeData){
                setEditProfileData(storeData)
            }
        }
    },[user])


  return (
    <div className='profileForm'>
        <div>
            <form action="" onSubmit={handleProfileData}>
                <TextField
                    id="outlined-basic"
                    label="Collage Name"
                    variant="outlined"
                    name="collageName"
                    value={editProfileData.collageName}
                    onChange={(e) =>
                    setEditProfileData({ ...editProfileData, [e.target.name]: e.target.value })
                    }
                />
                <TextField
                id="outlined-basic"
                label="Phone Number"
                variant="outlined"
                name="phone"
                value={editProfileData.phone}
                onChange={(e) =>
                    setEditProfileData({ ...editProfileData, [e.target.name]: e.target.value })
                }
                />
                <TextField
                id="outlined-basic"
                label="Location"
                variant="outlined"
                name="location"
                value={editProfileData.location}
                onChange={(e) =>
                    setEditProfileData({ ...editProfileData, [e.target.name]: e.target.value })
                }
                />
                <TextField
                id="outlined-basic"
                label="Skills"
                variant="outlined"
                name="skills"
                value={editProfileData.skills}
                onChange={(e) =>
                    setEditProfileData({ ...editProfileData, [e.target.name]: e.target.value })
                }
                />
                <Button variant="contained" type="submit">Save</Button>
            </form>
        </div>
    </div>
  )
}

export default Edit_Profile_Form