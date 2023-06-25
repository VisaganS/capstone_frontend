import { Link } from "react-router-dom";
import "./ExerciseItem.scss";

const ExerciseItem = ({itemId, itemName, itemMuscle, itemEquipment, itemDifficulty, modalHandler}) => {
    return (
        <div className="exercise-item">
            <div className="exercise-item__section exercise-item__section--name">
                <div className="exercise-item__header">Exercise</div>
                <p className="exercise-item__content exercise-item__content--name">{itemName}</p>
            </div>
            <div className="exercise-item__section exercise-item__section--muscle">
                <div className="exercise-item__header">Muscle</div>
                <p className="exercise-item__content exercise-item__content--muscle">{itemMuscle}</p>
            </div>
            <div className="exercise-item__section exercise-item__section--equipment">
                <div className="exercise-item__header">Equipment</div>
                <p className="exercise-item__content exercise-item__content--equipment">{itemEquipment}</p>
            </div>
            <div className="exercise-item__section exercise-item__section--difficulty">
                <div className="exercise-item__header">Difficulty</div>
                <p className="exercise-item__content exercise-item__content--difficulty">{itemDifficulty}</p>
            </div>
            <div className="exercise-item__buttons">
                <button className="exercise-item__button exercise-item__button--info">
                    <Link to={`/exercises/${itemId}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" className="exercise-item__icon" viewBox="0 0 16 16">
                            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16zm.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
                        </svg>
                    </Link>
                </button>
                <button className="exercise-item__button exercise-item__button--edit">
                    <Link to={`/exercises/edit/${itemId}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" className="exercise-item__icon" viewBox="0 0 16 16">
                            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                        </svg>
                    </Link>
                </button>
                <button className="exercise-item__button exercise-item__button--delete">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="black" className="exercise-item__icon" viewBox="0 0 16 16" onClick={() => modalHandler(itemName, itemId)}>
                            <path d="M11.46.146A.5.5 0 0 0 11.107 0H4.893a.5.5 0 0 0-.353.146L.146 4.54A.5.5 0 0 0 0 4.893v6.214a.5.5 0 0 0 .146.353l4.394 4.394a.5.5 0 0 0 .353.146h6.214a.5.5 0 0 0 .353-.146l4.394-4.394a.5.5 0 0 0 .146-.353V4.893a.5.5 0 0 0-.146-.353L11.46.146zm-6.106 4.5L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"/>
                        </svg>  
                </button>
            </div>
        </div>
    );
}

export default ExerciseItem;
