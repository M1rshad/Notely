import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';
import Homepage from './Pages/Homepage';
import AddNotes from './Pages/AddNotes';
import NoteDetail from './Pages/NoteDetail';
import EditNotes from './Pages/EditNotes';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const [notes, setNotes] = useState([])

  const baseURL = 'http://127.0.0.1:8000/'

  useEffect(() =>{
    axios.get(baseURL+'notes').then((response)=>
      {console.log(response.data)
      setNotes(response.data)}
    
    ).catch(
      (err)=>console.log(err.message)
    )
  }, [])

  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={<Homepage notes ={notes}/>}/>  
        <Route path='/add-note' element={<AddNotes/>}/>  
        <Route path='/edit-note' element={<EditNotes/>}/>  
        <Route path='/notes/:slug' element={<NoteDetail/>}/>  
      </Routes>
    </div>
  );
}

export default App;
