import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import {
    getCategories,
    addCategory,
    updateCategory,
    deleteCategory
} from "../services/categoryService";

function Categories() {

    const [categories, setCategories] = useState([]);

    const [categoryName, setCategoryName] = useState("");

    const [description, setDescription] = useState("");
    const [editingId, setEditingId] = useState(null);

    useEffect(() => {

        loadCategories();

    }, []);

    const loadCategories = async () => {

        const res = await getCategories();

        setCategories(res.data.categories);

    };
const handleSubmit = async (e) => {

    e.preventDefault();

    try {

        if (editingId) {

            await updateCategory(editingId, {
                categoryName,
                description
            });

            alert("Category Updated Successfully");

        } else {

            await addCategory({
                categoryName,
                description
            });

            alert("Category Added Successfully");

        }

        setCategoryName("");
        setDescription("");
        setEditingId(null);

        loadCategories();

    } catch (err) {

        console.log(err);

        alert("Something went wrong");

    }

};

    const handleDelete = async (id) => {

        if (!window.confirm("Delete Category?"))

            return;

        await deleteCategory(id);

        loadCategories();

    };

    return (

        <Layout>

            <h2 className="mb-4">

                Categories

            </h2>

            <div className="card mb-4">

                <div className="card-body">

                    <form onSubmit={handleSubmit}>

                        <input

                            className="form-control mb-3"

                            placeholder="Category Name"

                            value={categoryName}

                            onChange={(e) =>
                                setCategoryName(e.target.value)
                            }

                        />

                        <textarea

                            className="form-control mb-3"

                            placeholder="Description"

                            value={description}

                            onChange={(e) =>
                                setDescription(e.target.value)
                            }

                        />
<button className="btn btn-primary">
    {editingId ? "Update Category" : "Add Category"}
</button>

                    </form>

                </div>

            </div>

            <div className="card">

                <div className="card-body">

                    <table className="table">

                        <thead>

                            <tr>

                                <th>Name</th>

                                <th>Description</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                categories.map((category) => (

                                    <tr key={category._id}>

                                        <td>

                                            {category.categoryName}

                                        </td>

                                        <td>

                                            {category.description}

                                        </td>

                               <td>

    <button
        className="btn btn-warning btn-sm me-2"
        onClick={() => {

            setEditingId(category._id);

            setCategoryName(category.categoryName);

            setDescription(category.description);

        }}
    >
        Edit
    </button>

    <button
        className="btn btn-danger btn-sm"
        onClick={() => handleDelete(category._id)}
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

export default Categories;