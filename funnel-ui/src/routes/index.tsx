import { BrowserRouter, Routes, Route } from "react-router-dom";

import Intro from "@/pages/Intro";
import LegacySignUpPetInfo from "@/pages/legacy/SignUpPetInfo";
import LegacySignUpUserInfo from "@/pages/legacy/SignUpUserInfo";
import LegacySignUpComplete from "@/pages/legacy/SignUpComplete";

function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route
          path="/legacy/signup/pet-info"
          element={<LegacySignUpPetInfo />}
        />
        <Route
          path="/legacy/signup/user-info"
          element={<LegacySignUpUserInfo />}
        />
        <Route
          path="/legacy/signup/complete"
          element={<LegacySignUpComplete />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Routers;
