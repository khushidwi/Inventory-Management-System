import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Categories from "./pages/Categories";
import Suppliers from "./pages/Suppliers";
import Orders from "./pages/Orders";
import Reports from "./pages/Reports";
import Activity from "./pages/Activity";
import Profile from "./pages/Profile";
import UserProducts from "./pages/users/UserProducts";
import UserCart from "./pages/users/UserCart";
import UserDashboard from "./pages/users/UserDashboard";
import UserLayout from "./components/layout/UserLayout";
import UserCheckout from "./pages/users/UserCheckout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserOrders from "./pages/users/UserOrders";
import UserProfile from "./pages/users/UserProfile";
import Home from "./pages/Home";
import ProtectedManagerRoute from "./routes/ProtectedManagerRoute";
import ProtectedUserRoute from "./routes/ProtectedUserRoute";

function App() {

    return (

        <BrowserRouter>

            <Routes>

                {/* ==========================
                    MANAGER ROUTES
                ========================== */}
<Route path="/" element={<Home />} />

                <Route path="/login" element={<Login />} />

                <Route path="/register" element={<Register />} />

                <Route
    path="/dashboard"
    element={
        <ProtectedManagerRoute>
            <Dashboard />
        </ProtectedManagerRoute>
    }
/>

               <Route
    path="/products"
    element={
        <ProtectedManagerRoute>
            <Products />
        </ProtectedManagerRoute>
    }
/>

              <Route
    path="/categories"
    element={
        <ProtectedManagerRoute>
            <Categories />
        </ProtectedManagerRoute>
    }
/>
<Route
    path="/suppliers"
    element={
        <ProtectedManagerRoute>
            <Suppliers />
        </ProtectedManagerRoute>
    }
/>

                <Route
    path="/orders"
    element={
        <ProtectedManagerRoute>
            <Orders />
        </ProtectedManagerRoute>
    }
/>

              <Route
    path="/reports"
    element={
        <ProtectedManagerRoute>
            <Reports />
        </ProtectedManagerRoute>
    }
/>
<Route
    path="/activity"
    element={
        <ProtectedManagerRoute>
            <Activity />
        </ProtectedManagerRoute>
    }
/>
<Route
    path="/profile"
    element={
        <ProtectedManagerRoute>
            <Profile />
        </ProtectedManagerRoute>
    }
/>


                {/* ==========================
                    USER ROUTES
                ========================== */}
<Route
    path="/user/dashboard"
    element={
        <ProtectedUserRoute>
            <UserDashboard />
        </ProtectedUserRoute>
    }
/>
<Route
    path="/user/products"
    element={
        <ProtectedUserRoute>
            <UserProducts />
        </ProtectedUserRoute>
    }
/>

<Route
    path="/user/cart"
    element={
        <ProtectedUserRoute>
            <UserCart />
        </ProtectedUserRoute>
    }
/>

         <Route
    path="/user/checkout"
    element={
        <ProtectedUserRoute>
            <UserCheckout />
        </ProtectedUserRoute>
    }
/>
<Route
    path="/user/orders"
    element={
        <ProtectedUserRoute>
            <UserOrders />
        </ProtectedUserRoute>
    }
/>

<Route
    path="/user/profile"
    element={
        <ProtectedUserRoute>
            <UserProfile />
        </ProtectedUserRoute>
    }
/>

            </Routes>


            <ToastContainer
                position="top-right"
                autoClose={3000}
            />

        </BrowserRouter>

    );

}

export default App;