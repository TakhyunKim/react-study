import { useFunnel } from "@use-funnel/react-router-dom";

import SignUpUserInfo from "./SignUpUserInfo";
import SignUpPetInfo from "./SignUpPetInfo";
import SignUpComplete from "./SignUpComplete";

import type { TypingUserInfo, TypingPetInfo, CompleteSignUp } from "./context";

function SignUp() {
  const funnel = useFunnel<{
    typingUser: TypingUserInfo;
    typingPet: TypingPetInfo;
    complete: CompleteSignUp;
  }>({
    id: "sign-up-funnel",
    initial: {
      step: "typingUser",
      context: {},
    },
  });

  return (
    <funnel.Render
      typingUser={({ history }) => (
        <SignUpUserInfo
          onNext={(userInfo) => history.push("typingPet", { user: userInfo })}
        />
      )}
      typingPet={({ history, context }) => (
        <SignUpPetInfo
          userInfo={context.user}
          onNext={(petInfo) => history.push("complete", { pet: petInfo })}
        />
      )}
      complete={() => <SignUpComplete />}
    />
  );
}

export default SignUp;
