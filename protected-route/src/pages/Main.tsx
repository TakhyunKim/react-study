import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { Link } from "react-router-dom";

import { isLoginUserSelector } from "../recoil/user";

function Main() {
  const isLoginUser = useRecoilValue(isLoginUserSelector);

  return (
    <Wrapper>
      {!isLoginUser && <Link to="/login">로그인</Link>}
      <Link to="/my-page">마이페이지</Link>
      <Link to="/dashboard">대시보드</Link>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: "100%";
  height: "100%";
  display: flex;
  flex-direction: column;
`;

export default Main;
