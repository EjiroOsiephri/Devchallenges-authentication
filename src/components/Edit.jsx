import React from 'react'
import NavBar from './NavBar'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { useState, useEffect } from 'react'
import { Firestore } from '../Firebase/Firebase'

const Edit = () => {
   const [authPage, setAuthPage] = useState([])
   const [updateTitle, setUpdatedTitle] = useState('')
   const [updateBio, setUpdatedBio] = useState('')


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

   const updateMovieTitle = async (id) => {
      const movieDoc = doc(Firestore, "authDevChallenges", id)
      await updateDoc(movieDoc, {
         Name: updateTitle,
         Bio: updateBio,
      })
      getAuthData()
   }

   return (
      <>
         <NavBar></NavBar>

         <div>Edit</div>
         {authPage.map((movie, index) => {
            return <div key={index}>
               <input type="text" onChange={(e) => {
                  setUpdatedTitle(e.target.value)
               }} />
               <input type="text" onChange={(e) => {
                  setUpdatedBio(e.target.value)
               }} />
               <button onClick={() => updateMovieTitle(movie.id)}>Update movie title</button>
            </div>
         })}
      </>

   )
}

export default Edit