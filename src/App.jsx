import React, { useState, useEffect } from 'react'
import { Route, Routes } from "react-router-dom"
import AuthContext from './context/AuthContext'
import Login from './Routes/Login'
import Signup from './Routes/Signup'
import { auth } from './Firebase/Firebase'
import Module from './components/ErrorModal'
import NavBar from './components/NavBar'
import DetailsPage from './components/DetailsPage'
import Edit from './components/Edit'

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

  console.log(auth);
  return (
    <>
      <AuthContext.Provider value={value}>
        {module && <Module></Module>}
        <Routes>
          <Route path='/' element={<Signup></Signup>}></Route>
          <Route path='/login' element={<Login></Login>}></Route>
          <Route path='/details' element={<DetailsPage></DetailsPage>}></Route>
          <Route path='/edit' element={<Edit></Edit>}></Route>
        </Routes>
      </AuthContext.Provider>
    </>
  )
}

export default App
