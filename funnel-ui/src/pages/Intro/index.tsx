import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function Intro() {
  return (
    <Box>
      Intro{" "}
      <Button component={Link} to="/signup/user-info">
        Sign up
      </Button>
    </Box>
  );
}

export default Intro;
