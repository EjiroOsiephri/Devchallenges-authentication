import React, { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import AuthContext from './context/AuthContext'
import Login from './Routes/Login'
import Signup from './Routes/Signup'

function App() {
  const value = {

  }

  return (
    <>
      <AuthContext.Provider value={value}>
        <Routes>
          <Route path='/' element={<Signup></Signup>}></Route>
          <Route></Route>
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
