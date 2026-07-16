import { Navigate } from "react-router-dom";

function ProtectedUserRoute({ children }) {

    const token = localStorage.getItem("token");

    const user = JSON.parse(

        localStorage.getItem("user")

    );

    if (!token || !user) {

        return <Navigate to="/login" />;

    }

    return children;

}

export default ProtectedUserRoute;