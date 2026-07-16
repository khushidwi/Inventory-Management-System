import { useState, useEffect } from "react";
import { updateOrder } from "../../services/orderService";
import { toast } from "react-toastify";

function OrderModal({ show, onClose, order, refresh }) {

    const [status, setStatus] = useState("");

    useEffect(() => {

        if (order) {

            setStatus(order.orderStatus);

        }

    }, [order]);

    if (!show || !order) return null;

    const handleUpdate = async () => {

        try {

            await updateOrder(order._id, {

                orderStatus: status

            });

            toast.success("Order Status Updated Successfully");

            refresh();

            onClose();

        }

        catch (error) {

            toast.error(

                error.response?.data?.message ||

                "Failed To Update Order"

            );

        }

    };

    return (

        <div
            className="modal d-block"
            style={{
                background: "rgba(0,0,0,0.5)"
            }}
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5>Update Order Status</h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        ></button>

                    </div>

                    <div className="modal-body">

                        <p>

                            <strong>Customer :</strong>{" "}

                            {order.customer?.name}

                        </p>

                        <p>

                            <strong>Total :</strong> ₹{order.totalAmount}

                        </p>

                        <div className="mb-3">

                            <label className="form-label">

                                Order Status

                            </label>

                            <select
                                className="form-select"
                                value={status}
                                onChange={(e) =>
                                    setStatus(e.target.value)
                                }
                            >

                                <option>Pending</option>

                                <option>Confirmed</option>

                                <option>Packed</option>

                                <option>Shipped</option>

                                <option>Delivered</option>

                                <option>Cancelled</option>

                            </select>

                        </div>

                    </div>

                    <div className="modal-footer">

                        <button
                            className="btn btn-secondary"
                            onClick={onClose}
                        >

                            Cancel

                        </button>

                        <button
                            className="btn btn-success"
                            onClick={handleUpdate}
                        >

                            Update Status

                        </button>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default OrderModal;