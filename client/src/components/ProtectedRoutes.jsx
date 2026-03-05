import React from 'react'
import {Navigate} from 'react-router-dom'

const ProtectedRoutes = ({children}) => {
  const token= localStorage.getItem('token')
    //if not logged in then navigate back to lgin page
  if(!token) return <Navigate to='/'/>

  return children
}

export default ProtectedRoutes
