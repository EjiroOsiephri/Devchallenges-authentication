import React from 'react'
import NavBar from './NavBar'
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { Firestore, auth } from '../Firebase/Firebase'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Styled from "../components/sass/DetailsPage.module.scss"
import { BsFillPersonFill, BsPersonBoundingBox } from "react-icons/bs";


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
         <div className={Styled.all}>
            <div className={Styled["typography"]}>
               <h1>Personal info</h1>
               <h6>Basic info, like your name and photo</h6>
            </div>
            <div className={Styled["addDoc-container"]}>
               <div className={Styled["navigate-container"]}>
                  <div className={Styled["text-container"]}>
                     <h3>Profile</h3>
                     <h6>Some info may be visible to other people</h6>
                  </div>
                  <button><Link to='/edit'>Edit</Link></button>
               </div>
               <hr />
               <div className={Styled['set-pages']}>
                  <div className={Styled["img"]}>
                     <h1>PHOTO</h1>
                     <BsFillPersonFill className={Styled.personFill}></BsFillPersonFill>
                  </div>
                  <hr />
                  <div className={Styled["name"]}>
                     <h4>NAME</h4>
                     <h1>{authPage.Name || 'NOT SET'}</h1>
                  </div>
                  <hr />
                  <div className={Styled["bio"]}>
                     <h4>BIO</h4>
                     <h1>{authPage.BIO || 'NOT SET'}</h1>
                  </div>
                  <hr />
                  <div className={Styled["email"]}>
                     <h4>EMAIL</h4>
                     <h1>{auth?.currentUser?.email || 'NOT SET'}</h1>
                  </div>
                  <hr />
                  <div className={Styled["password"]}>
                     <h4>PASSWORD</h4>
                     <h1>{authPage.phone || 'NOT SET'}</h1>
                  </div>
                  <hr />
               </div>
            </div>
         </div>
      </>
   )
}

export default DetailsPage