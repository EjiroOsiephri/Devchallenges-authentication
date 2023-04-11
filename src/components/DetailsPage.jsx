import React from 'react'
import NavBar from './NavBar'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { Firestore } from '../Firebase/Firebase'
import { useState, useEffect } from 'react'

const DetailsPage = () => {
   const [authPage, setAuthPage] = useState([])

   const authCollectionList = collection(Firestore, "authDevChallenges")

   async function getAuthData() {
      try {
         const data = await getDocs(authCollectionList)
         console.log(data);
      } catch (error) {
         console.log(error);
      }
   }

   useEffect(() => {
      getAuthData()
   }, [])

   return (
      <>
         <NavBar></NavBar>
         <div className="typography">
            <h1>Personal info</h1>
            <h6>Basic info, like your name and photo</h6>
         </div>
         <div className="addDoc-container">
            <div className="navigate-container">
               <div className="text-container">
                  <h3>Profile</h3>
                  <h6>Some info may be visible to other people</h6>
               </div>
               <button>Edit</button>
            </div>
            <hr />
         </div>
      </>
   )
}

export default DetailsPage