import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        await axios.post(`http://localhost:5000/api/admin/login`,{
            username: username,
            password: password
        })
        .then((res) => {
            if (res.status === 201) {
                const now = new Date();
                localStorage.setItem("token", res.data.token);
                setTimeout(() => {
                    localStorage.removeItem('token');
                }, 60 * 60 * 1000);
                navigate("/");
            }
            console.log(res.data);
        })
        .catch((err) => console.log(err.message))
    }
    
    return (
        <div className={"d-flex justify-content-center align-items-center vh-100"}>
            <div className={"card p-4"} style={{width: "18rem"}}>
                <h2 className={"h4 fw-bold mb-4"}>Login</h2>
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
                    <span>Don't Have Account?</span>
                    <Link to={"/register"} className={"text-primary text-decoration-none"}> Register </Link>
                </div>
            </div>
        </div>
    )
}

export default LoginPage