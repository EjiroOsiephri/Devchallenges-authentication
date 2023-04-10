import React from 'react'
import Logo from "../components/images/devchallenges-light.svg"
import Styled from "../components/sass/Navbar.module.scss"
import AuthContext from '../context/AuthContext'
import { useContext } from 'react'

const NavBar = () => {
   const ctx = useContext(AuthContext)
   console.log(ctx);
   return (
      <div className={Styled.navbar}>
         <img src={Logo} />
         <h1>{ctx.userName}</h1>
      </div>
   )
}

export default NavBar