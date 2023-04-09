import React, { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import AuthContext from './context/AuthContext'

function App() {


  return (
    <>
      <AuthContext.Provider>
        <Routes>
          <Route></Route>
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
