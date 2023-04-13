import React from 'react';
import Logo from "../components/images/devchallenges-light.svg"
import Styled from "../components/sass/Navbar.module.scss"
import AuthContext from '../context/AuthContext'
import { useContext } from 'react'
import { useState, useEffect } from 'react'
import { BsFillPersonFill, BsPersonBoundingBox } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp, IoIosLogOut } from "react-icons/io";
import { auth } from "../Firebase/Firebase"
import { signOut, deleteUser } from 'firebase/auth'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';
import { getDocs, collection } from "firebase/firestore"
import { Firestore } from '../Firebase/Firebase'

const NavBar = () => {
   const ctx = useContext(AuthContext)
   const [username, setUsername] = useState(false)

   useEffect(() => {
      if (ctx.userName === null) {
         setUsername(true)
      } else {
         setUsername(false)
      }


   }, [])

   const [navbar, setShowNavBar] = useState(false)

   const showNav = () => {
      setShowNavBar(true);
   }
   const hideNav = () => {
      setShowNavBar(false);
   }

   const [authPage, setAuthPage] = useState([])
   console.log(authPage);

   const [deleteModal, showDeleteModal] = useState(false)

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

   function deleteContainer() {
      showDeleteModal(true)
   }

   function okayFunc() {
      showDeleteModal(false)
   }
   const history = useNavigate();

   function goToSignUp() {
      history('/');
   }
   const SignoutPage = async () => {
      try {
         await signOut(auth)
      } catch (error) {
         console.error(error)
      }
      showDeleteModal(false)
   }

   useEffect(() => {
      getAuthData()
   }, [])

   function deleteUsers() {
      try {
         deleteUser(auth.currentUser)
         history('/')
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <>
         <div className={Styled.navbar}>
            <img src={Logo} />
            <div className={Styled["about-me"]}>
               <BsFillPersonFill className={Styled.icon}></BsFillPersonFill>
               <h5>{username ? 'Enter your name' : `${ctx.userName}`}</h5>
               {!navbar && <IoIosArrowDown className={Styled.icon1} onClick={showNav}></IoIosArrowDown>}
               {navbar && <IoIosArrowUp className={Styled.icon2} onClick={hideNav}></IoIosArrowUp>}
            </div>
         </div>
         {navbar && <motion.div animate={{ y: 20, scale: 1 }} transition={{ type: 'tween', duration: 1 }} initial={{ scale: 0 }} className={Styled.dropdown}>
            <div className={Styled["button-container"]}>
               <BsPersonBoundingBox></BsPersonBoundingBox>
               <h3>My Profile</h3>
            </div>
            <div className={Styled["button-second-container"]}>
               <BsPersonBoundingBox></BsPersonBoundingBox>
               <h3>Group chat</h3>
            </div>
            <hr />
            <div onClick={deleteContainer} className={Styled["button-end-container"]}>
               <IoIosLogOut></IoIosLogOut>
               <h3>Logout</h3>
            </div>
         </motion.div>}
         {deleteModal && <motion.div animate={{ scale: 1 }} transition={{ type: 'tween', duration: 0.8 }} initial={{ scale: 0 }} className={Styled.dropdowns}>
            <h1>Are you sure you want to delete this account, you'd have to sign up again🤔</h1>
            <div className={Styled["button-delete-container"]}>
               <button onClick={okayFunc}>Go back</button>
               <button onClick={() => { deleteContainer(); goToSignUp(); SignoutPage() }} className={Styled.warn}>SignOut</button>
               <button onClick={() => { deleteUsers() }} className={Styled.red}>Delete Account</button>
            </div>
         </motion.div>}
      </>
   )
}

export default NavBar