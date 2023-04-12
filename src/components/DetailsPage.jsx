import React from 'react'
import NavBar from './NavBar'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { Firestore, auth } from '../Firebase/Firebase'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const DetailsPage = () => {
   const [authPage, setAuthPage] = useState([])

   const authCollectionList = collection(Firestore, "authDevChallenges")

   async function getAuthData() {
      try {
         const data = await getDocs(authCollectionList)
         const filteredData = data.docs.filter((doc) => doc.id === auth.currentUser.uid)
         setAuthPage(filteredData[0].data())

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
               <button><Link to='/edit'>Edit</Link></button>
            </div>
            <hr />
         </div>

         <div >
            <h1>{authPage.Name || 'NOT SET'}</h1>
            <h1>{authPage.BIO || 'NOT SET'}</h1>
            <h1>{authPage.IMG || 'NOT SET'}</h1>
            <h1>{authPage.EMAIL || 'NOT SET'}</h1>
         </div>

      </>
   )
}

export default DetailsPage