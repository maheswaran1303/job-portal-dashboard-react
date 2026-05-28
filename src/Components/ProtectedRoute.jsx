import React, {useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserDetailsContext } from '../App'

const ProtectedRoute = ({children}) => {

    let {user} = useContext(UserDetailsContext)

    // let storedUser = JSON.parse(localStorage.getItem("data"))

    if(!user){
        return <Navigate to="/" />
    }

  return children
}

export default ProtectedRoute