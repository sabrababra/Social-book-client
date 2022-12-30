import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../Contexts/AuthProvider';




const PrivateRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();

    // console.log("Login user data >", user);

    if (loading) {
        return <p>Loading...</p>
    }

    if (!user) {
        return <Navigate to="/signin" state={{ from: location }} replace></Navigate>
    }
    return children;
};


export default PrivateRoute;