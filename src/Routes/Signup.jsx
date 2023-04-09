import React from 'react'
import Styled from '../components/sass/signup.module.scss'
import Logo from "../components/images/devchallenges.svg"
import googleImage from "../components/images/Google.svg"
import githubImage from "../components/images/Gihub.svg"
import facebookImage from "../components/images/Facebook.svg"
import twitterImage from "../components/images/Twitter.svg"

const Signup = () => {
    return (
        <div className={Styled.container}>
            <div className={Styled.subContainer}>
                <div className={Styled.img}>
                    <img src={Logo} alt="" />
                </div>
                <div className={Styled.typography}>
                    <h3>Join thousands of learners from around the world </h3>
                    <h4>Master web development by making real-life projects. There are multiple paths for you to choose</h4>
                </div>
                <div className="input-container">
                    <input type="text" />
                    <input type="password" />
                </div>
                <div className="button">
                    <button>Start coding now</button>
                </div>
                <p>or continue with these social profile</p>
                <div className={Styled.extraLoginDiv}>
                    <img src={googleImage} alt="" />
                    <img src={githubImage} alt="" />
                    <img src={facebookImage} alt="" />
                    <img src={twitterImage} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Signup