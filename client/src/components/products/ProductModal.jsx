import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { addProduct, updateProduct } from "../../services/productService";

function ProductModal({ show, onClose, refresh,product }) {

    const [formData, setFormData] = useState({

        productName: "",
        category: "",
        price: "",
        quantity: "",
        status: "In Stock"

    });
    useEffect(() => {

    if (product) {

        setFormData({

            productName: product.productName || "",
            category: product.category || "",
            price: product.price || "",
            quantity: product.quantity || "",
            status: product.status || "In Stock"

        });

    }

    else {

        setFormData({

            productName: "",
            category: "",
            price: "",
            quantity: "",
            status: "In Stock"

        });

    }

}, [product]);

    const handleChange = (e) => {

        setFormData({

            ...formData,
            [e.target.name]: e.target.value

        });

    };

    const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        if (product) {

            await updateProduct(product._id, formData);

            toast.success("Product Updated Successfully");

        }

        else {

            await addProduct(formData);

            toast.success("Product Added Successfully");

        }

        refresh();

        onClose();

    }

    catch (error) {

        toast.error(
            error.response?.data?.message ||
            "Something went wrong"
        );

    }

};

    if (!show) return null;

    return (

        <div
            className="modal d-block"
            style={{ background: "rgba(0,0,0,0.5)" }}
        >

            <div className="modal-dialog">

                <div className="modal-content">

                    <div className="modal-header">

                        <h5>{product ? "Edit Product" : "Add Product"}</h5>

                        <button
                            className="btn-close"
                            onClick={onClose}
                        ></button>

                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="modal-body">

                            <input
                                className="form-control mb-3"
                                placeholder="Product Name"
                                name="productName"
                                value={formData.productName}
                                onChange={handleChange}
                                required
                            />

                            <input
                                className="form-control mb-3"
                                placeholder="Category"
                                name="category"
                                value={formData.category}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="number"
                                className="form-control mb-3"
                                placeholder="Price"
                                name="price"
                                value={formData.price}
                                onChange={handleChange}
                                required
                            />

                            <input
                                type="number"
                                className="form-control mb-3"
                                placeholder="Quantity"
                                name="quantity"
                                value={formData.quantity}
                                onChange={handleChange}
                                required
                            />

                        </div>

                        <div className="modal-footer">

                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={onClose}
                            >

                                Cancel

                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary"
                            >

                                {product ? "Update Product" : "Save Product"}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default ProductModal;