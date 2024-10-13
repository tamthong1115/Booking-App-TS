import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

interface ProtectedRouteProps {
    requiredRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ requiredRoles = [] }) => {
    const { isLoggedIn, roles } = useAppContext();

    const hasRequiredRoles = requiredRoles.every((role) => roles.includes(role));

    return isLoggedIn && hasRequiredRoles ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoute;
