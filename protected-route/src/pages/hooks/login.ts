import { useMutation } from "@tanstack/react-query";

import { login } from "../../services/user";

import type { LoginRequestPayload } from "../../services/user";

export function useLogin() {
  const loginMutation = useMutation({
    mutationFn: (payload: LoginRequestPayload) => login(payload),
  });
  return loginMutation;
}
