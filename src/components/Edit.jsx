import React from 'react'
import NavBar from './NavBar'
import { getDocs, collection, setDoc } from "firebase/firestore"
import { useState, useEffect } from 'react'
import { Firestore, auth } from '../Firebase/Firebase'
import Styled from "../components/sass/EditPage.module.scss"

const Edit = () => {
   const [authPage, setAuthPage] = useState([])
   const [updateTitle, setUpdatedTitle] = useState('')
   const [updateBio, setUpdatedBio] = useState('')
   const [updateIMG, setUpdatedIMG] = useState('')


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
         Bio: updateBio,
         IMG: updateIMG
      })
      getAuthData()
   }

   return (
      <>
         <NavBar></NavBar>
         <div className={Styled["text-container"]}>
            <h3>Profile</h3>
            <h6>Some info may be visible to other people</h6>
         </div>
         <div>
            <input type="text" onChange={(e) => {
               setUpdatedTitle(e.target.value)
            }} />
            <input type="text" onChange={(e) => {
               setUpdatedBio(e.target.value)
            }} />
            <input type="text" onChange={(e) => {
               setUpdatedIMG(e.target.value)
            }} />
            <button onClick={() => updateMovieTitle()}>Update movie title</button>
         </div>
      </>

   )
}

export default Edit