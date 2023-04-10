import React, { useState, useEffect } from 'react';
import Styled from '../components/sass/signup.module.scss';
import { Link } from 'react-router-dom';
import Logo from '../components/images/devchallenges.svg';
import {
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth';
import { auth } from '../Firebase/Firebase';
import { motion } from "framer-motion"
import Wrapper from '../components/Wrapper';

const Login = () => {
    // Setting states for firebase signup with email and password

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // disabling button state
    const [disabled, setDisabled] = useState(false);
    const [animate, setAnimate] = useState(false);


    const emailChange = (e) => {
        setEmail(e.target.value);
    };

    const passwordChange = (e) => {
        setPassword(e.target.value);
        if (password.trim() < 1) {
            setDisabled(true)
        }
    };

    // Sign up button
    const SignUp = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);

        } catch (error) {
            alert(error);
        }
    };

    // codes visible on the screen are returned below

    return (
        <Wrapper>
            <motion.div onClick={SignUp} animate={{ y: 20, scale: 1 }} transition={{ type: 'tween', duration: 1.4 }} initial={{ scale: 0 }} className={Styled.container}>
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
                        <button>Start coding now</button>
                    </div>
                    <div className="loginpage">
                        <p> Not a member?<Link to='/signup'>SignUp</Link></p>
                    </div>
                </div>
            </motion.div>
        </Wrapper>
    )
}

export default Login