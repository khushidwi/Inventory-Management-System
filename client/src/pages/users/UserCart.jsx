import UserLayout from "../../components/layout/UserLayout";
import { useEffect, useState } from "react";
import {

    getCart,

    updateCart,

    removeCartItem

} from "../../services/cartService";
import { useNavigate } from "react-router-dom";

function UserCart() {

    const [cart, setCart] = useState(null);

    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        const fetchCart = async () => {

            setLoading(true);

            try {

                const user = JSON.parse(localStorage.getItem("user"));

                if (!user) {

                    setLoading(false);

                    return;

                }

                const res = await getCart(user.id);

                // IMPORTANT FIX
                setCart(res.data.cart);

            }

            catch (error) {

                console.error("Error fetching cart:", error);

            }

            finally {

                setLoading(false);

            }

        };

        fetchCart();

    }, []);
    const increaseQuantity = async (item) => {

    try {

        const user = JSON.parse(localStorage.getItem("user"));

        await updateCart({

            user: user.id,

            product: item.product._id,

            quantity: item.quantity + 1

        });

        window.location.reload();

    }

    catch (error) {

        console.log(error);

    }

};

const decreaseQuantity = async (item) => {

    try {

        if (item.quantity === 1) return;

        const user = JSON.parse(localStorage.getItem("user"));

        await updateCart({

            user: user.id,

            product: item.product._id,

            quantity: item.quantity - 1

        });

        window.location.reload();

    }

    catch (error) {

        console.log(error);

    }

};

const removeItem = async (item) => {

    try {

        const user = JSON.parse(localStorage.getItem("user"));

        await removeCartItem({

            user: user.id,

            product: item.product._id

        });

        window.location.reload();

    }

    catch (error) {

        console.log(error);

    }

};

    return (

        <UserLayout>

            <div className="container">

                <h2 className="mb-4">

                    🛒 My Shopping Cart

                </h2>

                <div className="card shadow">

                    <div className="card-body">

                        <table className="table table-bordered table-hover">

                            <thead className="table-dark">

                                <tr>

                                    <th>Product</th>

                                    <th>Price</th>

                                    <th>Quantity</th>

                                    <th>Total</th>

                                    <th>Action</th>

                                </tr>

                            </thead>

                            <tbody>

                                {

                                    loading ? (

                                        <tr>

                                            <td
                                                colSpan="5"
                                                className="text-center"
                                            >

                                                Loading...

                                            </td>

                                        </tr>

                                    ) :

                                    cart?.items?.length > 0 ? (

                                        cart.items.map((item) => (

                                            <tr key={item.product._id}>

                                                <td>

                                                    {item.product.productName}

                                                </td>

                                                <td>

                                                    ₹{item.product.price}

                                                </td>

                       <td>

    <div className="d-flex justify-content-center align-items-center gap-2">

        <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => decreaseQuantity(item)}
        >
            -
        </button>

        <strong>{item.quantity}</strong>

        <button
            className="btn btn-outline-success btn-sm"
            onClick={() => increaseQuantity(item)}
        >
            +
        </button>

    </div>

</td>

                                                <td>

                                                    ₹{item.product.price * item.quantity}

                                                </td>

                                                <td>

                <button

    className="btn btn-danger btn-sm"

    onClick={() => removeItem(item)}

>

    Remove

</button>

                                                </td>

                                            </tr>

                                        ))

                                    ) : (

                                        <tr>

                                            <td
                                                colSpan="5"
                                                className="text-center"
                                            >

                                                No Products In Cart

                                            </td>

                                        </tr>

                                    )

                                }

                            </tbody>

                        </table>

                    </div>

                </div>

                <div className="card mt-4 shadow">

                    <div className="card-body">

                        <h4>

                            Grand Total :

                            <span className="text-success">

                                {

                                    cart?.items

                                        ? " ₹" +

                                          cart.items.reduce(

                                              (total, item) =>

                                                  total +

                                                  item.product.price *

                                                  item.quantity,

                                              0

                                          )

                                        : " ₹0"

                                }

                            </span>

                        </h4>

                        <button

                            className="btn btn-success mt-3"

                            onClick={() => navigate("/user/checkout")}

                        >

                            Proceed To Checkout

                        </button>

                    </div>

                </div>

            </div>

        </UserLayout>

    );

}

export default UserCart;