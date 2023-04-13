import React from 'react'
import ReactDOM from 'react-dom'
import Styled from '../components/sass/modal.module.scss'
import AuthContext from '../context/AuthContext'
import { useContext } from 'react'
import { motion } from "framer-motion"

const BackDrop = () => {
   const ctx = useContext(AuthContext)
   return <div className={Styled.backdrop} onClick={ctx.button} ></div>
}
const Modal = () => {
   const ctx = useContext(AuthContext)

   return (
      <motion.div animate={{ y: 20, scale: 1 }} transition={{ type: 'tween', duration: 1.4 }} initial={{ scale: 0 }} className={Styled.modal}>
         <div className={Styled.content}>
            <h1>Please enter a valid email and password , thanks. , also password must be greater than six</h1>
            <p>You can log in with google and the likes if you want to?</p>
         </div>
         <div className={Styled.button} onClick={ctx.button}>
            <button>Alright</button>
         </div>
      </motion.div>
   )
}

const Module = () => {
   return (
      <React.Fragment>
         {ReactDOM.createPortal(<BackDrop />, document.getElementById('backdrop-root'))}
         {ReactDOM.createPortal(<Modal />, document.getElementById('modal-root'))}
      </React.Fragment>
   )
}

export default Module