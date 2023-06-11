import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "../pages/Main";
import Login from "../pages/Login";
import MyPage from "../pages/MyPage";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/my-page" element={<MyPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
