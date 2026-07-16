function StatCard({ title, value, color }) {

    return (

        <div
            className="card shadow-sm"
            style={{
                borderLeft: `6px solid ${color}`
            }}
        >

            <div className="card-body">

                <h6 className="text-muted">

                    {title}

                </h6>

                <h2>

                    {value}

                </h2>

            </div>

        </div>

    );

}

export default StatCard;