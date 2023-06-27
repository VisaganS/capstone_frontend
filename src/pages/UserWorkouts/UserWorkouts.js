import { useEffect ,useState } from 'react';
import axios from 'axios';
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
    return (
        <div>
            
        </div>
    );
}

export default UserWorkouts;
