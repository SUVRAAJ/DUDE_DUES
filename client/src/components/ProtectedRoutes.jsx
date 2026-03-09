import React from 'react'
import {Navigate} from 'react-router-dom'
//we take an element and that can only be visied if jwt tpken is assigned to it
const ProtectedRoutes = ({children}) => {
  const token= localStorage.getItem('token')
    //if not logged in then navigate back to lgin page
  if(!token) return <Navigate to='/'/>

  return children
}

export default ProtectedRoutes
