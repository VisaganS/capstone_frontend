import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header";
import ExerciseList from "../../components/ExerciseList/ExerciseList";
import Footer from "../../components/Footer/Footer";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import './ProgramDetails.scss';

const ProgramDetails = ({ modalState, setModalState }) => {
    let { id } = useParams();
    const [modalId, setModalId] = useState(null);
    const [workout, setWorkout] = useState([]);
    const [itemToDelete, setItemToDelete] = useState(null);

    const modalHandler = (itemToDelete, id) => {
        setModalId(id);
        setItemToDelete(itemToDelete);
        setModalState(true);
    };

    useEffect(() => {
        axios
          .get(`http://localhost:8080/workouts/${id}`)
          .then((res) => {
            setWorkout(res.data);
          })
          .catch((err) => {});
      }, []);

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
                    <div className="programDetails__return">
                        <Link to="/programs">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" className="programDetails__return" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                            </svg>
                        </Link>
                    </div>
                    <p className="programDetails__type">{workout.type}</p>
                    <h2 className="programDetails__title">{workout.name}</h2>
                    <div className="programDetails__bottom">
                        <div className="programDetails__rating">
                            <p className="programDetails__likes">{workout.likes} likes</p>
                            <p className="programDetails__dash">|</p>
                            <p className="programDetails__comments">{workout.comments} comments</p>
                        </div>
                        <div className="programDetails__heart">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" className="programsDetails__icon" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                            </svg>
                        </div>
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