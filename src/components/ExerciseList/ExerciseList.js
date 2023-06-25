import { useEffect, useState } from "react";
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
        </div>
    );
}

export default ExerciseList;
