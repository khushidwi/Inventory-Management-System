import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }) {

    return (

        <div className="d-flex">

            <Sidebar />

            <div
                style={{
                    flex: 1,
                    background: "#f5f7fa",
                    minHeight: "100vh"
                }}
            >

                <Navbar />

                <div className="p-4">

                    {children}

                </div>

            </div>

        </div>

    );

}

export default Layout;