import React, { useState, useEffect } from 'react';
import Styled from '../components/sass/signup.module.scss';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../components/images/devchallenges.svg';
import googleImage from '../components/images/Google.svg';
import githubImage from '../components/images/Gihub.svg';
import facebookImage from '../components/images/Facebook.svg';
import twitterImage from '../components/images/Twitter.svg';
import {
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import { auth, googleProvider, githubProvider, facebookProvider } from '../Firebase/Firebase';

import { motion } from "framer-motion"
import Wrapper from '../components/Wrapper';

const Login = () => {
    // Setting states for firebase signup with email and password

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // disabling button state
    const [disableds, setDisabled] = useState(false);
    const [animate, setAnimate] = useState(false);

    const navigate = useNavigate()

    const emailChange = (e) => {
        setEmail(e.target.value);

    };

    const passwordChange = (e) => {
        setPassword(e.target.value);

    };

    const googleSignin = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/details')
        }
        catch (error) {
            console.log(error);
        }
    };
    // Signing with google
    const githubSignin = async () => {
        try {
            await signInWithPopup(auth, githubProvider);
            navigate('/details')
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
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        if (email.trim() === '' || password.trim() === '') {
            setDisabled(true);
        } else {
            setDisabled(false);
        }
    }, [email, password])
    // codes visible on the screen are returned below

    return (
        <Wrapper>
            <motion.div onClick={SignUp} animate={{ y: 20, scale: 1 }} transition={{ type: 'tween', duration: 0.4 }} initial={{ scale: 0 }} className={Styled.container}>
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
                        <button><Link to='/details' className={disableds ? Styled.pointer : `${Styled.button}`}>Start coding now</Link></button>
                    </div>
                    <div className={Styled.extraLoginDiv}>
                        <img src={googleImage} onClick={googleSignin} />
                        <img src={githubImage} onClick={githubSignin} />
                        <img src={facebookImage} onClick={facebookSignin} />
                        <img src={twitterImage} />
                    </div>
                    <div className="loginpage">
                        <p> Not a member?<Link to='/'>SignUp</Link></p>
                    </div>
                </div>
            </motion.div>
        </Wrapper>
    )
}

export default Login