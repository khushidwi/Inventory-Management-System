import { useEffect, useState } from "react";
import UserLayout from "../../components/layout/UserLayout";
import { getProducts } from "../../services/productService";
import { addToCart } from "../../services/cartService";
import { toast } from "react-toastify";
function UserProducts() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = async () => {
        const res = await getProducts();
        setProducts(res.data.products);
    };

    const handleAddToCart = async (productId) => {

    try {

        const user = JSON.parse(localStorage.getItem("user"));

        console.log("User Object:", user);

        const data = {
            user: user.id,
            product: productId,
            quantity: 1
        };

        console.log("Sending Data:", data);

        await addToCart(data);

        toast.success("Product Added To Cart");

    }

    catch (error) {

        console.log(error.response?.data);

        toast.error(
            error.response?.data?.message ||
            "Failed To Add Product"
        );

    }

};

    return (

        <UserLayout>

            <div className="container mt-4">

                <h2>Available Products</h2>

                <div className="row">

                    {products.map((product) => (

                        <div className="col-md-4 mb-4" key={product._id}>

             <div className="card shadow h-100">

    <div className="card-body">

        <h4 className="mb-3">
            {product.productName}
        </h4>

        <p>
            <strong>Category:</strong> {product.category}
        </p>

        <p>
            <strong>Price:</strong> ₹{product.price}
        </p>

        <p>
            <strong>Available Stock:</strong> {product.quantity}
        </p>

      <button
    className="btn btn-success w-100 mt-3"
    onClick={() => handleAddToCart(product._id)}
>

    Add To Cart

</button>

    </div>

</div>

                        </div>

                    ))}

                </div>

            </div>

        </UserLayout>

    );

}

export default UserProducts;