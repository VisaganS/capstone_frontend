
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import validator from 'validator';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import errorIcon from '../../assets/images/icons/error-24px.svg';
import './Signup.scss';

const Signup = () => {
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const [firstNameIsError, setFirstNameIsError] = useState(false);
    const [lastNameIsError, setLastNameIsError] = useState(false);
    const [emailIsError, setEmailIsError] = useState(false);
    const [passwordIsError, setPasswordIsError] = useState(false);

    const handleFirstNameChange = (event) => {
        event.preventDefault();
        setFirstName(event.target.value);
    }

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    }

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let data = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
        }

        const validate = () => {
            let counter = 0;

            if (validator.isEmpty(data.first_name)){
                setFirstNameIsError(true);
                counter++;
            } else {
                setFirstNameIsError(false);
            }

            if (validator.isEmpty(data.last_name)){
                setLastNameIsError(true);
                counter++;
            } else {
                setLastNameIsError(false);
            }

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
            axios.post('http://localhost:8080/user/signup', data)
            .then((response) => {
                navigate('/login');
            })
            .catch((err) => {
                console.log(err);
            });
        }
    }

    return (<>
        <Header/>
        <div className="signup">
            <div className="signup__form-container">
                <div className="signup__heading">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="black" className="signup__icon" viewBox="0 0 16 16">
                    <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                    <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>
                </div>
                <form className="signup__form" onSubmit={handleSubmit}>
                    <div className="signup__item">
                        <input onChange={handleFirstNameChange} type="text" id="inputs__firstName" name="firstName" placeholder="First name" />
                        <p className={firstNameIsError ? "form__showError": "form__hideError"}><img src={errorIcon} className="form__errorImage" alt="error-icon"/>Enter a valid first name</p>
                    </div>
                    <div className="signup__item">
                        <input onChange={handleLastNameChange} type="text" id="inputs__lastName" name="lastName" placeholder="Last name" />
                        <p className={lastNameIsError ? "form__showError": "form__hideError"}><img src={errorIcon} className="form__errorImage" alt="error-icon"/>Enter a valid last name</p>
                    </div>
                    <div className="signup__item">
                        <input onChange={handleEmailChange} type="email" id="inputs__email" name="email" placeholder="Enter an email" />
                        <p className={emailIsError ? "form__showError": "form__hideError"}><img src={errorIcon} className="form__errorImage" alt="error-icon"/>Enter a valid email</p>
                    </div>
                    <div className="signup__item">
                        <input onChange={handlePasswordChange} type="password" id="inputs__password" name="password" placeholder="Enter a password" />
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
