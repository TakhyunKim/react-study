import { useSetAtom } from "jotai";
import { useNavigate } from "react-router-dom";

import { DEFAULT_SIGN_UP_INFO, signUpInfoAtom } from "@/atoms";

export const useSignUpComplete = () => {
  const setSignUpInfo = useSetAtom(signUpInfoAtom);

  const navigate = useNavigate();

  const handleHomeButtonClick = () => {
    setSignUpInfo(DEFAULT_SIGN_UP_INFO);
    navigate("/");
  };

  return {
    handleHomeButtonClick,
  };
};
