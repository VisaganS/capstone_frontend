import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';

const ExerciseDetails = () => {
    const { id } = useParams();
    const [ exercise, setExercise] = useState({});

    useEffect(() => {
        axios
          .get(`http://localhost:8080/exercises/${id}`)
          .then((res) => {
            setExercise(res.data);
          })
          .catch((err) => {});
      }, []);

    return (<>
        <Header/>
        <div className="exerciseDetails">
            <div className="exerciseDetails__item"> 
                <div className="exerciseDetails__header"></div>
                <div className="exerciseDetails__content"></div>
            </div>
            <div className="exerciseDetails__item"> 
                <div className="exerciseDetails__header"></div>
                <div className="exerciseDetails__content"></div>
            </div>
            <div className="exerciseDetails__item"> 
                <div className="exerciseDetails__header"></div>
                <div className="exerciseDetails__content"></div>
            </div>
            <div className="exerciseDetails__item"> 
                <div className="exerciseDetails__header"></div>
                <div className="exerciseDetails__content"></div>
            </div>
            <div className="exerciseDetails__item"> 
                <div className="exerciseDetails__header"></div>
                <div className="exerciseDetails__content"></div>
            </div>
        </div>
        <Footer/>
        </>
    );
}

export default ExerciseDetails;
