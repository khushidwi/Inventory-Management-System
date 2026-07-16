import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getCart, clearCart } from "../../services/cartService";
import UserLayout from "../../components/layout/UserLayout";
import { createOrder } from "../../services/orderService";

function UserCheckout() {

    const navigate = useNavigate();

    const user = JSON.parse(localStorage.getItem("user"));

    const [fullName, setFullName] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
const placeOrder = async () => {

    if (!fullName || !phone || !address) {

        toast.error("Please fill all details");

        return;

    }

    try {

        const cartResponse = await getCart(user.id);

        const cart = cartResponse.data.cart;

        if (!cart || !cart.items || cart.items.length === 0) {

            toast.error("Your cart is empty");

            return;

        }

        const products = cart.items.map(item => ({

            product: item.product._id,

            quantity: item.quantity

        }));

        const totalAmount = cart.items.reduce(

            (sum, item) =>

                sum + (item.product.price * item.quantity),

            0

        );

        await createOrder({

            customer: user.id,

            products,

            totalAmount,

            orderStatus: "Pending",

            paymentStatus: paymentMethod === "Cash On Delivery"
                ? "Pending"
                : "Paid"

        });

        await clearCart(user.id);

        toast.success("Order Placed Successfully");

        setTimeout(() => {

            navigate("/user/orders");

        }, 1500);

    }

    catch (error) {

        console.log(error);

        toast.error(

            error.response?.data?.message ||

            "Failed To Place Order"

        );

    }

};

    return (

        <UserLayout>

            <div className="container mt-4">

                <div className="card shadow">

                    <div className="card-body p-4">

                        <h2 className="mb-4">

                            💳 Checkout

                        </h2>

                        <div className="mb-3">

                            <label className="form-label">

                                Full Name

                            </label>

                            <input

                                type="text"

                                className="form-control"

                                value={fullName}

                                onChange={(e) =>

                                    setFullName(e.target.value)

                                }

                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                Phone Number

                            </label>

                            <input

                                type="text"

                                className="form-control"

                                value={phone}

                                onChange={(e) =>

                                    setPhone(e.target.value)

                                }

                            />

                        </div>

                        <div className="mb-3">

                            <label className="form-label">

                                Delivery Address

                            </label>

                            <textarea

                                rows="4"

                                className="form-control"

                                value={address}

                                onChange={(e) =>

                                    setAddress(e.target.value)

                                }

                            />

                        </div>

                        <div className="mb-4">

                            <label className="form-label">

                                Payment Method

                            </label>

                            <select

                                className="form-select"

                                value={paymentMethod}

                                onChange={(e) =>

                                    setPaymentMethod(e.target.value)

                                }

                            >

                                <option>Cash On Delivery</option>

                                <option>UPI</option>

                                <option>Debit Card</option>

                                <option>Credit Card</option>

                            </select>

                        </div>

                        <button

                            className="btn btn-success w-100"

                            onClick={placeOrder}

                        >

                            Place Order

                        </button>

                    </div>

                </div>

            </div>

        </UserLayout>

    );

}

export default UserCheckout;