import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";
import { toast, ToastContainer } from "react-toastify";
import "../styles/Login.css";

function Login() {

    const navigate = useNavigate();

    const [role, setRole] = useState("manager");

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const login = async (e) => {

        e.preventDefault();

   try {

    if (role === "manager") {

        const res = await API.post(
            "/auth/manager/login",
            {
                email,
                password
            }
        );

        localStorage.setItem("token", res.data.token);

        localStorage.setItem(
            "manager",
            JSON.stringify(res.data.manager)
        );

        toast.success("Manager Login Successful");

        setTimeout(() => {

            navigate("/dashboard");

        }, 1000);

    }

    else {

        const res = await API.post(
            "/auth/user/login",
            {
                email,
                password
            }
        );

        localStorage.setItem("token", res.data.token);

        localStorage.setItem(
            "user",
            JSON.stringify(res.data.user)
        );

        toast.success("User Login Successful");

        setTimeout(() => {

            navigate("/user/dashboard");

        }, 1000);

    }

}

catch (error) {

    toast.error(

        error.response?.data?.message ||

        "Login Failed"

    );

}

    };

    return (

        <div className="login-page">

            <ToastContainer />

            <div className="login-card">

                <h1 className="login-title">

                    Inventory Management

                </h1>

                <p className="login-subtitle">

                    Login To Continue

                </p>

                <div className="role-switch">

                    <button

                        type="button"

                        className={`role-btn ${role === "manager" ? "active" : ""}`}

                        onClick={() => setRole("manager")}

                    >

                        👨‍💼 Manager

                    </button>

                    <button

                        type="button"

                        className={`role-btn ${role === "user" ? "active" : ""}`}

                        onClick={() => setRole("user")}

                    >

                        👤 User

                    </button>

                </div>

                <form onSubmit={login}>

                    <div className="form-group">

                        <label>

                            Email

                        </label>

                        <input

                            type="email"

                            className="form-control"

                            value={email}

                            onChange={(e)=>setEmail(e.target.value)}

                            required

                        />

                    </div>

                    <div className="form-group">

                        <label>

                            Password

                        </label>

                        <input

                            type="password"

                            className="form-control"

                            value={password}

                            onChange={(e)=>setPassword(e.target.value)}

                            required

                        />

                    </div>

                    <button

                        className="login-button"

                    >

                        Login

                    </button>

                </form>

                <div className="bottom-links">

                    <p>

                        <Link to="/forgot-password">

                            Forgot Password?

                        </Link>

                    </p>

                    {

                        role==="user" &&

                        <p>

                            New User?

                            <Link to="/register">

                                Sign Up

                            </Link>

                        </p>

                    }

                </div>

            </div>

        </div>

    );

}

export default Login;