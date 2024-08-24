import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Label from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

import { useSignUpUserInfo } from "./useSignUpUserInfo";

function SignUpUserInfo() {
  const {
    userInfo,
    disabledSubmitButton,
    handleUserFormChange,
    handleSubmitButtonClick,
  } = useSignUpUserInfo();

  return (
    <Box>
      <Typography>유저 정보</Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "30%",
          my: 3,
          gap: 2,
        }}
      >
        <FormControl required>
          <Label id="name">이름</Label>
          <TextField
            aria-labelledby="name"
            type="text"
            size="small"
            placeholder="이름을 입력해주세요"
            value={userInfo.name}
            onChange={handleUserFormChange("name")}
          />
        </FormControl>
        <FormControl required>
          <Label>비밀번호</Label>
          <TextField
            type="password"
            size="small"
            placeholder="이름을 입력해주세요"
            value={userInfo.password}
            onChange={handleUserFormChange("password")}
          />
        </FormControl>
        <FormControl required>
          <Label>닉네임</Label>
          <TextField
            type="password"
            size="small"
            placeholder="이름을 입력해주세요"
            value={userInfo.nickname}
            onChange={handleUserFormChange("nickname")}
          />
        </FormControl>
        <FormControl required>
          <Label>성별</Label>
          <RadioGroup
            value={userInfo.sex}
            onChange={handleUserFormChange("sex")}
          >
            <FormControlLabel label="남자" control={<Radio />} value="남자" />
            <FormControlLabel label="여자" control={<Radio />} value="여자" />
          </RadioGroup>
        </FormControl>
        <Button
          disabled={disabledSubmitButton}
          variant="contained"
          onClick={handleSubmitButtonClick}
        >
          펫 정보 입력하기
        </Button>
      </Box>
    </Box>
  );
}

export default SignUpUserInfo;
