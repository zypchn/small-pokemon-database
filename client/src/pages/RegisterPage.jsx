import React, { useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const RegisterPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post(`http://localhost:5000/api/admin/register`, {
            username: username,
            password: password
        })
        .then((res) => {
            if (res.status === 201) {
                navigate("/login");
            }
            console.log(res.data);
        })
        .catch((err) => console.log(err))
    }
    return (
        <div className={"d-flex justify-content-center align-items-center vh-100"}>
            <div className={"card p-4"} style={{width: "18rem"}}>
                <h2 className={"h4 fw-bold mb-4"}>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className={"mb-3 text-start"}>
                        <label htmlFor={"username"} className={"form-label"}>Username</label>
                        <input type={"text"} placeholder={"Enter Username"} className={"form-control"}
                               name={"username"} onChange={(e) => setUsername(e.target.value)}/>
                    </div>
                    <div className={"mb-3 text-start"}>
                        <label htmlFor={"password"} className={"form-label"}>Password</label>
                        <input type={"password"} placeholder={"Enter Password"} className={"form-control"}
                               name={"password"} onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <button className={"btn btn-primary w-100"}>Submit</button>
                </form>
                <div className={"text-center mt-3"}>
                    <span>Already have account? </span>
                    <Link to={"/login"} className={"text-primary text-decoration-none"}> Login </Link>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage