import { atom } from "jotai";

export type Sex = "남자" | "여자";

export interface UserInfo {
  name: string;
  password: string;
  nickname: string;
  sex: Sex;
}

export interface PetInfo {
  name: string;
  type: string;
  sex: Sex;
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
  type: "",
  sex: "남자",
};

export const signUpInfoAtom = atom<SignUpInfo>({
  user: DEFAULT_USER_INFO,
  pet: DEFAULT_PET_INFO,
});
