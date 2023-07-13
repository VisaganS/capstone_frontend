
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import validator from 'validator';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import errorIcon from '../../assets/images/icons/error-24px.svg';
import './Login.scss';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [emailIsError, setEmailIsError] = useState(false);
    const [passwordIsError, setPasswordIsError] = useState(false);
    const [loginIsError, setLoginIsError] = useState(false);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let data = {
            email: email,
            password: password
        }

        const validate = () => {
            let counter = 0;

            if (validator.isEmpty(data.email) || !validator.isEmail(data.email)){
                setEmailIsError(true);
                counter++;
            } else {
                setEmailIsError(false);
            }

            if (validator.isEmpty(data.password)){
                setPasswordIsError(true);
                counter++;
            } else {
                setPasswordIsError(false);
            }

            return counter;
        }

        let errors = validate();

        if(errors === 0){
            axios.post('https://gym-junkie-backend-visagans.onrender.com/user/login', data)
            .then((response) => {
                sessionStorage.setItem("token", response.data);
                setLoginIsError(false);
                navigate('/');
            })
            .catch((err) => {
                console.log(err.response.status);
                if(err.response.status === 400){
                    setLoginIsError(true);
                }
            });
        }
    }

    return (<>
        <Header currentPage={"Login"}/>
        <div className="login">
            <div className="login__form-container">
                <div className="login__heading">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill={!loginIsError ? "black" : "red"} className="login__icon" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
                </div>
                <form className="login__form" onSubmit={handleSubmit}>
                    <div className="login__item">
                        <input onChange={handleEmailChange}type="email" id="inputs__email" name="email" placeholder="Email" />
                        <p className={emailIsError ? "form__showError": "form__hideError"}><img src={errorIcon} className="form__errorImage" alt="error-icon"/>Enter a valid username</p>
                    </div>
                    <div className="login__item">
                        <input onChange={handlePasswordChange}type="password" id="inputs__password" name="password" placeholder="Password" />
                        <p className={passwordIsError ? "form__showError": "form__hideError"}><img src={errorIcon} className="form__errorImage" alt="error-icon"/>Enter a valid password</p>
                    </div>
                    <button className="login__submit">LOGIN</button>
                </form>
                <div className="login__signup">
                    <p className="login__signup-text">Not registered?</p>
                    <Link to="/signup">Sign Up</Link>
                </div>
            </div>     
        </div>
        <Footer/>
    </>);
}

export default Login;
