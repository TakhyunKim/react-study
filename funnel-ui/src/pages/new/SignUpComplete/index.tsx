import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import { useSignUpComplete } from "./useSignUpComplete";

function SignUpComplete() {
  const { handleHomeButtonClick } = useSignUpComplete();

  return (
    <Box>
      Sign up complete
      <Button onClick={handleHomeButtonClick}>홈으로</Button>
    </Box>
  );
}

export default SignUpComplete;
