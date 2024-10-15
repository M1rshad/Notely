import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './Components/NavBar';
import Homepage from './Pages/Homepage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<Homepage/>}/>
      {/* <NavBar/> */}
      
      </Routes>
    </div>
  );
}

export default App;
