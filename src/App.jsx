import React, { useState, useEffect } from 'react'
import { Route, Routes } from "react-router-dom"
import AuthContext from './context/AuthContext'
import Login from './Routes/Login'
import Signup from './Routes/Signup'
import { Firestore, auth, storage } from './Firebase/Firebase'
import Module from './components/ErrorModal'
import DetailsPage from './components/DetailsPage'
import Edit from './components/Edit'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

function App() {
  const [currentUser, setCurrentUser] = useState()
  const [module, setModule] = useState(true)

  const updateMovieTitle = async () => {
    const movieDoc = doc(Firestore, "authDevChallenges", auth.currentUser.uid)
    await setDoc(movieDoc, {
      Name: updateTitle,
      BIO: updateBio,
      phone: updatePhone,
      EMAIL: updateEmail,
      password: updatePassword
    })
    getAuthData()
  }
  const [fileUpload, setFileUpload] = useState(null)
  const [image, setImage] = useState(null)

  async function fileAdd() {
    if (!fileUpload) {
      return
    }
    const fileUploadRef = ref(storage, `img/${fileUpload.name}`)
    console.log(fileUploadRef);
    try {
      await uploadBytes(fileUploadRef, fileUpload).then(() => {
        getDownloadURL(fileUploadRef).then((url) => {
          setImage(url)
        })
      })
      setFileUpload(null)
    } catch (error) {
      console.log(error);
    }
  }

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
    userName: auth?.currentUser?.displayName,
    img: image
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
