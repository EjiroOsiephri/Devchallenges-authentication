import React from 'react'
import '../components/sass/signup.module.scss'
import Logo from "../components/images/devchallenges.svg"

const Signup = () => {
    return (
        <div className="container">
            <div className="img">
                <img src={Logo} alt="" />
                <h2>devchallenges</h2>
            </div>
            <div className="typography">
                <h3>Join thousands of learners from around the world </h3>
                <h4>Master web development by making real-life projects. There are multiple paths for you to choose</h4>
            </div>
            <div className="input-container">
                <input type="text" />
                <input type="password" />
            </div>
        </div>
    )
}

export default Signup