import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

const Signup_Page = () => {
    
  let navigate = useNavigate()
  
  let [signUpData, setSignUpData] = useState({
    currentId : Date.now() ,
    name: "",
    email: "",
    password: "",
    cPassword: "",
  });


//   let [showData , setShowData] = useState([])

  let [errorMsg , setErrorMsg] = useState("")


  let handleSignup = (event) => {

    event.preventDefault()

    if(signUpData.name == "" || signUpData.email == "" || signUpData.password =="" || signUpData.cPassword == ""){
        setErrorMsg("All Field Must Be Field!")
        return
    }

    if(signUpData.password !== signUpData.cPassword){
      setErrorMsg("Password NOt Match")
      return 
    }
    
    let newValue = {...signUpData}

    let storeData = JSON.parse(localStorage.getItem("signData")) || []
    
    let emailExit = storeData.some((listt)=>(
      listt.email === signUpData.email
    ))

    if(emailExit){
      setErrorMsg("Email alredy exists")
      return
    }

    let existingData = [...storeData , newValue] 

    localStorage.setItem("signData" , JSON.stringify(existingData))
    
    // setShowData([...showData , signUpData])
    
    setSignUpData({
      name: "",
      email: "",
      password: "",
      cPassword: "",
    });
    setErrorMsg("")
    navigate("/")

} 

  return (
    <div className="signUp">
      <div>
        <h2>SignUp Page!</h2>
      </div>
      <div className="signUpForm">
        <form action="" onSubmit={handleSignup}>
          <div className="signUp-form-group">
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              name="name"
              value={signUpData.name}
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>

          <div className="signUp-form-group">
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              name="email"
              value={signUpData.email}
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>

          <div className="signUp-form-group">
            <TextField
              type="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              name="password"
              value={signUpData.password}
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>

          <div className="signUp-form-group">
            <TextField
              type="password"
              id="outlined-basic"
              label="Confirm Password"
              variant="outlined"
              name="cPassword"
              value={signUpData.cPassword}
              onChange={(e) =>
                setSignUpData({
                  ...signUpData,
                  [e.target.name]: e.target.value,
                })
              }
            />
          </div>

          <div className="signUp-form-group">
            <Button variant="contained" type="submit" className="signButton">
              Sign up
            </Button>
          </div>

        </form>
        
        <div className="signNavigate">
          <p>You Have All Ready Account Please<Button size="small" onClick={()=>{navigate("/")}}>Login</Button></p>
        </div>

        <div className="signErrorMsg">
          <p>{errorMsg ? errorMsg : ""}</p>
        </div>

      </div>

      {/* {
        showData.map((list,index)=>(
            <ul key={index}>
                <li>{list.name}</li>
                <li>{list.email}</li>
                <li>{list.password}</li>
                <li>{list.cPassword}</li>
            </ul>
        ))
      } */}

    </div>
  );
};

export default Signup_Page;
