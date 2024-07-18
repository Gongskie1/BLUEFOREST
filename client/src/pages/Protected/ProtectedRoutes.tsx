// import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
// import { RootState } from "../../state/store";
import { ReactNode } from "react";

type ElementTypeProps = {
  children:ReactNode
}

const ProtectedRoutes = ({ children }:ElementTypeProps) => {
  const statusString = localStorage.getItem("status");
  const statusBoolean = statusString === "true";
  // const isAuthenticated = useSelector((state: RootState) => state.status.status);

  return statusBoolean ? children : <Navigate to="/login" />;
};

export default ProtectedRoutes;