import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import './Home.scss';

const Home = () => {

    const [workout1, setWorkout1] = useState({});
    const [workout2, setWorkout2] = useState({});
    const [workout3, setWorkout3] = useState({});
    useEffect(() => {
        axios
        .get("http://localhost:8080/workouts")
        .then((res) => {
        // console.log(res.data);
        setWorkout1(res.data[0]);
        setWorkout2(res.data[1]);
        setWorkout3(res.data[2]);
        })
        .catch((err) => {});
    },[]);
    return <>
    <Header/>
    
    <div className="home">
        <div className="home__hero">
            <div className="hero__overlay"></div>
            <div className="hero__content">
                <h1 className="hero__heading">Workouts and Programs</h1>
                <p className="hero__text">Get fit Your Way</p>
            </div>
        </div>

        <div className="home__programs">
            <h2 className="programs__heading">Programs</h2>
            <div className="programs__container">
                <div className="programs__item" style={{ backgroundImage: `url(${workout1.image})` }}>
                    <div className="programs-item__overlay"></div>
                    <div className="programs-item__content">
                        <p className="programs-item__type">{workout1.type}</p>
                        <h2 className="programs-item__heading">{workout1.name}</h2>
                        <div className="programs-item__rating">
                            <p className="programs-item__likes">{workout1.likes} likes</p>
                            <p className="programs-item__dash">|</p>
                            <p className="programs-item__comments">{workout1.comments} comments</p>
                        </div>
                    </div>
                </div>
                <div className="programs__item" style={{ backgroundImage: `url(${workout2.image})` }}>
                    <div className="programs-item__overlay"></div>
                    <div className="programs-item__content">
                        <p className="programs-item__type">{workout2.type}</p>
                        <h2 className="programs-item__heading">{workout2.name}</h2>
                        <div className="programs-item__rating">
                            <p className="programs-item__likes">{workout2.likes} likes</p>
                            <p className="programs-item__dash">|</p>
                            <p className="programs-item__comments">{workout2.comments} comments</p>
                        </div>
                    </div>  
                </div>
                <div className="programs__item" style={{ backgroundImage: `url(${workout3.image})` }}>
                    <div className="programs-item__overlay"></div>
                    <div className="programs-item__content">
                        <p className="programs-item__type">{workout3.type}</p>
                        <h2 className="programs-item__heading">{workout3.name}</h2>
                        <div className="programs-item__rating">
                            <p className="programs-item__likes">{workout3.likes} likes</p>
                            <p className="programs-item__dash">|</p>
                            <p className="programs-item__comments">{workout3.comments} comments</p>
                        </div>
                    </div>      
                </div>
            </div>
            <Link to="/programs" className="programs__link"><button className="programs__button">View All</button></Link>
        </div>
    </div>
    <Footer/>
    </>
}

export default Home;