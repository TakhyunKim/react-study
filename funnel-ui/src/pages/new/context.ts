import type { UserInfo, PetInfo } from "@/atoms";

// 1. 아무것도 입력 안됨
export type TypingUserInfo = { user?: UserInfo; pet?: PetInfo };

// 2. 유저 정보 입력됨
export type TypingPetInfo = { user: UserInfo; pet?: PetInfo };

// 3. 유저, 펫 정보 모두 입력됨 (모든 step 완료)
export type CompleteSignUp = { user: UserInfo; pet: PetInfo };
