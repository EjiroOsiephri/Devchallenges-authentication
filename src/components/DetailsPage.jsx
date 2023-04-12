import React from 'react'
import NavBar from './NavBar'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { Firestore } from '../Firebase/Firebase'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const DetailsPage = () => {
   const [authPage, setAuthPage] = useState([])

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
         <div className="div">
            {
               authPage.map((movie, index) => {
                  console.log(movie);
                  return <div key={index}>
                     <h1>{movie.img}</h1>
                     <h1>{movie.Name}</h1>
                     <h1>{movie.Bio}</h1>
                     <h1>{movie.email}</h1>
                     <h1>{movie.phone}</h1>
                  </div>
               })
            }
         </div>
      </>
   )
}

export default DetailsPage