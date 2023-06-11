import { useRecoilValue } from "recoil";
import { Navigate, Outlet, useLocation } from "react-router-dom";

import { isLoginUserSelector } from "../recoil/user";

function ProtectedRoute() {
  const currentLocation = useLocation();
  const isLoginUser = useRecoilValue(isLoginUserSelector);

  if (!isLoginUser) {
    return <Navigate to="/login" replace state={{ from: currentLocation }} />;
  } else {
    return <Outlet />;
  }
}

export default ProtectedRoute;
