import { Navigate } from "react-router-dom";

function ProtectedManagerRoute({ children }) {

    const token = localStorage.getItem("token");

    const manager = JSON.parse(

        localStorage.getItem("manager")

    );

    if (!token || !manager) {

        return <Navigate to="/login" />;

    }

    return children;

}

export default ProtectedManagerRoute;