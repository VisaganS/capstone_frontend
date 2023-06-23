import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import './Programs.scss';


const Programs = ( {modalState, setModalState }) => {

    const [itemToDelete, setItemToDelete] = useState(null);
    const [modalId, setModalId] = useState(null);
    const [workoutList, setWorkoutList] = useState([]);

    const modalHandler = (itemToDelete, id) => {
        setModalId(id);
        setItemToDelete(itemToDelete);
        setModalState(true);
      };

    useEffect(()=>{
        axios
        .get("http://localhost:8080/workouts")
        .then((res) => {
        setWorkoutList(res.data);
        })
        .catch((err) => {});
    },[])

    return <>
    <DeleteModal
        id={modalId}
        itemToDelete={itemToDelete}
        bin={"workout"}
        modalState={modalState}
        setModalState={setModalState}
      />
    <Header/>
    <div className="programs">
        <div className="programs__heading">Programs</div>
        <div className="programs__list">
            {workoutList.map((workout) =>{
                return (
                    <div className="programs__workout" style={{ backgroundImage: `url(${workout.image})` }}>
                        <div className="programs-workout__overlay"></div>
                        <div className="programs-workout__content">
                            <p className="programs-workout__type">{workout.type}</p>
                            <h2 className="programs-workout__heading">{workout.name}</h2>
                            <div className="programs-workout__rating">
                                <p className="programs-workout__likes">{workout.likes} likes</p>
                                <p className="programs-workout__dash">|</p>
                                <p className="programs-workout__comments">{workout.comments} comments</p>
                            </div>
                            <div className="programs-workout__buttons">
                                <div className="programs-workout__edit">
                                    <Link to={`/programs/edit/${workout.id}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="programs-workout__icon" viewBox="0 0 16 16">
                                        <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                                        </svg>
                                    </Link>
                                </div>
                                <div className="programs-workout__delete" onClick={() => modalHandler(workout.name, workout.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" className="programs-workout__icon" viewBox="0 0 16 16">
                                    <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                                    </svg>  
                                </div>
                            </div>
                        </div>      
                    </div>
                );
            })}
        </div>
    </div>
    <Footer/>
    </>
}

export default Programs;