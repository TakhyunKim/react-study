import { atom, selector } from "recoil";

export const tokenAtom = atom<string | null>({
  key: "token",
  default: null,
});

export const isLoginUserSelector = selector<boolean>({
  key: "isLoginUser",
  get: ({ get }) => Boolean(get(tokenAtom)),
});
