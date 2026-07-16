import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
} from "chart.js";

import { Bar, Pie } from "react-chartjs-2";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ArcElement,
    Tooltip,
    Legend
);

function DashboardCharts({ stats }) {

    const barData = {

        labels: [

            "Products",
            "Low Stock",
            "Out Of Stock"

        ],

        datasets: [

            {

                label: "Inventory",

                data: [

                    stats.totalProducts,
                    stats.lowStock,
                    stats.outOfStock

                ],

                backgroundColor: [

                    "#0d6efd",
                    "#ffc107",
                    "#dc3545"

                ]

            }

        ]

    };

    const pieData = {

        labels: [

            "Available",
            "Low Stock",
            "Out Of Stock"

        ],

        datasets: [

            {

                data: [

                    stats.totalProducts -

                    stats.lowStock -

                    stats.outOfStock,

                    stats.lowStock,

                    stats.outOfStock

                ],

                backgroundColor: [

                    "#198754",
                    "#ffc107",
                    "#dc3545"

                ]

            }

        ]

    };

    return (

        <div className="row mt-4">

            <div className="col-md-7">

                <div className="card shadow">

                    <div className="card-body">

                        <h5>

                            Inventory Overview

                        </h5>

                        <Bar data={barData} />

                    </div>

                </div>

            </div>

            <div className="col-md-5">

                <div className="card shadow">

                    <div className="card-body">

                        <h5>

                            Stock Status

                        </h5>

                        <Pie data={pieData} />

                    </div>

                </div>

            </div>

        </div>

    );

}

export default DashboardCharts;