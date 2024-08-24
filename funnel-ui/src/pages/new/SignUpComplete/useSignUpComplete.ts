import { useNavigate } from "react-router-dom";

export const useSignUpComplete = () => {
  const navigate = useNavigate();

  const handleHomeButtonClick = () => {
    navigate("/");
  };

  return {
    handleHomeButtonClick,
  };
};
