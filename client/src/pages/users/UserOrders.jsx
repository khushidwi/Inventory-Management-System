import { useEffect, useState } from "react";
import UserLayout from "../../components/layout/UserLayout";
import { getUserOrders } from "../../services/userorderService";

function UserOrders() {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        loadOrders();

    }, []);

    const loadOrders = async () => {

        try {

            // Temporary User ID
            // Will be replaced after Login module

            const user = JSON.parse(localStorage.getItem("user"));

const userId = user.id;

            const res = await getUserOrders(userId);

            setOrders(res.data.orders);

        }

        catch (error) {

            console.log(error);

        }

        finally {

            setLoading(false);

        }

    };

    return (

        <UserLayout>

            <div className="container">

                <h2 className="mb-4">

                    📦 My Orders

                </h2>

                <div className="card shadow">

                    <div className="card-body">

                        <table className="table table-bordered table-hover">

                            <thead className="table-dark">

                                <tr>

                                    <th>Order ID</th>

                                    <th>Date</th>

                                    <th>Total</th>

                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    loading ? (

                                        <tr>

                                            <td
                                                colSpan="4"
                                                className="text-center"
                                            >

                                                Loading...

                                            </td>

                                        </tr>

                                    ) : orders.length > 0 ? (

                                        orders.map((order) => (

                                            <tr key={order._id}>

                                                <td>

                                                    {order._id.slice(-6)}

                                                </td>

                                                <td>

                                                    {
                                                        new Date(order.createdAt)
                                                            .toLocaleDateString()
                                                    }

                                                </td>

                                                <td>

                                                    ₹{order.totalAmount}

                                                </td>

                                                <td>

                                                    <span className="badge bg-warning">

                                                        {order.orderStatus}

                                                    </span>

                                                </td>

                                            </tr>

                                        ))

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="4"
                                                className="text-center"
                                            >

                                                No Orders Found

                                            </td>

                                        </tr>

                                    )

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

        </UserLayout>

    );

}

export default UserOrders;