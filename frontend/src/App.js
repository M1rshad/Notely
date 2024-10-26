import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Homepage from './Pages/Homepage';
import AddNotes from './Pages/AddNotes';
import NoteDetail from './Pages/NoteDetail';
import EditNotes from './Pages/EditNotes';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Login from './Pages/LoginPage/Login';
import Signup from './Pages/SignupPage/Signup';
import { addNewNote, fetchNotes, logOut,  } from './Api/Api';


function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [notes, setNotes] = useState([])
  const [filterText, setFilterText] = useState('')
  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(true); // loading state
 
  const handleFilterText = (val) =>{
    setFilterText(val)
  }

  const handleSearchText = (val) =>{
    setSearchText(val)
  }

  const filteredNotes = filterText === 'BUSINESS' ? notes.filter(notes => notes.category === 'BUSINESS') :
  filterText === 'PERSONAL' ? notes.filter(notes => notes.category === 'PERSONAL') : 
  filterText === 'IMPORTANT' ? notes.filter(notes => notes.category === 'IMPORTANT') : notes


  const baseURL = 'http://127.0.0.1:8000/'

  useEffect(()=>{
    if (searchText.length < 3) return;
    axios.get(baseURL+`search-notes/?search=${searchText}`).then(
      res=>setNotes(res.data)
    )
  },[searchText])

  useEffect(() =>{
    const loadNotes = async()=>{
      setIsLoading(true);
      await fetchNotes(setNotes);
      setIsLoading(false);
    }
    loadNotes();
  }, [])

  const handleLogOut = ()=>{
    logOut(navigate)
  }

  const addNote= (data)=>{
    addNewNote(data, notes, setNotes)
    }

    
    const updateNote= (data, slug)=>{
      axios.put(`${baseURL}/notes/${slug}`, data).then(res => {
        console.log(res.data)
       })
  
  }

  if (isLoading) {
    return <p>Loading...</p> 
    }
  return (
    <div className="App"> 
      {!(location.pathname === '/signup' || location.pathname === '/login') && (
        <NavBar searchText={searchText} handleSearchText={handleSearchText} handleLogOut={handleLogOut}/>
      )}
      <Routes>
        <Route path='/' element={<Homepage notes ={filteredNotes} handleFilterText={handleFilterText}/>}/>  
        <Route path='/add-note' element={<AddNotes addNote={addNote}/>}/>  
        <Route path='/edit-note/:slug' element={<EditNotes updateNote={updateNote}/>}/>  
        <Route path='/notes/:slug' element={<NoteDetail/>}/>  
        <Route path='/login' element={<Login/>}/>  
        <Route path='/signup' element={<Signup/>}/>  
      </Routes>
    </div>
  );
}

export default App;
