import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header";
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
                    <p className="programDetails__type">{workout.type}</p>
                    <h2 className="programDetails__title">{workout.name}</h2>
                    <div className="programDetails__bottom">
                        <div className="programDetails__rating">
                            <p className="programDetails__likes">{workout.likes} likes</p>
                            <p className="programDetails__dash">|</p>
                            <p className="programDetails__comments">{workout.comments} comments</p>
                        </div>
                        <div className="programDetails__heart">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" class="programsDetails__icon" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                            </svg>
                        </div>
                    </div>
                </div>    
            </div>
            {/* <ExerciseList/> */}
        </div>
        <Footer/>
    </>);
}

export default ProgramDetails;