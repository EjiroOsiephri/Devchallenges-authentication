import React from 'react'
import Logo from "../components/images/devchallenges-light.svg"
import Styled from "../components/sass/Navbar.module.scss"
import AuthContext from '../context/AuthContext'
import { useContext } from 'react'
import { useState, useEffect } from 'react'
import { BsFillPersonFill, BsPersonBoundingBox } from "react-icons/bs";
import { IoIosArrowDown, IoIosArrowUp, IoIosLogOut } from "react-icons/io";

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


   return (
      <>
         <div className={Styled.navbar}>
            <img src={Logo} />
            <div className={Styled["about-me"]}>
               <BsFillPersonFill className={Styled.icon}></BsFillPersonFill>
               <h5>{username ? 'Enter your name' : `${ctx.userName}`}</h5>
               <IoIosArrowDown className={Styled.icon1}></IoIosArrowDown>
               <IoIosArrowUp className={Styled.icon2}></IoIosArrowUp>
            </div>
         </div>
         <div className={Styled.dropdown}>
            <div className={Styled["button-container"]}>
               <BsPersonBoundingBox></BsPersonBoundingBox>
               <h3>My Profile</h3>
            </div>
            <div className={Styled["button-container"]}>
               <BsPersonBoundingBox></BsPersonBoundingBox>
               <h3>Group chat</h3>
            </div>
            <hr />
            <div className={Styled["button-container"]}>
               <IoIosLogOut></IoIosLogOut>
               <h3>Logout</h3>
            </div>
         </div>
      </>
   )
}

export default NavBar