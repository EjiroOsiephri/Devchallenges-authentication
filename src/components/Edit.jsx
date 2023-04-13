import React from 'react'
import NavBar from './NavBar'
import { getDocs, collection, setDoc, doc } from "firebase/firestore"
import { useState, useEffect } from 'react'
import { Firestore, auth, storage } from '../Firebase/Firebase'
import Styled from "../components/sass/EditPage.module.scss"
import person from "../components/images/download.png"
import { Link } from 'react-router-dom'
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const Edit = () => {
   const [authPage, setAuthPage] = useState([])
   const [updateTitle, setUpdatedTitle] = useState('')
   const [updateBio, setUpdatedBio] = useState('')
   const [updatePhone, setUpdatedPhone] = useState('')
   const [updateEmail, setUpdatedEmail] = useState('')
   const [updatePassword, setUpdatedPassword] = useState('')


   const authCollectionList = collection(Firestore, "authDevChallenges")

   async function getAuthData() {
      try {
         const data = await getDocs(authCollectionList)
         const filteredData = data.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id
         }))
         setAuthPage(filteredData)
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      getAuthData()
   }, [])

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
      fileAdd()

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
   console.log(fileUpload);

   const ctx = useContext(AuthContext)
   console.log(ctx);

   return (
      <>
         <NavBar></NavBar>
         <Link state={image} to="/details">Go back</Link>
         <div className={Styled["allContainer"]}>
            <div className={Styled["img"]}>
               <img className={Styled['person']} src={image || person} alt="" />
               <label htmlFor='fileUpload' style={{ width: '50%' }}>Add img</label>
            </div>
            <input type="file" id='fileUpload' onChange={(e) => {
               setFileUpload(e.target.files[0])
            }} />
            <div className={Styled["text-container"]}>
               <h3>Profile</h3>
               <h6>Some info may be visible to other people</h6>
            </div>
            <div className={Styled['name']}>
               <label htmlFor="">NAME</label>
               <input className={Styled.inputs} type="text" onChange={(e) => {
                  setUpdatedTitle(e.target.value)
               }} />
            </div>
            <div className={Styled["bio"]}>
               <label htmlFor="">BIO</label>
               <input className={Styled.inputs} type="text" onChange={(e) => {
                  setUpdatedBio(e.target.value)
               }} />
            </div>
            <div className={Styled["phone"]}>
               <label htmlFor="">PHONE</label>
               <input className={Styled.inputs} type="text" onChange={(e) => {
                  setUpdatedPhone(e.target.value)
               }} />
            </div>
            <div className={Styled["email"]}>
               <label htmlFor="">EMAIL</label>
               <input className={Styled.inputs} type="text" onChange={(e) => {
                  setUpdatedEmail(e.target.value)
               }} />
            </div>
            <div className={Styled["password"]}>
               <label htmlFor="">PASSWORD</label>
               <input className={Styled.inputs} type="text" onChange={(e) => {
                  setUpdatedPassword(e.target.value)
               }} />
            </div>
            <button className={Styled.button} onClick={() => updateMovieTitle()}>Save</button>
         </div>
      </>

   )
}

export default Edit