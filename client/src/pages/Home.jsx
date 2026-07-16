import "./../styles/Home.css";
import { useNavigate } from "react-router-dom";
import { FaBoxes, FaTruck, FaChartBar } from "react-icons/fa";

function Home() {

    const navigate = useNavigate();

    return (

        <div className="home">

            {/* Floating Background Circles */}

            <div className="circle circle1"></div>
            <div className="circle circle2"></div>
            <div className="circle circle3"></div>

            <div className="overlay">

                <div className="card-home">

                    <div className="badge-home">

                        SMART INVENTORY SOFTWARE

                    </div>

                    <h1 className="title">

                        Inventory Management System

                    </h1>

                    <p className="subtitle">

                        Manage Products, Orders, Suppliers and Reports
                        from one powerful dashboard.

                    </p>

                    <div className="icons">

                        <div className="icon-card">

                            <FaBoxes className="icon" />

                            <div className="icon-title">

                                Products

                            </div>

                        </div>

                        <div className="icon-card">

                            <FaTruck className="icon" />

                            <div className="icon-title">

                                Suppliers

                            </div>

                        </div>

                        <div className="icon-card">

                            <FaChartBar className="icon" />

                            <div className="icon-title">

                                Reports

                            </div>

                        </div>

                    </div>

                    <div className="buttons">

                        <button
                            className="login"
                            onClick={() => navigate("/login")}
                        >

                            Login

                        </button>

                        <button
                            className="signup"
                            onClick={() => navigate("/register")}
                        >

                            Sign Up

                        </button>

                    </div>

                </div>

            </div>
            {/* =======================
      Statistics Section
======================= */}

<div className="stats-section">

    <h2 className="stats-heading">

        Trusted By Businesses Worldwide

    </h2>

    <div className="stats-container">

        <div className="stat-card">

            <h1>5000+</h1>

            <p>Products Managed</p>

        </div>

        <div className="stat-card">

            <h1>1200+</h1>

            <p>Happy Customers</p>

        </div>

        <div className="stat-card">

            <h1>99.9%</h1>

            <p>Secure Platform</p>

        </div>

        <div className="stat-card">

            <h1>24/7</h1>

            <p>Support</p>

        </div>

    </div>
    {/* ==========================
        Features Section
========================== */}

<div className="features-section">

    <h2 className="features-title">

        Why Choose Our System

    </h2>

    <p className="features-subtitle">

        Everything you need to manage your inventory efficiently.

    </p>

    <div className="features-grid">

        <div className="feature-card">

            <h3>📦</h3>

            <h4>Product Management</h4>

            <p>

                Add update search and manage products easily.

            </p>

        </div>

        <div className="feature-card">

            <h3>🛒</h3>

            <h4>Order Management</h4>

            <p>

                Track customer orders with real-time updates.

            </p>

        </div>

        <div className="feature-card">

            <h3>🚚</h3>

            <h4>Supplier Management</h4>

            <p>

                Maintain supplier information and stock flow.

            </p>

        </div>

        <div className="feature-card">

            <h3>📊</h3>

            <h4>Reports</h4>

            <p>

                Generate sales and inventory reports instantly.

            </p>

        </div>

        <div className="feature-card">

            <h3>👤</h3>

            <h4>User Dashboard</h4>

            <p>

                Dedicated dashboard for every registered user.

            </p>

        </div>

        <div className="feature-card">

            <h3>🔒</h3>

            <h4>Secure Login</h4>

            <p>

                JWT authentication keeps your data protected.

            </p>

        </div>

    </div>

</div>

</div>
{/* ==========================
      WHY CHOOSE US
========================== */}

<div className="why-section">

    <h2 className="why-title">

        Why Businesses Love Us

    </h2>

    <p className="why-subtitle">

        Designed to simplify inventory management and improve productivity.

    </p>

    <div className="why-grid">

        <div className="why-box">

            <span>✔</span>

            <h4>Easy To Use</h4>

            <p>
                Clean interface for beginners and professionals.
            </p>

        </div>

        <div className="why-box">

            <span>⚡</span>

            <h4>Fast Performance</h4>

            <p>
                Optimized for speed and quick navigation.
            </p>

        </div>

        <div className="why-box">

            <span>🔒</span>

            <h4>Secure Authentication</h4>

            <p>
                JWT based login keeps your account protected.
            </p>

        </div>

        <div className="why-box">

            <span>📈</span>

            <h4>Real Time Reports</h4>

            <p>
                Monitor inventory and sales instantly.
            </p>

        </div>

    </div>

</div>
{/* ==========================
            FOOTER
========================== */}

<footer className="footer">

    <div className="footer-container">

        <div className="footer-column">

            <h2>

                Inventory Management

            </h2>

            <p>

                Smart Inventory Solution for managing products,
                suppliers, orders and reports.

            </p>

        </div>

        <div className="footer-column">

            <h3>

                Quick Links

            </h3>

            <ul>

                <li
                    onClick={() => navigate("/")}
                >

                    Home

                </li>

                <li
                    onClick={() => navigate("/login")}
                >

                    Login

                </li>

                <li
                    onClick={() => navigate("/register")}
                >

                    Sign Up

                </li>

            </ul>

        </div>

        <div className="footer-column">

            <h3>

                Contact

            </h3>

            <p>

                📧 inventory@gmail.com

            </p>

            <p>

                📞 +91 98765 43210

            </p>

            <p>

                📍 India

            </p>

        </div>

    </div>

    <hr />

    <div className="copyright">

        © 2026 Inventory Management System.
        All Rights Reserved.

    </div>

</footer>

        </div>

    );

}


export default Home;