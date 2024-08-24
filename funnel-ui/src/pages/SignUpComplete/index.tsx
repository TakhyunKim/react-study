import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function SignUpComplete() {
  return (
    <Box>
      Sign up complete
      <Button component={Link} to="/">
        홈으로
      </Button>
    </Box>
  );
}

export default SignUpComplete;
