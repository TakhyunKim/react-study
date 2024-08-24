import { useState } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

import { signUpInfoAtom } from "@/atoms";

import type { ChangeEvent } from "react";

import type { UserInfo } from "@/atoms";

export const useSignUpUserInfo = () => {
  const [signUpInfo, setSignUpInfo] = useAtom(signUpInfoAtom);
  const [userInfo, setUserInfo] = useState<UserInfo>(signUpInfo.user);

  const navigate = useNavigate();

  const handleUserFormChange =
    (formType: keyof UserInfo) => (event: ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;

      if (formType === "sex") {
        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          sex: value === "남자" ? "남자" : "여자",
        }));
        return;
      }

      setUserInfo((prevUserInfo) => ({ ...prevUserInfo, [formType]: value }));
    };

  const handleSubmitButtonClick = () => {
    navigate("/signup/pet-info");
    setSignUpInfo((prevSignUpInfoAtom) => ({
      ...prevSignUpInfoAtom,
      user: userInfo,
    }));
  };

  const disabledSubmitButton = Boolean(
    !userInfo.name || !userInfo.nickname || !userInfo.password
  );

  return {
    userInfo,
    disabledSubmitButton,
    handleUserFormChange,
    handleSubmitButtonClick,
  };
};
