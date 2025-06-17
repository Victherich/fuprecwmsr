
import React, { useContext, useState } from 'react'
// import AdminDashborad from './AdminDashborad'
// import Outlet from "react-router-dom"
import { Navigate,Outlet } from 'react-router-dom'
import { Context } from './Context'
import { useSelector } from 'react-redux'


const PrivateLecturerDashboard = () => {
   
   const lecturerToken = useSelector(state=>state.lecturerToken)
    
  return (
   lecturerToken?<Outlet/>:<Navigate to="/lecturerlogin"/>
  )
}

export default PrivateLecturerDashboard
