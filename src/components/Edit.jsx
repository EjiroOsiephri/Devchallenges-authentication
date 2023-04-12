import React from 'react'
import NavBar from './NavBar'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc, setDoc } from "firebase/firestore"
import { useState, useEffect } from 'react'
import { Firestore, auth } from '../Firebase/Firebase'

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