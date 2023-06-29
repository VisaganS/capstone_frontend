import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home/Home";
import Programs from './pages/Programs/Programs';
import ProgramDetails from "./pages/ProgramDetails/ProgramDetails";
import AddPrograms from "./pages/AddPrograms/AddPrograms";
import EditPrograms from './pages/EditPrograms/EditPrograms';
import ExerciseDetails from "./pages/ExerciseDetails/ExerciseDetails";
import EditExercise from "./pages/EditExercise/EditExercise";
import AddExercise from "./pages/AddExercise/AddExercise";
import UserWorkouts from "./pages/UserWorkouts/UserWorkouts";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Profile from "./pages/Profile/Profile";
import Error from "./pages/Error/Error";
import './App.scss';

function App() {
    const [isOpen, setIsOpen] = useState(false);

  return (
    <BrowserRouter className="app">
    <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/error' element={<Error />} />
    <Route path='/programs' element={<Programs modalState={isOpen} setModalState={setIsOpen}/>}/>
    <Route path='/programs/:id' element={<ProgramDetails modalState={isOpen} setModalState={setIsOpen}/>}/>
    <Route path='/programs/add' element={<AddPrograms />} />
    <Route path='/programs/edit/:id' element={<EditPrograms />} />
    <Route path='/programs/:id/addExercise' element={<AddExercise/>}/>
    <Route path='/exercises/:id' element={<ExerciseDetails />}/>
    <Route path='/exercises/edit/:id' element={<EditExercise />}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<Signup/>}/>
    <Route path='/profile' element={<Profile/>}/>
    <Route path='/userworkouts' element={<UserWorkouts modalState={isOpen} setModalState={setIsOpen}/>}/>
    </Routes>
    </BrowserRouter>   
  
  );
}

export default App;
