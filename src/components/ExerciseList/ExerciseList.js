import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ExerciseItem from "../ExerciseItem/ExerciseItem";
import "./ExerciseList.scss";

const ExerciseList = ({workoutId, modalState, setModalState, modalHandler}) => {
    
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
      axios
        .get(`http://localhost:8080/workouts/${workoutId}/exercises`)
        .then((res) => {
          setExercises(res.data);
        })
        .catch((err) => {});
    }, []);

    return (
        <div className="exerciseList">
            <div className="exerciseList__bar">
                <div className="bar__heading bar__heading--name">Exercise</div>
                <div className="bar__heading bar__heading--muscle">Muscle</div>
                <div className="bar__heading bar__heading--equipment">Equipment</div>
                <div className="bar__heading bar__heading--difficulty">Difficulty</div>
                <div className="bar__heading bar__heading--options">Options</div>
            </div>
            <div className="exerciseList__items">
                {exercises.map((activity) => {
                    return (
                        <ExerciseItem
                        key={activity.id}
                        itemId={activity.id} 
                        itemName={activity.name}
                        itemMuscle={activity.muscle}
                        itemEquipment={activity.equipment}
                        itemDifficulty={activity.difficulty}
                        modalHandler={modalHandler}
                        />
                    );
                })}
            </div>
                <button className="exerciseList__addExercise">
                    <Link to={`/programs/${workoutId}/addExercise`} className="exerciseList__addExercise-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" fill="black" className="addExercise__icon" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                        </svg>
                    </Link>
                    <Link to={`/programs/${workoutId}/addExercise`} className="exerciseList__addExercise-link">
                        <p className="addExercise__text">Add Exercise</p>
                    </Link>
                </button>
        </div>
    );
}

export default ExerciseList;
