import { useEffect, useState } from "react";
import {
    getOrders,
    searchOrders,
    deleteOrder
} from "../services/orderService";

import { toast } from "react-toastify";
import Layout from "../components/layout/Layout";
//import { getOrders } from "../services/orderService";
import OrderModal from "../components/orders/OrderModal";



function Orders() {

    const [orders, setOrders] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);
const [search, setSearch] = useState("");

const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {

        loadOrders();

    }, []);

    const loadOrders = async () => {

        try {

            const res = await getOrders();

            setOrders(res.data.orders);

        }

        catch (error) {

            console.log(error);

        }

    };
    const handleSearch = async (value) => {

    setSearch(value);

    if (value === "") {

        loadOrders();

        return;

    }

    try {

        const res = await searchOrders(value);

        setOrders(res.data.orders);

    }

    catch (error) {

        console.log(error);

    }

};
const handleDelete = async (id) => {

    const confirmDelete = window.confirm(

        "Delete this Order?"

    );

    if (!confirmDelete) return;

    try {

        await deleteOrder(id);

        toast.success(

            "Order Deleted Successfully"

        );

        loadOrders();

    }

    catch (error) {

        toast.error(

            error.response?.data?.message ||

            "Delete Failed"

        );

    }

};

    return (

        <Layout>

     <div className="d-flex justify-content-between align-items-center mb-4">

    <h2>

        Orders

    </h2>

</div>

<div className="row mb-3">

    <div className="col-md-6">

        <input

            className="form-control"

            placeholder="Search Orders"

            value={search}

            onChange={(e) =>

                handleSearch(e.target.value)

            }

        />

    </div>

    <div className="col-md-3">

        <select

            className="form-select"

            value={statusFilter}

            onChange={(e) =>

                setStatusFilter(e.target.value)

            }

        >

            <option value="All">All</option>

            <option value="Pending">Pending</option>

            <option value="Confirmed">Confirmed</option>

            <option value="Packed">Packed</option>

            <option value="Shipped">Shipped</option>

            <option value="Delivered">Delivered</option>

            <option value="Cancelled">Cancelled</option>

        </select>

    </div>

</div>

            <div className="card shadow">

                <div className="card-body">

                    <table className="table table-hover">

                        <thead>

                            <tr>

                                <th>Customer</th>

                                <th>Total Amount</th>

                                <th>Order Status</th>

                                <th>Payment</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                orders.length === 0 ?

                                (

                                    <tr>

                                        <td colSpan="5" className="text-center">

                                            No Orders Found

                                        </td>

                                    </tr>

                                )

                                :

                                (
orders

.filter((order) =>

    statusFilter === "All"

    ||

    order.orderStatus === statusFilter

)

.map((order) => (

                                        <tr key={order._id}>

                                            <td>

                                                {order.customer?.name || "N/A"}

                                            </td>

                                            <td>

                                                ₹{order.totalAmount}

                                            </td>

                   <td>

<span
className={`badge ${
order.orderStatus === "Pending"
? "bg-warning"

: order.orderStatus === "Confirmed"
? "bg-primary"

: order.orderStatus === "Packed"
? "bg-info"

: order.orderStatus === "Shipped"
? "bg-secondary"

: order.orderStatus === "Delivered"
? "bg-success"

: "bg-danger"
}`}
>

{order.orderStatus}

</span>

</td>

                                            <td>

                                                {order.paymentStatus}

                                            </td>

                                            <td>

                       <button
    className="btn btn-warning btn-sm me-2"
    onClick={() => {

        setSelectedOrder(order);

        setShowModal(true);

    }}
>

    Update Status

</button>
<button
    className="btn btn-danger btn-sm"
    onClick={() => handleDelete(order._id)}
>
    Delete
</button>

                                            </td>

                                        </tr>

                                    ))

                                )

                            }

                        </tbody>

                    </table>

                </div>

            </div>
   <OrderModal
    show={showModal}
    order={selectedOrder}
    refresh={loadOrders}
    onClose={() => {

        setShowModal(false);

        setSelectedOrder(null);

    }}
/>

        </Layout>

    );

}

export default Orders;