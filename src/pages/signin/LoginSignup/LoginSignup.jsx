import React from 'react'
import './LoginSignup.css'
import theLogo from './the-logo.png'



export default function LoginSignup() {
  
    return (
        
    <div className='container'>
        <img src={theLogo} alt='Logo'/>
        <div className='header'>
            <div className='text'>Sign up</div>
            <div className='underline'></div>
            </div>

            <div className='inputs'>
            

            <div className='input'>
            <img scr='' alt=''/>
            <input type = "email" placeholder="Email Id"/>
            </div>

            <div className='input'>
            <img scr='' alt=''/>
            <input type = "password" placeholder="Password"/>
            </div>
        </div>
        <div className="forgot-password">Lost Pasword? <span>Click Here</span></div>
        <div className="submit-container">
            <div className="submit">Sign up</div>
            <div className="submit">Login</div>
        </div>
    </div>
  )
}
