import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function SignUpUserInfo() {
  return (
    <Box>
      Sign up User info{" "}
      <Button component={Link} to="/signup/pet-info">
        펫 정보 입력하기
      </Button>
    </Box>
  );
}

export default SignUpUserInfo;
