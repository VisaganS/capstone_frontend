import { useEffect ,useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './UserWorkouts.scss';

const UserWorkouts = () => {
    const [isLogin, setLogin] = useState(sessionStorage.token || null);

    useEffect(() => {
        axios.get('http://localhost:8080/user/profile', {
            headers: {Authorization: `Bearer ${isLogin}`}
        })
        .then((res) => {
            setLogin(res.data);
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    const loginRequired = () => {
        return(<>
            <Header/>
            <div className="loginRequired">
            <div className="loginRequired__image">
                <svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" fill="gray" className="loginRequired__icon" viewBox="0 0 16 16">
                    <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2zM2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                </svg>
            </div>
            <h1 className= "loginRequired__text">You need to be <Link to="/login">logged in</Link> to access this feature.</h1> 
            </div>
            <Footer/>
        </>)
    }

    if (isLogin == null) return loginRequired();

    return (<>
    </>);
}

export default UserWorkouts;
