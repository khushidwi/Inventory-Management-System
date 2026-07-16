import Layout from "../components/layout/Layout";
import { useEffect, useState } from "react";

import {
    getSuppliers,
    addSupplier,
    updateSupplier,
    deleteSupplier
} from "../services/supplierService";

function Suppliers() {

    const [suppliers, setSuppliers] = useState([]);

    const [editingId, setEditingId] = useState(null);

    const [formData, setFormData] = useState({
        supplierName: "",
        companyName: "",
        email: "",
        phone: "",
        address: "",
        gstNumber: "",
        status: "Active"
    });

    useEffect(() => {
        loadSuppliers();
    }, []);

    const loadSuppliers = async () => {
        const res = await getSuppliers();
        setSuppliers(res.data.suppliers);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (editingId) {

            await updateSupplier(editingId, formData);

            alert("Supplier Updated");

        } else {

            await addSupplier(formData);

            alert("Supplier Added");

        }

        setEditingId(null);

        setFormData({
            supplierName: "",
            companyName: "",
            email: "",
            phone: "",
            address: "",
            gstNumber: "",
            status: "Active"
        });

        loadSuppliers();
    };

    const handleEdit = (supplier) => {

        setEditingId(supplier._id);

        setFormData(supplier);
    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete Supplier?"))
            return;

        await deleteSupplier(id);

        loadSuppliers();
    };

    return (

        <Layout>

            <h2 className="mb-4">Suppliers</h2>

            <div className="card mb-4">

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <input
                            className="form-control mb-3"
                            placeholder="Supplier Name"
                            name="supplierName"
                            value={formData.supplierName}
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Company Name"
                            name="companyName"
                            value={formData.companyName}
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="Address"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                        />

                        <input
                            className="form-control mb-3"
                            placeholder="GST Number"
                            name="gstNumber"
                            value={formData.gstNumber}
                            onChange={handleChange}
                        />

                        <button className="btn btn-primary">

                            {editingId ? "Update Supplier" : "Add Supplier"}

                        </button>

                    </form>

                </div>

            </div>

            <div className="card">

                <div className="card-body">

                    <table className="table table-hover">

                        <thead>

                            <tr>

                                <th>Name</th>

                                <th>Company</th>

                                <th>Email</th>

                                <th>Phone</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {
                                suppliers.map((supplier) => (

                                    <tr key={supplier._id}>

                                        <td>{supplier.supplierName}</td>

                                        <td>{supplier.companyName}</td>

                                        <td>{supplier.email}</td>

                                        <td>{supplier.phone}</td>

                                        <td>

                                            <button
                                                className="btn btn-warning btn-sm me-2"
                                                onClick={() => handleEdit(supplier)}
                                            >
                                                Edit
                                            </button>

                                            <button
                                                className="btn btn-danger btn-sm"
                                                onClick={() => handleDelete(supplier._id)}
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))
                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </Layout>

    );

}

export default Suppliers;