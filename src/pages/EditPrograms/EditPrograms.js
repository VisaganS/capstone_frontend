import { Link, useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import validator from 'validator';
import axios from 'axios';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import errorIcon from '../../assets/images/icons/error-24px.svg';
import './EditPrograms.scss'

const EditPrograms = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [programName, setProgramName] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);
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
        setProgramName(event.target.value);
    }

    const handleTypeChange = (event) => {
        setType(event.target.value);
    }

    const handleImageChange = (event) => {
        setImage(event.target.files[0]);
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

        const validate = () => {
            let counter = 0;

            if (validator.isEmpty(data.name)){
                setProgramNameIsError(true);
                counter++;
            } else {
                setProgramNameIsError(false);
            }

            if (validator.isEmpty(data.type)){
                setProgramTypeIsError(true);
                counter++;
            } else {
                setProgramTypeIsError(false);
            }

            return counter;
        }

        const formData = new FormData();
        formData.append('name', programName);
        formData.append('type', type);
        formData.append('image', image);
        formData.append('likes', likes);
        formData.append('comments', comments);
        let errors = validate();
            if(errors === 0 && clearFields === false){
                axios.
                    put(`http://localhost:8080/workouts/${id}`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    })
                        .then((response) => {
                            navigate('/programs');
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                }

            if (clearFields === true) {
            setProgramName("");
            setType("");
            setImage();
            setClearFields(false);
        }
    }
    useEffect(() => {
        axios
            .get(`http://localhost:8080/workouts/${id}`)
            .then((response) => {
                setProgramName(response.data.name);
                setType(response.data.type);
                setImage('');
                setLikes(response.data.likes);
                setComments(response.data.comments);
            })
            .catch((err) => {
                console.error(err);
            })
    }, [])

        return (
        <>
            <Header/>
            <div className="editPrograms">
                <div className="editPrograms__heading">
                    <Link to={`/programs`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="black" className="editPrograms__return" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"/>
                        </svg>
                        </Link>
                    <h1 className="editPrograms__title">Edit Program</h1>
                </div>
                <form className="editPrograms__form" onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="editPrograms-form__details-container">
                        <div className="editPrograms-form__details">
                            <h2 className="editPrograms-form__heading">Program Details</h2>
                            <div className="editPrograms-form__inputs">
                                <label className="editPrograms-form__label">
                                    Program Name
                                    <input onChange={handleNameChange} type="text" id="inputs__programName" name="programName" placeholder="Program Name" value={programName} />
                                </label>
                                <p className={programNameIsError ? "editPrograms-form__showError" : "editPrograms-form__hideError"}><img src={errorIcon} className="editPrograms-form__errorImage" alt="error-icon" />This field is required</p>
                                <label className="editPrograms-form__label">
                                    Program Type
                                    <input onChange={handleTypeChange} type="text" id="inputs__programType" name="programType" placeholder="Program Type" value={type} />
                                </label>
                                <p className={programTypeIsError ? "editPrograms-form__showError" : "editPrograms-form__hideError"}><img src={errorIcon} className="editPrograms-form__errorImage" alt="error-icon" />This field is required</p>
                                <label className="addPrograms-form__label">
                                    Upload Image
                                    <input type="file" className="addPrograms-form__imageUpload" name="file" onChange={handleImageChange}></input>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="editPrograms-form__button-container">
                        <button className="editPrograms-form__button editPrograms-form__button--cancel" onClick={resetInputs}>Cancel</button>
                        <button type="submit" className="editPrograms-form__button">Save</button>
                    </div>
                </form>      
            </div>
            <Footer/>
        </>
        );
}

export default EditPrograms;
