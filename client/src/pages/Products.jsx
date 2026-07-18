import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import { getProducts,deleteProduct,searchProducts } from "../services/productService";
import ProductModal from "../components/products/ProductModal";

function Products() {

    const [products, setProducts] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [keyword, setKeyword] = useState("");

    useEffect(() => {

        loadProducts();

    }, []);

    const loadProducts = async () => {

        try {

            const res = await getProducts();

            setProducts(res.data.products);

        }

        catch (err) {

            console.log(err);

        }

    };
    const handleDelete = async (id) => {

    if (!window.confirm("Are you sure you want to delete this product?")) {
        return;
    }

    try {

        await deleteProduct(id);

        alert("Product Deleted Successfully");

        loadProducts();

    } catch (err) {

        console.log(err);

        alert("Delete Failed");

    }

};
const handleSearch = async (e) => {

    const value = e.target.value;

    setKeyword(value);

    try {

        if (value === "") {

            loadProducts();

            return;

        }

        const res = await searchProducts(value);

        setProducts(res.data.products);

    }

    catch (err) {

        console.log(err);

    }

};

    return (

        <Layout>

            <div className="d-flex justify-content-between align-items-center mb-4">

                <h2>Products</h2>

    <button
    className="btn btn-primary"
    onClick={() => {
        setSelectedProduct(null);
        setShowModal(true);
    }}
>
    + Add Product
</button>

            </div>
            <div className="mb-3">

    <input

        type="text"

        className="form-control"

        placeholder="Search Product..."

        value={keyword}

        onChange={handleSearch}

    />

</div>

            <div className="card shadow">

                <div className="card-body">

                    <table className="table table-hover">

                        <thead>

                            <tr>

                                <th>Name</th>

                                <th>Category</th>

                                <th>Price</th>

                                <th>Quantity</th>

                                <th>Status</th>

                                <th>Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                products.length === 0 ?

                                (

                                    <tr>

                                        <td
                                            colSpan="6"
                                            className="text-center"
                                        >

                                            No Products Found

                                        </td>

                                    </tr>

                                )

                                :

                                (

                                    products.map((product) => (

                                        <tr key={product._id}>

                                            <td>{product.productName}</td>

                                         <td>{product.category}</td>

                                            <td>₹{product.price}</td>

                                            <td>{product.quantity}</td>

                                            <td>{product.status}</td>

                                            <td>
<button
    className="btn btn-warning btn-sm me-2"
    onClick={() => {
        setSelectedProduct(product);
        setShowModal(true);
    }}
>
    Edit
</button>
<button
    className="btn btn-danger btn-sm"
    onClick={() => handleDelete(product._id)}
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
   <ProductModal
    show={showModal}
    onClose={() => {
        setShowModal(false);
        setSelectedProduct(null);
    }}
    refresh={loadProducts}
    product={selectedProduct}
/>

        </Layout>

        
        

    );


}

export default Products;