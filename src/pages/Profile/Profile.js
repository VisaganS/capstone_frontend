import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './Profile.scss'

const Profile = () => {
    const navigate = useNavigate();
    const [isLogin, setLogin] = useState(sessionStorage.token || null);
    const [userData, setUserData] = useState({});

    const handleLogOut = () => {
        sessionStorage.removeItem('token');
        navigate('/login');
    }

    useEffect(() => {
        axios.get('http://localhost:8080/user/profile', {
            headers: {Authorization: `Bearer ${isLogin}`}
        })
        .then((res) => {
            setUserData(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    return ( <>
        <Header/>
        <div className="profile">
            <div className="profile__container">
                <div className="profile__heading">
                    <Link to={`/`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" className="profile__return" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                        </svg>
                    </Link>
                    <h1 className="profile__title">Your Details</h1>
                </div>
                <div className="profile__details">
                    <div className="profile__item">
                        <p className="profile__subheading">Name: </p> 
                        <p className="profile__info">{userData.first_name}</p>
                    </div>
                    <div className="profile__item">
                        <p className="profile__subheading">Email: </p> 
                        <p className="profile__info">{userData.email}</p>
                    </div>
                </div>
                <button className="profile__signout" onClick={handleLogOut}>SIGN OUT</button>
            </div>     
        </div>
        <Footer/>
        </>
    );
}

export default Profile;
