import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ allowedType }) => {
  const token = localStorage.getItem("api_token");
  const accountType = localStorage.getItem("account_type");

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Wrong account type
  if (allowedType && accountType !== allowedType) {
    return <Navigate to={`/${accountType}`} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;