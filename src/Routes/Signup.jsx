import React, { useState, useEffect } from 'react';
import Styled from '../components/sass/signup.module.scss';
import { Link } from 'react-router-dom';
import Logo from '../components/images/devchallenges.svg';
import googleImage from '../components/images/Google.svg';
import githubImage from '../components/images/Gihub.svg';
import facebookImage from '../components/images/Facebook.svg';
import twitterImage from '../components/images/Twitter.svg';
import {
    createUserWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import { auth, googleProvider, githubProvider, facebookProvider } from '../Firebase/Firebase';
import { motion } from "framer-motion"
import Wrapper from '../components/Wrapper';

const Signup = () => {
    // Setting states for firebase signup with email and password

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // disabling button state
    const [disabled, setDisabled] = useState(true);
    const [animate, setAnimate] = useState(false);


    const emailChange = (e) => {
        setEmail(e.target.value);
        if (e.target.value.trim() === '' || password.trim() === '') {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    };

    const passwordChange = (e) => {
        setPassword(e.target.value);
        if (email.trim() === '' || e.target.value.trim() === '') {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    };

    // Signing with google
    const googleSignin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (error) {
            console.log(error);
        }
    };
    // Signing with google
    const githubSignin = async () => {
        try {
            await signInWithPopup(auth, githubProvider);
        } catch (error) {
            console.log(error);
        }
    };

    //Sign in for facebook
    const facebookSignin = async () => {
        try {
            await signInWithPopup(auth, facebookProvider);
        } catch (error) {
            console.log(error);
        }
    };

    // Sign up button
    const SignUp = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);

        } catch (error) {
            console.log(error);
        }
    };

    // codes visible on the screen are returned below

    return (
        <Wrapper>
            <motion.form onClick={SignUp} animate={{ y: 20, scale: 1 }} transition={{ type: 'tween', duration: 1.4 }} initial={{ scale: 0 }} className={Styled.container}>
                <div className={Styled.subContainer}>
                    <div className={Styled.img}>
                        <img src={Logo} alt="" />
                    </div>
                    <div className={Styled.typography}>
                        <h3>Join thousands of learners from around the world </h3>
                        <h4>Master web development by making real-life projects. There are multiple paths for you to choose</h4>
                    </div>
                    <div className="input-container">
                        <input type="text" placeholder='Email' onChange={emailChange} />
                        <input type="password" placeholder='Password' onChange={passwordChange} />
                    </div>
                    <div className="button">
                        <button disabled={disabled}><Link disabled={disabled} to='/details'>Start coding now</Link></button>
                    </div>
                    <p>or continue with these social profile</p>
                    <div className={Styled.extraLoginDiv}>
                        <img src={googleImage} onClick={googleSignin} />
                        <img src={githubImage} onClick={githubSignin} />
                        <img src={facebookImage} onClick={facebookSignin} />
                        <img src={twitterImage} />
                    </div>
                    <div className="loginpage">
                        <p>Already a member?<Link to='/login'>Login</Link></p>
                    </div>
                </div>
            </motion.form>
        </Wrapper>
    )
}

export default Signup