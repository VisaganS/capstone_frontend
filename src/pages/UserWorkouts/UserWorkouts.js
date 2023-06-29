import { useEffect ,useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import './UserWorkouts.scss';

const UserWorkouts = ({ modalState, setModalState }) => {
    const [isLogin, setLogin] = useState(sessionStorage.token || null);
    const [userId, setUserId] = useState(null);

    const [itemToDelete, setItemToDelete] = useState(null);
    const [modalId, setModalId] = useState(null);
    const [workoutList, setWorkoutList] = useState([]);

    const modalHandler = (itemToDelete, id) => {
        setModalId(id);
        setItemToDelete(itemToDelete);
        setModalState(true);
      };

      useEffect(() => {
        const fetchData = async () => {
          try {
            const profileResponse = await axios.get('http://localhost:8080/user/profile', {
              headers: { Authorization: `Bearer ${isLogin}` },
            });
            setUserId(profileResponse.data.id);
      
            const likedWorkoutsResponse = await axios.get(`http://localhost:8080/likes/${profileResponse.data.id}`);
            setWorkoutList(likedWorkoutsResponse.data);
           
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);
    
    const loginRequired = () => {
        return(<>
            <Header currentPage="Your Workouts"/>
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
        <DeleteModal
        id={modalId}
        itemToDelete={itemToDelete}
        bin={"workouts"}
        modalState={modalState}
        setModalState={setModalState}
        />
        <Header currentPage="Your Workouts"/>
        <div className="likedPrograms">
            <div className="likedPrograms__heading">Your Workouts</div>
            <div className="likedPrograms__list">
                {workoutList.map((workout) =>{
                    return (
                        <div className="likedPrograms__workout" key={workout.id} style={{ backgroundImage: `url(${workout.image})` }}>
                            <Link to={`/programs/${workout.id}`}><div className="likedPrograms-workout__overlay"></div></Link>
                            <div className="likedPrograms-workout__content">
                                <Link to={`/programs/${workout.id}`} className="likedPrograms__link">
                                    <p className="likedPrograms-workout__type">{workout.type}</p>
                                    <h2 className="likedPrograms-workout__heading">{workout.name}</h2>
                                    <div className="likedPrograms-workout__rating">
                                        <p className="likedPrograms-workout__likes">{workout.likes} likes</p>
                                        <p className="likedPrograms-workout__dash">|</p>
                                        <p className="likedPrograms-workout__comments">{workout.comments} comments</p>
                                    </div>
                                </Link>
                                <div className="likedPrograms-workout__buttons">
                                    <div className="likedPrograms-workout__edit">
                                        <Link to={`/programs/edit/${workout.id}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="likedPrograms-workout__icon" viewBox="0 0 16 16">
                                                <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                            </svg>
                                        </Link>
                                    </div>
                                    <div className="likedPrograms-workout__delete" onClick={() => modalHandler(workout.name, workout.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="likedPrograms-workout__icon" viewBox="0 0 16 16">
                                            <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                                        </svg>  
                                    </div>
                                </div>
                            </div>      
                        </div>
                    );
                })}
            </div>
            <Link to="/programs/add" className="likedPrograms__add">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" className="add__icon" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                </svg>
                <h3 className="add__text">Create Custom Workout</h3>
            </Link>
        </div> 
        <Footer/>
    </>)
}

export default UserWorkouts;
