import React, { useState, useRef } from 'react';
import './LoginSignup.css';
import theLogo from './the-logo.png';

export default function LoginSignup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const emailRef = useRef(null); 
    const passwordRef = useRef(null); 
    const handleSubmit = (action) => {
        if (!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
            emailRef.current.setCustomValidity('Please enter a valid email address.');
            emailRef.current.reportValidity(); 
            return;
        } else {
            emailRef.current.setCustomValidity('');
        }

        if (password === '') {
            passwordRef.current.setCustomValidity('Please enter a password.');
            passwordRef.current.reportValidity(); 
            return;
        } else {
            passwordRef.current.setCustomValidity('');
        }
            if(email != 'supervisor@gmail.com'){
        const userObject = {
            caregiverID: email,
            state: '', 
            geodata: '', 
            client: '', 
            timestamp: '',
            active: true,
            action: action,
        };
    

        console.log(userObject);
        navigate('/clockin'); 
    } else {
        navigate('/supervisor'); 
    }
        
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSubmit('login');
        }
    };

    return (
        <div className='container'>
            <img src={theLogo} alt='Logo'/>
            <div className='header'>
                <div className='text'>Login</div>
                <div className='underline'></div>
            </div>

            <div className='inputs'>
                <div className='input'>
                    <img src='' alt=''/>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email Id"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={handleKeyDown} 
                        ref={emailRef} 
                        required
                    />
                </div>

                <div className='input'>
                    <img src='' alt=''/>
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown} 
                        ref={passwordRef} 
                        required
                    />
                </div>
            </div>
            <div className="forgot-password">Lost Password? <span>Click Here</span></div>
            <div className="submit-container">
                <button className="submit" onClick={() => handleSubmit('login')}>Login</button>
            </div>
        </div>
    );
}