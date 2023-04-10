import React, { useState, useEffect } from 'react'
import { Route, Routes } from "react-router-dom"
import AuthContext from './context/AuthContext'
import Login from './Routes/Login'
import Signup from './Routes/Signup'
import { auth } from './Firebase/Firebase'
import Module from './components/ErrorModal'
import NavBar from './components/NavBar'

function App() {
  const [currentUser, setCurrentUser] = useState()
  const [module, setModule] = useState(true)

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
    })

    return unSubscribe
  }, [])


  function displayModal() {
    setModule(null)
  }

  const value = {
    emailUser: currentUser?.email,
    button: displayModal,
    imgUrl: auth?.currentUser?.photoURL,
    userName: auth?.currentUser?.displayName
  }


  return (
    <>
      <AuthContext.Provider value={value}>
        {module && <Module></Module>}
        <Routes>
          <Route path='/signup' element={<Signup></Signup>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/navbar' element={<NavBar></NavBar>}></Route>
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
