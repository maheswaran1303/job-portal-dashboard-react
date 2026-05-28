import './App.css'
import {BrowserRouter as Router , Routes , Route , Link} from 'react-router-dom'
import Login_Page from './Components/Login_Page'
import Signup_Page from './Components/Signup_Page'
import Dashboard from './Components/Dashboard'
import Saved_Jobs_Page from './Components/Saved_Jobs_Page'
import Profile_Page from './Components/Profile_Page'
import Job_List_Page from './Components/Job_List_Page'
import Job_details_page from './Components/Job_details_page'
import Job_Apply_Form from './Components/Job_Apply_Form'
import { createContext, useState } from 'react'
import { Toaster } from "react-hot-toast";
import Edit_Profile_Form from './Components/Edit_Profile_Form'
import { useEffect } from 'react'
import DashboardHome from './Components/DashboardHome'
import ProtectedRoute from './Components/ProtectedRoute'

export let UserDetailsContext = createContext()

function App() {

  let [user , setUser] = useState(JSON.parse(localStorage.getItem("data")) || null)

  //  useEffect(()=>{
  //     let getUserDetails = JSON.parse(localStorage.getItem("data"))
  //     if(getUserDetails){
  //       setUser(getUserDetails)
  //     }
  //   },[])

  return (
    <>
    
    <UserDetailsContext.Provider value={{user , setUser}}>
      <Router>
        {/* <Link to={"/"} style={{marginRight :"10px"}}>Login</Link>
        <Link to={"/signup"} style={{marginRight :"10px"}}>Sign Up</Link>
        <Link to={"/dashboard"} style={{marginRight :"10px"}}>Dashboard</Link>
        <Link to={"/jobList"} style={{marginRight :"10px"}}>Job List</Link>
        <Link to={"/jobs"} style={{marginRight :"10px"}}>Saved_Jobs_Page</Link> */}
        {/* <Link to={'/jobDetails'} style={{marginRight :"10px"}} >Job Details</Link> */}
        {/* <Link to={"/profile"} style={{marginRight :"10px"}}>Profile</Link>
        <Link to={"/jobApply"} style={{marginRight :"10px"}}>Job_Apply_Form</Link>
        <Link to={"/editProfile"} style={{marginRight :"10px"}}>Edit_Profile</Link> */}
        <Routes>
          <Route path='/' element={<Login_Page/>} />
          <Route path='/signup' element={<Signup_Page/>} />
          <Route path='/dashboard' element={ <ProtectedRoute><Dashboard/></ProtectedRoute>}>
          <Route index element={<DashboardHome/>} />
            <Route path='jobList' element={<Job_List_Page/>}/>
            <Route path='jobs' element={<Saved_Jobs_Page/>} />
            <Route path='profile' element={<Profile_Page/>} />
          </Route>
          <Route path='/jobDetails/:id' element={<Job_details_page/>} />
          <Route path='/jobApply/:role/:company' element={<Job_Apply_Form/>}/>
          <Route path='/editProfile' element={<Edit_Profile_Form/>} />
        </Routes>
      </Router>
    </UserDetailsContext.Provider>
    <Toaster/>
    </>
  )
}

export default App
