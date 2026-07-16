import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import API from "../services/api";
import StatCard from "../components/dashboard/StatCard";
import DashboardCharts from "../components/dashboard/DashboardCharts";

function Dashboard() {

    const [stats, setStats] = useState({
        
        totalProducts: 0,
        lowStock: 0,
        outOfStock: 0,
        inventoryValue: 0
    });
       const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {
        loadDashboard();
    }, []);


    const loadDashboard = async () => {

        try {

            const res = await API.get("/dashboard");

            setStats(res.data.dashboard);
            setRecentOrders(res.data.dashboard.recentOrders);

        }

        catch (error) {

            console.log(error);

        }

    };

    const today = new Date().toLocaleDateString("en-IN", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    const manager =
        JSON.parse(localStorage.getItem("manager")) || {};

    return (

        <Layout>

            {/* Welcome */}

            <div
                className="p-4 rounded-4 mb-4 text-white"
                style={{
                    background:
                        "linear-gradient(135deg,#0d6efd,#6610f2)"
                }}
            >

                <h2>

                    Welcome,

                    {manager.name || "Manager"} 👋

                </h2>

                <p className="mb-0">

                    Smart Inventory Management System

                </p>

                <small>

                    {today}

                </small>

            </div>

            {/* Cards */}

            <div className="row g-4">

                <div className="col-lg-3 col-md-6">

                    <StatCard
                        title="Total Products"
                        value={stats.totalProducts}
                        color="#0d6efd"
                    />

                </div>

                <div className="col-lg-3 col-md-6">

                    <StatCard
                        title="Low Stock"
                        value={stats.lowStock}
                        color="#ffc107"
                    />

                </div>

                <div className="col-lg-3 col-md-6">

                    <StatCard
                        title="Out Of Stock"
                        value={stats.outOfStock}
                        color="#dc3545"
                    />

                </div>

                <div className="col-lg-3 col-md-6">

                    <StatCard
                        title="Inventory Value"
                        value={`₹${stats.inventoryValue}`}
                        color="#198754"
                    />

                </div>

            </div>

            {/* Charts */}

            <div className="mt-5">

                <div className="card shadow border-0 rounded-4">

                    <div className="card-body">

                        <h4 className="mb-4">

                            Inventory Analytics

                        </h4>

                        <DashboardCharts stats={stats} />
                        <div className="card shadow mt-5">

    <div className="card-body">

        <h4 className="mb-4">

            Recent Orders

        </h4>

        <table className="table table-hover">

            <thead>

                <tr>

                    <th>Customer</th>

                    <th>Total</th>

                    <th>Status</th>

                    <th>Date</th>

                </tr>

            </thead>

            <tbody>

                {

                    recentOrders.length > 0 ?

                    recentOrders.map(order => (

                        <tr key={order._id}>

                            <td>

                                {order.customer?.name}

                            </td>

                            <td>

                                ₹{order.totalAmount}

                            </td>

                            <td>

                                <span className="badge bg-success">

                                    {order.orderStatus}

                                </span>

                            </td>

                            <td>

                                {

                                    new Date(order.createdAt)

                                    .toLocaleDateString()

                                }

                            </td>

                        </tr>

                    ))

                    :

                    <tr>

                        <td
                            colSpan="4"
                            className="text-center"
                        >

                            No Orders Yet

                        </td>

                    </tr>

                }

            </tbody>

        </table>

    </div>

</div>

                    </div>

                </div>

            </div>

            {/* Quick Summary */}

            <div className="row mt-5">

                <div className="col-md-6">

                    <div className="card shadow border-0">

                        <div className="card-body">

                            <h5 className="mb-3">

                                📊 Quick Summary

                            </h5>

                            <ul className="list-group">

                                <li className="list-group-item">

                                    Total Products :

                                    <strong className="float-end">

                                        {stats.totalProducts}

                                    </strong>

                                </li>

                                <li className="list-group-item">

                                    Low Stock :

                                    <strong className="float-end text-warning">

                                        {stats.lowStock}

                                    </strong>

                                </li>

                                <li className="list-group-item">

                                    Out Of Stock :

                                    <strong className="float-end text-danger">

                                        {stats.outOfStock}

                                    </strong>

                                </li>

                                <li className="list-group-item">

                                    Inventory Value :

                                    <strong className="float-end text-success">

                                        ₹{stats.inventoryValue}

                                    </strong>

                                </li>

                            </ul>

                        </div>

                    </div>

                </div>

                <div className="col-md-6">

                    <div className="card shadow border-0">

                        <div className="card-body">

                            <h5>

                                🚀 System Status

                            </h5>

                            <hr />

                            <p>

                                ✅ Inventory Module Running

                            </p>

                            <p>

                                ✅ Orders Module Running

                            </p>

                            <p>

                                ✅ User Module Running

                            </p>

                            <p>

                                ✅ Database Connected

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>

    );

}

export default Dashboard;