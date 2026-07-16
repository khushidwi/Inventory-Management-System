import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import {
    getActivities,
    deleteActivity,
    clearActivities
} from "../services/activityService";
import { toast } from "react-toastify";

function Activity() {

    const [activities, setActivities] = useState([]);

    const [filteredActivities, setFilteredActivities] = useState([]);

    const [search, setSearch] = useState("");

    useEffect(() => {

        loadActivities();

    }, []);

    const loadActivities = async () => {

        try {

            const res = await getActivities();

            setActivities(res.data.activities);

            setFilteredActivities(res.data.activities);

        }

        catch (error) {

            console.log(error);

        }

    };

    const handleSearch = (value) => {

        setSearch(value);

        const filtered = activities.filter((activity) =>

            activity.action
                .toLowerCase()
                .includes(value.toLowerCase())

            ||

            activity.description
                .toLowerCase()
                .includes(value.toLowerCase())

            ||

            activity.performedBy
                .toLowerCase()
                .includes(value.toLowerCase())

        );

        setFilteredActivities(filtered);

    };

    const handleDelete = async (id) => {

        if (!window.confirm("Delete this activity?")) {

            return;

        }

        try {

            const res = await deleteActivity(id);

            toast.success(res.data.message);

            loadActivities();

        }

        catch (error) {

            toast.error("Delete Failed");

        }

    };

    const handleClearAll = async () => {

        if (!window.confirm("Clear all activity logs?")) {

            return;

        }

        try {

            const res = await clearActivities();

            toast.success(res.data.message);

            loadActivities();

        }

        catch (error) {

            toast.error("Failed");

        }

    };

    return (

        <Layout>

            
            <div className="container">

    <div className="d-flex justify-content-between align-items-center mb-4">

        <h2>

            Activity Logs

        </h2>

        <button

            className="btn btn-danger"

            onClick={handleClearAll}

        >

            Clear All

        </button>

    </div>

    <div className="card shadow">

        <div className="card-body">

            <div className="row mb-3">

                <div className="col-md-4">

                    <input

                        type="text"

                        className="form-control"

                        placeholder="Search Activity..."

                        value={search}

                        onChange={(e)=>

                            handleSearch(e.target.value)

                        }

                    />

                </div>

            </div>

            <div className="table-responsive">

                <table className="table table-hover table-bordered">

                    <thead className="table-dark">

                        <tr>

                            <th>Action</th>

                            <th>Performed By</th>

                            <th>Role</th>

                            <th>Description</th>

                            <th>Date & Time</th>

                            <th>Action</th>

                        </tr>

                    </thead>

                    <tbody>

                        {

                            filteredActivities.length === 0 ?

                            (

                                <tr>

                                    <td

                                        colSpan="6"

                                        className="text-center"

                                    >

                                        No Activity Found

                                    </td>

                                </tr>

                            )

                            :

                            (

                                filteredActivities.map((activity)=>(

                                    <tr key={activity._id}>

                                        <td>

                                            {activity.action}

                                        </td>

                                        <td>

                                            {activity.performedBy}

                                        </td>

                                        <td>

                                            {activity.role}

                                        </td>

                                        <td>

                                            {activity.description}

                                        </td>

                                        <td>

                                            {

                                                new Date(

                                                    activity.createdAt

                                                ).toLocaleString()

                                            }

                                        </td>

                                        <td>

                                            <button

                                                className="btn btn-sm btn-danger"

                                                onClick={()=>

                                                    handleDelete(activity._id)

                                                }

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

    </div>

</div>

        </Layout>

    );

}

export default Activity;