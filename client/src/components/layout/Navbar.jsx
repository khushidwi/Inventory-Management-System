function Navbar() {

    const manager = JSON.parse(localStorage.getItem("manager"));

    return (

        <div
            className="bg-white shadow-sm d-flex justify-content-between align-items-center p-3"
        >

            <h4>

                Dashboard

            </h4>

            <div>

                Welcome,

                <strong>

                    {manager?.name}

                </strong>

            </div>

        </div>

    );

}

export default Navbar;