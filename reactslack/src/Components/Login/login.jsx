import React, { useState, useRef } from 'react';
import './Login.css';
import { FaUser, FaLock, FaEnvelope, FaPhoneSquare } from 'react-icons/fa';

const Login = () => {
    const [loginAction, setLoginAction] = useState('');
    const [registerAction, setRegisterAction] = useState('');
    const [curUsername, setCurUsername] = useState('');
    const [curPassword, setCurPassword] = useState('');

    const emailRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const firstNameRef = useRef(null);
    const lastNameRef = useRef(null);

    const handleLogin = (event) => {
      event.preventDefault();
      console.log(event.target[0].placeholder + ": " + event.target[0].value);
      console.log(event.target[1].placeholder + ": " + event.target[1].value);
      setCurUsername(event.target[0].value);
      setCurPassword(event.target[1].value);
      loginLink(curUsername, curPassword);
    }

    const loginLink = (curUsername , curPassword) => {
        fetch('http://localhost:8080/api/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: curUsername,
                password: curPassword
            })
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);

            if (data.token) {
                localStorage.setItem('token', 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNTIxODg2NSwiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzE1MTMyNDY1fQ.OeYfF_TQNlKFWJ-i2hvpZQDR38eQbVv_K_PQWSNGGF1s-9GcopxP6vDAaHV2fAz2Ofo8E-zHzA32ABkC2wzfeg'); // Set example token '112233' in localStorage
                window.location.href = '/home'; // Redirect the user upon successful login
            } else {
                alert('Invalid username or password');
            }
        })
        .catch((error) => {
            console.error('Login problem:', error);
            alert('Failed to login. Please try again.');
        });
    };

//register
    const registerLink = () => {
        setRegisterAction(' active');
        setLoginAction(' active');
        var email = emailRef.current.value;
        var phoneNumber = phoneNumberRef.current.value;
        var firstName = firstNameRef.current.value;
        var lastName = lastNameRef.current.value;
    };

    const handleRegisterSubmit = (e) => {
        e.preventDefault();
        var email = emailRef.current.value;
        var phoneNumber = phoneNumberRef.current.value;
        var firstName = firstNameRef.current.value;
        var lastName = lastNameRef.current.value;

        fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: curUsername, password: curPassword,
                                    email: email, phoneNumber: phoneNumber,
                                     firstName: firstName, lastName: lastName})
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);

            if (data.token) {
                localStorage.setItem('token', 'eyJzdWIiOiJhZG1pbiIsImV4cCI6MTcxNTIxODg2NSwiYXV0aCI6IlJPTEVfQURNSU4gUk9MRV9VU0VSIiwiaWF0IjoxNzE1MTMyNDY1fQ.OeYfF_TQNlKFWJ-i2hvpZQDR38eQbVv_K_PQWSNGGF1s-9GcopxP6vDAaHV2fAz2Ofo8E-zHzA32ABkC2wzfeg');
                window.location.href = '/thinAir'; // Redirect the user upon successful registration
            } else {
                alert('Failed to create account. Please try again.');
            }
        })
        .catch((error) => {
            console.error('Registration problem:', error);
            alert('Failed to create account. Please try again.');
        });
    };





    return (
        <div className={`wrapper${loginAction}`}>
            <div className="form-box login">
                <form action="" onSubmit={handleLogin}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required/>
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required/>
                        <FaLock className="icon" />
                    </div>

                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" />
                            Remember me
                        </label>
                        <a href="#">Forgot password?</a>
                    </div>

                    <button type="submit">
                        Login
                    </button>

                    <div className="register-link">
                        <p>
                            Don't have an account?{' '}
                            <a href="#" onClick={registerLink}>
                                Register
                            </a>
                        </p>
                    </div>
                </form>
            </div>

            <div className={`form-box register${registerAction}`}>
                <form onSubmit={handleRegisterSubmit}>
                    <h1>Registration</h1>
                    <div className="input-box">
                        <input type="text" placeholder="First Name" required ref={firstNameRef} />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder="Last Name" required ref={lastNameRef} />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder="Username" required />
                        <FaUser className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="email" placeholder="Email" required ref={emailRef} id="email" />
                        <FaEnvelope className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="text" placeholder="Phone-Number" required ref={phoneNumberRef} />
                        <FaPhoneSquare className="icon" />
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" required/>
                        <FaLock className="icon" />
                    </div>
                    <div className="remember-forgot">
                        <label>
                            <input type="checkbox" />I agree to the terms & conditions
                        </label>
                    </div>

                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
