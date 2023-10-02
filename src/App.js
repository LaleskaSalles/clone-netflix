import React, { useEffect } from 'react';
import './App.css';
import HomeScreen from './components/homeScreen/HomeScreen';
import {
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import Login from './components/login/Login';
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/userSlice';
import ProfileScreen from './components/profileScreen/ProfileScreen';



function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    
    const unsubscribe = auth.onAuthStateChanged((userAuth) =>{
      if (userAuth){
        navigate('/')
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email,
          
        }));
      } else{
        //Logged out
        dispatch(logout())
        navigate('/login')
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className="App">
      
      <Routes>

  
        {!user ? (
          <>
            <Route path='/login' element={<Login/>}/>
          </>
        ) : (
          <>
            <Route path="/"         element={<HomeScreen />} />
            <Route path='/profile'  element={<ProfileScreen/>} />
          </>
        )}    

      </Routes>
      
    </div>
  );
}

export default App;
