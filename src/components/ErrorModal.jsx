import React from 'react'
import ReactDOM from 'react-dom'
import '../components/sass/modal.scss'
import AuthContext from '../context/AuthContext'
import { useContext } from 'react'

const BackDrop = () => {
   return <div className='backdrop' ></div>
}
const Modal = () => {
   const ctx = useContext(AuthContext)
   console.log(ctx);
   return (
      <div className='modal'>
         <div className="content">
            <h1>Please enter a valid email and password , thanks</h1>
            <p>You can log in with google and the likes if you want to?</p>
         </div>
         <div className="button">
            <button>Alright</button>
         </div>
      </div>
   )
}

const Module = (props) => {
   return (
      <React.Fragment>
         {ReactDOM.createPortal(<BackDrop />, document.getElementById('backdrop-root'))}
         {ReactDOM.createPortal(<Modal />, document.getElementById('modal-root'))}
      </React.Fragment>
   )
}

export default Module