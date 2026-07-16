import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import jsPDF from "jspdf";

import {
    getReportStats,
    getLowStockReport
} from "../services/reportService";

function Reports() {

    const [stats, setStats] = useState({

        totalProducts: 0,
        totalOrders: 0,
        totalRevenue: 0,
        lowStockProducts: 0

    });

    const [lowStock, setLowStock] = useState([]);

    useEffect(() => {

        loadReportStats();
        loadLowStock();

    }, []);

    const loadReportStats = async () => {

        try {

            const res = await getReportStats();

            setStats(res.data);

        }

        catch (error) {

            console.log(error);

        }

    };

    const loadLowStock = async () => {

        try {

            const res = await getLowStockReport();

            setLowStock(res.data.products);

        }

        catch (error) {

            console.log(error);

        }

    };
    const exportPDF = () => {

    const doc = new jsPDF();

    doc.setFontSize(18);

    doc.text("Inventory Management Report", 20, 20);

    doc.setFontSize(12);

    doc.text(`Total Products : ${stats.totalProducts}`, 20, 40);

    doc.text(`Total Orders : ${stats.totalOrders}`, 20, 50);

    doc.text(`Total Revenue : ₹${stats.totalRevenue}`, 20, 60);

    doc.text(`Low Stock Products : ${stats.lowStockProducts}`, 20, 70);

    doc.text(
        `Generated On : ${new Date().toLocaleString()}`,
        20,
        90
    );

    doc.save("Inventory_Report.pdf");

};

    return (

        <Layout>

            <div className="d-flex justify-content-between align-items-center mb-4">

    <h2>

        Reports

    </h2>

    <button

        className="btn btn-danger"

        onClick={exportPDF}

    >

        Export PDF

    </button>

</div>

            <div className="row">

                <div className="col-md-3 mb-3">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h5>Total Products</h5>

                            <h2>{stats.totalProducts}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-3">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h5>Total Orders</h5>

                            <h2>{stats.totalOrders}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-3">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h5>Total Revenue</h5>

                            <h2>₹{stats.totalRevenue}</h2>

                        </div>

                    </div>

                </div>

                <div className="col-md-3 mb-3">

                    <div className="card shadow text-center">

                        <div className="card-body">

                            <h5>Low Stock Products</h5>

                            <h2>{stats.lowStockProducts}</h2>

                        </div>

                    </div>

                </div>

            </div>

            <div className="card shadow mt-4">

                <div className="card-header">

                    <h5>

                        Low Stock Products List

                    </h5>

                </div>

                <div className="card-body">

                    <table className="table table-hover">

                        <thead>

                            <tr>

                                <th>Product Name</th>

                                <th>Category</th>

                                <th>Price</th>

                                <th>Quantity</th>

                                <th>Status</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                lowStock.length === 0 ?

                                (

                                    <tr>

                                        <td
                                            colSpan="5"
                                            className="text-center"
                                        >

                                            No Low Stock Products

                                        </td>

                                    </tr>

                                )

                                :

                                (

                                    lowStock.map((product) => (

                                        <tr key={product._id}>

                                            <td>{product.productName}</td>

                                            <td>{product.category}</td>

                                            <td>₹{product.price}</td>

                                            <td>{product.quantity}</td>

                                            <td>

                                                <span className="badge bg-warning text-dark">

                                                    {product.status}

                                                </span>

                                            </td>

                                        </tr>

                                    ))

                                )

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </Layout>

    );

}

export default Reports;