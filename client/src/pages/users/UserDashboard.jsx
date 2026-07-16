import { useEffect, useState } from "react";
import UserLayout from "../../components/layout/UserLayout";
import { getProducts } from "../../services/productService";
import { getCart } from "../../services/cartService";
import { getUserOrders } from "../../services/userorderService";

function UserDashboard() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [productCount, setProductCount] = useState(0);
    const [cartCount, setCartCount] = useState(0);
    const [orderCount, setOrderCount] = useState(0);
    const [recentOrders, setRecentOrders] = useState([]);

    useEffect(() => {

        loadDashboard();

    }, []);

    const loadDashboard = async () => {

        try {

            // Products
            const products = await getProducts();
            setProductCount(products.data.products.length);

            // Cart
            try {

                const cart = await getCart(user.id);

                setCartCount(
                    cart.data.cart?.items?.length || 0
                );

            } catch {

                setCartCount(0);

            }

            // Orders
            try {

                const orders = await getUserOrders(user.id);

                setOrderCount(
                    orders.data.orders.length
                );

                setRecentOrders(
                    orders.data.orders.slice(0,5)
                );

            } catch {

                setOrderCount(0);

            }

        }

        catch (error) {

            console.log(error);

        }

    };

    return (

        <UserLayout>

            <div className="container-fluid">

                <h2 className="mb-2">

                    👋 Welcome,
                    <span className="text-primary">
                        {" "}{user?.name}
                    </span>

                </h2>

                <p className="text-muted mb-4">

                    Smart Inventory Management System

                </p>

                <div className="row">

                    <div className="col-md-4 mb-4">

                        <div className="card shadow border-0">

                            <div className="card-body text-center">

                                <h1>📦</h1>

                                <h5>Total Products</h5>

                                <h2 className="text-primary">

                                    {productCount}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4 mb-4">

                        <div className="card shadow border-0">

                            <div className="card-body text-center">

                                <h1>🛒</h1>

                                <h5>Items In Cart</h5>

                                <h2 className="text-success">

                                    {cartCount}

                                </h2>

                            </div>

                        </div>

                    </div>

                    <div className="col-md-4 mb-4">

                        <div className="card shadow border-0">

                            <div className="card-body text-center">

                                <h1>📋</h1>

                                <h5>My Orders</h5>

                                <h2 className="text-danger">

                                    {orderCount}

                                </h2>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="card shadow mt-3">

                    <div className="card-header bg-primary text-white">

                        <h5 className="mb-0">

                            Recent Orders

                        </h5>

                    </div>

                    <div className="card-body">

                        {

                            recentOrders.length > 0 ?

                            (

                                <table className="table table-hover">

                                    <thead>

                                        <tr>

                                            <th>Order ID</th>

                                            <th>Total</th>

                                            <th>Status</th>

                                            <th>Date</th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {

                                            recentOrders.map(order => (

                                                <tr key={order._id}>

                                                    <td>

                                                        {order._id.slice(-6)}

                                                    </td>

                                                    <td>

                                                        ₹{order.totalAmount}

                                                    </td>

                                                    <td>

                                                        <span className="badge bg-warning">

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

                                        }

                                    </tbody>

                                </table>

                            )

                            :

                            (

                                <h5 className="text-center text-muted">

                                    No Orders Yet

                                </h5>

                            )

                        }

                    </div>

                </div>

            </div>

        </UserLayout>

    );

}

export default UserDashboard;