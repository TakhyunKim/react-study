import { useState } from "react";
import { useAtom } from "jotai";
import { useNavigate } from "react-router-dom";

import { signUpInfoAtom } from "@/atoms";

import type { ChangeEvent } from "react";

import type { PetInfo } from "@/atoms";

export const useSignUpPetInfo = () => {
  const [signUpInfo, setSignUpInfo] = useAtom(signUpInfoAtom);
  const [petInfo, setPetInfo] = useState<PetInfo>(signUpInfo.pet);

  const navigate = useNavigate();

  const handlePetFormChange =
    (formType: keyof PetInfo) => (event: ChangeEvent<HTMLInputElement>) => {
      let value = event.target.value;

      if (formType === "sex") {
        setPetInfo((prevPetInfo) => ({
          ...prevPetInfo,
          sex: value === "수컷" ? "수컷" : "암컷",
        }));
        return;
      }

      setPetInfo((prevPetInfo) => ({ ...prevPetInfo, [formType]: value }));
    };

  const handleSubmitButtonClick = () => {
    setSignUpInfo((prevSignUpInfoAtom) => ({
      ...prevSignUpInfoAtom,
      pet: petInfo,
    }));
    navigate("/signup/complete");
  };

  const disabledSubmitButton = Boolean(!petInfo.name || !petInfo.type);

  return {
    petInfo,
    disabledSubmitButton,
    handlePetFormChange,
    handleSubmitButtonClick,
  };
};
