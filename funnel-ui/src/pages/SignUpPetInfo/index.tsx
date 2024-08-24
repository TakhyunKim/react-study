import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function SignUpPetInfo() {
  return (
    <Box>
      Sign up Pet info
      <Button component={Link} to="/signup/complete">
        회원 가입 완료
      </Button>
    </Box>
  );
}

export default SignUpPetInfo;
