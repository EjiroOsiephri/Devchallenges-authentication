import React from 'react'
import Logo from "../components/images/devchallenges-light.svg"
import Styled from "../components/sass/Navbar.module.scss"
import AuthContext from '../context/AuthContext'
import { useContext } from 'react'
import { useState, useEffect } from 'react'
import { BsFillPersonFill, BsPersonBoundingBox } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp, IoIosLogOut } from "react-icons/io";
import { auth } from "../Firebase/Firebase"
import { signOut } from 'firebase/auth'
import { motion } from "framer-motion"
import { useNavigate } from 'react-router-dom';
import { getDocs, collection, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore"

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

   const [deleteModal, showDeleteModal] = useState(false)

   async function deleteContainer() {
      try {
         showDeleteModal(true)
         const updateMovieTitle = async (id) => {
            const movieDoc = doc(Firestore, "authDevChallenges", id)
            await deleteDoc(movieDoc)
         }
      } catch (error) {
         console.log(error);
      }
   }

   const Signout = async () => {
      try {
         await signOut(auth)
      } catch (error) {
         console.error(error)
      }
      showDeleteModal(false)
   }
   function okayFunc() {
      showDeleteModal(false)
   }
   const history = useNavigate();

   function goToSignUp() {
      history('/');
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
               <button onClick={() => { deleteContainer(); goToSignUp(); }} className={Styled.red}>Delete Account</button>
            </div>
         </motion.div>}
      </>
   )
}

export default NavBar