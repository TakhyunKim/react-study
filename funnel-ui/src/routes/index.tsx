import { BrowserRouter, Routes, Route } from "react-router-dom";

import Intro from "@/pages/Intro";
import SignUpPetInfo from "@/pages/SignUpPetInfo";
import SignUpUserInfo from "@/pages/SignUpUserInfo";
import SignUpComplete from "@/pages/SignUpComplete";

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/signup/pet-info" element={<SignUpPetInfo />} />
        <Route path="/signup/user-info" element={<SignUpUserInfo />} />
        <Route path="/signup/complete" element={<SignUpComplete />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
