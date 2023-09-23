/* eslint-disable no-unused-vars */
import React from 'react'
import '../css/login.css'
import { useNavigate } from "react-router-dom";
import ErrorModal from './ErrorModal';
import { api_path } from '../api_path'



export default function Login() {

    const endpoint = api_path + "/api/token/"
    const [isAuthenticated, setIsAuthenticated] = React.useState(localStorage.getItem(localStorage.getItem("authenticated") || false));
    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({
        username: "",
        password: "",
    });


    function handleSubmit(event) {
        event.preventDefault()

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        };

        fetch(endpoint, requestOptions).then(res => {
            if (!res.ok) {
                // create error object and reject if not a 2xx res code
                let err = new Error("HTTP status code: " + res.status)
                err.res = res
                err.status = res.status
                alert('Missing Field, or Wrong username or password')
                throw err
            }
            return res.json()
        })
            .then(data => {
                localStorage.setItem("authenticated", data.token);
                // redirect to homepage, and refresh
                window.location.href = '/';
            })
            .catch(err => console.log(err))

    }


    function handleChange(event) {
        const { name, value } = event.target
        setFormData(prevFormData => {
            return {
                ...prevFormData,
                [name]: value
            }
        })
    }


    return (
        <div className="login-form">
            <h1>Log In</h1>
            <form onSubmit={handleSubmit}>
                <input
                    className='login-input'
                    type="text"
                    placeholder="username"
                    onChange={handleChange}
                    name="username"
                    value={formData.username}
                />
                <input
                    className='login-input'
                    type="password"
                    placeholder="password"
                    onChange={handleChange}
                    name="password"
                    value={formData.password}
                />
                <button className='login-btn'>Log in</button>
            </form>
        </div>

    );

}
