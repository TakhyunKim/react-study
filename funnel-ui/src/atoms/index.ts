import { atom } from "jotai";

export type Sex = "남자" | "여자";
export type PetSex = "수컷" | "암컷";

export interface UserInfo {
  name: string;
  password: string;
  nickname: string;
  sex: Sex;
}

export interface PetInfo {
  name: string;
  type: string;
  sex: PetSex;
}

export interface SignUpInfo {
  user: UserInfo;
  pet: PetInfo;
}

export const DEFAULT_USER_INFO: UserInfo = {
  name: "",
  password: "",
  nickname: "",
  sex: "남자",
};

export const DEFAULT_PET_INFO: PetInfo = {
  name: "",
  type: "고양이",
  sex: "수컷",
};

export const DEFAULT_SIGN_UP_INFO: SignUpInfo = {
  user: DEFAULT_USER_INFO,
  pet: DEFAULT_PET_INFO,
};

export const signUpInfoAtom = atom<SignUpInfo>(DEFAULT_SIGN_UP_INFO);
