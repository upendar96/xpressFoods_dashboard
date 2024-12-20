import React from 'react'
import LandingPage from './vendorDashboard/pages/LandingPage'
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import "./App.css"
import NavBar from './vendorDashboard/components/NavBar'
import Login from './vendorDashboard/components/forms/Login'
import NotFound from './vendorDashboard/components/NotFound'
import AddDine from './vendorDashboard/components/forms/DineOut'
import AddLate from './vendorDashboard/components/forms/Late'

const App = () => {
  return (
    <div>
      <Router>
      <Routes>
          <Route path='/' element = {<LandingPage />}/>
          <Route path='/*' element = {<NotFound />} />
          <Route path='/dine' element = {<AddDine />} />
          <Route path='/late' element = {<AddLate/>} />
      </Routes>
      </Router>
    </div>
  )
}

export default App