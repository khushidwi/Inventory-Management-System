import { Link, useNavigate } from "react-router-dom";

function UserLayout({ children }) {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const logout = () => {

        localStorage.removeItem("user");
        localStorage.removeItem("token");

        navigate("/");

    };

    return (

        <div className="d-flex">

            {/* Sidebar */}

            <div
                className="bg-dark text-white"
                style={{
                    width: "250px",
                    minHeight: "100vh"
                }}
            >

                <h2 className="text-center py-4">

                    Inventory

                </h2>

                <ul className="nav flex-column px-3">

                    <li className="nav-item mb-3">

                        <Link
                            to="/user/dashboard"
                            className="nav-link text-white"
                        >

                            🏠 Dashboard

                        </Link>

                    </li>

                    <li className="nav-item mb-3">

                        <Link
                            to="/user/products"
                            className="nav-link text-white"
                        >

                            📦 Products

                        </Link>

                    </li>

                    <li className="nav-item mb-3">

                        <Link
                            to="/user/cart"
                            className="nav-link text-white"
                        >

                            🛒 Cart

                        </Link>

                    </li>

                    <li className="nav-item mb-3">

                        <Link
                            to="/user/orders"
                            className="nav-link text-white"
                        >

                            📋 Orders

                        </Link>

                    </li>

                    <li className="nav-item mb-3">

                        <Link
                            to="/user/profile"
                            className="nav-link text-white"
                        >

                            👤 Profile

                        </Link>

                    </li>

                </ul>

                <div
                    className="p-3"
                    style={{
                        position: "absolute",
                        bottom: 0,
                        width: "250px"
                    }}
                >

                    <button
                        className="btn btn-danger w-100"
                        onClick={logout}
                    >

                        Logout

                    </button>

                </div>

            </div>

            {/* Main */}

            <div className="flex-grow-1">

                <nav className="navbar bg-white shadow-sm">

                    <div className="container-fluid">

                        <h3>

                            User Panel

                        </h3>
<div className="d-flex align-items-center">
const API_URL = "https://inventory-management-system-zpbq.onrender.com";
   <img
    src={
        user?.profileImage
            ? `${API_URL}/uploads/${user.profileImage}`
            : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }
    alt="profile"
    className="rounded-circle me-3"
    style={{
        width: "45px",
        height: "45px",
        objectFit: "cover"
    }}
/>

    <div>

        <h6 className="mb-0">

            Welcome,

            <span className="text-primary">

                {user?.name}

            </span>

        </h6>

        <small className="text-muted">

            {user?.email}

        </small>

    </div>

</div>

                    </div>

                </nav>

                <div className="p-4">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default UserLayout;