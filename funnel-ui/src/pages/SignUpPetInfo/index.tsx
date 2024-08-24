import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Label from "@mui/material/FormLabel";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import RadioGroup from "@mui/material/RadioGroup";
import Radio from "@mui/material/Radio";

import { useSignUpPetInfo } from "./useSignUpPetInfo";

function SignUpPetInfo() {
  const {
    petInfo,
    disabledSubmitButton,
    handlePetFormChange,
    handleSubmitButtonClick,
  } = useSignUpPetInfo();

  return (
    <Box>
      <Typography>펫 정보</Typography>
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
            value={petInfo.name}
            onChange={handlePetFormChange("name")}
          />
        </FormControl>
        <FormControl required>
          <Label>펫 종</Label>
          <RadioGroup
            value={petInfo.type}
            onChange={handlePetFormChange("type")}
          >
            <FormControlLabel
              label="고양이"
              value="고양이"
              control={<Radio />}
            />
            <FormControlLabel
              label="강아지"
              value="강아지"
              control={<Radio />}
            />
          </RadioGroup>
        </FormControl>
        <FormControl required>
          <Label>성별</Label>
          <RadioGroup value={petInfo.sex} onChange={handlePetFormChange("sex")}>
            <FormControlLabel label="수컷" control={<Radio />} value="수컷" />
            <FormControlLabel label="암컷" control={<Radio />} value="암컷" />
          </RadioGroup>
        </FormControl>
        <Button
          disabled={disabledSubmitButton}
          variant="contained"
          onClick={handleSubmitButtonClick}
        >
          회원가입 완료
        </Button>
      </Box>
    </Box>
  );
}

export default SignUpPetInfo;
