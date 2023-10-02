import React from 'react'
import { useSelector } from 'react-redux/es/hooks/useSelector'
import { selectUser } from '../../features/userSlice'
import './ProfileScreen.css'
import Nav from '../nav/Nav'
import { auth } from '../../firebase'
import PlanScreen from '../plansScreen/PlanScreen'

export default function ProfileScreen() {
    const user = useSelector(selectUser);
    

  return (
    <div className='profileScreen'>
        <Nav/>
        <div className='profile_body'>
            <h1>Edit Profile</h1>
            <div className='profile_info'>
                <img src="/Netflix-avatar.png" alt=''></img>
                <div className='profile_details'>
                    <h2>{user.email}</h2>
                    <div className='profile_plans'>
                        <h3>Plans</h3>
                        <PlanScreen/>
                        <button 
                            className='profile_signOut'
                            onClick={() => auth.signOut()}
                        >
                            Sign Out
                        </button>
                    </div>
                </div>
                
            </div>

        </div>
    </div>
  )
}
