import React, { useState, useEffect } from 'react'
import { Route, Routes } from "react-router-dom"
import AuthContext from './context/AuthContext'
import Login from './Routes/Login'
import Signup from './Routes/Signup'
import { auth } from './Firebase/Firebase'

function App() {
  const [currentUser, setCurrentUser] = useState()

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })

    return unSubscribe
  }, [])

  const value = {
    emailUser: currentUser?.email
  }

  return (
    <>
      <AuthContext.Provider value={value}>
        <Routes>
          <Route path='/' element={<Signup></Signup>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
