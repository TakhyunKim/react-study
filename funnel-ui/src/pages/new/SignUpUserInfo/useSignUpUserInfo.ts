import { useState } from "react";

import { DEFAULT_USER_INFO } from "@/atoms";

import type { ChangeEvent } from "react";

import type { UserInfo } from "@/atoms";

export const useSignUpUserInfo = () => {
  const [userInfo, setUserInfo] = useState<UserInfo>(DEFAULT_USER_INFO);

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

  const disabledSubmitButton = Boolean(
    !userInfo.name || !userInfo.nickname || !userInfo.password
  );

  return {
    userInfo,
    disabledSubmitButton,
    handleUserFormChange,
  };
};
