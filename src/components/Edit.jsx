import React from 'react'
import NavBar from './NavBar'
import { getDocs, collection, setDoc, doc } from "firebase/firestore"
import { useState, useEffect } from 'react'
import { Firestore, auth } from '../Firebase/Firebase'
import Styled from "../components/sass/EditPage.module.scss"
import person from "../components/images/download.png"
import { Link } from 'react-router-dom'

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
   }

   return (
      <>
         <Link to="/details">Go back</Link>
         <NavBar></NavBar>
         <div className={Styled["allContainer"]}>
            <div className={Styled["img"]}>
               <img className={Styled['person']} src={person} alt="" />
               <h4>Change Photo</h4>
            </div>
            <div className={Styled["text-container"]}>
               <h3>Profile</h3>
               <h6>Some info may be visible to other people</h6>
            </div>
            <div className={Styled['name']}>
               <label htmlFor="">NAME</label>
               <input type="text" onChange={(e) => {
                  setUpdatedTitle(e.target.value)
               }} />
            </div>
            <div className={Styled["bio"]}>
               <label htmlFor="">BIO</label>
               <input type="text" onChange={(e) => {
                  setUpdatedBio(e.target.value)
               }} />
            </div>
            <div className={Styled["phone"]}>
               <label htmlFor="">PHONE</label>
               <input type="text" onChange={(e) => {
                  setUpdatedPhone(e.target.value)
               }} />
            </div>
            <div className={Styled["email"]}>
               <label htmlFor="">EMAIL</label>
               <input type="text" onChange={(e) => {
                  setUpdatedEmail(e.target.value)
               }} />
            </div>
            <div className={Styled["password"]}>
               <label htmlFor="">PASSWORD</label>
               <input type="text" onChange={(e) => {
                  setUpdatedPassword(e.target.value)
               }} />
            </div>
            <button onClick={() => updateMovieTitle()}>Save</button>
         </div>
      </>

   )
}

export default Edit