import React, { useState } from 'react';
import './LoginSignup.css';
import theLogo from './the-logo.png';



export default function LoginSignup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = () => {
      const userObject = {
        caregiverID: email,
        state: '', 
        geodata: '', 
        client: '', 
        timestamp: '',
        active: true,
      }
      console.log(userObject);
    }
    return (
        
    <div className='container'>
        <img src={theLogo} alt='Logo'/>
        <div className='header'>
            <div className='text'>Login</div>
            <div className='underline'></div>
            </div>

            <div className='inputs'>
            

            <div className='input'>
            <img scr='' alt=''/>
            <input type = "email" placeholder="Email Id" value={email}
                        onChange={(e) => setEmail(e.target.value)}/>
            </div>

            <div className='input'>
            <img scr='' alt=''/>
            <input type = "password" placeholder="Password" value={password}
                        onChange={(e) => setPassword(e.target.value)}/>
            </div>
        </div>
        <div className="forgot-password">Lost Pasword? <span>Click Here</span></div>
        <div className="submit-container">
        <button className="submit" onClick={() => handleSubmit('login')}>Login</button>
        </div>
    </div>
  )
}
