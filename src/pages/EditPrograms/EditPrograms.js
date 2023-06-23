import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import errorIcon from '../../assets/images/icons/error-24px.svg';
import './EditPrograms.scss'

const EditPrograms = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [programName, setprogramName] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState('');
    const [likes, setLikes] = useState('');
    const [comments, setComments] = useState('');

    const [programNameIsError, setProgramNameIsError] = useState(false);
    const [programTypeIsError, setProgramTypeIsError] = useState(false);

    const [clearFields, setClearFields] = useState(false);

    const resetInputs = () => {
        setClearFields(true);
    }

    const handleNameChange = (event) => {
        event.preventDefault();
        setprogramName(event.target.value);
    }

    const handleTypeChange = (event) => {
        setType(event.target.value);
    }

    const handleImageChange = (event) => {
        setImage(event.target.value);
    }



    const handleSubmit = (event) => {
        event.preventDefault();

        let data = {
            name: programName,
            type: type,
            image: image,
            likes: likes,
            comments: comments
        }

        axios.
            put(`http://localhost:8080/workouts/${id}`, data)
                .then(response => {
                    navigate('/programs');
                })
                .catch(err => {
                    console.log(err);
                })

        if (clearFields === true) {
            event.target.reset();
            setprogramName(false);
            setType(false);
            setImage(false);
        }
    }
    useEffect(() => {
        const fetchProgramData = async () => {
            try {
                const program = await axios.get(`http://localhost:8080/workouts/${id}`);
                setprogramName(program.data.name);
                setType(program.data.type);
                setImage(program.data.image);
                setLikes(program.data.likes);
                setComments(program.data.comments);
            }
            catch (err) {
                console.error(err);
            }

        }
        fetchProgramData();
    }, [])

        return (
        <>
            <Header/>
            <div className="editPrograms">
                <div className="editPrograms__heading">
                    <Link to={`/programs`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" className="editPrograms__return" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                        </svg>
                        </Link>
                    <h1 className="editPrograms__title">Edit Program</h1>
                </div>
                <form className="editPrograms__form" onSubmit={handleSubmit}>
                    <div className="form__details-container">
                        <div className="form__details">
                            <h2 className="form__heading">Program Details</h2>
                            <div className="form__inputs">
                                <label className="form__label">
                                    Program Name
                                    <input onChange={handleNameChange} type="text" id="programName" name="programName" placeholder="programName" value={programName} />
                                </label>
                                <p className={programNameIsError ? "form__showError" : "form__hideError"}><img src={errorIcon} className="form__errorImage" alt="error-icon" />This field is required</p>
                                <label className="form__label">
                                    Program Type
                                    <input onChange={handleTypeChange} type="text" id="inputs__programType" name="programType" placeholder="Street Type" value={type} />
                                </label>
                                <p className={programTypeIsError ? "form__showError" : "form__hideError"}><img src={errorIcon} className="form__errorImage" alt="error-icon" />This field is required</p>
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
        </>
        );
}

export default EditPrograms;
