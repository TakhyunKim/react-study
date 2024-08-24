import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function Intro() {
  return (
    <Box>
      Intro{" "}
      <Button component={Link} to="/signup/user-info">
        회원 가입
      </Button>
    </Box>
  );
}

export default Intro;
