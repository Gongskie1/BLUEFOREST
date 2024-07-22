import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'

const AdminDashboard = () => {
  return (
    <>
          <Navbar />
          <Outlet/>
    </>
    
  )
}

export default AdminDashboard