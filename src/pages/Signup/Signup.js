
import { useState } from "react";
import { Link } from "react-router-dom";
import validator from 'validator';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import errorIcon from '../../assets/images/icons/error-24px.svg';

import './Signup.scss';

const Signup = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const [usernameIsError, setUsernameIsError] = useState('');
    const [passwordIsError, setPasswordIsError] = useState('');
    return (<>
        <Header/>
        <div className="signup">
            <div className="signup__form-container">
                <div className="signup__heading">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="black" class="signup__icon" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
                </div>
                <form className="signup__form">
                    <div className="signup__item">
                        <input type="text" id="inputs__username" name="username" placeholder="Enter a username" />
                        <p className={usernameIsError ? "form__showError": "form__hideError"}><img src={errorIcon} className="form__errorImage" alt="error-icon"/>Enter a valid username</p>
                    </div>
                    <div className="signup__item">
                        <input type="password" id="inputs__password" name="password" placeholder="Enter a password" />
                        <p className={passwordIsError ? "form__showError": "form__hideError"}><img src={errorIcon} className="form__errorImage" alt="error-icon"/>Enter a valid password</p>
                    </div>
                    <button className="signup__submit">SIGN UP</button>
                </form>
                <div className="signup__login">
                    <p className="signup__login-text">Already registered?</p>
                    <Link to="/login">Login</Link>
                </div>
            </div>     
        </div>
        <Footer/>
    </>);
}

export default Signup;
