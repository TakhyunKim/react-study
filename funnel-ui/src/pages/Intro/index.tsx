import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function Intro() {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <Button
        variant="contained"
        component={Link}
        to="/legacy/signup/user-info"
      >
        without use funnel 회원 가입
      </Button>
      <Button variant="contained" component={Link} to="/signup/user-info">
        with use funnel 회원 가입
      </Button>
    </Box>
  );
}

export default Intro;
