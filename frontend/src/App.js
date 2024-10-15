import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';
import Homepage from './Pages/Homepage';
import AddNotes from './Pages/AddNotes';

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>  
        <Route path='/add-note' element={<AddNotes/>}/>  
      </Routes>
    </div>
  );
}

export default App;
