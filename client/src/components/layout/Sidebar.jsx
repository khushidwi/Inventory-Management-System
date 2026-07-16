import { Link, useNavigate } from "react-router-dom";
import {
    FaTachometerAlt,
    FaBoxOpen,
    FaList,
    FaTruck,
    FaShoppingCart,
    FaChartBar,
    FaHistory,
    FaUserCircle,
    FaSignOutAlt
} from "react-icons/fa";

function Sidebar() {

    const navigate = useNavigate();

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("manager");

        navigate("/login");

    };

    return (

        <div
            className="bg-dark text-white d-flex flex-column justify-content-between"
            style={{
                width: "250px",
                minHeight: "100vh"
            }}
        >

            <div>

                <h3 className="text-center py-4">
                    Inventory
                </h3>

                <ul className="nav flex-column">

                    <li className="nav-item mb-3">
                        <Link className="nav-link text-white" to="/dashboard">
                            <FaTachometerAlt /> Dashboard
                        </Link>
                    </li>

                    <li className="nav-item mb-3">
                        <Link className="nav-link text-white" to="/products">
                            <FaBoxOpen /> Products
                        </Link>
                    </li>

                    <li className="nav-item mb-3">
                        <Link className="nav-link text-white" to="/categories">
                            <FaList /> Categories
                        </Link>
                    </li>

                    <li className="nav-item mb-3">
                        <Link className="nav-link text-white" to="/suppliers">
                            <FaTruck /> Suppliers
                        </Link>
                    </li>

                    <li className="nav-item mb-3">
                        <Link className="nav-link text-white" to="/orders">
                            <FaShoppingCart /> Orders
                        </Link>
                    </li>

                    <li className="nav-item mb-3">
                        <Link className="nav-link text-white" to="/reports">
                            <FaChartBar /> Reports
                        </Link>
                    </li>

                    <li className="nav-item mb-3">
                        <Link className="nav-link text-white" to="/activity">
                            <FaHistory /> Activity
                        </Link>
                    </li>

                </ul>

            </div>

            <div className="p-3 border-top border-secondary">

                <ul className="nav flex-column">

                    <li className="nav-item mb-3">
                        <Link className="nav-link text-white" to="/profile">
                            <FaUserCircle /> Profile
                        </Link>
                    </li>

                    <li className="nav-item">
                        <button
                            className="btn btn-danger w-100"
                            onClick={logout}
                        >
                            <FaSignOutAlt /> Logout
                        </button>
                    </li>

                </ul>

            </div>

        </div>

    );

}

export default Sidebar;