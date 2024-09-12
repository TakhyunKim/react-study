import { LoginForm } from "@/feature/auth";

export const Login = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <h1>Login</h1>
      <div style={{ width: "20%" }}>
        <LoginForm />
      </div>
    </div>
  );
};
