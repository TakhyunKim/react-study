import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";

import { tokenAtom } from "../recoil/user";
import { useLogin } from "./hooks/login";

import type { FormEvent, ChangeEvent } from "react";

function Login() {
  const [id, setId] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const loginMutation = useLogin();
  const location = useLocation();
  const navigation = useNavigate();
  const setTokenAtom = useSetRecoilState(tokenAtom);

  const from = location.state?.from?.pathname ?? "/";

  const handleIdChange = (event: ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLoginSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    loginMutation.mutate(
      { id, password },
      {
        onSuccess: (response: { accessToken: string }) => {
          navigation(from);
          setTokenAtom(response.accessToken);
        },
        onError: () => {
          alert("로그인 실패!");
        },
      }
    );
  };

  return (
    <FormWrapper onSubmit={handleLoginSubmit}>
      <LabelAndInputWrapper>
        <Label htmlFor="id">id</Label>
        <Input
          value={id}
          onChange={handleIdChange}
          id="id"
          placeholder="아이디를 입력해주세요"
        />
      </LabelAndInputWrapper>
      <LabelAndInputWrapper>
        <Label htmlFor="password">password</Label>
        <Input
          value={password}
          onChange={handlePasswordChange}
          id="password"
          placeholder="패스워드를 입력해주세요"
        />
      </LabelAndInputWrapper>
      <Button disabled={!id.length || !password.length} type="submit">
        제출
      </Button>
    </FormWrapper>
  );
}

const FormWrapper = styled.form`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LabelAndInputWrapper = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 1fr;
  row-gap: 12px;
  margin: 12px;
`;

const Label = styled.label`
  display: flex;
  justify-content: left;
  align-items: center;
`;

const Input = styled.input`
  padding: 8px;
`;

const Button = styled.button`
  width: 150px;
  height: 50px;
  border-radius: 8px;
`;

export default Login;
