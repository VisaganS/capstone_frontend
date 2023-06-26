import { Link, useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import validator from "validator";
import axios from "axios";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import errorIcon from '../../assets/images/icons/error-24px.svg';
import './AddExercise.scss'

const AddExercise = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [exerciseName, setExerciseName] = useState("");
    const [muscle, setMuscle] = useState("");
    const [equipment, setEquipment] = useState("");
    const [difficulty, setDifficulty] = useState("");
    const [instructions, setInstructions] = useState("");
    const [workoutId, setWorkoutId] = useState([]);

    const [nameIsError, setNameIsError] = useState(false);
    const [muscleIsError, setMuscleIsError] = useState(false);
    const [equipmentIsError, setEquipmentIsError] = useState(false);
    const [difficultyIsError, setDifficultyIsError] = useState(false);
    const [instructionsIsError, setInstructionsIsError] = useState(false);
    const [clearFields, setClearFields] = useState(false);

    const resetInputs = () => {
        setClearFields(true);
    }

    const handleNameChange = (event) => {
        event.preventDefault();
        setExerciseName(event.target.value);
    }

    const handleMuscleChange = (event) => {
        event.preventDefault();
        setMuscle(event.target.value);
    }

    const handleEquipmentChange = (event) => {
        event.preventDefault();
        setEquipment(event.target.value);
    }

    const handleDifficultyChange = (event) => {
        event.preventDefault();
        setDifficulty(event.target.value);
    }

    const handleInstructionsChange = (event) => {
        event.preventDefault();
        setInstructions(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        
        const addExercise = {
            name: exerciseName,
            muscle: muscle,
            equipment: equipment,
            difficulty: difficulty,
            instructions: instructions,
            workout_id: id
          };
    
        const validate = () => {
            let counter = 0;

            if (validator.isEmpty(addExercise.name)){
                setNameIsError(true);
                counter++;
            } else {
                setNameIsError(false);
            }

            if (validator.isEmpty(addExercise.muscle)){
                setMuscleIsError(true);
                counter++;
            } else {
                setMuscleIsError(false);
            }

            if (validator.isEmpty(addExercise.equipment)){
                setEquipmentIsError(true);
                counter++;
            } else {
                setEquipmentIsError(false);
            }

            if (validator.isEmpty(addExercise.difficulty)){
                setDifficultyIsError(true);
                counter++;
            } else {
                setDifficultyIsError(false);
            }

            if (validator.isEmpty(addExercise.instructions)){
                setInstructionsIsError(true);
                counter++;
            } else {
                setInstructionsIsError(false);
            }

            return counter;
        }

        let errors = validate();

        if (errors === 0 && clearFields === false){
            axios
                .post(`http://localhost:8080/exercises`, addExercise)
                .then((response) => {
                    navigate(`/programs/${id}`);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
        if (clearFields === true) {
            setExerciseName("");
            setMuscle("");
            setEquipment("");
            setDifficulty("");
            setInstructions("");
            setNameIsError(false);
            setMuscleIsError(false);
            setEquipmentIsError(false);
            setDifficultyIsError(false);
            setInstructionsIsError(false);
            setClearFields(false);
          }
    }

    return (<>
        <Header/>
        <div className="addExercise">
            <div className="addExercise__heading">
                <Link to={`/programs/${id}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" className="addExercise__return" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                    </svg>
                </Link>
                <h1 className="addExercise__title">Add Exercise</h1>
            </div>
            <form className="addExercise__form" onSubmit={handleSubmit}>
                <div className="form__details-container">
                    <div className="form__details">
                        <h2 className="form__heading">Program Details</h2>
                        <div className="form__inputs">
                            <label className="form__label">
                                Exercise Name
                                <input onChange={handleNameChange} type="text" id="inputs__exerciseName" name="exerciseName" placeholder="Exercise Name" value={exerciseName} />
                            </label>
                            <p className={nameIsError ? "form__showError" : "form__hideError"}><img src={errorIcon} className="form__errorImage" alt="error-icon" />This field is required</p>
                            <label className="form__label">
                                Muscle
                                <input onChange={handleMuscleChange} type="text" id="inputs__muscle" name="muscle" placeholder="Muscle" value={muscle} />
                            </label>
                            <p className={muscleIsError ? "form__showError" : "form__hideError"}><img src={errorIcon} className="form__errorImage" alt="error-icon" />This field is required</p>
                            <label className="form__label">
                                Equipment
                                <input onChange={handleEquipmentChange} type="text" id="inputs__equipment" name="equipment" placeholder="Equipment" value={equipment} />
                            </label>
                            <p className={equipmentIsError ? "form__showError" : "form__hideError"}><img src={errorIcon} className="form__errorImage" alt="error-icon" />This field is required</p>
                            <label className="form__label">
                                Difficulty
                                <input onChange={handleDifficultyChange} type="text" id="inputs__difficulty" name="difficulty" placeholder="Difficulty" value={difficulty} />
                            </label>
                            <p className={difficultyIsError ? "form__showError" : "form__hideError"}><img src={errorIcon} className="form__errorImage" alt="error-icon" />This field is required</p>
                            <label className="form__label">
                                Instructions
                                <input onChange={handleInstructionsChange} type="text" id="inputs__instructions" name="instructions" placeholder="Instructions" value={instructions} />
                            </label>
                            <p className={instructionsIsError ? "form__showError" : "form__hideError"}><img src={errorIcon} className="form__errorImage" alt="error-icon" />This field is required</p>
                        </div>
                    </div>
                </div>
                <div className="form__button-container">
                    <button className="form__button form__button--cancel" onClick={resetInputs}>Cancel</button>
                    <button type="submit" className="form__button">Save</button>
                </div>
            </form>      
        </div>
        <Footer/>
    </>);
}

export default AddExercise;
