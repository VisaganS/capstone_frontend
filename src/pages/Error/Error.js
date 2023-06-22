import Header from "../../components/Header/Header";
import Footer from '../../components/Footer/Footer';
import errorImage from '../../assets/images/error-image.jpg'
import './Error.scss';

const Error = () => {
return (
<>
    <Header/>
    <div className="error">
        <img src={errorImage} className="error__image" alt="error-pic"/>
        <h1 className="error__text">This page has not been created yet or is under going maintenance. Sorry for any inconvience!</h1>
    </div>
    <Footer/>
</>
);
}

export default Error;