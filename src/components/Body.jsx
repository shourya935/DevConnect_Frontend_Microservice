import React from 'react'

import { Outlet } from 'react-router-dom'
import NavBar from "./Navbar"
import Footer from './Footer'
function Body() {
  return (
    <>
    <NavBar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default Body