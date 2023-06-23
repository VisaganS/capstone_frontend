import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home/Home";
import Programs from './pages/Programs/Programs';
import ProgramDetails from "./pages/ProgramDetails/ProgramDetails";
import EditPrograms from './pages/EditPrograms/EditPrograms';
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
    <Route path='/programs/edit/:id' element={<EditPrograms />} />
    </Routes>
    </BrowserRouter>   
  
  );
}

export default App;
