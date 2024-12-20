import { Routes,Route, BrowserRouter } from 'react-router';
import './App.css';
import LandingPage from './pages/LandingPage';
import Registration from './pages/Registration';
import Home from './pages/Home';

function App() {
  return (
    <div className="  ">
     <h1 className="p-5 absolute text-6xl text-black   font-pixel font-bold z-10 animate-pulse">_GEA <br /> toth*</h1>

      <BrowserRouter>
      <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/registration" element={<Registration/>}/>
      <Route path="/home" element={<Home/>}/>


        {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
