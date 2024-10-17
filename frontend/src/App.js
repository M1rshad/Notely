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

  const addNote= (data)=>{
    axios.post(baseURL+'notes', data).then(res => {
      console.log(res.data)
      setNotes([...notes, data])
    })
    }
    const updateNote= (data, slug)=>{
      axios.put(`${baseURL}/notes/${slug}`, data).then(res => {
        console.log(res.data)
       })
  
  }

  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={<Homepage notes ={notes}/>}/>  
        <Route path='/add-note' element={<AddNotes addNote={addNote}/>}/>  
        <Route path='/edit-note/:slug' element={<EditNotes updateNote={updateNote}/>}/>  
        <Route path='/notes/:slug' element={<NoteDetail/>}/>  
      </Routes>
    </div>
  );
}

export default App;
