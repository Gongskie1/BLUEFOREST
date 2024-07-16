import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { RootState } from "../../state/store";
import { ReactNode } from "react";

type ElementTypeProps = {
  children:ReactNode
}

const ProtectedRoutes = ({ children }:ElementTypeProps) => {
  const isAuthenticated = useSelector((state: RootState) => state.status.status);

  return children
};

export default ProtectedRoutes;