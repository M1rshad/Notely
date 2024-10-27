import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import NavBar from './Components/NavBar';
import Homepage from './Pages/Homepage';
import AddNotes from './Pages/AddNotes';
import NoteDetail from './Pages/NoteDetail';
import EditNotes from './Pages/EditNotes';
import { useEffect, useState } from 'react';
import Login from './Pages/LoginPage/Login';
import Signup from './Pages/SignupPage/Signup';
import { addNoteAPI, fetchNote, fetchNotes, logOut, searchAPI, updateNoteAPI,  } from './Api/Api';
import PrivateRoute from './Components/PrivateRoute';


function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const [notes, setNotes] = useState([])
  const [filterText, setFilterText] = useState('')
  const [searchText, setSearchText] = useState('')
  const [isLoading, setIsLoading] = useState(true); 

  const handleFilterText = (val) =>{
    setFilterText(val)
  }

  const handleSearchText = (val) =>{
    setSearchText(val)
  }

  const filteredNotes = filterText === 'BUSINESS' ? notes.filter(notes => notes.category === 'BUSINESS') :
  filterText === 'PERSONAL' ? notes.filter(notes => notes.category === 'PERSONAL') : 
  filterText === 'IMPORTANT' ? notes.filter(notes => notes.category === 'IMPORTANT') : notes



  useEffect(()=>{
    if (searchText.length < 3) return;
    searchAPI(searchText, setNotes)

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
    addNoteAPI(data, notes, setNotes)
    }

    const updateNote = async(data, slug, setTitle, setBody, setCategory) =>{
      await updateNoteAPI(slug, data)
      fetchNote(slug, setTitle, setBody, setCategory)
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
        <Route path='/' element={<PrivateRoute><Homepage notes ={filteredNotes} handleFilterText={handleFilterText}/></PrivateRoute>}/>  
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
