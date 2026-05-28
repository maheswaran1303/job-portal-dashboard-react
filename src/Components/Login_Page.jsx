import React, { useContext, useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { UserDetailsContext } from "../App";
import toast from "react-hot-toast";

const Login_Page = () => {
  let navigate = useNavigate();

  let {user , setUser} = useContext(UserDetailsContext)

  let [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  let [storeData, setStoreData] = useState([]);

  let handleLogin = (event) => {
    event.preventDefault();

    let filterData = storeData.find((list)=>(
      loginData.email.trim() === list.email.trim() && loginData.password.trim() === list.password.trim()
    ))   

    if(filterData){
      toast.success('Successfully Login!')
      setLoginData({
          email : "" , 
          password : ""
      })
      let loggedUser = {
        id : filterData.currentId ,
        name : filterData.name , 
        email : filterData.email ,
      }
      setUser(loggedUser)
      localStorage.setItem("data" , JSON.stringify(loggedUser))
      navigate('/dashboard')
    }
    else{
      alert("Must be sign up");
    }   
  };

  useEffect(() => {
    let data = localStorage.getItem("signData");
    if (data) {
      setStoreData(JSON.parse(data));
    }
  }, []);

  return (
    <div className="loginPage">
      <div>
        <h2>Login Page</h2>
      </div>
      <div className="loginPageForm">
        <form action="" onSubmit={handleLogin}>
          <div>
            <TextField
              id="outlined-basic"
              label="Email"
              variant="outlined"
              name="email"
              value={loginData.email}
              onChange={(e) =>
                setLoginData({ ...loginData, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div>
            <TextField
              type="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
              name="password"
              value={loginData.password}
              onChange={(e) =>
                setLoginData({ ...loginData, [e.target.name]: e.target.value })
              }
            />
          </div>

          <div>
            <Button variant="contained" type="submit" className="loginButton">
              Login
            </Button>
          </div>
        </form>
        <p>Don't have account ?<Button size="small" className="navigateButton" onClick={()=>{navigate("/signup")}}>Signup</Button></p>
      </div>
    </div>
  );
};

export default Login_Page;

