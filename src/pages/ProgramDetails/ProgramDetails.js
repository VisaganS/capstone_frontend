import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header";
import ExerciseList from "../../components/ExerciseList/ExerciseList";
import Footer from "../../components/Footer/Footer";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import './ProgramDetails.scss';

const ProgramDetails = ({ modalState, setModalState }) => {
    let { id } = useParams();
    let navigate = useNavigate();
    const [modalId, setModalId] = useState(null);
    const [workout, setWorkout] = useState([]);
    const [itemToDelete, setItemToDelete] = useState(null);

    const [isLogin, setLogin] = useState(sessionStorage.token || null);
    const [isLiked, setIsLiked] = useState(false);
    const [userId, setUserId] = useState({});

    const modalHandler = (itemToDelete, id) => {
        setModalId(id);
        setItemToDelete(itemToDelete);
        setModalState(true);
    };

    const handleReturn = () => {
        navigate(-1);
    }
    const handleLike = () => {
        if(isLiked === false){
            let data = {
                user_id: userId,
                workout_id: id
            }
            axios
            .post("http://localhost:8080/likes/", data)
            .then((res) => {
                setIsLiked(true);
            })
            .catch((err) => {
                console.log(err);
            })
        } else if(isLiked === true) {
            axios
            .delete(`http://localhost:8080/likes/${id}/${userId}`)
            .then((res) => {
                console.log(res.data);
                setIsLiked(false);
            })
            .catch((err) => {
                console.log(err);
            })
        }
    }

    const renderHeart = () => {
        return(
            <div className="programDetails__like" onClick={handleLike}>
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill={isLiked ? "pink":"white"} className="programsDetails__icon" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                </svg>
            </div>
        )
    }

    const renderLock = () => {
        return(
            <Link to="/login">
                <div className="programDetails__like">
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" class="programDetails__icon" viewBox="0 0 16 16">
                        <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"/>
                    </svg>
                </div>
            </Link>
        )
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const workoutResponse = await axios.get(`http://localhost:8080/workouts/${id}`);
            setWorkout(workoutResponse.data);
      
            const profileResponse = await axios.get('http://localhost:8080/user/profile', {
              headers: { Authorization: `Bearer ${isLogin}` },
            });
            setUserId(profileResponse.data.id);
      
            const likesResponse = await axios.get(`http://localhost:8080/likes/${id}/${profileResponse.data.id}`);
            console.log(likesResponse.data);
            if(likesResponse.data){
                setIsLiked(true);
            } else {
                setIsLiked(false);
            }
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, [id, isLogin]);

    return (<>
        <DeleteModal
        id={modalId}
        itemToDelete={itemToDelete}
        bin={"exercises"}
        modalState={modalState}
        setModalState={setModalState}
        />

        <Header/>
        <div className="programDetails">
            <div className="programDetails__heading" style={{ backgroundImage: `url(${workout.image})` }}>
                <div className="programDetails__overlay"></div>
                <div className="programDetails__content">
                    <div className="programDetails__return" onClick={handleReturn}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" className="programDetails__return" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                            </svg>
                    </div>
                    <p className="programDetails__type">{workout.type}</p>
                    <h2 className="programDetails__title">{workout.name}</h2>
                    <div className="programDetails__bottom">
                        <div className="programDetails__rating">
                            <p className="programDetails__likes">{workout.likes} likes</p>
                            <p className="programDetails__dash">|</p>
                            <p className="programDetails__comments">{workout.comments} comments</p>
                        </div>
                        {isLogin === null ? renderLock() : renderHeart()}
                    </div>
                </div>    
            </div>
            <ExerciseList
            workoutId={id}
            modalState={modalState}
            setModalState={setModalState}
            modalHandler={modalHandler}
            />
        </div>
        <Footer/>
    </>);
}

export default ProgramDetails;