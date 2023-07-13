import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import './ExerciseDetails.scss';

const ExerciseDetails = () => {
    const { id } = useParams();
    const [ exercise, setExercise] = useState({});

    useEffect(() => {
        axios
          .get(`https://gym-junkie-backend-visagans.onrender.com/exercises/${id}`)
          .then((res) => {
            setExercise(res.data);
          })
          .catch((err) => {});
      }, []);

    return (<>
        <Header/>
        <div className="exerciseDetails">
            <div className="exerciseDetails__title">
                <div className="exerciseDetails__title-content">
                    <Link to={`/programs/${exercise.workout_id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" className="editPrograms__return" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                        </svg>
                    </Link>
                    <div className="exerciseDetails__title-text">{exercise.name}</div>
                </div>
                <div className="exerciseDetails__edit">
                    <Link to={`/exercises/edit/${exercise.id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" className="exerciseDetails__icon" viewBox="0 0 16 16">
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                        </svg>
                    </Link>
                </div> 
            </div>
            <div className="exerciseDetails__list">
                <div className="exerciseDetails__item"> 
                    <div className="exerciseDetails__header">Muscle</div>
                    <div className="exerciseDetails__content">{exercise.muscle}</div>
                </div>
                <div className="exerciseDetails__item"> 
                    <div className="exerciseDetails__header">Equipment</div>
                    <div className="exerciseDetails__content">{exercise.equipment}</div>
                </div>
                <div className="exerciseDetails__item"> 
                    <div className="exerciseDetails__header">Difficulty</div>
                    <div className="exerciseDetails__content">{exercise.difficulty}</div>
                </div>
                <div className="exerciseDetails__item exerciseDetails__item--instructions"> 
                    <div className="exerciseDetails__header exerciseDetails__header--instructions">Instructions</div>
                    <div className="exerciseDetails__content exerciseDetails__content--instructions">{exercise.instructions}</div>
                </div>
            </div>
        </div>
        <Footer/>
        </>
    );
}

export default ExerciseDetails;
