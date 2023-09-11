import React from 'react';
import './App.css';
import HomeScreen from './components/homeScreen/HomeScreen';
import {
  Route,
  Routes,
} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<HomeScreen/>}>
          </Route>
      </Routes>
      
    </div>
  );
}

export default App;
