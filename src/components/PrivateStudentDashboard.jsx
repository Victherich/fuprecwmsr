
import React, { useContext, useState } from 'react'
import studentDashborad from './StudentDashboard'
// import Outlet from "react-router-dom"
import { Navigate,Outlet } from 'react-router-dom'
import { Context } from './Context'
import { useSelector } from 'react-redux'

const PrivateStudentDashboard = () => {
   
   const studentToken = useSelector(state=>state.studentToken)
    
  return (
   studentToken?<Outlet/>:<Navigate to="/studentlogin"/>
  )
}

export default PrivateStudentDashboard
