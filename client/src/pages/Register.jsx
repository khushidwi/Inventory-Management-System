import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "../styles/Login.css";

function Register() {

    const navigate = useNavigate();

    const [name, setName] = useState("");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [confirmPassword, setConfirmPassword] = useState("");

    const register = async (e) => {

        e.preventDefault();

        if (password !== confirmPassword) {

            toast.error("Passwords do not match");

            return;

        }

        try {

            await API.post(

                "/auth/user/register",

                {
                    name,
                    email,
                    password
                }

            );

            toast.success("Registration Successful");

            setTimeout(() => {

                navigate("/login");

            }, 1500);

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Registration Failed"

            );

        }

    };

    return (

        <div className="login-page">

            <ToastContainer />

            <div className="login-card">

                <h1 className="login-title">

                    Create Account

                </h1>

                <p className="login-subtitle">

                    Register as User

                </p>

                <form onSubmit={register}>

                    <div className="form-group">

                        <label>Name</label>

                        <input

                            className="form-control"

                            value={name}

                            onChange={(e)=>setName(e.target.value)}

                            required

                        />

                    </div>

                    <div className="form-group">

                        <label>Email</label>

                        <input

                            type="email"

                            className="form-control"

                            value={email}

                            onChange={(e)=>setEmail(e.target.value)}

                            required

                        />

                    </div>

                    <div className="form-group">

                        <label>Password</label>

                        <input

                            type="password"

                            className="form-control"

                            value={password}

                            onChange={(e)=>setPassword(e.target.value)}

                            required

                        />

                    </div>

                    <div className="form-group">

                        <label>Confirm Password</label>

                        <input

                            type="password"

                            className="form-control"

                            value={confirmPassword}

                            onChange={(e)=>setConfirmPassword(e.target.value)}

                            required

                        />

                    </div>

                    <button className="login-button">

                        Register

                    </button>

                </form>

                <div className="bottom-links">

                    <p>

                        Already have an account?

                        <Link to="/login">

                            Login

                        </Link>

                    </p>

                </div>

            </div>

        </div>

    );

}

export default Register;