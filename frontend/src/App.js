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
import { useAuth } from './Context/UseAuth';


function App() {
  const location = useLocation()
  const navigate = useNavigate()
  const {isAuthenticated, loading} = useAuth()
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

  const filteredNotes =
  filterText === 'BUSINESS'
    ? notes.filter((note) => note.category === 'BUSINESS')
    : filterText === 'PERSONAL'
    ? notes.filter((note) => note.category === 'PERSONAL')
    : filterText === 'IMPORTANT'
    ? notes.filter((note) => note.category === 'IMPORTANT')
    : notes;



  useEffect(()=>{
    if (searchText.length < 3) return;
    searchAPI(searchText, setNotes)
  },[searchText])

  useEffect(() => {
    const loadNotes = async () => {
      if (isAuthenticated) {
        setIsLoading(true);
        await fetchNotes(setNotes);
        setIsLoading(false);
      } else {
        setNotes([]);
        setIsLoading(false);
      }
    };
    loadNotes();
  }, [isAuthenticated]);
//   useEffect(() => {
//     const loadNotes = async () => {
//         if (isAuthenticated) {
//             setIsLoading(true);
//             await fetchNotes(setNotes);
//             setIsLoading(false);
//         }
//     };
//     loadNotes();
// }, [isAuthenticated]);


  const handleLogOut = ()=>{
    logOut(navigate)
    setNotes([])
  }

  const addNote= (data)=>{
    addNoteAPI(data, notes, setNotes)
    }

    const updateNote = async(data, slug, setTitle, setBody, setCategory) =>{
      await updateNoteAPI(slug, data)
      fetchNote(slug, setTitle, setBody, setCategory)
    }

  if (isLoading || loading) {
    return <p>Loading...</p> 
  }

  return (
    <div className="App"> 
      {!(location.pathname === '/signup' || location.pathname === '/login') && (
        <PrivateRoute><NavBar searchText={searchText} handleSearchText={handleSearchText} handleLogOut={handleLogOut}/></PrivateRoute>
      )}
      <Routes>
        <Route path='/' element={<PrivateRoute><Homepage notes ={filteredNotes} handleFilterText={handleFilterText}/></PrivateRoute>}/>  
        <Route path='/add-note' element={<PrivateRoute><AddNotes addNote={addNote}/></PrivateRoute>}/>  
        <Route path='/edit-note/:slug' element={<PrivateRoute><EditNotes updateNote={updateNote}/></PrivateRoute>}/>  
        <Route path='/notes/:slug' element={<PrivateRoute><NoteDetail/></PrivateRoute>}/>  
        <Route path='/login' element={<Login/>}/>  
        <Route path='/signup' element={<Signup/>}/>  
      </Routes>
    </div>
  );
}

export default App;
