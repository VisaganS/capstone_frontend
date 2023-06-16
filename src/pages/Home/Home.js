import Header from "../../components/Header/Header";
import heroImg from "../../assets/images/hero.jpg"
import './Home.scss';

const Home = () => {

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
            <div className="programs__container"></div>
        </div>
    </div>
    </>
}

export default Home;