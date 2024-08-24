import { useState } from "react";

import { DEFAULT_PET_INFO } from "@/atoms";

import type { ChangeEvent } from "react";

import type { PetInfo } from "@/atoms";

export const useSignUpPetInfo = () => {
  const [petInfo, setPetInfo] = useState<PetInfo>(DEFAULT_PET_INFO);

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

  const disabledSubmitButton = Boolean(!petInfo.name || !petInfo.type);

  return {
    petInfo,
    disabledSubmitButton,
    handlePetFormChange,
  };
};
